import { Module } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';
import { AuthController } from './controllers/auth.controller';
import { AuthResolver } from './resolvers/auth.resolver';
import { SessionSerializer } from './serializers/session.serializer';
import { AuthService } from './services/auth.service';
import { LocalStrategy } from './strategies/local.strategy';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [UserModule, PassportModule.register({ defaultStrategy: 'local', session: true })],
  controllers: [AuthController],
  providers: [AuthService, AuthResolver, LocalStrategy, SessionSerializer],
})
export class AuthModule {}
