import Button from './Button';
import Form from './Form';
import InputContainer from './InputContainer';
import ButtonContainer from './ButtonsContainer';
import { getCurrentDate } from '../utils/helpers';
import { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';

import { useEditItem } from '../hooks/useEditItem';
import toast from 'react-hot-toast';
import { useQueryClient } from '@tanstack/react-query';

function OrderForm({ onClose, item }) {
  const { year, month, date } = getCurrentDate();
  const ref = useRef(null);
  const queryClient = useQueryClient();
  const { isPending, editItem } = useEditItem(onClose);
  const id = item._id;
  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm();

  const onSubmit = (data) => {
    editItem(
      { id, data: { ...data, isOrder: true } },
      {
        onSuccess: () => {
          toast.success('New order created successfully');
          queryClient.invalidateQueries({
            queryKey: ['project'],
          });
          onClose();
        },
        onError: (error) => {
          toast.error(`Error in creating item order. ${error.message}`);
        },
      }
    );
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
          value={`${item.itemName}`}
          {...register('itemName', { required: 'This field is required' })}
          disabled
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
          value={`${item.unit}`}
          {...register('unit', {
            required: 'This field is required',
          })}
          disabled
        />
      </InputContainer>
      <InputContainer error={errors?.unitPrice?.message}>
        <label htmlFor="from">Unit Price</label>
        <input
          id="from"
          type="number"
          min={1}
          placeholder="17000"
          step="any"
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
          {isPending ? 'Adding...' : 'Add New Order'}
        </Button>
      </ButtonContainer>
    </Form>
  );
}

export default OrderForm;
