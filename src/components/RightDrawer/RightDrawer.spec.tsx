import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { vi } from 'vitest';
import { RightDrawer } from './RightDrawer';

describe('<RightDrawer />', () => {
  it('renders nothing when closed', () => {
    const { container } = render(
      <RightDrawer open={false} onClose={() => {}} onLogout={() => {}} />
    );
    expect(container).toBeEmptyDOMElement();
  });

  it('renders backdrop, title, close and logout buttons when open', () => {
    render(<RightDrawer open onClose={() => {}} onLogout={() => {}} />);

    // Backdrop
    expect(screen.getByTestId('right-drawer-backdrop')).toBeInTheDocument();
    // Drawer panel
    expect(screen.getByTestId('right-drawer-panel')).toBeInTheDocument();
    // Title
    expect(screen.getByTestId('right-drawer-title')).toHaveTextContent('Menu');
    // Close button
    expect(screen.getByTestId('right-drawer-close')).toBeInTheDocument();
    // Logout button
    expect(screen.getByTestId('right-drawer-logout')).toBeInTheDocument();
  });

  it('calls onClose when backdrop is clicked', () => {
    const onClose = vi.fn();
    render(<RightDrawer open onClose={onClose} onLogout={() => {}} />);

    fireEvent.click(screen.getByTestId('right-drawer-backdrop'));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('calls onClose when close button is clicked', async () => {
    const onClose = vi.fn();
    const user = userEvent.setup();
    render(<RightDrawer open onClose={onClose} onLogout={() => {}} />);

    await user.click(screen.getByTestId('right-drawer-close'));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('calls onLogout when logout button is clicked', async () => {
    const onLogout = vi.fn();
    const user = userEvent.setup();
    render(<RightDrawer open onClose={() => {}} onLogout={onLogout} />);

    await user.click(screen.getByTestId('right-drawer-logout'));
    expect(onLogout).toHaveBeenCalledTimes(1);
  });
});
