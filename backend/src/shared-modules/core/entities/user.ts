import { Entity } from './base/entity';
import { MemberAssociation } from './member-association';

interface UserProps {
  name: string;
  email: string;
  createdAt?: Date;
  activatedAt?: Date;
  deletedAt?: Date;
  memberAssociations?: MemberAssociation[];
}

export class User extends Entity<UserProps> {
  private constructor(props: UserProps, id: string) {
    super(props, id);
  }

  get name(): string {
    return this.props.name;
  }

  get email(): string {
    return this.props.email;
  }

  get createdAt(): Date | undefined {
    return this.props.createdAt;
  }

  get activatedAt(): Date | undefined {
    return this.props.activatedAt;
  }

  get deletedAt(): Date | undefined {
    return this.props.deletedAt;
  }

  get memberAssociations(): MemberAssociation[] | undefined {
    return this.props.memberAssociations;
  }

  static create(props: UserProps, id: string) {
    if (!props.createdAt) props.createdAt = new Date();

    return new User(props, id);
  }
}
