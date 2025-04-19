import React from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'icon';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  children: React.ReactNode;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: `
    bg-blue-400 text-white
    hover:bg-blue-500
    focus:ring-blue-300
    w-full py-3
  `,
  secondary: `
    bg-white text-blue-400 border border-blue-400
    hover:bg-blue-50
    focus:ring-blue-200
    w-full py-3
  `,
  tertiary: `
    bg-gray-300 text-black
    hover:bg-gray-500
    focus:ring-gray-300
    w-full py-3
  `,
  icon: `
    bg-transparent text-gray-700
    hover:bg-gray-100 hover:text-gray-900
    focus:ring-gray-300
    p-2
    inline-flex items-center justify-center
  `,
};

export const Button: React.FC<ButtonProps> = ({
  variant = 'tertiary',
  children,
  className = '',
  ...rest
}) => {
  const styles = variantStyles[variant];

  return (
    <button
      {...rest}
      className={`
        rounded-lg font-bold transition
        focus:outline-none focus:ring-2 focus:ring-offset-2
        ${styles}
        ${rest.disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        ${className}
      `}
    >
      {children}
    </button>
  );
};
