import React from 'react';

import { ToastProvider } from './context/ToastContext';
import { AuthProvider } from './context/AuthContext';
import { ProgressProvider } from './context/ProgressContext';
import { SettingsProvider } from './context/SettingsContext';
import { AppRoutes } from './routes/AppRoutes';

function App() {
  return (
      <ToastProvider>
        <AuthProvider>
          <ProgressProvider>
            <SettingsProvider>
              <AppRoutes />
            </SettingsProvider>
          </ProgressProvider>
        </AuthProvider>
      </ToastProvider>
  );
}

export default App;
