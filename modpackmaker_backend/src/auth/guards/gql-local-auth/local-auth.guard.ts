import { ExecutionContext, Injectable } from '@nestjs/common';
import { GqlContextType, GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';
import { GraphQLContext } from 'src/app/graphqlContext';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  constructor() {
    super({
      usernameField: 'email',
      passwordField: 'password',
    });
  }

  async canActivate(context: ExecutionContext) {
    await super.canActivate(context);
    const req = this.getRequest(context);
    await super.logIn(req);
    return true;
  }

  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    const req = ctx.getContext().req;
    if (req) {
      const { ...payload } = ctx.getArgs();
      req.body = payload;
      return req;
    }
    return context.switchToHttp().getRequest();
  }
}
