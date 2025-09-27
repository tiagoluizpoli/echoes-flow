import { zodResolver } from '@hookform/resolvers/zod';
import { type ReactNode, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  type CreateChurchParams,
  createChurchParamsSchema,
  useCreateChurchMutation,
} from '../core';
import { OnboardingContext } from './onboarding-context';

export const OnboardingProvider = ({ children }: { children: ReactNode }) => {
  const [step, setStep] = useState(1);

  const { mutateAsync } = useCreateChurchMutation();
  const form = useForm<CreateChurchParams>({
    resolver: zodResolver(createChurchParamsSchema),
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

  const onSubmit = async (values: CreateChurchParams) => {
    console.log('Dados da igreja:', values);
    await mutateAsync(values);
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
