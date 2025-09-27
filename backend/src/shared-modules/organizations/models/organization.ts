import { z } from 'zod';

export const createOrganizationSchema = z.object({
  churchName: z
    .string()
    .min(2, 'Nome da igreja deve ter pelo menos 2 caracteres'),
  pastorName: z
    .string()
    .min(2, 'Nome do pastor deve ter pelo menos 2 caracteres'),
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

export type Organization = z.infer<typeof createOrganizationSchema>;

export interface CreateChurchResult {
  paymentUrl: string;
}
