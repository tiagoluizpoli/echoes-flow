export interface ClerkUserPayload {
  userId: string;
}
// Aumenta o módulo 'express' para incluir nossa nova tipagem.
declare module 'express' {
  export interface Request {
    user: ClerkUserPayload;
  }
}
