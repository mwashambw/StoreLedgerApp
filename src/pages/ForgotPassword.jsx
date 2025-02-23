import Button from '../ui/Button';
import InputWithIcon from '../ui/InputWithIcon';
import {
  HiOutlineEnvelope,
  HiOutlineEye,
  HiOutlineEyeSlash,
  HiOutlineLockClosed,
  HiOutlineUser,
} from 'react-icons/hi2';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Input from '../ui/Input';
import AuthForm from '../ui/AuthForm';
import AuthFormContainer from '../ui/AuthFormContainer';
import AuthFormHeading from '../ui/AuthFormHeading';
import ViewPasswordButton from '../ui/ViewPasswordButton';
import TextInButton from '../ui/TextInButton';
import AuthButtonContainer from '../ui/AuthButtonContainer';
import AuthLinks from '../ui/AuthLinks';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import useForgotPassword from '../hooks/useForgotPassword';
import SpinnerMini from '../ui/SpinnerMini';
const Text = styled.p`
  margin-bottom: 2.4rem;
  /* text-align: center; */
`;

function ForgotPassword() {
  const { isPending, forgotPassword } = useForgotPassword();
  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm();

  const onSubmit = (data) => {
    forgotPassword(data);
  };

  return (
    <AuthFormContainer>
      {/* <AuthFormHeading>StoreLedger</AuthFormHeading> */}
      <AuthFormHeading>Forgot Password</AuthFormHeading>
      <Text>
        Enter your email address and we will send you a link to reset your
        password
      </Text>
      <AuthForm onSubmit={handleSubmit(onSubmit)}>
        <InputWithIcon error={errors?.email?.message}>
          <HiOutlineEnvelope />
          <Input
            type="email"
            placeholder="Email address"
            disabled={isPending}
            {...register('email', {
              required: 'Please enter your email address.',

              pattern: {
                value: /\S+@\S+\.\S+/,
                message: 'Please provide a valid email address.',
              },
            })}
          />
        </InputWithIcon>

        <AuthButtonContainer>
          <Button type="primary" disabled={isPending}>
            <TextInButton>
              {isPending ? (
                <>
                  <SpinnerMini /> <span>Continuing...</span>
                </>
              ) : (
                'Continue'
              )}
            </TextInButton>
          </Button>

          <AuthLinks>
            <Link to="/login">Back to login</Link>
          </AuthLinks>
        </AuthButtonContainer>
      </AuthForm>
    </AuthFormContainer>
  );
}

export default ForgotPassword;
