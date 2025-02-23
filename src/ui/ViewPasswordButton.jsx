import styled from 'styled-components';

const ViewPasswordButton = styled.div`
  margin-left: auto;
  cursor: pointer;

  border-radius: 3px;
  padding: 1.5px;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    background-color: var(--color-grey-200);
  }
`;

export default ViewPasswordButton;
