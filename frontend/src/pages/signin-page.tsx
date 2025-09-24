// frontend/src/pages/SignInPage.tsx
import { SignIn } from '@clerk/clerk-react';

const SignInPage = () => {
  return (
    <div className="flex min-h-screen items-center justify-center w-full">
      <SignIn
        signUpForceRedirectUrl={'/dashboard'}
        forceRedirectUrl={'/dashboard'}
      />
    </div>
  );
};

export default SignInPage;
