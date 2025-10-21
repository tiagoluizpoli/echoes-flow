import { RolesWithPermissions } from './types';

export const roles = ['admin', 'member'] as const;
export type Role = (typeof roles)[number];

export const ROLES: RolesWithPermissions = {
  admin: {
    church: {
      view: true,
      create: true,
      update: true,
      'delegate-owner': (user, church) =>
        user.memberAssociations?.some(
          (ma) => ma.churchId === church.id && ma.owner,
        ) ?? false,
    },
  },
  member: {
    church: {
      view: true,
      create: false,
      update: false,
      'delegate-owner': false,
    },
  },
} as const satisfies RolesWithPermissions;
