import { BadRequestException } from '@nestjs/common';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { GraphQLContext } from 'src/app/graphqlContext';
import { NewUserInput } from 'src/user/models/dto/new-user.input';
import { User } from 'src/user/models/user.model';
import { CurrentUser } from '../decorators/current-user.decorator';
import { LoginInput } from '../models/dto/login.input';
import { LoginResult } from '../models/login-result.model';
import { AuthService } from '../services/auth.service';

@Resolver(() => LoginResult)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Query(() => LoginResult, { name: 'logIn' })
  async logIn(
    @Args() payload: LoginInput,
    @Context() context: GraphQLContext,
    @CurrentUser() user: User,
  ): Promise<LoginResult> {
    context.res.cookie('some-cookie', 'some-cookie-value');
    console.log(user);
    return this.authService.logIn(payload);
  }

  @Mutation(() => LoginResult, { name: 'SignUp' })
  async SignUp(@Args('newUserData') payload: NewUserInput, @Context() context: GraphQLContext): Promise<LoginResult> {
    context.res.cookie('some-cookie', 'some-cookie-value');
    return this.authService.signUp(payload);
  }
}
