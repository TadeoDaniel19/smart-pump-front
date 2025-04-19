import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Skeleton } from './Skeleton';

describe('<Skeleton />', () => {
  it('renders the main wrapper and card', () => {
    render(<Skeleton />);
    expect(screen.getByTestId('skeleton-wrapper')).toBeInTheDocument();
    expect(screen.getByTestId('skeleton-card')).toBeInTheDocument();
  });

  it('renders header with avatar icon and header bar', () => {
    render(<Skeleton />);
    expect(screen.getByTestId('skeleton-header')).toBeInTheDocument();
    expect(screen.getByTestId('skeleton-avatar-icon')).toBeInTheDocument();
    expect(screen.getByTestId('skeleton-header-bar')).toBeInTheDocument();
  });

  it('renders body with avatar circle, buttons and fields', () => {
    render(<Skeleton />);
    expect(screen.getByTestId('skeleton-body')).toBeInTheDocument();
    expect(screen.getByTestId('skeleton-avatar-circle')).toBeInTheDocument();
    expect(screen.getByTestId('skeleton-buttons')).toBeInTheDocument();
    expect(screen.getByTestId('skeleton-fields')).toBeInTheDocument();
    const fields = screen.getAllByTestId(/skeleton-field-/);
    expect(fields).toHaveLength(8);
  });
});
