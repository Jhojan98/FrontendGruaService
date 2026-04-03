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
import { useAuth } from '../contexts/AuthContext';
import { UpdateMePayload } from '../types';

export interface SettingsPageProps {
  isDarkMode: boolean;
  setIsDarkMode: (val: boolean | ((prev: boolean) => boolean)) => void;
}

function ToggleSwitch({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: (value: boolean) => void;
  label: string;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${checked ? 'bg-primary' : 'bg-surface-container-high'}`}
    >
      <span
        className={`inline-block h-5 w-5 transform rounded-full bg-surface transition-transform ${checked ? 'translate-x-5' : 'translate-x-0.5'}`}
      />
    </button>
  );
}

export const SettingsPage: React.FC<SettingsPageProps> = ({ isDarkMode, setIsDarkMode }) => {
  const { t, i18n } = useTranslation();
  const { user, updateMe, isSubmitting, error, clearError } = useAuth();
  const [fullName, setFullName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [employeeId, setEmployeeId] = React.useState('');
  const [officeLocation, setOfficeLocation] = React.useState('');
  const [language, setLanguage] = React.useState(i18n.language || 'en');
  const [emailAlerts, setEmailAlerts] = React.useState(true);
  const [smsUrgentAlerts, setSmsUrgentAlerts] = React.useState(true);
  const [browserNotifications, setBrowserNotifications] = React.useState(true);
  const [profileImageUrl, setProfileImageUrl] = React.useState<string | null>(null);
  const [selectedFile, setSelectedFile] = React.useState<File | null>(null);
  const [saveMessage, setSaveMessage] = React.useState<string | null>(null);
  const [formError, setFormError] = React.useState<string | null>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (!user) {
      return;
    }

    setFullName(user.full_name);
    setEmail(user.email);
    setEmployeeId(user.employee_id ?? '');
    setOfficeLocation(user.office_location ?? '');
    setLanguage(user.language || 'en');
    setEmailAlerts(user.email_alerts);
    setSmsUrgentAlerts(user.sms_urgent_alerts);
    setBrowserNotifications(user.browser_notifications);
    setProfileImageUrl(user.profile_image_url);
  }, [user]);

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLang = e.target.value;
    setLanguage(newLang);
  };

  const triggerFilePicker = () => {
    fileInputRef.current?.click();
  };

  const handleImageSelected = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    setSelectedFile(file);
    setProfileImageUrl(URL.createObjectURL(file));
  };

  const handleSaveChanges = async () => {
    setFormError(null);
    setSaveMessage(null);
    clearError();

    const trimmedName = fullName.trim();
    const trimmedEmail = email.trim();

    if (!trimmedName) {
      setFormError('Full name is required');
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(trimmedEmail)) {
      setFormError('Please enter a valid email address');
      return;
    }

    const payload: UpdateMePayload = {
      full_name: trimmedName,
      email: trimmedEmail,
      employee_id: employeeId.trim() || null,
      office_location: officeLocation.trim() || null,
      theme: isDarkMode ? 'dark' : 'light',
      language,
      email_alerts: emailAlerts,
      sms_urgent_alerts: smsUrgentAlerts,
      browser_notifications: browserNotifications,
    };

    try {
      const updated = await updateMe(payload, selectedFile);
      i18n.changeLanguage(updated.language);
      localStorage.setItem('language', updated.language);
      setIsDarkMode(updated.theme === 'dark');
      setSelectedFile(null);
      setSaveMessage('Profile updated successfully');
    } catch (err) {
      if (err instanceof Error) {
        setFormError(err.message);
      } else {
        setFormError('Could not save changes. Please try again.');
      }
    }
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
              src={profileImageUrl ?? 'https://picsum.photos/seed/profile/240/240'}
            />
            <button
              onClick={triggerFilePicker}
              className="absolute -bottom-2 -right-2 bg-primary text-on-primary p-2 rounded-full shadow-lg hover:scale-105 transition-transform"
            >
              <Edit2 className="w-4 h-4" />
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageSelected}
            />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-start mb-6">
              <div className="min-w-0 pr-4">
                <h3
                  className="text-2xl font-headline font-bold text-on-background truncate"
                  title={fullName || t('unknown_user', 'Unknown User')}
                >
                  {fullName || t('unknown_user', 'Unknown User')}
                </h3>
                <p className="text-primary font-bold text-sm">{user?.role ?? t('dispatcher', 'Dispatcher')}</p>
              </div>
              <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">{t('active', 'Active')}</span>
            </div>
            <div className="grid grid-cols-2 gap-6 font-body text-sm">
              <div>
                <label className="block text-outline mb-1">{t('email_address', 'Email Address')}</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-surface border border-outline-variant/50 rounded-xl text-sm py-2.5 px-4 focus:ring-2 focus:ring-primary/20"
                />
              </div>
              <div>
                <label className="block text-outline mb-1">{t('employee_id', 'Employee ID')}</label>
                <input
                  type="text"
                  value={employeeId}
                  onChange={(e) => setEmployeeId(e.target.value)}
                  className="w-full bg-surface border border-outline-variant/50 rounded-xl text-sm py-2.5 px-4 focus:ring-2 focus:ring-primary/20"
                />
              </div>
              <div className="col-span-2">
                <label className="block text-outline mb-1">{t('full_name', 'Full Name')}</label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full bg-surface border border-outline-variant/50 rounded-xl text-sm py-2.5 px-4 focus:ring-2 focus:ring-primary/20"
                />
              </div>
              <div className="col-span-2">
                <label className="block text-outline mb-1">{t('office_location', 'Office Location')}</label>
                <input
                  type="text"
                  value={officeLocation}
                  onChange={(e) => setOfficeLocation(e.target.value)}
                  className="w-full bg-surface border border-outline-variant/50 rounded-xl text-sm py-2.5 px-4 focus:ring-2 focus:ring-primary/20"
                />
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
            <button disabled className="bg-primary text-on-primary px-6 py-2.5 rounded-xl font-bold text-sm opacity-60 cursor-not-allowed">
              {t('update_password', 'Update Password')}
            </button>
            <p className="text-xs text-primary/70 mt-2">{t('coming_soon', 'Coming soon')}</p>
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
                value={language}
                onChange={handleLanguageChange}
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
                <ToggleSwitch checked={emailAlerts} onChange={setEmailAlerts} label={t('email_alerts', 'Email Alerts')} />
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
                <ToggleSwitch checked={smsUrgentAlerts} onChange={setSmsUrgentAlerts} label={t('sms_urgent_alerts', 'SMS Urgent Alerts')} />
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
                <ToggleSwitch checked={browserNotifications} onChange={setBrowserNotifications} label={t('browser_notifications', 'Browser Notifications')} />
              </div>
            </div>

            {(formError || error) && (
              <p className="text-sm text-red-500 mt-4">{formError || error}</p>
            )}
            {saveMessage && <p className="text-sm text-green-600 mt-4">{saveMessage}</p>}
            
            <div className="mt-8 pt-6 border-t border-outline-variant/30 dark:border-outline-variant/30 flex justify-end gap-3">
              <button
                onClick={() => {
                  if (!user) {
                    return;
                  }
                  setFullName(user.full_name);
                  setEmail(user.email);
                  setEmployeeId(user.employee_id ?? '');
                  setOfficeLocation(user.office_location ?? '');
                  setLanguage(user.language || 'en');
                  setEmailAlerts(user.email_alerts);
                  setSmsUrgentAlerts(user.sms_urgent_alerts);
                  setBrowserNotifications(user.browser_notifications);
                  setProfileImageUrl(user.profile_image_url);
                  setSelectedFile(null);
                  setFormError(null);
                  setSaveMessage(null);
                }}
                className="px-6 py-2.5 rounded-xl text-on-surface-variant font-bold text-sm hover:bg-surface-container-low transition-colors"
              >
                {t('reset_defaults', 'Reset Defaults')}
              </button>
              <button
                onClick={handleSaveChanges}
                disabled={isSubmitting}
                className="bg-primary text-on-primary px-8 py-2.5 rounded-xl font-bold text-sm shadow-sm hover:opacity-90 disabled:opacity-60 disabled:cursor-not-allowed transition-opacity"
              >
                {isSubmitting ? t('saving', 'Saving...') : t('save_changes', 'Save Changes')}
              </button>
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
