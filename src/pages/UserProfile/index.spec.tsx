import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { vi } from 'vitest';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { Profile } from './index';

const dispatchMock = vi.fn();
const toastMock = vi.fn();
const navigateMock = vi.fn();

vi.mock('../../hooks/index', () => ({
  useAppDispatch: () => dispatchMock,
  useAppSelector: (selector: any) => selector({ auth: { token: 'tok' } }),
}));

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual<any>('react-router-dom');
  return {
    ...actual,
    useNavigate: () => navigateMock,
    useParams: () => ({ id: '123' }),
    MemoryRouter: actual.MemoryRouter,
    Routes: actual.Routes,
    Route: actual.Route,
  };
});

vi.mock('../../components/Toast/ToastContext', () => ({
  useToast: () => ({ addToast: toastMock }),
}));

const mockUser = {
  guid: '123',
  balance: '100',
  name: { first: 'John', last: 'Doe' },
  email: 'e@example.com',
  phone: '123456',
  age: 30,
  eyeColor: 'blue',
  company: 'Acme',
  address: '123 St',
};

const getUserMock = vi.fn();
const updateUserMock = vi.fn();
vi.mock('../../services/users/users', () => ({
  getUser: (id: string, token: string) => getUserMock(id, token),
  updateUser: (id: string, payload: any, token: string) => updateUserMock(id, payload, token),
}));

describe('<Profile />', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('shows skeleton then profile', async () => {
    getUserMock.mockResolvedValue({ data: mockUser });

    render(
      <MemoryRouter initialEntries={['/user-profile/123']}>
        <Routes>
          <Route path='/user-profile/:id' element={<Profile />} />
        </Routes>
      </MemoryRouter>
    );
    expect(screen.getByTestId('skeleton-wrapper')).toBeInTheDocument();

    await waitFor(() => expect(getUserMock).toHaveBeenCalledWith('123', 'tok'));
    await waitFor(() => expect(screen.getByTestId('profile-wrapper')).toBeInTheDocument());
    expect(screen.getByTestId('avatar-img')).toHaveAttribute('src', expect.stringContaining('123'));
  });

  it('opens and closes balance modal', async () => {
    getUserMock.mockResolvedValue({ data: mockUser });

    render(
      <MemoryRouter initialEntries={['/user-profile/123']}>
        <Routes>
          <Route path='/user-profile/:id' element={<Profile />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => screen.getByTestId('profile-wrapper'));

    const balanceBtn = screen.getByTestId('balance-button');
    await userEvent.click(balanceBtn);

    expect(screen.getByTestId('balance-value')).toHaveTextContent('100');

    await userEvent.click(screen.getByTestId('close-balance'));
    await waitFor(() => expect(screen.queryByTestId('balance-value')).toBeNull());
  });

  it('handles fetch error with toast', async () => {
    getUserMock.mockRejectedValue(new Error('fail'));

    render(
      <MemoryRouter initialEntries={['/user-profile/123']}>
        <Routes>
          <Route path='/user-profile/:id' element={<Profile />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() =>
      expect(toastMock).toHaveBeenCalledWith(
        'Something went wrong while fetching your information. Please refresh the page or try again later.',
        'error'
      )
    );
  });
});
