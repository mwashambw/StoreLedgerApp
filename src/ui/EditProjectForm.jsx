import Button from './Button';
import Form from './Form';
import InputContainer from './InputContainer';
import ButtonContainer from './ButtonsContainer';
import { useForm } from 'react-hook-form';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { updateProject } from '../services/apiProjects';
import toast from 'react-hot-toast';

function EditProjectForm({ projectName, status, onClose, id, year }) {
  const { handleSubmit, register } = useForm();
  const queryClient = useQueryClient();

  const { isPending, mutate } = useMutation({
    mutationFn: updateProject,
    onSuccess: () => {
      toast.success('Projected updated successfully');
      onClose();
      queryClient.invalidateQueries({
        queryKey: ['user'],
      });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  const onSubmit = (data) => {
    mutate({ id, project: data });
  };
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <InputContainer>
        <label htmlFor="project-name">Project Name</label>
        <input
          id="project-name"
          defaultValue={`${projectName}`}
          {...register('projectName')}
          disabled={isPending}
        />
      </InputContainer>
      <InputContainer>
        <label htmlFor="project-name">Project Status</label>
        <select
          defaultValue={`${status}`}
          {...register('status')}
          disabled={isPending}
        >
          <option value="awaiting">Awaiting</option>
          <option value="building">Building</option>
          <option value="completed">Completed</option>
        </select>
      </InputContainer>
      <InputContainer>
        <label htmlFor="year">Year</label>
        <input
          id="year"
          defaultValue={`${year}`}
          {...register('year', {
            required: 'Please provide the year of the project.',
          })}
          disabled={isPending}
        />
      </InputContainer>

      <ButtonContainer>
        <Button type="secondary" role="reset">
          Reset
        </Button>
        <Button type="primary"> {isPending ? 'Updating...' : 'Update'}</Button>
      </ButtonContainer>
    </Form>
  );
}

export default EditProjectForm;
