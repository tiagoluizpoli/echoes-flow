import { useUser } from '@clerk/clerk-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export const MainPage = () => {
  const { isSignedIn } = useUser();
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-4">
      <h1>Main Page</h1>
      <p>Bem-vindo à página principal!</p>
      <p>Essa página virá a ser a landing page</p>
      <Button>
        {isSignedIn ? (
          <Link to="/dashboard">Dashboard</Link>
        ) : (
          <Link to="/sign-in">Signin</Link>
        )}
      </Button>
    </div>
  );
};
