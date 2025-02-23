import { useMutation } from '@tanstack/react-query';
// import toast from 'react-hot-toast';

export function useDelete(deleteFn) {
  const { isPending, mutate: deleteDocument } = useMutation({
    mutationFn: deleteFn,
  });

  return { isPending, deleteDocument };
}
