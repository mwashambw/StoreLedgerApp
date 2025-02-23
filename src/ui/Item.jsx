import styled, { css } from 'styled-components';
import MenuModal from './MenuModal';

const StyledItem = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr 0.5fr;
  /* text-transform: uppercase;
  background-color: var(--color-grey-200); */
  padding: 2rem 1.2rem;
  column-gap: 1.2rem;
  position: relative;
  @media (max-width: 36rem) {
    p {
      font-size: 1.4rem;
    }
  }

  &:nth-child(odd) {
    background-color: var(--color-grey-100);
  }

  ${(props) =>
    props.balance === 0 &&
    css`
      & p,
      & div:not(:last-child) {
        opacity: 0.3;
      }
      /* opacity: 0.2; */
      /* background-color: var(--color-grey-300); */
      /* opacity: 0.5; */
    `}
`;

const BalanceText = styled.p`
  color: var(--color-green-700);
`;
const ItemName = styled.div`
  font-size: 1.8rem;
  @media (max-width: 36rem) {
    font-size: 1.4rem;
  }
`;

function Item({ item }) {
  const itemName = item.itemName;
  const recieved = item.orders.at(-1).receivedQuantity;
  const balance = item.orders.at(-1).currentQuantity;
  const itemId = item._id;
  return (
    <StyledItem balance={balance}>
      <ItemName>{itemName}</ItemName>
      <p>{recieved}</p>
      <p>{recieved - balance}</p>
      <BalanceText>{balance === 0 ? '-' : balance}</BalanceText>

      <MenuModal itemId={itemId} item={item} balance={balance} />
    </StyledItem>
  );
}

export default Item;
