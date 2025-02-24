import styled from 'styled-components';
import Item from './Item';
// import { createContext, useState } from 'react';
import ItemsProvider from '../contexts/ItemsContext';

const StyledItems = styled.div`
  border: 1px solid var(--color-grey-300);
`;

const ItemsHeader = styled.div`
  display: grid;
  /* grid-template-columns: repeat(4, 1fr); */
  grid-template-columns: 2fr 1fr 1fr 1fr 0.5fr;
  text-transform: uppercase;
  background-color: var(--color-grey-200);
  padding: 2.4rem 1.2rem;
  column-gap: 1.2rem;
  font-weight: 600;
  @media (max-width: 36rem) {
    font-size: 1.2rem;
  }
  /* justify-items: center; */
`;

const ItemsBox = styled.div`
  max-height: 60vh;
  min-height: 25vh;
  overflow-y: overlay;
  /* overflow-x: hidden; */

  &::-webkit-scrollbar {
    width: 0px;
  }
`;

const NoItem = styled.p`
  text-align: center;
`;

function Items({ items }) {
  // const [openModal, setOpenModal] = useState('');

  return (
    <ItemsProvider>
      <StyledItems>
        <ItemsHeader>
          <p>Item</p>
          <p>Received</p>
          <p>Used</p>
          <p>Balance</p>
        </ItemsHeader>

        <ItemsBox>
          {items.length > 0 &&
            items.map((item) => {
              return <Item item={item} key={item._id} itemId={item._id} />;
            })}
        </ItemsBox>
      </StyledItems>
      {items.length === 0 && (
        <NoItem>No item has been added for this project</NoItem>
      )}
    </ItemsProvider>
  );
}

export default Items;
