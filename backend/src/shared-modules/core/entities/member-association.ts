import { Role } from 'src/shared-modules/auth/permission-system';
import { Entity } from './base/entity';
import { User } from './user';

export const memberStatuses = ['pending', 'active', 'paused', 'ended'] as const;
type Status = (typeof memberStatuses)[number];

interface MemberAssociationsProps {
  userId: string;
  churchId: string;
  owner: boolean;
  roles: Role[];
  status: Status;
  createdAt: Date;
  user?: User;
}

export class MemberAssociation extends Entity<MemberAssociationsProps> {
  private constructor(props: MemberAssociationsProps, id?: string) {
    super(props, id);
  }

  get userId(): string {
    return this.props.userId;
  }

  get churchId(): string {
    return this.props.churchId;
  }

  get owner(): boolean {
    return this.props.owner;
  }

  get roles(): Role[] {
    return this.props.roles;
  }

  get status(): Status {
    return this.props.status;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  static create(props: MemberAssociationsProps, id?: string) {
    return new MemberAssociation(props, id);
  }
}
