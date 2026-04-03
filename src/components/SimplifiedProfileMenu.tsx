import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { LogOut, User, Settings as SettingsIcon } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export function SimplifiedProfileMenu({
  onLogout,
  onViewChange
}: {
  onLogout?: () => void;
  onViewChange?: (view: string) => void;
}) {
  const { t } = useTranslation();
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const displayName = user?.full_name ?? t('unknown_user', 'Unknown User');
  const displayEmail = user?.email ?? t('no_email', 'No email');
  const initials = displayName
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('');

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
        {user?.profile_image_url ? (
          <img
            alt="User profile"
            className="w-full h-full object-cover"
            src={user.profile_image_url}
            referrerPolicy="no-referrer"
          />
        ) : (
          <span className="text-xs font-bold text-primary">{initials || 'U'}</span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 rounded-xl bg-surface shadow-lg border border-outline-variant/30 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="px-4 py-3 border-b border-outline-variant/30">
            <p className="text-sm font-bold text-on-surface font-headline truncate" title={displayName}>{displayName}</p>
            <p className="text-xs text-on-surface-variant font-medium mt-0.5 truncate" title={displayEmail}>{displayEmail}</p>
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
