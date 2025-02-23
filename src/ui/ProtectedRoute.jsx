import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useCurrentUser } from '../hooks/useCurrentUser';
import Spinner from './Spinner';

function ProtectedRoute({ children }) {
  const navigate = useNavigate();

  // Get the logged in user from localStorage
  const { isLoading, currentUser } = useCurrentUser();

  // If there is no logged in user direct to the /login page
  useEffect(
    function () {
      if (!currentUser && !isLoading) navigate('/login');
    },
    [navigate, currentUser, isLoading]
  );

  if (isLoading) {
    return <Spinner />;
  }

  if (currentUser) {
    return children;
  }
}

export default ProtectedRoute;
