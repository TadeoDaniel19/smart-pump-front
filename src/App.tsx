import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Login } from './pages/Login';
import { Profile } from './pages/UserProfile';
import { ProtectedRoute } from './components/ProtectedRoute/ProtectedRoute';
import { ToastProvider } from './components/Toast/ToastContext';

export const App: React.FC = () => {
  return (
    <ToastProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='*' element={<Navigate to='/' replace />} />
          <Route element={<ProtectedRoute />}>
            <Route path='/user-profile/:id' element={<Profile />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ToastProvider>
  );
};
