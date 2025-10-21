import { UnauthorizedException } from '@nestjs/common';
import { Church, User } from 'src/shared-modules/core';
import { ROLES } from './roles';
import { RolesWithPermissions } from './types';

export type Permissions = {
  church: {
    dataType: Church;
    action: 'view' | 'create' | 'update' | 'delegate-owner';
  };
  member: {
    dataType: User;
    action: 'view' | 'create' | 'update';
  };
};

export const hasPermission = <Resource extends keyof Permissions>(
  user: User,
  churchId: string,
  resource: Resource,
  action: Permissions[Resource]['action'],
  data: Permissions[Resource]['dataType'],
) => {
  const memberAssociation = user.memberAssociations?.find(
    (m) => m.churchId === churchId,
  );

  if (!memberAssociation) {
    throw new UnauthorizedException('Usuário não é membro da organização.');
  }

  return memberAssociation.roles.some((role) => {
    const permission = (ROLES as RolesWithPermissions)[role][resource]?.[
      action
    ];

    if (!permission) return false;

    if (typeof permission === 'boolean') return permission;

    return data !== null && permission(user, data);
  });
};
