import React from 'react';
import { AuthProvider } from '../context/AuthContext';

const Providers: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <AuthProvider>
      {children}
    </AuthProvider>
  );
};

export default Providers; 