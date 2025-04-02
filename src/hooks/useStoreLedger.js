import { useMutation, useQuery } from '@tanstack/react-query';
import { getStoreLedger as getStoreLedgerApi } from '../services/apiProjects';
import toast from 'react-hot-toast';

const triggerLedgerDownload = (response, projectName = 'store ledger') => {
  const blob = new Blob([response.data], {
    type: response.headers['content-type'],
  });
  const link = document.createElement('a');

  link.href = window.URL.createObjectURL(blob);
  link.download = `${projectName.toUpperCase()}.docx`;

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export function useStoreLedger(projectName) {
  const { isPending, mutate: getStoreLedger } = useMutation({
    mutationFn: getStoreLedgerApi,
    onSuccess: (response) => {
      // Trigger file download
      triggerLedgerDownload(response, projectName);
      // Nofity the user
      toast.success('Store ledger created successfully');
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { isPending, getStoreLedger };
}
