import React, { useState } from 'react';
import { useController, Control, FieldError } from 'react-hook-form';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';

interface FormInputProps {
  name: string;
  label: string;
  control: Control<any>;
  type?: string;
  rules?: Record<string, any>;
  error?: FieldError;
  readOnly?: boolean;
}

export const TextField: React.FC<FormInputProps> = ({
  name,
  label,
  control,
  type = 'text',
  rules,
  error,
  readOnly = false,
}) => {
  const { field } = useController({ name, control, rules });
  const [show, setShow] = useState(false);
  const inputType = type === 'password' ? (show ? 'text' : 'password') : type;

  return (
    <div data-testid={`textfield-wrapper-${name}`} className='relative'>
      <label
        htmlFor={name}
        data-testid={`textfield-label-${name}`}
        className='block text-gray-700 mb-1'
      >
        {label}
      </label>

      <div className='relative'>
        <input
          id={name}
          {...field}
          data-testid={`textfield-input-${name}`}
          type={inputType}
          readOnly={readOnly}
          className={`
            w-full px-4 py-2 border rounded-md
            focus:outline-none focus:ring-2 focus:ring-blue-400
            ${readOnly ? 'bg-gray-100 cursor-not-allowed' : ''}
            ${error ? 'border-red-500' : 'border-gray-300'}
            ${type === 'password' ? 'pr-10' : ''}
          `}
        />

        {type === 'password' && !readOnly && (
          <button
            type='button'
            data-testid={`textfield-toggle-${name}`}
            onClick={() => setShow((s) => !s)}
            className='absolute inset-y-0 right-3 flex items-center text-gray-500'
          >
            {show ? <EyeSlashIcon className='h-5 w-5' /> : <EyeIcon className='h-5 w-5' />}
          </button>
        )}
      </div>

      {error && (
        <p data-testid={`textfield-error-${name}`} className='text-red-500 text-sm mt-1'>
          {error.message}
        </p>
      )}
    </div>
  );
};
