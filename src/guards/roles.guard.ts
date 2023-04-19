import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import {
  isUnauthorizedHttpException,
  noRoleAllowedHttpException,
} from 'src/helper/errors';
import { Role } from 'src/module/enum/roles.enum';
import { User } from 'src/module/users/entities/user.entity';

import { ROLES_KEY } from '../decorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext) {
    const { user } = context
      .switchToHttp()
      .getRequest<{ user: User | undefined }>();
    if (!user || !user.role) throw isUnauthorizedHttpException();

    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (user.role === Role.RH) return true;
    if (!requiredRoles.includes(user.role)) throw noRoleAllowedHttpException();

    return requiredRoles.some((role) => user.role?.includes(role));
  }
}
