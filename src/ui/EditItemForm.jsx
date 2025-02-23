import Button from './Button';
import Form from './Form';
import InputContainer from './InputContainer';
import ButtonContainer from './ButtonsContainer';
import { getCurrentDate } from '../utils/helpers';
import { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useEditItem } from '../hooks/useEditItem';
import toast from 'react-hot-toast';
import { useQueryClient } from '@tanstack/react-query';

function EditItemForm({ onClose, item }) {
  const ref = useRef(null);
  const { isPending, editItem } = useEditItem(onClose);
  const { handleSubmit, register } = useForm();
  const { itemName, unit, _id: id } = item;
  const queryClient = useQueryClient();

  const {
    receiptVoucherNumber,
    recieveDate,
    receivedFrom,
    receivedQuantity,
    currentQuantity,
    unitPrice,
  } = item.orders.at(-1);

  const { year, month, date } = getCurrentDate(new Date(recieveDate));

  useEffect(function () {
    if (ref.current) {
      ref.current.focus();
    }
  }, []);

  const onSubmit = (data) => {
    editItem(
      { id, data },
      {
        onSuccess: () => {
          toast.success('Item updated successfully');
          queryClient.invalidateQueries({
            queryKey: ['project'],
          });
          onClose();
        },
        onError: (error) => {
          toast.error(error.message);
        },
      }
    );
  };
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <InputContainer>
        <label htmlFor="item-name">Item Name</label>
        <input
          id="item-name"
          type="text"
          defaultValue={`${itemName}`}
          ref={ref}
          {...register('itemName')}
        />
      </InputContainer>
      <InputContainer>
        <label htmlFor="date">Receiving Date</label>
        <input
          id="date"
          type="date"
          defaultValue={`${year}-${month}-${date}`}
          {...register('recieveDate')}
        />
      </InputContainer>
      <InputContainer>
        <label htmlFor="from">Received From</label>
        <input
          id="from"
          type="text"
          defaultValue={`${receivedFrom}`}
          {...register('receivedFrom')}
        />
      </InputContainer>
      <InputContainer>
        <label htmlFor="receipt-number">Receipt Voucher Number</label>
        <input
          id="receipt-number"
          type="number"
          min={1}
          defaultValue={`${receiptVoucherNumber}`}
          {...register('receiptVoucherNumber')}
        />
      </InputContainer>
      <InputContainer>
        <label htmlFor="from">Received Quantity</label>
        <input
          id="from"
          type="number"
          min={currentQuantity === 0 ? receivedQuantity : 1}
          defaultValue={`${receivedQuantity}`}
          {...register('receivedQuantity')}
        />
      </InputContainer>
      <InputContainer>
        <label htmlFor="from">Unit</label>
        <input
          id="from"
          type="text"
          defaultValue={`${unit}`}
          {...register('unit')}
        />
      </InputContainer>
      <InputContainer>
        <label htmlFor="from">Unit Price</label>
        <input
          id="from"
          type="number"
          min={1}
          step="any"
          defaultValue={`${unitPrice}`}
          {...register('unitPrice')}
        />
      </InputContainer>
      <ButtonContainer>
        <Button type="secondary" role="reset" disabled={isPending}>
          Reset
        </Button>
        <Button type="primary" disabled={isPending}>
          {isPending ? 'Submiting...' : 'Submit'}
        </Button>
      </ButtonContainer>
    </Form>
  );
}

export default EditItemForm;
