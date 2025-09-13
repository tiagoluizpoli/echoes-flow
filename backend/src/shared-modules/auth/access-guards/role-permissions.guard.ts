// src/shared-modules/auth/role-permissions.guard.ts

import {
  type CanActivate,
  type ExecutionContext,
  Injectable,
} from '@nestjs/common';
import type { Reflector } from '@nestjs/core';
// import type { DatabaseService } from '../../database/database.service';
import { PERMISSIONS_KEY } from '../decorators';

// import type { ClerkService } from './clerk.service';

// Mapeamento de roles para permissões
const ROLE_PERMISSIONS_MAP: { [key: string]: string[] } = {
  admin: [
    'finances:create',
    'finances:view',
    'events:create',
    'events:view',
    'members:manage',
  ],
  leader: ['finances:view', 'events:create', 'events:view'],
  member: ['events:view'],
};

@Injectable()
export class RolePermissionsGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    // private readonly dbService: DatabaseService,
    // private readonly clerkService: ClerkService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredPermissions = this.reflector.getAllAndOverride<string[]>(
      PERMISSIONS_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredPermissions) {
      return true;
    }

    const { clerkUser, orgId } = context.switchToHttp().getRequest();

    // 1. Obtém a role do usuário na organização
    // const memberAssociation = await this.dbService.getMemberAssociation(
    //   clerkUser.id,
    //   orgId,
    // );
    // if (!memberAssociation) {
    //   throw new ForbiddenException('Usuário não é membro da organização.');
    // }

    // const userRole = memberAssociation.role;
    // const userPermissions = ROLE_PERMISSIONS_MAP[userRole] || [];

    // 2. Verifica se a role do usuário concede a permissão
    // const hasPermission = requiredPermissions.every((permission) =>
    //   userPermissions.includes(permission),
    // );

    // if (!hasPermission) {
    //   throw new ForbiddenException(
    //     'Permissão insuficiente para realizar esta ação.',
    //   );
    // }

    return true;
  }
}
