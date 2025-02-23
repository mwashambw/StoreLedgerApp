import styled from 'styled-components';
import Heading from './Heading';
import UserProfile from './UserProfile';

const StyledHeader = styled.header`
  background-color: var(--color-grey-200);
  padding: 1.2rem 4.8rem;
  @media (max-width: 42rem) {
    padding: 1.2rem 2.4rem;
  }
  @media (max-width: 25rem) {
    padding: 1.2rem;
  }
  border-bottom: 1px solid var(--color-grey-100);
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

function Header() {
  return (
    <StyledHeader>
      <Heading as="h1">StoreLedger</Heading>
      <UserProfile />
    </StyledHeader>
  );
}

export default Header;
