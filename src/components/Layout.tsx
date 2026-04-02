import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  LayoutDashboard, 
  History, 
  Users, 
  Truck, 
  Settings, 
  HelpCircle, 
  Search, 
  Moon, 
  Sun,
  Bell, 
  Tractor,
  Plus,
  PieChart,
  Home,
  ChevronRight,
  Radio,
  Menu,
  X
} from 'lucide-react';
import { cn } from '../lib/utils';
import { NotificationsPanel } from './NotificationsPanel';

export const Layout = ({ 
  children, 
  currentView, 
  onViewChange,
  isDarkMode,
  setIsDarkMode
}: { 
  children: React.ReactNode;
  currentView: string;
  onViewChange: (view: string) => void;
  isDarkMode: boolean;
  setIsDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { t } = useTranslation();
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background text-on-background overflow-hidden flex flex-col">
      {/* Top Navigation */}
      <header className="fixed top-0 w-full z-50 flex h-16 bg-background border-b border-outline-variant/30 shadow-sm">
        
        {/* Desktop Brand / Logo (Takes up sidebar width) */}
        <div className="hidden md:flex items-center gap-2 w-64 px-4 border-r border-outline-variant/30">
          <div className="w-8 h-8 rounded bg-primary flex items-center justify-center text-on-primary">
            <Tractor className="w-5 h-5" />
          </div>
          <span className="font-bold text-lg text-primary tracking-tight">{t('terra_towing', 'Terra Towing')}</span>
        </div>

        {/* Global Header Content */}
        <div className="flex flex-1 justify-between items-center px-4 md:px-6">
          <div className="flex items-center gap-2 md:gap-4">
            <button 
              className="p-2 -ml-2 text-on-surface-variant hover:bg-surface-container-low rounded-full transition-colors md:hidden"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="md:hidden flex items-center gap-2">
              <div className="w-6 h-6 rounded bg-primary flex items-center justify-center text-on-primary">
                <Tractor className="w-3.5 h-3.5" />
              </div>
            </div>
            <nav className="flex items-center gap-1 md:gap-2 text-xs font-medium text-on-surface-variant">
              <span className="hidden sm:inline">{t("common.home")}</span>
              <ChevronRight className="w-3.5 h-3.5 hidden sm:block" />
              <span className="text-primary font-bold capitalize">{currentView.replace('-', ' ')}</span>
            </nav>
          </div>
          
          <div className="flex items-center gap-2 md:gap-4">
            <div className="hidden lg:flex items-center bg-surface-container rounded-full px-4 py-1.5 border border-outline-variant">
              <Search className="text-outline w-4 h-4" />
              <input 
                className="bg-transparent border-none focus:ring-0 text-sm w-48 font-body ml-2 outline-none" 
                placeholder={t("nav.search")} 
                type="text"
              />
            </div>
            <button 
              className="p-2 text-on-surface-variant hover:bg-surface-container-low rounded-full transition-colors"
              onClick={() => setIsDarkMode(prev => !prev)}
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <button 
              className="p-2 text-on-surface-variant hover:bg-surface-container-low rounded-full transition-colors relative"
              onClick={() => setIsNotificationsOpen(true)}
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-error rounded-full"></span>
            </button>
            <div className="h-8 w-8 rounded-full bg-primary-container flex items-center justify-center overflow-hidden border border-outline-variant/30">
              <img 
                alt="User profile" 
                className="w-full h-full object-cover" 
                src="https://picsum.photos/seed/user/100/100"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-1 pt-16">
        {/* Sidebar */}
        <aside className="fixed left-0 h-[calc(100vh-64px)] w-64 p-4 flex flex-col gap-2 bg-background border-r border-outline-variant/30 z-40 hidden md:flex">
          <div className="px-4 py-6 mb-2">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center text-on-primary">
                <Tractor className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-sm font-bold font-headline text-primary">{t('dispatch_center', 'Dispatch Center')}</h2>
                <p className="text-[10px] text-on-surface-variant font-semibold uppercase tracking-wider">{t('active_fleet__12', 'Active Fleet: 12')}</p>
              </div>
            </div>
          </div>

          <nav className="flex-1 flex flex-col gap-1">
            <SidebarItem 
              icon={<Home className="w-5 h-5" />} 
              label={t("nav.dashboard")} 
              active={currentView === 'home'} 
              onClick={() => onViewChange('home')}
            />
            <SidebarItem 
              icon={<Radio className="w-5 h-5" />} 
              label={t("nav.liveDispatch")} 
              active={currentView === 'live-dispatch'} 
              onClick={() => onViewChange('live-dispatch')}
            />
            <SidebarItem 
              icon={<History className="w-5 h-5" />} 
              label={t("nav.tripsHistory")} 
              active={currentView === 'history'} 
              onClick={() => onViewChange('history')}
            />
            <SidebarItem 
              icon={<Users className="w-5 h-5" />} 
              label={t("nav.clients")} 
              active={currentView === 'clients'}
              onClick={() => onViewChange('clients')}
            />
            <SidebarItem 
              icon={<Truck className="w-5 h-5" />} 
              label={t("nav.towTrucks")} 
              active={currentView === 'fleet'}
              onClick={() => onViewChange('fleet')}
            />
            <SidebarItem 
              icon={<PieChart className="w-5 h-5" />} 
              label={t("nav.analytics")} 
              active={currentView === 'analytics'}
              onClick={() => onViewChange('analytics')}
            />
          </nav>

          <div className="mt-auto pt-4 flex flex-col gap-1 border-t border-outline-variant/30">
            <SidebarItem 
              icon={<Settings className="w-5 h-5" />} 
              label={t("nav.settings")} 
              active={currentView === 'settings'}
              onClick={() => onViewChange('settings')}
            />
            <SidebarItem 
              icon={<HelpCircle className="w-5 h-5" />} 
              label={t("nav.support")} 
              active={currentView === 'support'}
              onClick={() => onViewChange('support')}
            />
          </div>

          <div className="mt-4 p-4 bg-primary/5 rounded-2xl border border-primary/10">
            <button 
              onClick={() => onViewChange('live-dispatch')}
              className="w-full py-3 bg-primary text-on-primary rounded-xl text-xs font-bold flex items-center justify-center gap-2 hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
            >
              <Plus className="w-4 h-4" />
              {t('new_trip', 'New Trip')}
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="md:pl-64 flex-1 h-[calc(100vh-128px)] md:h-[calc(100vh-64px)] overflow-hidden">
          {children}
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full bg-surface-container-low border-t border-outline-variant/30 flex justify-around items-center h-16 z-50 px-2 pb-safe">
        <MobileNavItem 
          icon={<Home className="w-6 h-6 pointer-events-none" />} 
          label={t("nav.dashboard")} 
          active={currentView === 'home'} 
          onClick={() => onViewChange('home')}
        />
        <MobileNavItem 
          icon={<History className="w-6 h-6 pointer-events-none" />} 
          label={t("nav.tripsHistory")} 
          active={currentView === 'history'} 
          onClick={() => onViewChange('history')}
        />
        <MobileNavItem 
          icon={<Users className="w-6 h-6 pointer-events-none" />} 
          label={t("nav.clients")} 
          active={currentView === 'clients'} 
          onClick={() => onViewChange('clients')}
        />
        <MobileNavItem 
          icon={<Truck className="w-6 h-6 pointer-events-none" />} 
          label={t("nav.towTrucks")} 
          active={currentView === 'fleet'}
          onClick={() => onViewChange('fleet')}
        />
      </nav>

      {/* Mobile Full Navigation Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-[100] flex">
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm" 
            onClick={() => setIsMobileMenuOpen(false)}
          ></div>
          <aside className="relative w-72 max-w-[80vw] h-full bg-background flex flex-col pt-6 pb-24 shadow-2xl animate-in slide-in-from-left duration-300">
            <div className="px-6 flex items-center justify-between mb-8">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded bg-primary flex items-center justify-center text-on-primary">
                  <Tractor className="w-5 h-5" />
                </div>
                <span className="font-bold text-lg text-primary">{t('terra_towing', 'Terra Towing')}</span>
              </div>
              <button 
                className="p-2 text-on-surface-variant hover:bg-surface-container-low rounded-full"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="px-4 flex-1 overflow-y-auto hide-scrollbar space-y-6">
              <div>
                <p className="px-4 text-xs font-bold text-outline uppercase tracking-wider mb-2">{t('main_menu', 'Main Menu')}</p>
                <nav className="flex flex-col gap-1">
                  <SidebarItem 
                    icon={<Home className="w-5 h-5" />} 
                    label={t("nav.dashboard")} 
                    active={currentView === 'home'} 
                    onClick={() => { onViewChange('home'); setIsMobileMenuOpen(false); }}
                  />
                  <SidebarItem 
                    icon={<Radio className="w-5 h-5" />} 
                    label={t("nav.liveDispatch")} 
                    active={currentView === 'live-dispatch'} 
                    onClick={() => { onViewChange('live-dispatch'); setIsMobileMenuOpen(false); }}
                  />
                  <SidebarItem 
                    icon={<History className="w-5 h-5" />} 
                    label={t("nav.tripsHistory")} 
                    active={currentView === 'history'} 
                    onClick={() => { onViewChange('history'); setIsMobileMenuOpen(false); }}
                  />
                  <SidebarItem 
                    icon={<Users className="w-5 h-5" />} 
                    label={t("nav.clients")} 
                    active={currentView === 'clients'}
                    onClick={() => { onViewChange('clients'); setIsMobileMenuOpen(false); }}
                  />
                  <SidebarItem 
                    icon={<Truck className="w-5 h-5" />} 
                    label={t("nav.towTrucks")} 
                    active={currentView === 'fleet'}
                    onClick={() => { onViewChange('fleet'); setIsMobileMenuOpen(false); }}
                  />
                </nav>
              </div>

              <div>
                <p className="px-4 text-xs font-bold text-outline uppercase tracking-wider mb-2">{t('insights', 'Insights')}</p>
                <nav className="flex flex-col gap-1">
                  <SidebarItem 
                    icon={<PieChart className="w-5 h-5" />} 
                    label={t("nav.analytics")} 
                    active={currentView === 'analytics'}
                    onClick={() => { onViewChange('analytics'); setIsMobileMenuOpen(false); }}
                  />
                </nav>
              </div>

              <div>
                <p className="px-4 text-xs font-bold text-outline uppercase tracking-wider mb-2">{t('system', 'System')}</p>
                <nav className="flex flex-col gap-1">
                  <SidebarItem 
                    icon={<Settings className="w-5 h-5" />} 
                    label={t("nav.settings")} 
                    active={currentView === 'settings'}
                    onClick={() => { onViewChange('settings'); setIsMobileMenuOpen(false); }}
                  />
                  <SidebarItem 
                    icon={<HelpCircle className="w-5 h-5" />} 
                    label={t("nav.support")} 
                    active={currentView === 'support'}
                    onClick={() => { onViewChange('support'); setIsMobileMenuOpen(false); }}
                  />
                </nav>
              </div>
            </div>

            <div className="px-6 mt-4">
              <button 
                onClick={() => { onViewChange('live-dispatch'); setIsMobileMenuOpen(false); }}
                className="w-full py-3.5 bg-primary text-on-primary rounded-xl text-sm font-bold flex items-center justify-center gap-2 shadow-lg shadow-primary/20"
              >
                <Plus className="w-5 h-5" />
                {t('new_quick_trip', 'New Quick Trip')}
              </button>
            </div>
          </aside>
        </div>
      )}

      {/* Notifications Panel Overlay */}
      <NotificationsPanel 
        isOpen={isNotificationsOpen} 
        onClose={() => setIsNotificationsOpen(false)} 
      />
    </div>
  );
};

