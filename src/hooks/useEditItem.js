import { useMutation } from '@tanstack/react-query';

import { editItem as editItemApi } from '../services/apiItems';

export function useEditItem() {
  const { isPending, mutate: editItem } = useMutation({
    mutationFn: editItemApi,
  });

  return { isPending, editItem };
}
