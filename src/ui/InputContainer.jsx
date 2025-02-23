import styled from 'styled-components';

const StyledInputContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  row-gap: 0.6rem;
  /* overflow: hidden; */
  /* gap: 8rem; */

  & input,
  & select {
    padding: 0.6rem 1.6rem;
    width: 26rem;
    border-radius: var(--border-radius-sm);
    border: 1px solid var(--color-grey-400);
    /* width: 100%; */
  }

  @media (max-width: 55rem) {
    display: flex;
    flex-direction: column;
  }
`;

const ErrorMsg = styled.p`
  color: var(--color-red-700);
  /* grid-column: 1/-1; */
  grid-column: 2;
  /* justify-self: end; */
`;

function InputContainer({ children, error }) {
  return (
    <StyledInputContainer>
      {children}
      {error && <ErrorMsg>{error}</ErrorMsg>}
    </StyledInputContainer>
  );
}

export default InputContainer;

// export default InputContainer;
