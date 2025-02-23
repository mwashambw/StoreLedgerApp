import { createContext, useState } from 'react';

export const ItemsContext = createContext();

function ItemsProvider({ children }) {
  const [openModal, setOpenModal] = useState('');
  return (
    <ItemsContext.Provider value={{ openModal, setOpenModal }}>
      {children}
    </ItemsContext.Provider>
  );
}

export default ItemsProvider;

// export default ItemsProvider;
