import { Entity } from './base/entity';
import { User } from './user';

const roles = ['admin', 'leader', 'member'] as const;
type Role = (typeof roles)[number];

const statuses = ['pending', 'active', 'paused', 'ended'] as const;
type Status = (typeof statuses)[number];

interface MemberAssociationsProps {
  userId: string;
  organizationId: string;
  role: Role;
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

  get organizationId(): string {
    return this.props.organizationId;
  }

  get role(): Role {
    return this.props.role;
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
