export interface ClerkUserPayload {
  // O ID do usuário autenticado
  sub: string;
  // A organização à qual o usuário pertence
  org_id?: string;
  // Outras informações relevantes do token
  [key: string]: any;
}
// Aumenta o módulo 'express' para incluir nossa nova tipagem.
declare module 'express' {
  export interface Request {
    user?: ClerkUserPayload;
  }
}
