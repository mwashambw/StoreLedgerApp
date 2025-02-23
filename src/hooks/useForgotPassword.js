import { useMutation } from '@tanstack/react-query';
import { forgotPassword as forgotPasswordApi } from '../services/auth';
import toast from 'react-hot-toast';

export default function useForgotPassword() {
  const { isPending, mutate: forgotPassword } = useMutation({
    mutationFn: forgotPasswordApi,
    onSuccess: (res) => {
      toast.success(res.message);
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { isPending, forgotPassword };
}
