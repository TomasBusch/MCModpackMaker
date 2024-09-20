import { NestFactory } from '@nestjs/core';
import * as session from 'express-session';
import RedisStore from "connect-redis"
import {createClient} from 'redis';
import * as passport from 'passport';
import * as path from 'path';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app/app.module';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

require('dotenv').config({ path: path.resolve('src', 'config', 'env', `${process.env.NODE_ENV}.env`) });

async function bootstrap() {
  const logger = new Logger();
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

    // Session
  //const redisHost: string = process.env.REDIS_HOST;
  //const redisPort: string = process.env.REDIS_PORT;

  const redisClient = await createClient({
    socket:{
      port: 6379,
      host: 'sessions',
    },
   });
  redisClient.connect().catch(console.error);

  redisClient.on('error', (err) =>
    Logger.error('Could not establish a connection with redis. ' + err)
  );
  redisClient.on('connect', () =>
    Logger.verbose('Connected to redis successfully')
  );

  const redisStore = new RedisStore({
    client: redisClient,
    prefix: 'mcmodpackmaker:',
  });

  app.use(
    session({
      name: 'session_id',
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 1000 * 60 * 60,
      },
      store: redisStore,
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());
    app.use(cookieParser());
  app.enableCors({origin: true, credentials: true});
  await app.listen(3000);
}

bootstrap();
