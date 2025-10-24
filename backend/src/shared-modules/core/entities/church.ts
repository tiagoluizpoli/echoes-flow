import { Entity } from './base/entity';

export interface ContactInfo {
  type: 'phone' | 'email';
  maskRegex?: string;
  value: string;
}

export interface Address {
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  state: string;
  city: string;
  zipCode: string;
}

export const subscriptionStatuses = [
  'pending',
  'active',
  'paused',
  'ended',
] as const;

export type SubscriptionStatus = (typeof subscriptionStatuses)[number];

// export const plans = ['starter', 'growth', 'enterprise'] as const;

// export type Plan = (typeof plans)[number];

interface ChurchProps {
  businessName: string;
  slug: string;
  publicName: string;
  cnpj: string;
  description?: string;
  modulePermissions?: string[];
  subscriptionStatus: SubscriptionStatus;
  paymentGatewayCustomerId?: string;
  createdAt?: Date;
  contactInfo?: ContactInfo[];
  address?: Address;
  // plan: Plan;
}

export class Church extends Entity<ChurchProps> {
  private constructor(props: ChurchProps, id?: string) {
    super(props, id);
  }

  get slug(): string {
    return this.props.slug;
  }

  get businessName(): string {
    return this.props.businessName;
  }

  get publicName(): string {
    return this.props.publicName;
  }

  get cnpj(): string {
    return this.props.cnpj;
  }

  get description(): string | undefined {
    return this.props.description;
  }

  get modulePermissions(): string[] | undefined {
    return this.props.modulePermissions;
  }

  get paymentGatewayCustomerId(): string | undefined {
    return this.props.paymentGatewayCustomerId;
  }

  get subscriptionStatus(): SubscriptionStatus {
    return this.props.subscriptionStatus;
  }

  get createdAt(): Date | undefined {
    return this.props.createdAt;
  }

  get contactInfo(): ContactInfo[] | undefined {
    return this.props.contactInfo;
  }

  get address(): Address | undefined {
    return this.props.address;
  }

  static create(props: ChurchProps, id?: string) {
    if (!props.createdAt) props.createdAt = new Date();

    return new Church(props, id);
  }
}
