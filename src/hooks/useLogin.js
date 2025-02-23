import { useMutation, useQueryClient } from '@tanstack/react-query';
import { login as loginApi } from '../services/auth';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { isPending, mutate: login } = useMutation({
    mutationFn: loginApi,
    onSuccess: (user) => {
      toast.success('You have logged in successfully.');
      queryClient.setQueryData(['user'], user.user);
      navigate('/dashboard', { replace: true });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { isPending, login };
}
