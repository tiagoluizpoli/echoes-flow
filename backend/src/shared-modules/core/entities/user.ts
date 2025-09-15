import { Entity } from './base/entity';

interface UserProps {
  name: string;
  email: string;
  createdAt?: Date;
  deletedAt?: Date;
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

  get deletedAt(): Date | undefined {
    return this.props.deletedAt;
  }

  static create(props: UserProps, id: string) {
    if (!props.createdAt) props.createdAt = new Date();

    return new User(props, id);
  }
}
