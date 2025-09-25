import { OnboardingProvider } from './context';
import { OnboardingContent } from './onboarding-content';

export const OnboardingPage = () => {
  return (
    <OnboardingProvider>
      <OnboardingContent />
    </OnboardingProvider>
  );
};
