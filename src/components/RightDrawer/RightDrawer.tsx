import React from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';

interface RightDrawerProps {
  open: boolean;
  onClose: () => void;
  onLogout: () => void;
}

export const RightDrawer: React.FC<RightDrawerProps> = ({ open, onClose, onLogout }) => {
  if (!open) return null;

  return (
    <>
      <div
        data-testid='right-drawer-backdrop'
        className='fixed inset-0 backdrop-blur-sm z-40'
        onClick={onClose}
      />
      <aside
        data-testid='right-drawer-panel'
        className='fixed inset-y-0 right-0 w-64 bg-gray-100 shadow-lg z-50 flex flex-col transform transition-transform duration-200'
      >
        <div className='flex items-center justify-between px-4 py-3 border-b border-gray-200 bg-white'>
          <h2 data-testid='right-drawer-title' className='text-lg font-semibold text-blue-400'>
            Menu
          </h2>
          <button
            data-testid='right-drawer-close'
            onClick={onClose}
            className='p-1 rounded hover:bg-gray-200 transition'
          >
            <XMarkIcon className='h-6 w-6 text-blue-400' />
          </button>
        </div>
        <nav className='flex-1 px-4 py-6 space-y-4 overflow-auto'>
          <button
            data-testid='right-drawer-logout'
            onClick={onLogout}
            className='w-full text-left px-3 py-2 rounded hover:bg-blue-50 text-blue-400 font-medium transition'
          >
            Logout
          </button>
        </nav>
      </aside>
    </>
  );
};
