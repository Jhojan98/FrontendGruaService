import React from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Edit2, 
  Shield, 
  Sliders, 
  Sun, 
  Moon, 
  BellRing, 
  Mail, 
  MessageSquare, 
  AppWindow 
} from 'lucide-react';

export interface SettingsPageProps {
  isDarkMode: boolean;
  setIsDarkMode: (val: boolean | ((prev: boolean) => boolean)) => void;
  onViewChange?: (view: string) => void;
}

export const SettingsPage: React.FC<SettingsPageProps> = ({ isDarkMode, setIsDarkMode, onViewChange }) => {
  const { t, i18n } = useTranslation();

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLang = e.target.value;
    i18n.changeLanguage(newLang);
    localStorage.setItem('language', newLang);
  };

  return (
    <div className="p-10 max-w-6xl mx-auto overflow-y-auto h-full pb-24 md:pb-8">
      <div className="mb-10">
        <h2 className="text-4xl font-headline font-bold text-on-background mb-2">{t('settings.title')}</h2>
        <p className="text-on-surface-variant font-body">{t('settings.subtitle')}</p>
      </div>

      <div className="grid grid-cols-12 gap-8">
        {/* Profile Section (Bento Style) */}
        <div className="col-span-12 lg:col-span-7 bg-surface-container-low rounded-xl p-8 flex items-start gap-8 shadow-sm">
          <div className="relative group">
            <img 
              className="w-32 h-32 rounded-xl object-cover shadow-md" 
              alt="close up headshot of male senior dispatcher with warm lighting and organic soft focus background" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCRKLoBDM8al8purQ4ioQYwWhF5nEHmnKhFTURm8tuu8FgCM0kcRi1N7W5r9heFvkiKAA6HkK03OMjpaOe6dpS-qBQggy_1THE526OVce7H_1R063tts9QxOX7xt6kqg-rtMmwLf0SwVQqO2w_JmgAHNgo7zIJrmtQqQcty9Axz91gFfwe9NnXMqfRH_vumHLNTjDSOMEoSZt5Rs3LERfYjh3xWNDB3f-fD6Xeyqaq6GajKcSRWMCpB4Awsg1S7C8UpHE0iLR32LCY"
            />
            <button className="absolute -bottom-2 -right-2 bg-primary text-on-primary p-2 rounded-full shadow-lg hover:scale-105 transition-transform">
              <Edit2 className="w-4 h-4" />
            </button>
          </div>
          <div className="flex-1">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-2xl font-headline font-bold text-on-background">{t('alex_dispatcher', 'Alex Dispatcher')}</h3>
                <p className="text-primary font-bold text-sm">{t('senior_dispatcher', 'Senior Dispatcher')}</p>
              </div>
              <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">{t('active', 'Active')}</span>
            </div>
            <div className="grid grid-cols-2 gap-6 font-body text-sm">
              <div>
                <label className="block text-outline mb-1">{t('email_address', 'Email Address')}</label>
                <p className="text-on-background font-semibold">{t('alex_d_terratowing_com', 'alex.d@terratowing.com')}</p>
              </div>
              <div>
                <label className="block text-outline mb-1">{t('employee_id', 'Employee ID')}</label>
                <p className="text-on-background font-semibold">{t('tt_8842_sd', 'TT-8842-SD')}</p>
              </div>
              <div className="col-span-2">
                <label className="block text-outline mb-1">{t('office_location', 'Office Location')}</label>
                <p className="text-on-background font-semibold">{t('northwest_regional_hub___portland__or', 'Northwest Regional Hub — Portland, OR')}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Security Quick Card */}
        <div className="col-span-12 lg:col-span-5 bg-primary/10 rounded-xl p-8 relative overflow-hidden shadow-sm">
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4 text-primary">
              <Shield className="w-6 h-6" />
              <h3 className="text-xl font-headline font-bold">{t('account_security', 'Account Security')}</h3>
            </div>
            <p className="text-primary/80 text-sm mb-6 leading-relaxed">
              {t('your_password_was_last_changed_42_days_a', 'Your password was last changed 42 days ago. We recommend updating it every 90 days.')}
            </p>
            <button className="bg-primary text-on-primary px-6 py-2.5 rounded-xl font-bold text-sm hover:opacity-90 transition-opacity">
              {t('update_password', 'Update Password')}
            </button>
            <div className="mt-3 flex flex-wrap gap-2">
              <button
                className="px-4 py-2 rounded-xl border border-primary/30 text-primary text-xs font-bold hover:bg-primary/5 transition-colors"
                onClick={() => onViewChange?.('settings/internal-users')}
              >
                {t('internal_user_management', 'Internal User Management')}
              </button>
              <button
                className="px-4 py-2 rounded-xl border border-primary/30 text-primary text-xs font-bold hover:bg-primary/5 transition-colors"
                onClick={() => onViewChange?.('settings/tariff-billing')}
              >
                {t('tariff_billing_admin', 'Tariff & Billing Admin')}
              </button>
            </div>
          </div>
          <Shield className="absolute -bottom-4 -right-4 w-32 h-32 text-primary/10 pointer-events-none" />
        </div>

        {/* Preferences (Asymmetric Grid) */}
        <div className="col-span-12 lg:col-span-4 bg-surface-container-low rounded-xl p-8 shadow-sm">
          <h3 className="text-xl font-headline font-bold mb-6 flex items-center gap-3">
            <Sliders className="w-6 h-6 text-primary" />
            {t('preferences', 'Preferences')}
          </h3>
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                {/* App Preferences */}
                <p className="font-bold text-sm">{t('settings.appearance')}</p>
                <p className="text-xs text-on-surface-variant">{t('toggle_light_or_dark_mode', 'Toggle light or dark mode')}</p>
              </div>
              <div className="flex bg-surface-container/50 rounded-lg p-1 border border-outline-variant/30">
                <button 
                  onClick={() => setIsDarkMode(false)}
                  className={`p-1.5 rounded-md transition-all ${!isDarkMode ? 'bg-surface shadow-sm text-primary' : 'text-on-surface-variant hover:text-on-surface'}`}>
                  <Sun className="w-5 h-5" />
                </button>
                <button 
                  onClick={() => setIsDarkMode(true)}
                  className={`p-1.5 rounded-md transition-all ${isDarkMode ? 'bg-surface shadow-sm text-primary' : 'text-on-surface-variant hover:text-on-surface'}`}>
                  <Moon className="w-5 h-5" />
                </button>
              </div>
            </div>
            
            {/* Language */}
            <div className="border-t border-outline-variant/30 dark:border-outline-variant/30 pt-6">
              <label className="block font-bold text-sm mb-3">{t('settings.language', 'System Language')}</label>
              <select 
                value={i18n.language}
                onChange={(e) => {
                    i18n.changeLanguage(e.target.value);
                    localStorage.setItem('language', e.target.value);
                }}
                className="w-full bg-surface border border-outline-variant/50 rounded-xl text-sm py-2.5 px-4 focus:ring-2 focus:ring-primary/20 appearance-none"
              >
                <option value="en">{t('english__us', 'English (US)')}</option>
                <option value="es">{t('espa_ol__es', 'Español (ES)')}</option>
              </select>
            </div>

            <div className="border-t border-outline-variant/30 dark:border-outline-variant/30 pt-6">
              <label className="block font-bold text-sm mb-3">{t('measurement_units', 'Measurement Units')}</label>
              <div className="grid grid-cols-2 gap-2">
                <button className="py-2 px-4 rounded-xl border-2 border-primary bg-primary/5 text-primary font-bold text-xs">{t('miles__mi', 'Miles (mi)')}</button>
                <button className="py-2 px-4 rounded-xl border-2 border-outline-variant text-on-surface-variant font-bold text-xs hover:border-primary/50 transition-colors">{t('kilometers__km', 'Kilometers (km)')}</button>
              </div>
            </div>
          </div>
        </div>

        {/* Notifications (Table/List Mix) */}
        <div className="col-span-12 lg:col-span-8 bg-surface-container-low rounded-xl p-8 shadow-sm">
          <h3 className="text-xl font-headline font-bold mb-6 flex items-center gap-3">
            <BellRing className="w-6 h-6 text-primary" />
            {t('notification_settings', 'Notification Settings')}
          </h3>
          <div className="space-y-1">
            {/* Row 1 */}
            <div className="flex items-center justify-between p-4 rounded-xl hover:bg-surface-container transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-bold text-sm">{t('email_alerts', 'Email Alerts')}</p>
                  <p className="text-xs text-on-surface-variant">{t('summary_reports_and_non_urgent_updates', 'Summary reports and non-urgent updates')}</p>
                </div>
              </div>
              <div className="relative inline-flex items-center cursor-pointer">
                <input defaultChecked className="sr-only peer" type="checkbox" />
                <div className="w-11 h-6 bg-surface-container-high rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-surface after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </div>
            </div>

            {/* Row 2 */}
            <div className="flex items-center justify-between p-4 rounded-xl hover:bg-surface-container transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-tertiary/10 flex items-center justify-center text-tertiary">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-bold text-sm">{t('sms_urgent_alerts', 'SMS Urgent Alerts')}</p>
                  <p className="text-xs text-on-surface-variant">{t('instant_notification_for_high_priority_d', 'Instant notification for high-priority dispatch')}</p>
                </div>
              </div>
              <div className="relative inline-flex items-center cursor-pointer">
                <input defaultChecked className="sr-only peer" type="checkbox" />
                <div className="w-11 h-6 bg-surface-container-high rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-surface after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </div>
            </div>

            {/* Row 3 */}
            <div className="flex items-center justify-between p-4 rounded-xl hover:bg-surface-container transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant">
                  <AppWindow className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-bold text-sm">{t('browser_notifications', 'Browser Notifications')}</p>
                  <p className="text-xs text-on-surface-variant">{t('real_time_web_dashboard_popups', 'Real-time web dashboard popups')}</p>
                </div>
              </div>
              <div className="relative inline-flex items-center cursor-pointer">
                <input className="sr-only peer" type="checkbox" />
                <div className="w-11 h-6 bg-surface-container-high rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-surface after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </div>
            </div>
            
            <div className="mt-8 pt-6 border-t border-outline-variant/30 dark:border-outline-variant/30 flex justify-end gap-3">
              <button className="px-6 py-2.5 rounded-xl text-on-surface-variant font-bold text-sm hover:bg-surface-container-low transition-colors">{t('reset_defaults', 'Reset Defaults')}</button>
              <button className="bg-primary text-on-primary px-8 py-2.5 rounded-xl font-bold text-sm shadow-sm hover:opacity-90 transition-opacity">{t('save_changes', 'Save Changes')}</button>
            </div>
          </div>
        </div>

      </div>

      {/* Footer Section */}
      <footer className="mt-16 text-center border-t border-outline-variant/30 dark:border-outline-variant/30 pt-8 pb-12">
        <div className="flex justify-center gap-6 mb-4">
          <a className="text-xs font-bold text-outline hover:text-primary uppercase tracking-widest transition-colors" href="#">{t('privacy_policy', 'Privacy Policy')}</a>
          <a className="text-xs font-bold text-outline hover:text-primary uppercase tracking-widest transition-colors" href="#">{t('terms_of_service', 'Terms of Service')}</a>
          <a className="text-xs font-bold text-outline hover:text-primary uppercase tracking-widest transition-colors" href="#">{t('compliance', 'Compliance')}</a>
        </div>
        <p className="text-outline text-xs">{t('2024_terra_towing_fleet_management_syste', '© 2024 Terra Towing Fleet Management Systems. Version 4.2.0-stable')}</p>
      </footer>
    </div>
  );
}
