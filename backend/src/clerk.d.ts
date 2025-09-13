import type { ClerkPayload } from '@clerk/clerk-sdk-node';

// Aumenta o módulo 'express' para incluir nossa nova tipagem.
declare module 'express' {
  export interface Request {
    user?: ClerkPayload;
  }
}
