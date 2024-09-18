import { Controller, Post, UseGuards, UseInterceptors } from '@nestjs/common';
import { User } from 'src/user/models/user.model';
import { LocalAuthGuard } from '../guards/gql-local-auth/local-auth.guard';
import { CurrentUser } from '../decorators/current-user.decorator';
import { UserService } from 'src/user/services/user.service';
import MongooseClassSerializerInterceptor from '../interceptors/mongoose_class_serializer.interceptor';

@Controller('auth')
@UseInterceptors(MongooseClassSerializerInterceptor(User))
export class AuthController {
  constructor() {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async logIn(@CurrentUser() user: User): Promise<User> {
    return user;
  }
}
