import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { TextField } from '../../components/TextField/TextField';
import { Button } from '../../components/Button/Button';
import { login } from '../../services/login/login';
import { useAppDispatch } from '../../hooks/index';
import { setCredentials } from '../../store/authSlice';
import { useToast } from '../../components/Toast/ToastContext';
import { LoginFormInputs } from '../../types/index';

export const Login: React.FC = () => {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormInputs>({
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { addToast } = useToast();

  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    try {
      const res = await login(data);
      const { token, id: userId } = res.data;

      dispatch(setCredentials({ token }));
      navigate(`/user-profile/${userId}`);
    } catch (err) {
      addToast('Invalid credentials. Please check your email and password and try again.', 'error');
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-50'>
      <div className='bg-white shadow-lg rounded-2xl p-8 w-full max-w-sm'>
        <div className='flex justify-center mb-8'>
          <img src='./src/assets/logo.png' alt='Smart Pump' className='h-20' />
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            name='email'
            label='Email'
            control={control}
            rules={{ required: 'Email is required.' }}
            error={errors.email}
          />

          <TextField
            name='password'
            label='Password'
            type='password'
            control={control}
            rules={{ required: 'Password is required.' }}
            error={errors.password}
          />
          <div className='pt-5'>
            <Button type='submit' disabled={isSubmitting} variant='primary'>
              LOGIN
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
