import { z } from 'zod';

export const createChurchParamsSchema = z.object({
  organization: z.object({
    organizationName: z
      .string()
      .min(2, 'Nome da igreja deve ter pelo menos 2 caracteres'),
    publicName: z
      .string()
      .min(2, 'Nome público deve ter pelo menos 2 caracteres'),
    cnpj: z.string().length(14, 'CNPJ deve ter 14 dígitos'),
  }),
  contactInfo: z
    .array(
      z.object({
        type: z.enum(['phone', 'email']),
        value: z.string(),
      }),
    )
    .min(1, 'Pelo menos um contato deve ser fornecido'),
  pastor: z.union([
    z.boolean(),
    z.object({ name: z.string(), email: z.email() }),
  ]),
  email: z.email('Email inválido'),
  phone: z.string().min(10, 'Telefone deve ter pelo menos 10 dígitos'),
  address: z.string().min(5, 'Endereço deve ter pelo menos 5 caracteres'),
  city: z.string().min(2, 'Cidade deve ter pelo menos 2 caracteres'),
  state: z.string().min(2, 'Estado deve ter pelo menos 2 caracteres'),
  description: z.string().optional(),
  plan: z.union([
    z.literal('starter'),
    z.literal('growth'),
    z.literal('enterprise'),
  ]),
});

export type CreateChurchParams = z.infer<typeof createChurchParamsSchema>;

export interface CreateChurchResult {
  paymentUrl: string;
}
