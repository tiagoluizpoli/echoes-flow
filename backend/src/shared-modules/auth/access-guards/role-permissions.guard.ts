// src/shared-modules/auth/role-permissions.guard.ts

import {
  type CanActivate,
  type ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import type { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { MemberAssociationsRepository } from 'src/shared-modules/database';
import { PERMISSIONS_KEY } from '../decorators';

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
    private readonly memberAssociationsRepository: MemberAssociationsRepository,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredPermissions = this.reflector.getAllAndOverride<string[]>(
      PERMISSIONS_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredPermissions) {
      return true;
    }

    const request = context.switchToHttp().getRequest<Request>();
    const { user } = request;

    if (!user) throw new UnauthorizedException();

    // 1. Obtém a associação de membro para pegar a role
    const memberAssociation =
      await this.memberAssociationsRepository.findByUserIdAndOrgId(
        user.sub,
        user.org_id ?? '',
      );

    // Se o usuário não for um membro da organização, nega o acesso
    if (!memberAssociation) {
      throw new UnauthorizedException('Usuário não é membro da organização.');
    }

    const userRole = memberAssociation.role;
    const userPermissions = ROLE_PERMISSIONS_MAP[userRole] || [];

    // 2. Verifica se a role do usuário concede todas as permissões necessárias
    const hasPermission = requiredPermissions.every((permission) =>
      userPermissions.includes(permission),
    );

    if (!hasPermission) {
      throw new UnauthorizedException(
        'Permissão insuficiente para realizar esta ação.',
      );
    }

    return true;
  }
}
