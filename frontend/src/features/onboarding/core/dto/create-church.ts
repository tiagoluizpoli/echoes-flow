import { z } from 'zod';
import { validateCnpjFormat } from '@/core';

export const createChurchParamsSchema = z.object({
  businessName: z
    .string()
    .min(2, 'Nome da igreja deve ter pelo menos 2 caracteres'),
  publicName: z
    .string()
    .min(2, 'Nome público deve ter pelo menos 2 caracteres'),
  cnpj: z
    .string()
    .length(14, 'CNPJ deve ter 14 dígitos')
    .refine((cnpj) => validateCnpjFormat(cnpj), 'CNPJ inválido'),
  description: z.string().optional(),
  contactInfo: z
    .array(
      z.object({
        type: z.enum(['phone', 'email']),
        value: z.string().min(1, 'Contato deve ser fornecido'),
      }),
    )
    .min(1, 'Pelo menos um contato deve ser fornecido'),

  address: z.object({
    street: z.string().min(5, 'Rua deve ter pelo menos 5 caracteres'),
    number: z.string().min(1, 'Número deve ser fornecido'),
    complement: z.string().optional(),
    neighborhood: z.string().min(2, 'Bairro deve ter pelo menos 2 caracteres'),
    state: z.string().length(2, 'Estado deve ser um UF válido'),
    city: z.string().min(2, 'Cidade deve ter pelo menos 2 caracteres'),
    zipCode: z.string().length(8, 'CEP deve ter 8 dígitos'),
  }),
});

export type CreateChurchParams = z.infer<typeof createChurchParamsSchema>;

export interface CreateChurchResult {
  paymentUrl: string;
}
