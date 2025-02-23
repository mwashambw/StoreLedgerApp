import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { createItem as createItemApi } from '../services/apiItems';

export function useCreateItem(onClose) {
  const queryClient = useQueryClient();

  const { isPending, mutate: createItem } = useMutation({
    mutationFn: createItemApi,
    onSuccess: () => {
      toast.success('Item created successfully');
      queryClient.invalidateQueries({
        queryKey: ['project'],
      });
      onClose();
    },
    onError: (error) => {
      toast.error(`${error.message}`);
    },
  });

  return { isPending, createItem };
}
