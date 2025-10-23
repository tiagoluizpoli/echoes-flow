import { useAuth } from '@clerk/clerk-react';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { httpClient } from '@/core';
import type { CreateChurchParams, CreateChurchResult } from '../dto';

export const startOnboarding = async (
  payload: CreateChurchParams,
  getToken: (options?: any | undefined) => Promise<string | null>,
): Promise<CreateChurchResult> => {
  const token = await getToken();
  const { data } = await httpClient.post('/api/v1/church', payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};

export const useCreateChurchMutation = () => {
  const navigate = useNavigate();
  const { getToken } = useAuth();
  const mutation = useMutation<
    CreateChurchResult,
    undefined,
    CreateChurchParams
  >({
    mutationFn: (payload) => startOnboarding(payload, getToken),
    onSuccess: () => {
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
