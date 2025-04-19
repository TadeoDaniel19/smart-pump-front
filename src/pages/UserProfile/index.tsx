import React, { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Bars3Icon } from '@heroicons/react/24/outline';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '../../components/Button/Button';
import { TextField } from '../../components/TextField/TextField';
import { RightDrawer } from '../../components/RightDrawer/RightDrawer';
import { getUser, updateUser } from '../../services/users/users';
import { useAppSelector, useAppDispatch } from '../../hooks/index';
import { logout } from '../../store/authSlice';
import { useToast } from '../../components/Toast/ToastContext';
import { FormValues, User } from '../../types/index';
import { Skeleton } from '../../components/Skeleton/Skeleton';
import { Modal } from '../../components/Modal/Modal';

export const Profile: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { addToast } = useToast();
  const token = useAppSelector((state) => state.auth.token);

  const [editing, setEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpenBalance, setIsOpenBalance] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      first: '',
      last: '',
      email: '',
      phone: '',
      age: 0,
      eyeColor: '',
      company: '',
      address: '',
    },
  });

  const onCancel = () => {
    reset();
    setEditing(false);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login', { replace: true });
  };

  const userFields = [
    {
      name: 'first',
      label: 'First Name',
      type: 'text',
      rules: { required: 'Required' },
      error: errors.first,
      readOnly: !editing,
    },
    {
      name: 'last',
      label: 'Last Name',
      type: 'text',
      rules: { required: 'Required' },
      error: errors.last,
      readOnly: !editing,
    },
    {
      name: 'email',
      label: 'Email',
      type: 'email',
      rules: { required: 'Required' },
      error: errors.email,
      readOnly: !editing,
    },
    {
      name: 'phone',
      label: 'Phone',
      type: 'tel',
      rules: { required: 'Required' },
      error: errors.phone,
      readOnly: !editing,
    },
    {
      name: 'age',
      label: 'Age',
      type: 'number',
      rules: { required: 'Required' },
      error: errors.age,
      readOnly: !editing,
    },
    {
      name: 'eyeColor',
      label: 'Eye Color',
      type: 'text',
      rules: { required: 'Required' },
      error: errors.eyeColor,
      readOnly: !editing,
    },
    {
      name: 'company',
      label: 'Company',
      type: 'text',
      rules: { required: 'Required' },
      error: errors.company,
      readOnly: !editing,
    },
    {
      name: 'address',
      label: 'Address',
      type: 'text',
      rules: { required: 'Required' },
      error: errors.address,
      readOnly: !editing,
    },
  ];

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const payload = { ...data, name: { first: data.first, last: data.last } };
    try {
      const res = await updateUser(id ?? '', payload, token ?? '');
      setUser(res.data);
      addToast('User updated successfully.', 'success');
    } catch {
      addToast(
        'Something went wrong while updating your information. Please refresh the page or try again later.',
        'error'
      );
    }
    setEditing(false);
  };

  useEffect(() => {
    const getSingleUser = async () => {
      setIsLoading(true);
      try {
        const res = await getUser(id ?? '', token ?? '');
        setUser(res.data);
        reset({
          first: res.data.name.first,
          last: res.data.name.last,
          email: res.data.email,
          phone: res.data.phone,
          age: res.data.age,
          eyeColor: res.data.eyeColor,
          company: res.data.company,
          address: res.data.address,
        });
      } catch {
        addToast(
          'Something went wrong while fetching your information. Please refresh the page or try again later.',
          'error'
        );
      } finally {
        setIsLoading(false);
      }
    };
    getSingleUser();
  }, [id, token, reset, addToast]);

  if (isLoading) {
    return <Skeleton />;
  }

  return (
    <div
      data-testid='profile-wrapper'
      className='min-h-screen bg-gray-50 flex items-center justify-center p-4'
    >
      <div className='bg-white rounded-2xl shadow-lg w-full max-w-sm md:max-w-md lg:max-w-lg xl:max-w-2xl overflow-hidden'>
        <div className='bg-gray-100 h-12 relative flex items-center justify-end px-4'>
          <Button data-testid='menu-button' variant='icon' onClick={() => setMenuOpen(true)}>
            <Bars3Icon className='w-6 h-6' />
          </Button>
          <div className='absolute inset-x-0 flex justify-center'>
            <div className='h-1.5 w-12 bg-gray-300 rounded-full' />
          </div>
        </div>

        <RightDrawer open={menuOpen} onClose={() => setMenuOpen(false)} onLogout={handleLogout} />
        <div className='px-6 pt-6 pb-8'>
          <div className='flex justify-center mb-4'>
            <img
              data-testid='avatar-img'
              src={`https://i.pravatar.cc/150?u=${user?.guid}.svg`}
              alt='avatar'
              className='h-24 w-24 rounded-full border-2 border-gray-200 object-cover'
            />
          </div>
          <div className='flex flex-col gap-3 mb-6 w-full'>
            <Button
              data-testid='balance-button'
              variant='secondary'
              className='w-full'
              onClick={() => setIsOpenBalance(true)}
            >
              BALANCE
            </Button>
            {!editing && (
              <Button
                data-testid='edit-button'
                variant='primary'
                className='w-full'
                onClick={() => setEditing(true)}
              >
                EDIT
              </Button>
            )}
            {editing && (
              <>
                <Button
                  data-testid='save-button'
                  variant='primary'
                  className='w-full'
                  onClick={handleSubmit(onSubmit)}
                >
                  SAVE
                </Button>
                <Button
                  data-testid='cancel-button'
                  variant='tertiary'
                  className='w-full'
                  onClick={onCancel}
                >
                  CANCEL
                </Button>
              </>
            )}
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className='space-y-4'>
              {userFields.map((field, index) => (
                <TextField
                  data-testid={index == 0 ? 'textfield-input-fist' : `textfield-${field.name}`}
                  key={field.name}
                  {...field}
                  control={control}
                />
              ))}
            </div>
          </form>
          <Modal
            isOpen={isOpenBalance}
            title='Your Balance'
            onClose={() => setIsOpenBalance(false)}
          >
            <p data-testid='balance-value' className='text-2xl font-bold'>
              {user?.balance}
            </p>
            <div className='mt-4 flex justify-end'>
              <Button
                data-testid='close-balance'
                variant='secondary'
                onClick={() => setIsOpenBalance(false)}
              >
                Close
              </Button>
            </div>
          </Modal>
        </div>
      </div>
    </div>
  );
};
