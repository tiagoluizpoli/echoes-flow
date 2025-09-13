// src/shared-modules/auth/organization-access.guard.ts

import {
  type CanActivate,
  type ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import type { Reflector } from '@nestjs/core';
// import type { DatabaseService } from '../../database/database.service';
import { PERMISSIONS_KEY } from '../decorators';
// import type { ClerkService } from './clerk.service';

@Injectable()
export class OrganizationAccessGuard implements CanActivate {
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

    // 1. Busca as permissões da organização no banco de dados
    // const organization = await this.dbService.getOrganizationById(orgId);
    // if (!organization) {
    //   throw new ForbiddenException(
    //     'Organização não encontrada ou acesso negado.',
    //   );
    // }

    // 2. Verifica se a organização tem acesso a todos os módulos necessários
    // const modulePermissions = organization.modulePermissions || [];
    const hasAccess = requiredPermissions.every((permission) => {
      // Ex: 'finances:create' -> 'finances'
      const moduleName = permission.split(':')[0];
      return true; // modulePermissions.includes(moduleName);
    });

    if (!hasAccess) {
      throw new ForbiddenException(
        'Acesso ao módulo negado. A organização não possui este módulo ativado.',
      );
    }

    return true;
  }
}
