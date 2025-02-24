import styled from 'styled-components';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 3.2rem;
  padding: 3.2rem 1.6rem;

  @media (max-width: 55rem) {
    gap: 1.6rem;
    padding: 1.6rem;
  }
`;

export default Form;
