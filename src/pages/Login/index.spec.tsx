import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { vi } from 'vitest';
import { setCredentials } from '../../store/authSlice';
import { Login } from './index';
// Mocks
const dispatchMock = vi.fn();
const navigateMock = vi.fn();
const toastMock = vi.fn();

vi.mock('../../hooks/index', () => ({
  useAppDispatch: () => dispatchMock,
}));

vi.mock('react-router-dom', () => ({
  useNavigate: () => navigateMock,
}));

vi.mock('../../components/Toast/ToastContext', () => ({
  useToast: () => ({ addToast: toastMock }),
}));

const loginMock = vi.fn();
vi.mock('../../services/login/login', () => ({
  login: (data: any) => loginMock(data),
}));

describe('<Login />', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders email, password fields and login button', () => {
    render(<Login />);
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login/i })).toBeEnabled();
  });

  it('successful login dispatches credentials and navigates', async () => {
    loginMock.mockResolvedValue({ data: { token: 'abc123', id: 'user1' } });

    render(<Login />);
    const user = userEvent.setup();

    await user.type(screen.getByLabelText('Email'), 'test@example.com');
    await user.type(screen.getByLabelText('Password'), 'password');
    await user.click(screen.getByRole('button', { name: /login/i }));

    await waitFor(() => {
      expect(dispatchMock).toHaveBeenCalledWith(setCredentials({ token: 'abc123' }));
      expect(navigateMock).toHaveBeenCalledWith('/user-profile/user1');
    });
  });

  it('failed login shows error toast', async () => {
    loginMock.mockRejectedValue(new Error('invalid'));

    render(<Login />);
    const user = userEvent.setup();
    await user.type(screen.getByLabelText('Email'), 'test@example.com');
    await user.type(screen.getByLabelText('Password'), 'wrong');
    await user.click(screen.getByRole('button', { name: /login/i }));
    await waitFor(() => {
      expect(toastMock).toHaveBeenCalledWith(
        'Invalid credentials. Please check your email and password and try again.',
        'error'
      );
    });
  });
});
