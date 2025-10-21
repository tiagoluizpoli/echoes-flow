// src/shared-modules/auth/role-permissions.guard.ts

import {
  type CanActivate,
  type ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';

import { ChurchRepository, UserRepository } from 'src/shared-modules/database';
import { PERMISSIONS_KEY } from '../decorators';
import { hasPermission } from '../permission-system';

// Deprecaed.
// Keeping this as example, delete as soon as it is no longer needed.

@Injectable()
export class RolePermissionsGuard implements CanActivate {
  constructor(
    @Inject(Reflector) private readonly reflector: Reflector,
    private readonly userRepository: UserRepository,
    private readonly churchRepository: ChurchRepository,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredPermissions = this.reflector.getAllAndOverride<string[]>(
      PERMISSIONS_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredPermissions) {
      return true;
    }

    console.log({ requiredPermissions });

    const request = context.switchToHttp().getRequest<Request>();
    const { user } = request;
    if (!user) throw new UnauthorizedException();

    const churchId = request.headers['x-flow-church-id'];

    if (!churchId || typeof churchId !== 'string') {
      throw new UnauthorizedException('Church ID não fornecido.');
    }

    // 1. Obtém a associação de membro para pegar a role
    const dbUser = await this.userRepository.getUserById(user.userId);

    // Se o usuário não for um membro da organização, nega o acesso
    if (!dbUser) {
      throw new UnauthorizedException('Usuário não é membro da organização.');
    }

    const church = await this.churchRepository.findById(churchId);

    if (!church) {
      throw new UnauthorizedException('Organização não encontrada.');
    }

    const hasPermissionResult = hasPermission(
      dbUser,
      churchId,
      'church',
      'view',
      church,
    );

    if (!hasPermissionResult) {
      throw new UnauthorizedException(
        'Permissão insuficiente para realizar esta ação.',
      );
    }

    return true;
  }
}
