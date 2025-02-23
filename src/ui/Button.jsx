import styled, { css } from 'styled-components';

const StyledButton = styled.button`
  padding: 0.6rem 1.2rem;
  border: 1px solid var(--color-grey-500);
  border-radius: var(--border-radius-sm);

  display: flex;
  align-items: center;
  gap: 0.6rem;

  @media (max-width: 36rem) {
    font-size: 1.4rem;
    padding: 0.6rem 0.4rem;
    gap: 0.1rem;
  }
  /* justify-content: center; */
  /* justify-content: space-between; */

  &:hover {
    background-color: var(--color-grey-50);
  }

  ${(props) =>
    props.variation === 'primary' &&
    css`
      background-color: var(--color-brand-500);
      color: var(--color-brand-50);

      &:hover {
        /* color: var(--color-grey-800); */
        background-color: var(--color-brand-600);
      }
    `}
  ${(props) =>
    props.variation === 'secondary' &&
    css`
      background-color: var(--color-brand-200);
    `}
  ${(props) =>
    props.variation === 'tertiary' &&
    css`
      color: var(--color-grey-600);
      background: var(--color-grey-0);
      border: 1px solid var(--color-grey-200);

      &:hover {
        background-color: var(--color-grey-50);
      }
    `}
  ${(props) =>
    props.variation === 'danger' &&
    css`
      color: var(--color-red-100);
      background-color: var(--color-red-700);

      &:hover {
        background-color: var(--color-red-800);
      }
    `}
`;

function Button({ onClick, children, type, role = '', disabled }) {
  return (
    <StyledButton
      onClick={onClick}
      variation={type}
      type={role}
      disabled={disabled}
    >
      {children}
    </StyledButton>
  );
}

export default Button;
