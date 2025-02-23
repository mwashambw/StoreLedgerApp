import { useMutation } from '@tanstack/react-query';
import { resetPassword as resetPasswordApi } from '../services/auth';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function useResetPassword() {
  const navigate = useNavigate();
  const { isPending, mutate: resetPassword } = useMutation({
    mutationFn: resetPasswordApi,
    onSuccess: () => {
      toast.success('Your password has been reset successfully');
      // queryClient.setQueryData(['user'], user.user);
      navigate('/dashboard', { replace: true });
    },

    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { isPending, resetPassword };
}
