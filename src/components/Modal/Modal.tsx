import React, { ReactNode, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';

interface ModalProps {
  isOpen: boolean;
  title?: string;
  children: ReactNode;
  onClose: () => void;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, title, children, onClose }) => {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, handleKeyDown]);

  if (!isOpen) return null;

  return createPortal(
    <div
      data-testid='modal-backdrop'
      className='fixed inset-0 bg-transparent bg-opacity-25 backdrop-blur-sm flex items-center justify-center z-50'
      onClick={onClose}
    >
      <div
        className='bg-white rounded-lg shadow-lg max-w-sm w-full mx-4'
        onClick={(e) => e.stopPropagation()}
      >
        {title && (
          <div className='border-b px-4 py-2 font-bold text-lg flex justify-between items-center'>
            <span>{title}</span>
            <button
              onClick={onClose}
              className='text-gray-500 hover:text-gray-700 focus:outline-none'
              aria-label='Close modal'
            >
              &times;
            </button>
          </div>
        )}
        <div className='p-4'>{children}</div>
      </div>
    </div>,
    document.body
  );
};
