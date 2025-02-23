import { HiOutlineMagnifyingGlass, HiOutlineXMark } from 'react-icons/hi2';
import styled from 'styled-components';
import Button from './Button';
import { useEffect, useState } from 'react';

const StyledSearch = styled.div`
  border-radius: var(--border-radius-sm);
  border: 1px solid var(--color-grey-400);
  padding: 0.6rem 1.6rem;
  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 30rem;

  &:has(input:focus) {
    outline: 2px solid var(--color-brand-600);
    outline-offset: -1px;
  }

  @media (max-width: 36rem) {
    width: 13rem;
    padding: 0.3rem 0.6rem 0.3rem 0.8rem;
    font-size: 1.4rem;
  }
`;
const Input = styled.input`
  border: none;
  background-color: transparent;
  width: 100%;

  &:focus {
    border: none;
    outline: none;
  }
`;

const ClearButton = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.2rem;
  border-radius: var(--border-radius-tiny);

  &:hover {
    background-color: var(--color-grey-200);
  }
`;

function Search({ items, setItemsToRender }) {
  const [query, setQuery] = useState('');

  useEffect(
    function () {
      setItemsToRender(
        items.filter((item) =>
          item.itemName.toLowerCase().includes(query.toLowerCase())
        )
      );
    },
    [items, query, setItemsToRender]
  );

  return (
    <StyledSearch>
      {/* <HiOutlineMagnifyingGlass /> */}
      <Input
        placeholder="Search item"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <ClearButton onClick={() => setQuery('')}>
        <HiOutlineXMark />
      </ClearButton>
    </StyledSearch>
  );
}

export default Search;
