import React from 'react';
import { ToastVariant } from './ToastContext';
import { XMarkIcon } from '@heroicons/react/24/solid';

interface ToastProps {
  variant: ToastVariant;
  message: string;
  onClose: () => void;
}

const variantClasses: Record<ToastVariant, string> = {
  success: 'bg-green-500 text-white',
  error: 'bg-red-500 text-white',
  warning: 'bg-yellow-500 text-black',
};

export const Toast: React.FC<ToastProps> = ({ variant, message, onClose }) => (
  <div
    data-testid='toast'
    className={`flex items-center justify-between px-4 py-2 rounded-lg shadow-md ${variantClasses[variant]} max-w-xs`}
  >
    <span data-testid='toast-message'>{message}</span>
    <button
      data-testid='toast-close'
      onClick={onClose}
      className='ml-2 focus:outline-none'
      aria-label='Close toast'
    >
      <XMarkIcon className='h-5 w-5' />
    </button>
  </div>
);
