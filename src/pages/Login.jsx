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
import { useForm } from 'react-hook-form';
import useLogin from '../hooks/useLogin';
import SpinnerMini from '../ui/SpinnerMini';

function Login() {
  const [isVisible, setIsVisible] = useState(false);
  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm();
  const { isPending, login } = useLogin();

  const onSubmit = (data) => {
    login(data);
  };

  return (
    <AuthFormContainer onSubmit={handleSubmit(onSubmit)}>
      <AuthFormHeading>StoreLedger Login</AuthFormHeading>
      <AuthForm>
        <InputWithIcon error={errors?.email?.message}>
          <HiOutlineEnvelope />
          <Input
            type="email"
            placeholder="Email address"
            disabled={isPending}
            {...register('email', {
              required: 'Please provide the email address',
            })}
          />
        </InputWithIcon>
        <InputWithIcon error={errors?.password?.message}>
          <HiOutlineLockClosed />
          <Input
            type={isVisible ? 'text' : 'password'}
            placeholder="Password"
            disabled={isPending}
            {...register('password', {
              required: 'Please enter your password.',
            })}
          />
          <ViewPasswordButton
            onClick={() => setIsVisible((visible) => !visible)}
          >
            {isVisible ? <HiOutlineEyeSlash /> : <HiOutlineEye />}
          </ViewPasswordButton>
        </InputWithIcon>

        <AuthButtonContainer>
          <Button type="primary">
            <TextInButton>
              {isPending ? (
                <>
                  <SpinnerMini /> <span>Loging in...</span>
                </>
              ) : (
                'Log in'
              )}
            </TextInButton>
          </Button>

          <AuthLinks>
            <Link to="/forgotPassword">Forgot Password?</Link>
            <Link to="/signup">Sign up</Link>
          </AuthLinks>
        </AuthButtonContainer>
      </AuthForm>
    </AuthFormContainer>
  );
}

export default Login;
