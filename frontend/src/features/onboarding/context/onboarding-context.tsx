import { createContext, useContext } from 'react';
import { type UseFormReturn } from 'react-hook-form';
import type { CreateChurchData } from './onboarding-provider';

interface OnboardingContextType {
  step: number;
  setStep: (value: number) => void;
  form: UseFormReturn<CreateChurchData>;
  onSubmit: (data: CreateChurchData) => void;
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
