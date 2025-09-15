import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { OrganizationsRepository } from 'src/shared-modules/database';
import { SUBSCRIPTION_STATUS_KEY } from '../decorators';

// Definimos esta interface para tipar o objeto de Request com os dados injetados pelo ClerkGuard
interface ClerkUser {
  id: string;
}

interface RequestWithAuth extends Request {
  clerkUser: ClerkUser;
  orgId: string;
}

@Injectable()
export class SubscriptionStatusGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly organizationsRepository: OrganizationsRepository,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredStatuses = this.reflector.getAllAndOverride<string[]>(
      SUBSCRIPTION_STATUS_KEY,
      [context.getHandler(), context.getClass()],
    );

    // Se a rota não exige um status específico, permite o acesso
    if (!requiredStatuses) {
      return true;
    }

    const request = context.switchToHttp().getRequest<RequestWithAuth>();
    const { orgId } = request;

    if (!orgId) {
      // Se não houver organizationId, o usuário não está em uma organização, então não tem acesso
      throw new ForbiddenException('Usuário não pertence a uma organização.');
    }

    // 1. Usa o repositório para obter o status da organização
    const [organization] = await this.organizationsRepository.findById(orgId);

    // Se a organização não for encontrada ou não tiver um status de assinatura
    if (!organization || !organization.subscriptionStatus) {
      throw new ForbiddenException(
        'Organização não encontrada ou sem status de assinatura.',
      );
    }

    const currentStatus = organization.subscriptionStatus;

    // 2. Verifica se o status atual da organização está entre os status permitidos
    const hasPermission = requiredStatuses.includes(currentStatus);

    if (!hasPermission) {
      throw new ForbiddenException(
        'Sua assinatura não permite acesso a esta funcionalidade.',
      );
    }

    return true;
  }
}
