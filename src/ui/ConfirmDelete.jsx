import styled from 'styled-components';
import Button from './Button';
import Heading from './Heading';

const StyledConfirmDelete = styled.div`
  width: 40rem;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  padding: 3.2rem 1.2rem;

  & p {
    color: var(--color-grey-500);
    margin-bottom: 1.2rem;
  }

  & div {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }

  & span {
    font-weight: 600;
  }

  @media (max-width: 28rem) {
    width: 30rem;
    padding: 2.4rem 0.8rem;
  }
`;

function ConfirmDelete({ resourceName, onConfirm, disabled, onClose }) {
  return (
    <StyledConfirmDelete>
      <Heading as="h3">
        Delete <span>{resourceName}</span>
      </Heading>
      <p>
        Are you sure you want to delete {resourceName} permanently? This action
        cannot be undone.
      </p>

      <div>
        <Button type="tertiary" disabled={disabled} onClick={onClose}>
          Cancel
        </Button>
        <Button type="danger" disabled={disabled} onClick={onConfirm}>
          Delete
        </Button>
      </div>
    </StyledConfirmDelete>
  );
}

export default ConfirmDelete;
