import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { useForm } from 'react-hook-form';
import { TextField } from './TextField';

const setup = (props: any) => {
  const Wrapper: React.FC = () => {
    const { control } = useForm({ defaultValues: { test: '' } });
    return <TextField {...props} control={control} />;
  };
  return render(<Wrapper />);
};

describe('<TextField />', () => {
  it('renders label and input with correct type', () => {
    setup({ name: 'test', label: 'Test Label', type: 'text' });
    expect(screen.getByTestId('textfield-label-test')).toHaveTextContent('Test Label');
    expect(screen.getByTestId('textfield-input-test')).toHaveAttribute('type', 'text');
  });

  it('toggles password visibility', async () => {
    setup({ name: 'test', label: 'Password', type: 'password' });
    const input = screen.getByTestId('textfield-input-test');
    const toggle = screen.getByTestId('textfield-toggle-test');
    expect(input).toHaveAttribute('type', 'password');

    const user = userEvent.setup();
    await user.click(toggle);
    expect(input).toHaveAttribute('type', 'text');
    await user.click(toggle);
    expect(input).toHaveAttribute('type', 'password');
  });

  it('renders readOnly input without toggle and correct styles', () => {
    setup({ name: 'test', label: 'ReadOnly', type: 'password', readOnly: true });
    const input = screen.getByTestId('textfield-input-test');
    expect(input).toHaveAttribute('readOnly');
    expect(input).toHaveClass('bg-gray-100', 'cursor-not-allowed');
    expect(screen.queryByTestId('textfield-toggle-test')).toBeNull();
  });

  it('displays error message and red border when error prop passed', () => {
    const error = { message: 'Required field' } as any;
    setup({ name: 'test', label: 'With Error', error });
    const input = screen.getByTestId('textfield-input-test');
    expect(input).toHaveClass('border-red-500');
    const errMsg = screen.getByTestId('textfield-error-test');
    expect(errMsg).toHaveTextContent('Required field');
  });

  it('updates value on user input', async () => {
    setup({ name: 'test', label: 'Input', type: 'text' });
    const input = screen.getByTestId('textfield-input-test');
    const user = userEvent.setup();
    await user.type(input, 'hello');
    expect(input).toHaveValue('hello');
  });
});
