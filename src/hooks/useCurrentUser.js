// import { useEffect } from 'react';

import { useQuery } from '@tanstack/react-query';
import { getCurrentUser } from '../services/auth';

export function useCurrentUser() {
  // const currentUser = JSON.parse(localStorage.getItem('auth-user'));
  const { isLoading, data: currentUser } = useQuery({
    queryKey: ['user'],
    queryFn: getCurrentUser,
  });

  return { isLoading, currentUser };

  // return currentUser;
}
