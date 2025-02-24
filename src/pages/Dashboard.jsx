import styled from 'styled-components';
import Heading from '../ui/Heading';
import { Link } from 'react-router-dom';
import Button from '../ui/Button';
import Row from '../ui/Row';
import Ul from '../ui/UnOrder';
import Project from '../ui/Project';
import ProjectForm from '../ui/ProjectForm';

import { useQuery } from '@tanstack/react-query';
import { getProjects } from '../services/apiProjects';
import Spinner from '../ui/Spinner';
import { HiMiniPlus } from 'react-icons/hi2';
import Modal from '../ui/Modal';
import { useState } from 'react';
import { useCurrentUser } from '../hooks/useCurrentUser';

const StyledDashboard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3.6rem;
`;

// const ProjectList = styled.li`
//   border: 1px solid var(--color-grey-300);
//   padding: 2.4rem;
//   border-radius: var(--border-radius-sm);

//   & p {
//     margin-top: 1.6rem;
//   }
// `;

const ProjectsContainer = styled.div`
  display: flex;
  flex-direction: column;
  /* gap: 3.2rem; */
  border: 1px solid var(--color-grey-300);
  /* border-top: 2px solid var(--color-grey-200); */
`;

const ProjectNumber = styled.p`
  & span {
    font-weight: 600;
  }
`;

const NoProjectsMessage = styled.div`
  padding: 3.2rem;
  text-align: center;
`;

const DashBoardHeader = styled(Heading)`
  @media (max-width: 36rem) {
    font-size: 1.8rem;
    /* display: flex;
    flex-direction: column; */
  }
`;

function Dashboard() {
  const [openModal, setOpenModal] = useState(false);
  const { isLoading, currentUser } = useCurrentUser();
  // const { isLoading, data, error } = useQuery({
  //   queryKey: ['projects'],
  //   queryFn: getProjects,
  // });

  // console.log(currentUser.data.currentUser.projects);

  if (isLoading) {
    return <Spinner />;
  }

  // const {
  //   data: { projects },
  // } = data;
  const projects = currentUser.data.user.projects;
  return (
    <StyledDashboard>
      <DashBoardHeader>PROJECTS</DashBoardHeader>
      <Row type="horizontal">
        <ProjectNumber>
          Total Projects: <span>{projects.length}</span>
        </ProjectNumber>
        <Button type="primary" onClick={() => setOpenModal(true)}>
          <HiMiniPlus /> New Project
        </Button>
        {openModal && (
          <Modal onClose={() => setOpenModal(false)}>
            <ProjectForm onClose={() => setOpenModal(false)} />
          </Modal>
        )}
      </Row>
      {projects.length === 0 && (
        <NoProjectsMessage>No Project Found</NoProjectsMessage>
      )}

      {projects.length > 0 && (
        <ProjectsContainer>
          {projects.map((project) => {
            return (
              <Project
                projectName={project.projectName}
                status={project.status}
                id={project._id}
                items={project.items}
                year={project.year}
                key={project._id}
              />
            );
          })}
        </ProjectsContainer>
      )}
    </StyledDashboard>
  );
}

export default Dashboard;
