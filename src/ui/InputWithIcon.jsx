import styled from 'styled-components';

const StyledInputWithIcon = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;

  & p {
    color: var(--color-red-700);
  }
`;
const InputWithIconContainer = styled.div`
  border-radius: var(--border-radius-sm);
  border: ${(props) =>
    props.error
      ? '1px solid var(--color-red-700)'
      : '1px solid var(--color-grey-400)'};
  padding: 0.8rem 0.8rem;
  display: flex;
  align-items: center;
  /* justify-content: space-between; */
  gap: 0.8rem;

  /* width: 30rem; */

  &:has(input:focus) {
    outline: 2px solid var(--color-brand-600);
    outline-offset: -1px;
  }
`;

function InputWithIcon({ children, error }) {
  return (
    <StyledInputWithIcon>
      <InputWithIconContainer error={error}>{children}</InputWithIconContainer>
      {error && <p>{error}</p>}
    </StyledInputWithIcon>
  );
}

export default InputWithIcon;
