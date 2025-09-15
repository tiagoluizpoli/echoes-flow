import { Entity } from './base/entity';

export const subscriptionStatuses = [
  'pending',
  'active',
  'paused',
  'ended',
] as const;

export type SubscriptionStatus = (typeof subscriptionStatuses)[number];

interface OrganizationProps {
  name: string;
  subscriptionStatus: SubscriptionStatus;
  modulePermissions: string[];
  stripeCustomerId: string;
  createdAt?: Date;
}

export class Organization extends Entity<OrganizationProps> {
  private constructor(props: OrganizationProps, id?: string) {
    super(props, id);
  }

  get name(): string {
    return this.props.name;
  }

  get subscriptionStatus(): SubscriptionStatus {
    return this.props.subscriptionStatus;
  }

  get modulePermissions(): string[] {
    return this.props.modulePermissions;
  }

  get stripeCustomerId(): string {
    return this.props.stripeCustomerId;
  }

  get createdAt(): Date | undefined {
    return this.props.createdAt;
  }

  static create(props: OrganizationProps, id?: string) {
    if (!props.createdAt) props.createdAt = new Date();

    return new Organization(props, id);
  }
}
