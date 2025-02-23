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
import { Link, useParams } from 'react-router-dom';
import Input from '../ui/Input';
import AuthForm from '../ui/AuthForm';
import AuthFormContainer from '../ui/AuthFormContainer';
import AuthFormHeading from '../ui/AuthFormHeading';
import ViewPasswordButton from '../ui/ViewPasswordButton';
import TextInButton from '../ui/TextInButton';
import AuthButtonContainer from '../ui/AuthButtonContainer';
import AuthLinks from '../ui/AuthLinks';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { signup } from '../services/auth';
import toast from 'react-hot-toast';
import useSignup from '../hooks/useSignup';
import SpinnerMini from '../ui/SpinnerMini';
import useResetPassword from '../hooks/useResetPassword';

function ResetPassword() {
  const { resetToken } = useParams();
  const [isVisible, setIsVisible] = useState(false);
  const [isVisibleConf, setIsVisibleConf] = useState(false);
  const {
    handleSubmit,
    register,
    getValues,
    reset,
    formState: { errors },
  } = useForm();

  const { isPending, resetPassword } = useResetPassword();

  const onSubmit = ({ password, passwordConfirm }) => {
    resetPassword(
      { resetToken, password, passwordConfirm },
      { onSuccess: reset }
    );
  };

  return (
    <AuthFormContainer>
      <AuthFormHeading>Reset Password</AuthFormHeading>
      <AuthForm onSubmit={handleSubmit(onSubmit)}>
        <InputWithIcon error={errors?.password?.message}>
          <HiOutlineLockClosed />
          <Input
            type={isVisible ? 'text' : 'password'}
            placeholder="Password"
            disabled={isPending}
            {...register('password', {
              required: 'Please enter your password',
              minLength: {
                value: 8,
                message: 'Password need a minimum of 8 characters',
              },
            })}
          />
          <ViewPasswordButton
            onClick={() => setIsVisible((visible) => !visible)}
          >
            {isVisible ? <HiOutlineEyeSlash /> : <HiOutlineEye />}
          </ViewPasswordButton>
        </InputWithIcon>
        <InputWithIcon error={errors?.passwordConfirm?.message}>
          <HiOutlineLockClosed />
          <Input
            type={isVisibleConf ? 'text' : 'password'}
            placeholder="Password Confirm"
            disabled={isPending}
            {...register('passwordConfirm', {
              required: 'Please re-enter your password for confirmation.',
              validate: (value) => {
                return (
                  value === getValues().password || `Password doesn't match.`
                );
              },
            })}
          />
          <ViewPasswordButton
            onClick={() => setIsVisibleConf((visible) => !visible)}
          >
            {isVisibleConf ? <HiOutlineEyeSlash /> : <HiOutlineEye />}
          </ViewPasswordButton>
        </InputWithIcon>

        <AuthButtonContainer>
          <Button type="primary" disabled={isPending}>
            <TextInButton>
              {isPending ? (
                <>
                  <SpinnerMini /> <span>Submitting...</span>
                </>
              ) : (
                'Submit'
              )}
            </TextInButton>
          </Button>

          <AuthLinks>
            {/* <Link to="/forgot">Forgot Password?</Link> */}
            <Link to="/login">Log in</Link>
          </AuthLinks>
        </AuthButtonContainer>
      </AuthForm>
    </AuthFormContainer>
  );
}

export default ResetPassword;
