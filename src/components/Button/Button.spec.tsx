import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import '@testing-library/jest-dom';
import { Button } from './Button';

describe('<Button />', () => {
  it('renders its children', () => {
    render(<Button variant='primary'>Click me</Button>);
    expect(screen.getByRole('button')).toHaveTextContent('Click me');
  });

  it('applies the correct variant classes', () => {
    const { rerender } = render(<Button variant='primary'>P</Button>);
    expect(screen.getByRole('button')).toHaveClass('bg-blue-400');

    rerender(<Button variant='secondary'>S</Button>);
    expect(screen.getByRole('button')).toHaveClass('border-blue-400');

    rerender(<Button variant='tertiary'>T</Button>);
    expect(screen.getByRole('button')).toHaveClass('bg-gray-300');

    rerender(
      <Button variant='icon'>
        <span data-testid='icon'>I</span>
      </Button>
    );
    const iconBtn = screen.getByRole('button');
    expect(iconBtn).toHaveClass('inline-flex', 'p-2');
    expect(screen.getByTestId('icon')).toBeInTheDocument();
  });

  it('calls onClick when clicked', async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();
    render(
      <Button variant='primary' onClick={handleClick}>
        Press
      </Button>
    );
    await user.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('is disabled when `disabled` prop is true', async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();
    render(
      <Button variant='primary' disabled onClick={handleClick}>
        NoPress
      </Button>
    );
    const btn = screen.getByRole('button');
    expect(btn).toBeDisabled();
    await user.click(btn);
    expect(handleClick).not.toHaveBeenCalled();
    expect(btn).toHaveClass('opacity-50', 'cursor-not-allowed');
  });
});
