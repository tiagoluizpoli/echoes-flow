import { createContext, useContext } from 'react';
import { type UseFormReturn } from 'react-hook-form';
import type { CreateChurchParams } from '../core';

interface OnboardingContextType {
  form: UseFormReturn<CreateChurchParams>;
  onSubmit: (data: CreateChurchParams) => void;
}
export const OnboardingContext = createContext<
  OnboardingContextType | undefined
>(undefined);

export const useOnboarding = () => {
  const context = useContext(OnboardingContext);

  if (context === undefined) {
    throw new Error(
      'useOnboarding deve ser usado dentro de um OnboardingProvider',
    );
  }

  return context;
};
