// frontend/src/pages/SignInPage.tsx
import { SignIn } from '@clerk/clerk-react';

const SignInPage = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <SignIn path="/sign-in" routing="path" />
    </div>
  );
};

export default SignInPage;
