import styled from 'styled-components';
import Heading from './Heading';

const StyledFooter = styled.footer`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  /* background-color: red; */
  /* margin-top: auto; */
`;

function Footer() {
  return (
    <StyledFooter>
      <p>Designed by G.M Burton</p>
      <p> &copy; 2025</p>
    </StyledFooter>
  );
}

export default Footer;
