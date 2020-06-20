import React from 'react';
import { AuthProvider } from './auth';
import { ToastProvider } from './toast';

// Engloba todos os providers
const AppProvider: React.FC = ({ children }) => (
  <AuthProvider>
    <ToastProvider>{children}</ToastProvider>
  </AuthProvider>
);

export default AppProvider;
