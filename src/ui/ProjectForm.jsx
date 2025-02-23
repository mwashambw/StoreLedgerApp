import Button from './Button';
import Form from './Form';
import InputContainer from './InputContainer';
import ButtonContainer from './ButtonsContainer';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createProject } from '../services/apiProjects';
import toast from 'react-hot-toast';
import { getCurrentDate } from '../utils/helpers';

function ProjectForm({ onClose }) {
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { isPending, mutate } = useMutation({
    mutationFn: createProject,
    onSuccess: () => {
      // console.log('Project is successfully created');
      toast.success('Project created successfully');
      onClose();

      queryClient.invalidateQueries({
        queryKey: ['user'],
      });
    },
    onError: (error) => {
      console.log(error);
      // console.log(error);
      toast.error('Error in creating a project');
      // console.log('Error in creating a project');
    },
  });

  const onSubmit = (data) => {
    // console.log(data);
    mutate(data);
  };
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <InputContainer error={errors?.projectName?.message}>
        <label htmlFor="project-name">Project Name</label>
        <input
          id="project-name"
          placeholder="Umaliziaji wa mabweni"
          {...register('projectName', {
            required: 'Please provide the name of the project.',
          })}
          disabled={isPending}
        />
      </InputContainer>
      <InputContainer error={errors?.status?.message}>
        <label htmlFor="status">Project Status</label>
        <select {...register('status')} disabled={isPending}>
          <option value="awaiting">Awaiting</option>
          <option value="building">Building</option>
          <option value="completed">Completed</option>
        </select>
      </InputContainer>
      <InputContainer error={errors?.year?.message}>
        <label htmlFor="year">Year</label>
        <input
          id="year"
          defaultValue={getCurrentDate().year}
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
        <Button type="primary">{isPending ? 'Adding...' : 'Add'}</Button>
      </ButtonContainer>
    </Form>
  );
}

export default ProjectForm;
