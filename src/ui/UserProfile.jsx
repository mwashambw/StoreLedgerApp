import styled from 'styled-components';
import { useCurrentUser } from '../hooks/useCurrentUser';

const StyledUserProfile = styled.div`
  display: flex;
  gap: 1.2rem;
  align-items: center;
  /* margin-right: 2rem; */

  & img {
    height: 6rem;
    width: 6rem;
    border-radius: 50%;
    border: 1px solid var(--color-brand-200);
  }

  & p {
    font-weight: 500;
  }
`;
function UserProfile() {
  const { isLoading, currentUser } = useCurrentUser();
  const userName = currentUser?.data?.user?.name?.split(' ')[0];
  return (
    <>
      {isLoading && (
        <StyledUserProfile>
          <img src="/default.jpg"></img>
        </StyledUserProfile>
      )}
      {!isLoading && (
        <StyledUserProfile>
          <img src="/default.jpg"></img>
          <p>{userName}</p>
        </StyledUserProfile>
      )}
    </>
  );
}

export default UserProfile;
