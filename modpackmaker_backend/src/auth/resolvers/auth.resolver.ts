import { UseGuards, UseInterceptors } from '@nestjs/common';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { GraphQLContext } from 'src/app/graphqlContext';
import { NewUserInput } from 'src/user/models/dto/new-user.input';
import { User } from 'src/user/models/user.model';
import { CurrentUser } from '../decorators/current-user.decorator';
import { Role } from '../decorators/role.decorator';
import { AuthenticatedGuard } from '../guards/authenticated/authenticated.guard';
import { LocalAuthGuard } from '../guards/gql-local-auth/local-auth.guard';
import { GqlThrottlerGuard } from '../guards/gql-throttler/gql-throttler.guard';
import MongooseClassSerializerInterceptor from '../interceptors/mongoose_class_serializer.interceptor';
import { LoginResult } from '../models/dto/login-result';
import { LoginInput } from '../models/dto/login.input';
import { LogoutResult } from '../models/dto/logout-result';
import { AuthService } from '../services/auth.service';
import * as path from 'path';

@Resolver(() => LoginResult)
@UseInterceptors(MongooseClassSerializerInterceptor(User))
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Mutation(() => LoginResult, { name: 'logIn' })
  async logIn(@Args() payload: LoginInput, @CurrentUser() user: User): Promise<LoginResult> {
    return user;
  }

  @UseGuards(AuthenticatedGuard)
  @Query(() => LoginResult, { name: 'getProfile' })
  async getProfile(@CurrentUser() user: User): Promise<LoginResult> {
    return user;
  }

  @Mutation(() => LoginResult, { name: 'SignUp' })
  async SignUp(@Args('NewUserInput') payload: NewUserInput): Promise<LoginResult> {
    return this.authService.signUp(payload);
  }

  @UseGuards(AuthenticatedGuard)
  @Mutation(() => LogoutResult, { name: 'LogOut' })
  async LogOut(@Context() ctx: GraphQLContext): Promise<LogoutResult> {
    return new Promise((resolve, reject) => {
      ctx.req.logout((err) => {
        if (err) {
          reject(false);
        } else {
          // Successfully logged out
          ctx.req.session.destroy((err) => { 
              ctx.res.redirect('/');
          });

          resolve({ status: 'SUCCESS' });
        }
      });
    });
  }
}
