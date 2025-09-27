import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import type { CreateChurchParams, CreateChurchResult } from '../dto';

export const startOnboarding = async (
  payload: CreateChurchParams,
): Promise<CreateChurchResult> => {
  //   throw new Error('Function not implemented.');

  // const { data } = await httpClient.post('/route', payload);

  // return data;

  await new Promise((resolve) => setTimeout(resolve, 2000));
  return {
    paymentUrl: 'https://google.com/',
  };
};

export const useCreateChurchMutation = () => {
  const navigate = useNavigate();
  const mutation = useMutation<
    CreateChurchResult,
    undefined,
    CreateChurchParams
  >({
    mutationFn: startOnboarding,
    onSuccess: (response) => {
      toast.success(
        'Igreja criada com sucesso! Redirecionando para pagamento...',
      );
      // window.location.href = response.paymentUrl;
      navigate('/onboarding/completed');
    },
    onError: (err) => {
      toast.error('Erro ao criar igreja');
      console.error(err);
    },
  });

  return { ...mutation };
};
