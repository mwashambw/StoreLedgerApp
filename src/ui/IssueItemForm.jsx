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

function IssueItemForm({ onClose, item, balance }) {
  const { isPending, editItem } = useEditItem();
  const { year, month, date } = getCurrentDate();
  const ref = useRef(null);
  const queryClient = useQueryClient();

  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm();

  useEffect(function () {
    if (ref.current) {
      ref.current.focus();
    }
  }, []);

  const onSubmit = (data) => {
    editItem(
      { id: item._id, data: { usageRecord: data } },
      {
        onSuccess: () => {
          toast.success('Item issued successfully');
          queryClient.invalidateQueries({
            queryKey: ['project'],
          });
          onClose();
        },
        onError: (error) => {
          toast.error(`Error in issueing item. ${error.message}`);
        },
      }
    );
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <InputContainer>
        <label htmlFor="item-name">Item Name</label>
        <input id="item-name" type="text" value={item.itemName} disabled />
      </InputContainer>
      <InputContainer error={errors?.dateTaken?.message}>
        <label htmlFor="date">Issue Date</label>
        <input
          id="date"
          type="date"
          defaultValue={`${year}-${month}-${date}`}
          {...register('dateTaken', { required: 'This field is required' })}
          disabled={isPending}
        />
      </InputContainer>
      <InputContainer error={errors?.takenBy?.message}>
        <label htmlFor="from">Issue To</label>
        <input
          id="from"
          type="text"
          defaultValue="Timu Ya Usimamizi"
          {...register('takenBy', { required: 'This field is required' })}
          disabled={isPending}
        />
      </InputContainer>
      <InputContainer error={errors?.issueVoucherNumber?.message}>
        <label htmlFor="issue-number">Issue Voucher Number</label>
        <input
          id="issue-number"
          type="number"
          min={1}
          placeholder="0451"
          {...register('issueVoucherNumber', {
            required: 'This field is required',
          })}
          disabled={isPending}
        />
      </InputContainer>
      <InputContainer error={errors?.quantityTaken?.message}>
        <label htmlFor="from">Quantity</label>
        <input
          id="from"
          type="number"
          max={balance}
          defaultValue={`${balance}`}
          {...register('quantityTaken', { required: 'This field is required' })}
          disabled={isPending}
        />
      </InputContainer>

      <ButtonContainer>
        <Button type="secondary" role="reset" disabled={isPending}>
          Reset
        </Button>
        <Button type="primary" disabled={isPending}>
          {isPending ? 'Issuing...' : 'Issue'}
        </Button>
      </ButtonContainer>
    </Form>
  );
}

export default IssueItemForm;
