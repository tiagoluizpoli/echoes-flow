import { UserPublicMetadata as ClerkUserPublicMetadata } from '@clerk/types';

declare global {
  interface UserPublicMetadata extends ClerkUserPublicMetadata {
    churchs: string[];
  }
}
