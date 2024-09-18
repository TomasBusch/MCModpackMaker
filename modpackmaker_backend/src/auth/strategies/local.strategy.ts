import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { LoginInput } from '../models/dto/login.input';
import { AuthService } from '../services/auth.service';
import { User } from 'src/user/models/user.model';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: "email" });
  }

  async validate(email: string, password: string): Promise<User> {
    const user = await this.authService.logIn({ email: email, password: password });
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
