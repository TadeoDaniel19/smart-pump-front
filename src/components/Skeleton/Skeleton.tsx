import React from 'react';

export const Skeleton: React.FC = () => {
  return (
    <div
      data-testid='skeleton-wrapper'
      className='min-h-screen bg-gray-50 flex items-center justify-center p-4'
    >
      <div
        data-testid='skeleton-card'
        className='bg-white rounded-2xl shadow-lg w-full max-w-sm md:max-w-md lg:max-w-lg xl:max-w-2xl overflow-hidden animate-pulse'
      >
        <div
          data-testid='skeleton-header'
          className='bg-gray-200 h-12 relative flex items-center justify-end px-4'
        >
          <div data-testid='skeleton-avatar-icon' className='h-6 w-6 bg-gray-300 rounded-full' />
          <div className='absolute inset-x-0 flex justify-center'>
            <div
              data-testid='skeleton-header-bar'
              className='h-1.5 w-12 bg-gray-300 rounded-full'
            />
          </div>
        </div>
        <div data-testid='skeleton-body' className='px-6 pt-6 pb-8 space-y-6'>
          <div data-testid='skeleton-avatar-circle' className='flex justify-center mb-4'>
            <div className='h-24 w-24 bg-gray-300 rounded-full border-2 border-gray-200' />
          </div>
          <div data-testid='skeleton-buttons' className='flex flex-col gap-3 mb-6 w-full'>
            <div className='h-10 bg-gray-300 rounded-lg w-full' />
            <div className='h-10 bg-gray-300 rounded-lg w-full' />
            <div className='h-10 bg-gray-300 rounded-lg w-full' />
          </div>
          <div data-testid='skeleton-fields' className='space-y-4'>
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                data-testid={`skeleton-field-${i}`}
                className='h-6 bg-gray-300 rounded w-full'
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
