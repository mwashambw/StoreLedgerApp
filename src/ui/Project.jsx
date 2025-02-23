import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';
import Row from './Row';
import Heading from './Heading';
import { HiPencil, HiTrash } from 'react-icons/hi2';
import { useState } from 'react';
import Modal from './Modal';
import EditItemForm from './EditItemForm';
import EditProjectForm from './EditProjectForm';
import ConfirmDelete from './ConfirmDelete';
import { HiArrowNarrowRight } from 'react-icons/hi';
import { deleteProject } from '../services/apiProjects';
import { useDelete } from '../hooks/useDelete';
import toast from 'react-hot-toast';
import { useQueryClient } from '@tanstack/react-query';

const StyledProject = styled.div`
  display: grid;
  grid-template-columns: 1fr 0.5fr 0.5fr 0.5fr;
  /* display: flex;
  justify-content: space-between; */
  align-items: start;
  border-bottom: 1px solid var(--color-grey-200);
  /* background-color: var(--color-grey-100); */
  background-color: var(--color-grey-50);
  padding: 3.2rem 2.4rem;
  &:nth-child(odd) {
    background-color: var(--color-grey-100);
  }

  @media (max-width: 42rem) {
    padding: 2.4rem 1.2rem;
    grid-template-columns: 1fr 0.5fr 0.5fr;
    grid-template-rows: 1fr 1fr;
  }
`;

const NewRow = styled(Row)`
  gap: 4.8rem;
  @media (max-width: 42rem) {
    grid-row: 1/-1;
    gap: 3.2rem;
  }
`;

const Status = styled.div`
  justify-self: center;
  padding: 0.2rem 1.2rem;
  border-radius: var(--border-radius-vlg);
  color: var(--color-grey-100);

  ${(props) =>
    props.status === 'building' &&
    css`
      background-color: var(--color-brand-200);
      color: var(--color-grey-700);
    `}
  ${(props) =>
    props.status === 'completed' &&
    css`
      background-color: var(--color-green-700);
    `}
  ${(props) =>
    props.status === 'awaiting' &&
    css`
      background-color: var(--color-red-200);

      color: var(--color-silver-700);
    `}

    @media (max-width: 42rem) {
    /* padding: 3.2rem 1.2rem; */
    grid-row: 2;
    grid-column: 2/-1;
    align-self: end;
    justify-self: end;
  }

  @media (max-width: 25rem) {
    font-size: 1.4rem;
  }
`;

const UpdateProject = styled.div`
  display: flex;
  /* flex-direction: column; */
  gap: 1.2rem;

  & button {
    border: none;
    /* padding: 0; */
    background-color: transparent;
    display: flex;
    align-items: center;
    gap: 1.2rem;
    padding: 0.6rem 0.8rem;
    border-radius: var(--border-radius-sm);
    border: 1px solid var(--color-grey-400);
  }
  & button:first-child {
    background-color: var(--color-grey-200);
  }

  & button:hover {
    background-color: var(--color-grey-200);
  }
  & button:focus {
    outline: none;
  }

  @media (max-width: 25rem) {
    font-size: 1.4rem;
  }
`;

const ItemsNumber = styled.p`
  justify-self: center;
  @media (max-width: 25rem) {
    font-size: 1.4rem;
  }
  & span {
    font-weight: 500;
  }
`;

const ProjectLink = styled(Link)`
  justify-self: end;
  display: flex;
  align-items: center;
  gap: 1.2rem;

  @media (max-width: 42rem) {
    gap: 0.6rem;
  }
  /* font-weight: 700; */
  /* transition: all 0.3s; */
  color: var(--color-brand-500);
  &:hover {
    opacity: 0.7;
  }

  &:hover svg {
    /* font-weight: 700; */
    transform: translateX(50%);
  }

  @media (max-width: 25rem) {
    font-size: 1.4rem;
  }
`;

function Project({ projectName, items, status, id, year }) {
  const [isEdit, setIsEdit] = useState(false);
  const [isDelete, setIsDelete] = useState(false);

  const { isPending, deleteDocument } = useDelete(deleteProject);

  const queryClient = useQueryClient();

  const onConfirm = () =>
    deleteDocument(id, {
      onSuccess: () => {
        toast.success('Project deleted successfully');
        setIsDelete(false);
        queryClient.invalidateQueries({
          queryKey: ['user'],
        });
      },
      onError: (error) => {
        toast.error(`Error in deleting project. ${error.message}`);
      },
    });

  return (
    <StyledProject>
      <NewRow type="vertical">
        <Heading as="h4">{projectName}</Heading>

        <UpdateProject>
          <button onClick={() => setIsEdit(true)}>
            <HiPencil /> Edit
          </button>

          <button onClick={() => setIsDelete(true)}>
            <HiTrash /> Delete
          </button>
        </UpdateProject>

        {isEdit && (
          <Modal onClose={() => setIsEdit(false)}>
            <EditProjectForm
              projectName={projectName}
              status={status}
              year={year}
              onClose={() => setIsEdit(false)}
              id={id}
            />
          </Modal>
        )}

        {isDelete && (
          <Modal onClose={() => setIsDelete(false)}>
            <ConfirmDelete
              resourceName={`${projectName} project`}
              onConfirm={onConfirm}
              onClose={() => setIsDelete(false)}
              disabled={isPending}
            />
          </Modal>
        )}
      </NewRow>

      <Status status={`${status}`}>
        {status.slice(0, 1).toUpperCase()}
        {status.slice(1)}
      </Status>
      <ItemsNumber>
        <span>{items.length}</span> Items
      </ItemsNumber>
      <ProjectLink to={`/project/${id}`}>
        Details <HiArrowNarrowRight />
      </ProjectLink>
    </StyledProject>
  );
}

export default Project;
