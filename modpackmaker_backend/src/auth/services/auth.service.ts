import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { compare, genSalt, hash } from 'bcrypt';
import { NewUserInput } from 'src/user/models/dto/new-user.input';
import { User } from 'src/user/models/user.model';
import { UserService } from 'src/user/service/user.service';
import { LoginInput } from '../models/dto/login.input';
import { LoginResult } from '../models/login-result.model';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly configService: ConfigService,
  ) {}

  async logIn(payload: LoginInput): Promise<LoginResult> {
    const user = await this.userService.finOne({
      email: payload.email,
    });
    if (user && compare(user.password, payload.password)) {
      const result = { username: user.username, email: user.email, avatar_image: user.avatar_image };
      return result;
    } else {
      throw new BadRequestException('Login Failed');
    }
  }

  async signUp(payload: NewUserInput): Promise<LoginResult> {
    const hashed_password = await hash(payload.password, +this.configService.get<number>('SALT_ROUNDS'));
    payload.password = hashed_password;
    const user = this.userService.create(payload);
    return user;
  }
}
