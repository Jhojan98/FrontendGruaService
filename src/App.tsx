/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { Layout } from './components/Layout';
import { MapSection } from './components/MapSection';
import { DispatchForm } from './components/DispatchForm';
import { TripsHistory } from './components/TripsHistory';
import { ClientManagement } from './components/clients/ClientManagement';
import FleetAnalytics from './components/FleetAnalytics';
import { FleetManagement } from './components/FleetManagement';
import { HomeDashboard } from './components/HomeDashboard';
import { SupportCenter } from './components/SupportCenter';
import { SettingsPage } from './components/SettingsPage';
import { Login } from './components/Login';
import { ProtectedRoute } from './components/ProtectedRoute';
import { useAuth } from './contexts/AuthContext';

export default function App() {
  const { loginWithCredentials, logout, isSubmitting, error, clearError, user } = useAuth();
  const [currentView, setCurrentView] = useState('home');

  const [isDarkMode, setIsDarkMode] = useState(
    () => localStorage.getItem('theme') === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
  );

  const handleLogin = async (email: string, password: string) => {
    clearError();
    await loginWithCredentials(email, password);
  };

  const handleLogout = () => {
    logout();
    setCurrentView('home');
  };

  useEffect(() => {
    if (!user) {
      return;
    }
    setIsDarkMode(user.theme === 'dark');
  }, [user]);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  return (
    <ProtectedRoute
      fallback={
        <Login
          onLogin={handleLogin}
          isDarkMode={isDarkMode}
          setIsDarkMode={setIsDarkMode}
          isLoading={isSubmitting}
          error={error}
        />
      }
    >
      <Layout 
        currentView={currentView} 
        onViewChange={setCurrentView}
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
        onLogout={handleLogout}
      >
      {currentView === 'home' ? (
        <HomeDashboard />
      ) : currentView === 'live-dispatch' ? (
        <div className="flex h-full flex-col md:flex-row overflow-y-auto md:overflow-hidden">
          <div className="w-full md:w-[45%] h-[40vh] min-h-[300px] md:h-full md:min-h-0 flex-shrink-0">
            <MapSection />
          </div>
          <div className="w-full md:w-[55%] h-auto md:h-full overflow-y-auto">
            <DispatchForm />
          </div>
        </div>
      ) : currentView === 'history' ? (
        <TripsHistory />
      ) : currentView.startsWith('clients') ? (
        <ClientManagement currentView={currentView} onViewChange={setCurrentView} />
      ) : currentView === 'fleet' ? (
        <FleetManagement />
      ) : currentView === 'analytics' ? (
        <FleetAnalytics />
      ) : currentView === 'settings' ? (
        <SettingsPage isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
      ) : currentView === 'support' ? (
        <SupportCenter />
      ) : (
        <div className="p-8">View not found</div>
      )}
    </Layout>
    </ProtectedRoute>
  );
}

