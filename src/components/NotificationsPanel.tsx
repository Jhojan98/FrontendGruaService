import { useTranslation } from 'react-i18next';
import React, { useState } from 'react';
import { 
  Bell, 
  Settings, 
  X, 
  Truck, 
  AlertTriangle, 
  Wrench, 
  RefreshCw, 
  Trash2 
} from 'lucide-react';
import { cn } from '../lib/utils';

interface NotificationsPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NotificationsPanel: React.FC<NotificationsPanelProps> = ({ isOpen, onClose }) => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('All');
  
  if (!isOpen) return null;

  const tabs = ['All', 'Active Alerts', 'Maintenance', 'System'];

  return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      {/* The backdrop overlay */}
      <div 
        className="absolute inset-0 bg-on-background/20 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      ></div>
      
      {/* The Panel */}
      <div className="relative h-full w-full max-w-md bg-surface shadow-2xl flex flex-col border-l border-outline-variant/20 animate-in slide-in-from-right duration-300">
        
        {/* Header */}
        <div className="p-6 border-b border-outline-variant/30 flex items-center justify-between bg-surface-container-low">
          <div className="flex items-center gap-3">
            <Bell className="w-6 h-6 text-primary" />
            <h2 className="text-2xl font-bold font-headline text-on-surface">{t('notifications', 'Notifications')}</h2>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 hover:bg-surface-container rounded-full transition-colors text-on-surface-variant">
              <Settings className="w-5 h-5" />
            </button>
            <button 
              className="p-2 hover:bg-surface-container rounded-full transition-colors text-on-surface-variant"
              onClick={onClose}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tabs/Categories */}
        <div className="flex px-4 pt-4 border-b border-outline-variant/20 gap-6 overflow-x-auto hide-scrollbar">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "pb-3 text-sm font-medium transition-colors whitespace-nowrap",
                activeTab === tab 
                  ? "text-primary font-bold border-b-2 border-primary" 
                  : "text-on-surface-variant hover:text-on-surface"
              )}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          
          {/* Section: Active Alerts */}
          {(activeTab === 'All' || activeTab === 'Active Alerts') && (
            <section>
              <div className="flex items-center justify-between mb-3 px-2">
                <h3 className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">{t('active_alerts', 'Active Alerts')}</h3>
                <span className="bg-error text-on-error text-[10px] font-bold px-1.5 py-0.5 rounded-full">{t('2_new', '2 NEW')}</span>
              </div>
              
              <div className="space-y-3">
                {/* Alert Item */}
                <div className="p-4 bg-error-container/30 rounded-xl flex gap-4 border border-error/10">
                  <div className="w-10 h-10 bg-error/10 rounded-full flex-shrink-0 flex items-center justify-center">
                    <Truck className="w-5 h-5 text-error" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <h4 className="font-bold text-on-surface">{t('dispatch_delayed', 'Dispatch Delayed')}</h4>
                      <span className="text-xs text-on-surface-variant">{t('2m_ago', '2m ago')}</span>
                    </div>
                    <p className="text-sm text-on-surface-variant mt-1 leading-relaxed">
                      {t('driver_miller__truck__04__reports_heavy_', 'Driver Miller (Truck #04) reports heavy traffic on I-405. Arrival delayed by 15 mins.')}
                    </p>
                    <div className="flex gap-2 mt-3">
                      <button className="text-xs font-bold text-error bg-error/5 hover:bg-error/10 px-3 py-1.5 rounded-lg border border-error/20 transition-colors">
                        {t('reroute', 'Reroute')}
                      </button>
                      <button className="text-xs font-bold text-on-surface-variant hover:bg-surface-container px-3 py-1.5 rounded-lg border border-outline-variant/30 transition-colors">
                        {t('dismiss', 'Dismiss')}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Alert Item 2 */}
                <div className="p-4 bg-surface hover:bg-surface-container-low rounded-xl transition-colors flex gap-4 cursor-pointer border border-transparent hover:border-outline-variant/30">
                  <div className="w-10 h-10 bg-tertiary/10 rounded-full flex-shrink-0 flex items-center justify-center">
                    <AlertTriangle className="w-5 h-5 text-tertiary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <h4 className="font-bold text-on-surface">{t('route_divergence', 'Route Divergence')}</h4>
                      <span className="text-xs text-on-surface-variant">{t('45m_ago', '45m ago')}</span>
                    </div>
                    <p className="text-sm text-on-surface-variant mt-1">
                      {t('truck__08_deviated_from_planned_route_in', 'Truck #08 deviated from planned route in North Hollywood.')}
                    </p>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Section: Maintenance */}
          {(activeTab === 'All' || activeTab === 'Maintenance') && (
            <section>
              <div className="flex items-center justify-between mb-3 px-2">
                <h3 className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">{t('maintenance', 'Maintenance')}</h3>
              </div>
              <div className="space-y-3">
                <div className="p-4 bg-surface hover:bg-surface-container-low rounded-xl transition-colors flex gap-4 cursor-pointer border border-transparent hover:border-outline-variant/30">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex-shrink-0 flex items-center justify-center">
                    <Wrench className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <h4 className="font-bold text-on-surface">{t('service_due__truck__12', 'Service Due: Truck #12')}</h4>
                      <span className="text-xs text-on-surface-variant">{t('3h_ago', '3h ago')}</span>
                    </div>
                    <p className="text-sm text-on-surface-variant mt-1">
                      {t('oil_change_and_brake_inspection_schedule', 'Oil change and brake inspection scheduled for tomorrow at 8:00 AM.')}
                    </p>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Section: System Updates */}
          {(activeTab === 'All' || activeTab === 'System') && (
            <section>
              <div className="flex items-center justify-between mb-3 px-2">
                <h3 className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">{t('system_updates', 'System Updates')}</h3>
              </div>
              <div className="space-y-3">
                <div className="p-4 bg-surface hover:bg-surface-container-low rounded-xl transition-colors flex gap-4 cursor-pointer border border-transparent hover:border-outline-variant/30">
                  <div className="w-10 h-10 bg-secondary/10 rounded-full flex-shrink-0 flex items-center justify-center">
                    <RefreshCw className="w-5 h-5 text-secondary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <h4 className="font-bold text-on-surface">{t('firmware_v2_4_live', 'Firmware v2.4 Live')}</h4>
                      <span className="text-xs text-on-surface-variant">{t('5h_ago', '5h ago')}</span>
                    </div>
                    <p className="text-sm text-on-surface-variant mt-1">
                      {t('new_gps_optimization_features_are_now_av', 'New GPS optimization features are now available for all driver tablets.')}
                    </p>
                  </div>
                </div>
              </div>
            </section>
          )}

        </div>

        {/* Footer */}
        <div className="p-4 border-t border-outline-variant/30 flex items-center justify-between bg-surface">
          <button className="text-on-surface-variant text-sm font-bold hover:text-on-surface flex items-center gap-2 transition-colors">
            <Trash2 className="w-4 h-4" />
            {t('clear_all', 'Clear All')}
          </button>
          <button className="bg-primary text-on-primary px-6 py-2 rounded-xl font-bold text-sm shadow-sm hover:opacity-90 transition-all">
            {t('mark_all_as_read', 'Mark all as read')}
          </button>
        </div>
      </div>
    </div>
  );
};