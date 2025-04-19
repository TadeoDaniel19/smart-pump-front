import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { vi } from 'vitest';
import { Toast } from './Toast';

describe('<Toast />', () => {
  it('renders the message and variant classes', () => {
    render(<Toast variant='success' message='Success!' onClose={() => {}} />);
    const toast = screen.getByTestId('toast');
    expect(toast).toHaveClass('bg-green-500', 'text-white');
    expect(screen.getByTestId('toast-message')).toHaveTextContent('Success!');
  });

  it('renders error variant correctly', () => {
    render(<Toast variant='error' message='Oops!' onClose={() => {}} />);
    expect(screen.getByTestId('toast')).toHaveClass('bg-red-500', 'text-white');
    expect(screen.getByTestId('toast-message')).toHaveTextContent('Oops!');
  });

  it('calls onClose when close button is clicked', () => {
    const onClose = vi.fn();
    render(<Toast variant='warning' message='Watch out' onClose={onClose} />);
    fireEvent.click(screen.getByTestId('toast-close'));
    expect(onClose).toHaveBeenCalled();
  });
});
