import { OnboardingProvider } from './context';
import { OnboardingContent } from './onboarding-content';

export const OnboardingPage = () => {
  // return <Outlet />;
  return (
    <OnboardingProvider>
      <OnboardingContent />
    </OnboardingProvider>
  );
};
