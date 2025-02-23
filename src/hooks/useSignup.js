import { useMutation, useQueryClient } from '@tanstack/react-query';
import { signup as signupApi } from '../services/auth';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function useSignup() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { isPending, mutate: signup } = useMutation({
    mutationFn: signupApi,
    onSuccess: (user) => {
      toast.success('Account created successfully');
      queryClient.setQueryData(['user'], user.user);
      navigate('/dashboard', { replace: true });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { isPending, signup };
}
