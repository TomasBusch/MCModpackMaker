import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
// import { compare, genSalt, hash } from 'bcrypt';
import { hash, verify } from 'argon2';
import { NewUserInput } from 'src/user/models/dto/new-user.input';
import { User } from 'src/user/models/user.model';
import { UserService } from 'src/user/service/user.service';
import { LoginResult } from '../models/dto/login-result';
import { LoginInput } from '../models/dto/login.input';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly configService: ConfigService,
  ) {}

  async logIn(payload: LoginInput): Promise<User> {
    const user = await this.userService.finOne({
      email: payload.email,
    });
    if (user) {
      try {
        if (
          await verify(user.password, payload.password, {
            secret: Buffer.from(this.configService.get<string>('PEPPER')),
          })
        ) {
          return user;
        } else {
          throw new BadRequestException('Login Failed');
        }
      } catch (err) {
        throw new BadRequestException('Login Failed');
      }
    }
  }

  async signUp(payload: NewUserInput): Promise<LoginResult> {
    const hashed_password = await hash(payload.password, {
      secret: Buffer.from(this.configService.get<string>('PEPPER')),
    });
    payload.password = hashed_password;
    const user = this.userService.create(payload);
    return user;
  }
}
