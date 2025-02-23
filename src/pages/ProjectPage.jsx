import styled from 'styled-components';
import Heading from '../ui/Heading';
import Search from '../ui/Search';
import Row from '../ui/Row';
import Items from '../ui/Items';
import Button from '../ui/Button';
import { useEffect, useMemo, useState } from 'react';
import ItemForm from '../ui/ItemForm';
import Modal from '../ui/Modal';
import Spinner from '../ui/Spinner';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getProject } from '../services/apiProjects';
import { useStoreLedger } from '../hooks/useStoreLedger';
import { HiMiniPlus } from 'react-icons/hi2';
import SpinnerMini from '../ui/SpinnerMini';

const StyledProject = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  /* align-items: flex-start; */
`;

const ProjectName = styled.p`
  font-size: 2.4rem;
  font-weight: 700;
  /* text-align: center; */
  text-transform: uppercase;
  margin-bottom: 1.6rem;

  @media (max-width: 36rem) {
    font-size: 1.8rem;
    /* display: flex;
    flex-direction: column; */
  }
`;

const NewRow = styled(Row)`
  margin-bottom: 1.6rem;
  /* gap: 0.6rem; */
`;

const ItemsNumber = styled.div`
  font-size: 1.8rem;

  & span {
    font-weight: 600;
  }

  @media (max-width: 36rem) {
    font-size: 1.4rem;
    /* display: flex;
    flex-direction: column; */
  }
`;

const StoreLedgerButton = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1.6rem;
`;

function Project() {
  const { id } = useParams();

  const [itemsToRender, setItemsToRender] = useState([]);

  const { isLoading, data } = useQuery({
    queryFn: () => getProject(id),
    queryKey: ['project'],
  });

  // const { project } = data.data;

  const items = useMemo(() => {
    return data?.data?.project?.items || [];
  }, [data?.data?.project?.items]);
  const projectName = data?.data?.project?.projectName;

  useEffect(
    function () {
      setItemsToRender(items);
    },
    [items]
  );

  const { isPending, getStoreLedger } = useStoreLedger(
    data?.data?.project?.projectName
  );

  const [openAddItemForm, setOpenAddItemForm] = useState(false);
  if (isLoading) {
    return <Spinner />;
  }

  const handleLedgerDownload = () => {
    getStoreLedger(id);
  };

  // const itemsToRender = [];
  return (
    <StyledProject>
      <ProjectName>{projectName}</ProjectName>
      <NewRow type="horizontal">
        <ItemsNumber>
          ITEMS #: <span>{items.length}</span>
        </ItemsNumber>
        {/* <ItemsNumber>
          Total Items: <span>{items.length}</span>
        </ItemsNumber> */}
        <Search items={items} setItemsToRender={setItemsToRender} />
        <Button type="primary" onClick={() => setOpenAddItemForm(true)}>
          <HiMiniPlus /> New Item
        </Button>

        {openAddItemForm && (
          <Modal onClose={() => setOpenAddItemForm(false)}>
            <ItemForm onClose={() => setOpenAddItemForm(false)} />
          </Modal>
        )}
      </NewRow>
      <Items items={itemsToRender} />

      <StoreLedgerButton>
        <Button
          type="primary"
          disabled={isPending || items.length === 0}
          onClick={handleLedgerDownload}
        >
          {isPending ? (
            <>
              <SpinnerMini /> <span>Downloading...</span>
            </>
          ) : (
            'Get Store Ledger'
          )}
        </Button>
      </StoreLedgerButton>
    </StyledProject>
  );
}

export default Project;
