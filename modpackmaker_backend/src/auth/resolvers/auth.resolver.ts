import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { GraphQLContext } from 'src/app/graphqlContext';
import { NewUserInput } from 'src/user/models/dto/new-user.input';
import { User } from 'src/user/models/user.model';
import { CurrentUser } from '../decorators/current-user.decorator';
import { LocalAuthGuard } from '../guards/gql-local-auth/local-auth.guard';
import { GqlThrottlerGuard } from '../guards/gql-throttler/gql-throttler.guard';
import { LoginResult } from '../models/dto/login-result';
import { LoginInput } from '../models/dto/login.input';
import { LogoutResult } from '../models/dto/logout-result';
import { AuthService } from '../services/auth.service';
import { AuthenticatedGuard } from '../guards/authenticated/authenticated.guard';

@Resolver(() => LoginResult)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Query(() => LoginResult, { name: 'logIn' })
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

  @Mutation(() => LogoutResult, { name: 'LogOut' })
  async LogOut(@Context() ctx: GraphQLContext): Promise<LogoutResult> {
    console.log('Logged Out: ');
    ctx.req.logOut((err: Error) => {});
    return { status: 'Logout' };
  }
}
