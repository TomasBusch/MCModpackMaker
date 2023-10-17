import { BadRequestException, Injectable } from '@nestjs/common';
import { NewUserInput } from 'src/user/models/dto/new-user.input';
import { User } from 'src/user/models/user.model';
import { UserService } from 'src/user/service/user.service';
import { LoginInput } from '../models/dto/login.input';
import { LoginResult } from '../models/login-result.model';
import { compare, genSalt, hash } from 'bcrypt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService, private readonly configService: ConfigService) {}

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
    console.log("SALT: "+this.configService.get<string>('SALT_ROUNDS'));
    const hashed_password = await hash(payload.password, +this.configService.get<number>('SALT_ROUNDS'));
    console.log(hashed_password);
    const {password, ...userInfo} = payload;
    const user = this.userService.create({password: hashed_password, ...userInfo});
    return user;
  }
}
