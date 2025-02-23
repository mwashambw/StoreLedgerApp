import { useContext, useEffect, useRef, useState } from 'react';
import {
  HiMiniArrowUpTray,
  HiMiniEllipsisVertical,
  HiOutlinePlus,
  HiPencil,
  HiPlus,
  HiTrash,
} from 'react-icons/hi2';
import Modal from './Modal';
import EditItemForm from './EditItemForm';
import IssueItemForm from './IssueItemForm';
import ConfirmDelete from './ConfirmDelete';
import styled from 'styled-components';
import { ItemsContext } from '../contexts/ItemsContext';
import { useDelete } from '../hooks/useDelete';
import { deleteItem } from '../services/apiItems';
import { useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import OrderForm from './OrderForm';

const UpdateItems = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: absolute;
  right: 1%;
  z-index: 1000;
  background-color: #fff;
  box-shadow: var(--shadow-lg);

  gap: 1.2rem;
  padding: 0.8rem 0.6rem;

  /* background-color: red; */
  border-radius: var(--border-radius-sm);
  /* overflow: hidden; */
  /* padding: 0.4rem; */

  & button {
    border: none;
    /* padding: 0; */
    background-color: transparent;
    display: flex;
    align-items: center;
    gap: 2.4rem;
    padding: 0.4rem 0.6rem;
    border-radius: var(--border-radius-sm);
  }

  & button:hover {
    background-color: var(--color-grey-200);
  }
  & button:focus {
    outline: none;
  }
`;
const EllipsisContainer = styled.div`
  cursor: pointer;
`;
function MenuModal({ itemId, item, balance }) {
  const [isEdit, setIsEdit] = useState(false);
  const [isIssue, setIsIssue] = useState(false);
  const [isOrder, setIsOrder] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const { openModal, setOpenModal } = useContext(ItemsContext);
  const ref = useRef();

  const queryClient = useQueryClient();
  const { isPending, deleteDocument } = useDelete(deleteItem);
  const id = item._id;

  const onConfirm = () =>
    deleteDocument(id, {
      onSuccess: () => {
        toast.success('Item deleted successfully');
        setIsDelete(false);
        queryClient.invalidateQueries({
          queryKey: ['project'],
        });
      },
      onError: (error) => {
        toast.error(`Error in deleting item. ${error.message}`);
      },
    });

  useEffect(
    function () {
      const handleOutsideClick = (e) => {
        if (!e.target.closest('div').classList.contains('open'))
          setOpenModal('');
      };
      if (openModal === itemId) {
        document.addEventListener('click', handleOutsideClick);
      } else {
        document.removeEventListener('click', handleOutsideClick);
      }

      return () => {
        document.removeEventListener('click', handleOutsideClick);
      };
    },

    [openModal, itemId, setOpenModal]
  );

  return (
    <div>
      <div>
        <EllipsisContainer
          className="open"
          onClick={() => {
            if (itemId === openModal) {
              setOpenModal('');
              return;
            }
            setOpenModal(itemId);
          }}
        >
          <HiMiniEllipsisVertical />
        </EllipsisContainer>

        {openModal === itemId && (
          <UpdateItems ref={ref}>
            {balance !== 0 && (
              <button onClick={() => setIsIssue(true)}>
                <HiMiniArrowUpTray /> Issue
              </button>
            )}
            {balance === 0 && (
              <button onClick={() => setIsOrder(true)}>
                <HiPlus /> Order
              </button>
            )}
            <button onClick={() => setIsEdit(true)}>
              <HiPencil /> Edit
            </button>

            <button onClick={() => setIsDelete(true)}>
              <HiTrash /> Delete
            </button>
          </UpdateItems>
        )}
      </div>
      {isEdit && (
        <Modal onClose={() => setIsEdit(false)}>
          <EditItemForm onClose={() => setIsEdit(false)} item={item} />
        </Modal>
      )}

      {isIssue && (
        <Modal onClose={() => setIsIssue(false)}>
          <IssueItemForm
            onClose={() => setIsIssue(false)}
            item={item}
            balance={balance}
          />
        </Modal>
      )}
      {isOrder && (
        <Modal onClose={() => setIsOrder(false)}>
          <OrderForm
            onClose={() => setIsOrder(false)}
            item={item}
            // balance={balance}
          />
        </Modal>
      )}
      {isDelete && (
        <Modal onClose={() => setIsDelete(false)}>
          <ConfirmDelete
            onConfirm={onConfirm}
            resourceName={`${item.itemName} item`}
            onClose={() => setIsDelete(false)}
          />
        </Modal>
      )}
    </div>
  );
}

export default MenuModal;
