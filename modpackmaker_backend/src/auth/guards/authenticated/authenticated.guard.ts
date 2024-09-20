import { CanActivate, ContextType, ExecutionContext, Injectable } from '@nestjs/common';
import { GqlContextType, GqlExecutionContext } from '@nestjs/graphql';
import { Observable } from 'rxjs';

@Injectable()
export class AuthenticatedGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const request = this.getRequest(context);
    return request.isAuthenticated();
  }

  getRequest(context: ExecutionContext) {
    //ContextType is redundant (since GqlContextType includes it) but is left to make the options more explicit
    switch (context.getType<ContextType | GqlContextType>()) {
      case 'graphql':
        const ctx = GqlExecutionContext.create(context);
        const req = ctx.getContext().req;
        if (req) {
          const args = ctx.getArgs();
          req.body = { ...req.body, ...args };
          return req;
        }
      case 'http':
        return context.switchToHttp().getRequest();
      case 'rpc':
        return context.switchToRpc().getData();
      case 'ws':
        return context.switchToWs().getData();
      default:
        return context.switchToHttp().getRequest();
    }
  }
}
