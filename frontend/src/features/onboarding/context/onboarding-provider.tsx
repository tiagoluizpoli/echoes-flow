import { zodResolver } from '@hookform/resolvers/zod';
import { type ReactNode } from 'react';
import { useForm } from 'react-hook-form';
import {
  type CreateChurchParams,
  createChurchParamsSchema,
  useCreateChurchMutation,
} from '../core';
import { OnboardingContext } from './onboarding-context';

export const OnboardingProvider = ({ children }: { children: ReactNode }) => {
  const { mutateAsync } = useCreateChurchMutation();
  const form = useForm<CreateChurchParams>({
    resolver: zodResolver(createChurchParamsSchema),
    mode: 'onBlur',
    defaultValues: {
      businessName: '',
      publicName: '',
      cnpj: '',
      description: '',
      contactInfo: [
        {
          type: 'phone',
          value: '',
        },
      ],
      address: {
        street: '',
        number: '',
        complement: '',
        neighborhood: '',
        state: '',
        city: '',
        zipCode: '',
      },
    },
  });

  const onSubmit = async (values: CreateChurchParams) => {
    console.log('Dados da igreja:', values);
    await mutateAsync(values);
  };

  return (
    <OnboardingContext.Provider
      value={{
        form,
        onSubmit,
      }}
    >
      {children}
    </OnboardingContext.Provider>
  );
};
