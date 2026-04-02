/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { Layout } from './components/Layout';
import { MapSection } from './components/MapSection';
import { DispatchForm } from './components/DispatchForm';
import { TripsHistory } from './components/TripsHistory';
import { ClientManagement } from './components/ClientManagement.tsx';
import FleetAnalytics from './components/FleetAnalytics';
import { FleetManagement } from './components/FleetManagement';
import { HomeDashboard } from './components/HomeDashboard';
import { SupportCenter } from './components/SupportCenter';
import { SettingsPage } from './components/SettingsPage';
import { Login } from './components/Login';
import type { AuthUser } from './types';
import { clearAccessToken, hasActiveSession, setAccessToken } from './lib/auth';
import { getCurrentUser, login } from './lib/api';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => hasActiveSession());
  const [authLoading, setAuthLoading] = useState(() => hasActiveSession());
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(null);
  const [currentView, setCurrentView] = useState('home');

  const handleLogin = async (email: string, password: string) => {
    try {
      const token = await login(email, password);
      setAccessToken(token);
      const user = await getCurrentUser();
      setCurrentUser(user);
      setIsAuthenticated(true);
      return null;
    } catch (error) {
      clearAccessToken();
      setCurrentUser(null);
      setIsAuthenticated(false);
      return error instanceof Error ? error.message : 'Could not sign in';
    }
  };

  const handleLogout = () => {
    clearAccessToken();
    setIsAuthenticated(false);
    setCurrentUser(null);
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

  useEffect(() => {
    if (!hasActiveSession()) {
      setAuthLoading(false);
      return;
    }

    let mounted = true;
    getCurrentUser()
      .then((user) => {
        if (!mounted) {
          return;
        }
        setCurrentUser(user);
        setIsAuthenticated(true);
      })
      .catch(() => {
        if (!mounted) {
          return;
        }
        clearAccessToken();
        setCurrentUser(null);
        setIsAuthenticated(false);
      })
      .finally(() => {
        if (mounted) {
          setAuthLoading(false);
        }
      });

    return () => {
      mounted = false;
    };
  }, []);

  if (authLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading session...</div>;
  }

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
        currentUser={currentUser}
      >
      {currentView === 'home' ? (
        <HomeDashboard currentUser={currentUser} />
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
      ) : currentView === 'clients' ? (
        <ClientManagement currentUser={currentUser} />
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
  );
}

