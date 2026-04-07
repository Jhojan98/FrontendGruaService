/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { Layout } from './components/Layout';
import { MapSection } from './components/MapSection';
import { DispatchForm } from './components/DispatchForm';
import { HistoryManagement } from './components/history/HistoryManagement';
import { ClientManagement } from './components/clients/ClientManagement';
import FleetAnalytics from './components/FleetAnalytics';
import { FleetManagement as FleetModuleManagement } from './components/fleet/FleetManagement';
import { HomeDashboard } from './components/HomeDashboard';
import { SupportCenter } from './components/SupportCenter';
import { SettingsPage } from './components/SettingsPage';
import { Login } from './components/Login';
import { DriverManagement } from './components/drivers/DriverManagement';
import { InternalUserManagement } from './components/settings/InternalUserManagement';
import { TariffBillingAdminPanel } from './components/settings/TariffBillingAdminPanel';
import { useAuth } from './contexts/AuthContext';

export default function App() {
  const { isAuthenticated, isInitializing, isSubmitting, error, loginWithCredentials, logout } = useAuth();
  const [currentView, setCurrentView] = useState('home');

  const handleLogin = async (email: string, password: string) => {
    await loginWithCredentials(email, password);
  };

  const handleLogout = () => {
    logout();
    setCurrentView('home');
  };

  const [isDarkMode, setIsDarkMode] = useState(
    () => localStorage.getItem('theme') === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
  );

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  if (isInitializing) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!isAuthenticated) {
    return (
      <Login
        onLogin={handleLogin}
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
        isLoading={isSubmitting}
        error={error}
      />
    );
  }

  return (
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
      ) : currentView.startsWith('history') ? (
        <HistoryManagement currentView={currentView} onViewChange={setCurrentView} />
      ) : currentView.startsWith('clients') ? (
        <ClientManagement currentView={currentView} onViewChange={setCurrentView} />
      ) : currentView.startsWith('drivers') ? (
        <DriverManagement currentView={currentView} onViewChange={setCurrentView} />
      ) : currentView.startsWith('fleet') ? (
        <FleetModuleManagement currentView={currentView} onViewChange={setCurrentView} />
      ) : currentView === 'analytics' ? (
        <FleetAnalytics />
      ) : currentView === 'settings' ? (
        <SettingsPage isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} onViewChange={setCurrentView} />
      ) : currentView === 'settings/internal-users' ? (
        <InternalUserManagement onViewChange={setCurrentView} />
      ) : currentView === 'settings/tariff-billing' ? (
        <TariffBillingAdminPanel onViewChange={setCurrentView} />
      ) : currentView === 'support' ? (
        <SupportCenter />
      ) : (
        <div className="p-8">View not found</div>
      )}
    </Layout>
  );
}
