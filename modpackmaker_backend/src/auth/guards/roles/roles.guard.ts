import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import matchRoles from 'src/auth/util/match-roles';
import { User } from 'src/user/models/user.model';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) {
      return true;
    }
    const request = this.getRequest(context);
    const user: User = request.user;
    return matchRoles(roles, user.roles);
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
