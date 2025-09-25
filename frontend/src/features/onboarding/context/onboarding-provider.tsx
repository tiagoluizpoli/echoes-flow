import { zodResolver } from '@hookform/resolvers/zod';
import { type ReactNode, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { OnboardingContext } from './onboarding-context';

export const createChurchSchema = z.object({
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

export type CreateChurchData = z.infer<typeof createChurchSchema>;

export const OnboardingProvider = ({ children }: { children: ReactNode }) => {
  const [step, setStep] = useState(1);

  const form = useForm<CreateChurchData>({
    resolver: zodResolver(createChurchSchema),
    defaultValues: {
      //   churchName: '',
      //   pastorName: '',
      //   email: '',
      //   phone: '',
      //   address: '',
      //   city: '',
      //   state: '',
      //   members: '',
      //   description: '',
      churchName: 'Igreja da Restauração',
      pastorName: 'Reinaldo Fantin',
      email: 'teste@teste.com',
      phone: '11952066658',
      address: 'Rua das Flores, 123',
      city: 'Cotia',
      state: 'SP',
      description: '',
      plan: 'growth',
    },
  });

  const onSubmit = async (values: CreateChurchData) => {
    try {
      // Aqui você fará a integração com o backend para criar a organização
      console.log('Dados da igreja:', values);

      // Simular criação da organização e redirecionamento para pagamento
      await new Promise((resolve) => setTimeout(resolve, 2000));

      toast.success(
        'Igreja criada com sucesso! Redirecionando para pagamento...',
      );

      // Aqui você redirecionaria para o Stripe Checkout
      // window.location.href = stripeCheckoutUrl;
    } catch (error) {
      console.error(error);
      toast.error('Erro ao criar igreja. Tente novamente.');
    }
  };

  return (
    <OnboardingContext.Provider
      value={{
        step,
        setStep,
        form,
        onSubmit,
      }}
    >
      {children}
    </OnboardingContext.Provider>
  );
};
