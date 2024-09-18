import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { ObjectId } from 'mongoose';
import { User } from 'src/user/models/user.model';
import { UserService } from 'src/user/services/user.service';
import { LoginResult } from '../models/dto/login-result';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(private readonly userService: UserService) {
    super();
  }

  serializeUser(user: User, done: (err: Error, user: ObjectId) => void) {
    done(null, user._id);
  }
  async deserializeUser(payload: ObjectId, done: (err: Error, user: User) => void) {
    const user = await this.userService.getById(payload);
    done(null, user);
  }
}
