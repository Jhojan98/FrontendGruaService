import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Moon, Sun } from 'lucide-react';

interface LoginProps {
  onLogin: (email: string, password: string) => Promise<void>;
  isDarkMode: boolean;
  setIsDarkMode: (val: boolean) => void;
  isLoading?: boolean;
  error?: string | null;
}

export function Login({ onLogin, isDarkMode, setIsDarkMode, isLoading = false, error = null }: LoginProps) {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [localError, setLocalError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError(null);
    try {
      await onLogin(email.trim(), password);
    } catch (err) {
      if (err instanceof Error && err.message) {
        setLocalError(err.message);
      } else {
        setLocalError('Unable to sign in with the provided credentials');
      }
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center transition-colors duration-300 ${isDarkMode ? 'dark bg-[#1a1c1a] text-[#faf6f0]' : 'bg-[#faf6f0] text-[#2e3230]'}`}>
      <div className="absolute top-4 right-4 z-10 flex gap-4">
         <button
          onClick={() => setIsDarkMode(!isDarkMode)}
          className={`p-2 rounded-full ${isDarkMode ? 'bg-[#2e3230] text-[#c4c8bc] hover:text-white' : 'bg-white text-[#4a4e4a] hover:text-black'} shadow-sm`}
          aria-label={t('settings.appearance')}
        >
          {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>

      <div className={`max-w-md w-full p-8 rounded-2xl shadow-xl transition-colors duration-300 ${isDarkMode ? 'bg-[#2e3230]' : 'bg-white'}`}>
        <div className="text-center mb-8">
          <div className="mx-auto w-16 h-16 bg-[#4a7c59] rounded-xl flex items-center justify-center mb-4 shadow-lg shadow-[#4a7c59]/30">
            <span className="text-[#ffffff] text-2xl font-bold tracking-tighter">TT</span>
          </div>
          <h1 className="text-3xl font-bold mb-2 tracking-tight" style={{ fontFamily: 'Literata, serif' }}>{t('login.welcome')}</h1>
          <p className={`${isDarkMode ? 'text-[#c4c8bc]' : 'text-[#4a4e4a]'} text-sm`}>{t('login.subtitle')}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5" style={{ fontFamily: '"Nunito Sans", sans-serif' }}>
          <div>
            <label className={`block text-sm font-medium mb-1 ${isDarkMode ? 'text-[#e4e0d8]' : 'text-[#2e3230]'}`}>
              {t('login.email')}
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#4a7c59] focus:border-transparent transition-colors ${
                isDarkMode 
                  ? 'bg-[#1a1c1a] border-[#4a4e4a] text-white focus:bg-[#2e3230]' 
                  : 'bg-[#faf6f0] border-[#e4e0d8] text-black focus:bg-white'
              }`}
              placeholder="alex.d@terratowing.com"
              required
            />
          </div>

          <div>
            <label className={`block text-sm font-medium mb-1 ${isDarkMode ? 'text-[#e4e0d8]' : 'text-[#2e3230]'}`}>
              {t('login.password')}
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#4a7c59] focus:border-transparent transition-colors ${
                isDarkMode 
                  ? 'bg-[#1a1c1a] border-[#4a4e4a] text-white focus:bg-[#2e3230]' 
                  : 'bg-[#faf6f0] border-[#e4e0d8] text-black focus:bg-white'
              }`}
              placeholder="••••••••"
              required
            />
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="rounded text-[#4a7c59] focus:ring-[#4a7c59] bg-transparent" />
              <span className={isDarkMode ? 'text-[#c4c8bc]' : 'text-[#4a4e4a]'}>{t('login.rememberMe')}</span>
            </label>
            <a href="#" className="font-medium text-[#4a7c59] hover:text-[#3b6649] transition-colors">{t('login.forgotPassword')}</a>
          </div>

          {(error || localError) && (
            <p className="text-sm text-red-500 font-medium">{error || localError}</p>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 px-4 bg-[#4a7c59] hover:bg-[#3b6649] disabled:opacity-60 disabled:cursor-not-allowed text-white rounded-xl font-medium transition-colors duration-200 mt-6 shadow-md shadow-[#4a7c59]/20"
          >
             {isLoading ? 'Signing in...' : t('login.signIn')}
          </button>
        </form>

        <div className="mt-8 text-center text-xs">
          <p className={isDarkMode ? 'text-[#c4c8bc]' : 'text-[#74796e]'}>
            &copy; 2026 Terra Towing. {t('login.footer')}
          </p>
        </div>
      </div>
    </div>
  );
}
