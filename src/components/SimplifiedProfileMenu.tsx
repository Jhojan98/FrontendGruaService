import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { LogOut, User, Settings as SettingsIcon } from 'lucide-react';
import type { AuthUser } from '../types';

export function SimplifiedProfileMenu({
  onLogout,
  onViewChange,
  currentUser,
}: {
  onLogout?: () => void;
  onViewChange?: (view: string) => void;
  currentUser?: AuthUser | null;
}) {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="h-8 w-8 rounded-full bg-primary-container flex items-center justify-center overflow-hidden border border-outline-variant/30 hover:opacity-80 transition-opacity focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
        aria-expanded={isOpen}
        aria-haspopup="menu"
      >
        <img 
          alt="User profile" 
          className="w-full h-full object-cover" 
          src="https://picsum.photos/seed/user/100/100"
          referrerPolicy="no-referrer"
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 rounded-xl bg-surface shadow-lg border border-outline-variant/30 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="px-4 py-3 border-b border-outline-variant/30">
            <p className="text-sm font-bold text-on-surface font-headline">{currentUser?.full_name || t('alex_dispatcher', 'Alex Dispatcher')}</p>
            <p className="text-xs text-on-surface-variant font-medium mt-0.5">{currentUser?.email || t('alex_d_terratowing_com', 'alex.d@terratowing.com')}</p>
          </div>
          
          <div className="py-1">
            <button 
              className="w-full px-4 py-2 text-left text-sm text-on-surface hover:bg-surface-container-low transition-colors flex items-center gap-3 font-medium"
              onClick={() => {
                setIsOpen(false);
                // Implement profile view routing if needed
              }}
            >
              <User className="w-4 h-4 text-on-surface-variant" />
              {t('menu.myProfile', 'My Profile')}
            </button>
            <button 
              className="w-full px-4 py-2 text-left text-sm text-on-surface hover:bg-surface-container-low transition-colors flex items-center gap-3 font-medium"
              onClick={() => {
                setIsOpen(false);
                if (onViewChange) onViewChange('settings');
              }}
            >
              <SettingsIcon className="w-4 h-4 text-on-surface-variant" />
              {t('menu.accountSettings', 'Account Settings')}
            </button>
          </div>
          
          <div className="py-1 border-t border-outline-variant/30">
            <button 
              onClick={() => {
                setIsOpen(false);
                if (onLogout) onLogout();
              }}
              className="w-full px-4 py-2 text-left text-sm text-error hover:bg-error-container/50 transition-colors flex items-center gap-3 font-bold"
            >
              <LogOut className="w-4 h-4" />
              {t('menu.signOut', 'Sign Out')}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
