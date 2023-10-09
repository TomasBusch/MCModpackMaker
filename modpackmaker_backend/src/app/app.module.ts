import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { ModpackModule } from '../modpack/modpack.module';
import { AppService } from './app.service';
import { join } from 'path';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
// import { ApolloServerPluginLandingPageProductionDefault } from '@apollo/server/plugin/landingPage/default';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://db:27017/mcmodpackmaker'),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
      subscriptions: {
        'graphql-ws': true,
      },
    }),
    ModpackModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
