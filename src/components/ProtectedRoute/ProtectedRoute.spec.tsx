import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { vi } from 'vitest';

vi.mock('../../hooks', () => ({
  useAuth: vi.fn(),
}));
import { useAuth } from '../../hooks';
import { ProtectedRoute } from './ProtectedRoute';

describe('<ProtectedRoute />', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders nested route when authenticated', () => {
    (useAuth as jest.Mock).mockReturnValue(true);

    render(
      <MemoryRouter initialEntries={['/protected']}>
        <Routes>
          <Route element={<ProtectedRoute />}>
            {' '}
            {/* Protected wrapper */}
            <Route path='/protected' element={<div>Protected Page</div>} />
          </Route>
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText('Protected Page')).toBeInTheDocument();
  });

  it('redirects to /login when not authenticated', () => {
    (useAuth as jest.Mock).mockReturnValue(false);

    render(
      <MemoryRouter initialEntries={['/protected']}>
        <Routes>
          <Route path='/login' element={<div>Login Page</div>} />
          <Route element={<ProtectedRoute />}>
            {' '}
            {/* Protected wrapper */}
            <Route path='/protected' element={<div>Protected Page</div>} />
          </Route>
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText('Login Page')).toBeInTheDocument();
  });
});
