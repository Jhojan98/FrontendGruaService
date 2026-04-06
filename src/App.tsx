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
import { DriverManagement } from './components/drivers/DriverManagement';
import FleetAnalytics from './components/FleetAnalytics';
import { FleetManagement } from './components/fleet/FleetManagement';
import { HomeDashboard } from './components/HomeDashboard';
import { SupportCenter } from './components/SupportCenter';
import { SettingsPage } from './components/SettingsPage';
import { Login } from './components/Login';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => localStorage.getItem('auth') === 'true');
  const [currentView, setCurrentView] = useState('home');

  const handleLogin = () => {
    setIsAuthenticated(true);
    localStorage.setItem('auth', 'true');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('auth');
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

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />;
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
      ) : currentView === 'history' ? (
        <TripsHistory />
      ) : currentView.startsWith('clients') ? (
        <ClientManagement currentView={currentView} onViewChange={setCurrentView} />
      ) : currentView.startsWith('drivers') ? (
        <DriverManagement currentView={currentView} onViewChange={setCurrentView} />
      ) : currentView.startsWith('fleet') ? (
        <FleetManagement currentView={currentView} onViewChange={setCurrentView} />
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
  );
}

