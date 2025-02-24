import Button from './Button';
import Form from './Form';
import InputContainer from './InputContainer';
import ButtonContainer from './ButtonsContainer';
import { getCurrentDate } from '../utils/helpers';
import { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { useCreateItem } from '../hooks/useCreateItem';

function ItemForm({ onClose }) {
  const { year, month, date } = getCurrentDate();
  const ref = useRef(null);
  const { id } = useParams();
  const { isPending, createItem } = useCreateItem(onClose);

  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm();

  const onSubmit = (data) => {
    createItem({ id, data });
  };

  // Focus the first inpu element
  useEffect(function () {
    if (ref.current) {
      ref.current.focus();
    }
  }, []);

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <InputContainer error={errors?.itemName?.message}>
        <label htmlFor="item-name">Item Name</label>
        <input
          id="item-name"
          type="text"
          ref={ref}
          placeholder="Cement 42.5 N"
          {...register('itemName', { required: 'This field is required' })}
          disabled={isPending}
        />
      </InputContainer>
      <InputContainer error={errors?.recieveDate?.message}>
        <label htmlFor="date">Receiving Date</label>
        <input
          id="date"
          type="date"
          defaultValue={`${year}-${month}-${date}`}
          {...register('recieveDate', {
            required: 'This field is required',
          })}
          disabled={isPending}
        />
      </InputContainer>
      <InputContainer error={errors?.receivedFrom?.message}>
        <label htmlFor="from">Received From</label>
        <input
          id="from"
          type="text"
          placeholder="Revocy company ltd"
          {...register('receivedFrom', {
            required: 'This field is required',
          })}
          disabled={isPending}
        />
      </InputContainer>
      <InputContainer error={errors?.receivedFrom?.message}>
        <label htmlFor="receiptVoucher">Receipt Voucher Number</label>
        <input
          id="receiptVoucher"
          type="number"
          placeholder="456"
          min={1}
          {...register('receiptVoucherNumber', {
            required: 'This field is required',
          })}
          disabled={isPending}
        />
      </InputContainer>
      <InputContainer error={errors?.receivedQuantity?.message}>
        <label htmlFor="from">Received Quantity</label>
        <input
          id="from"
          type="number"
          min={1}
          placeholder="400"
          {...register('receivedQuantity', {
            required: 'This field is required',
          })}
          disabled={isPending}
        />
      </InputContainer>
      <InputContainer error={errors?.unit?.message}>
        <label htmlFor="from">Unit</label>
        <input
          id="from"
          type="text"
          placeholder="BAG"
          {...register('unit', {
            required: 'This field is required',
          })}
          disabled={isPending}
        />
      </InputContainer>
      <InputContainer error={errors?.unitPrice?.message}>
        <label htmlFor="from">Unit Price</label>
        <input
          id="from"
          type="number"
          min={1}
          step="any"
          placeholder="17000"
          {...register('unitPrice', {
            required: 'This field is required',
          })}
          disabled={isPending}
        />
      </InputContainer>
      <ButtonContainer>
        <Button type="secondary" role="reset" disabled={isPending}>
          Reset
        </Button>
        <Button disabled={isPending} type="primary">
          {isPending ? 'Adding...' : 'Add Item'}
        </Button>
      </ButtonContainer>
    </Form>
  );
}

export default ItemForm;