const MobileNavItem = ({ 
  icon, 
  label, 
  active = false,
  onClick
}: { 
  icon: React.ReactNode; 
  label: string; 
  active?: boolean;
  onClick?: () => void;
}) => (
  <button 
    onClick={onClick}
    className={cn(
      "flex flex-col items-center justify-center gap-1 flex-1 h-full",
      active 
        ? "text-primary" 
        : "text-on-surface-variant hover:text-on-surface"
    )} 
  >
    <div className={cn(
      "px-4 py-1 rounded-full flex items-center justify-center transition-colors",
      active ? "bg-primary/20" : "bg-transparent"
    )}>
      {icon}
    </div>
    <span className="text-[10px] font-semibold">{label}</span>
  </button>
);

const SidebarItem = ({ 
  icon, 
  label, 
  active = false,
  onClick
}: { 
  icon: React.ReactNode; 
  label: string; 
  active?: boolean;
  onClick?: () => void;
}) => (
  <button 
    onClick={onClick}
    className={cn(
      "flex items-center gap-3 rounded-xl px-4 py-3 transition-all w-full text-left",
      active 
        ? "bg-primary/10 text-primary" 
        : "text-on-surface-variant hover:bg-surface-container-low"
    )} 
  >
    {icon}
    <span className="font-semibold text-sm">{label}</span>
  </button>
);
