'use client';

import { useState } from 'react';
import { Palette, Globe, Moon, Sun, Monitor, Gauge, MapPin } from 'lucide-react';
import { useTypedTranslation } from '@/lib/i18n';

export default function PreferencesSettingsPage() {
  const { t } = useTypedTranslation('client');
  
  const [preferences, setPreferences] = useState({
    theme: 'system',
    language: 'en',
    currency: 'usd',
    units: 'metric',
    location: 'auto',
    emailFrequency: 'daily',
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="rounded-2xl border border-white/20 bg-white/80 p-8 backdrop-blur-xl dark:bg-slate-900/80">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-primary/10 p-3">
            <Palette className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
              {t('settings.preferences.title') || 'Preferences'}
            </h1>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
              {t('settings.preferences.description') || 'Customize your experience on the platform'}
            </p>
          </div>
        </div>
      </div>

      {/* Appearance */}
      <div className="rounded-2xl border border-white/20 bg-white/80 p-8 backdrop-blur-xl dark:bg-slate-900/80">
        <div className="mb-6 flex items-center gap-3">
          <Palette className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Appearance</h2>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="mb-3 block text-sm font-medium text-slate-900 dark:text-white">
              Theme
            </label>
            <div className="grid grid-cols-3 gap-3">
              <button
                onClick={() => setPreferences({ ...preferences, theme: 'light' })}
                className={`flex flex-col items-center gap-2 rounded-lg border p-4 transition-all ${
                  preferences.theme === 'light'
                    ? 'border-primary bg-primary/10 shadow-sm ring-1 ring-primary/20'
                    : 'border-slate-200 bg-slate-50/50 hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-900/30 dark:hover:bg-slate-800/50'
                }`}
              >
                <Sun className="h-5 w-5 text-slate-900 dark:text-white" />
                <span className="text-sm font-medium text-slate-900 dark:text-white">Light</span>
              </button>
              <button
                onClick={() => setPreferences({ ...preferences, theme: 'dark' })}
                className={`flex flex-col items-center gap-2 rounded-lg border p-4 transition-all ${
                  preferences.theme === 'dark'
                    ? 'border-primary bg-primary/10 shadow-sm ring-1 ring-primary/20'
                    : 'border-slate-200 bg-slate-50/50 hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-900/30 dark:hover:bg-slate-800/50'
                }`}
              >
                <Moon className="h-5 w-5 text-slate-900 dark:text-white" />
                <span className="text-sm font-medium text-slate-900 dark:text-white">Dark</span>
              </button>
              <button
                onClick={() => setPreferences({ ...preferences, theme: 'system' })}
                className={`flex flex-col items-center gap-2 rounded-lg border p-4 transition-all ${
                  preferences.theme === 'system'
                    ? 'border-primary bg-primary/10 shadow-sm ring-1 ring-primary/20'
                    : 'border-slate-200 bg-slate-50/50 hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-900/30 dark:hover:bg-slate-800/50'
                }`}
              >
                <Monitor className="h-5 w-5 text-slate-900 dark:text-white" />
                <span className="text-sm font-medium text-slate-900 dark:text-white">System</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Regional Settings */}
      <div className="rounded-2xl border border-white/20 bg-white/80 p-8 backdrop-blur-xl dark:bg-slate-900/80">
        <div className="mb-6 flex items-center gap-3">
          <Globe className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Regional Settings</h2>
        </div>
        
        <div className="space-y-6">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-900 dark:text-white">
              Language
            </label>
            <select
              value={preferences.language}
              onChange={(e) => setPreferences({ ...preferences, language: e.target.value })}
              className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-slate-900 transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 dark:border-slate-800 dark:bg-slate-900 dark:text-white"
            >
              <option value="en">English</option>
              <option value="uk">Українська</option>
              <option value="pl">Polski</option>
              <option value="sk">Slovenčina</option>
              <option value="de">Deutsch</option>
              <option value="fr">Français</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-900 dark:text-white">
              Currency
            </label>
            <select
              value={preferences.currency}
              onChange={(e) => setPreferences({ ...preferences, currency: e.target.value })}
              className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-slate-900 transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 dark:border-slate-800 dark:bg-slate-900 dark:text-white"
            >
              <option value="usd">USD ($)</option>
              <option value="eur">EUR (€)</option>
              <option value="uah">UAH (₴)</option>
              <option value="pln">PLN (zł)</option>
              <option value="czk">CZK (Kč)</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-900 dark:text-white">
              <div className="flex items-center gap-2">
                <Gauge className="h-4 w-4" />
                Units
              </div>
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setPreferences({ ...preferences, units: 'metric' })}
                className={`rounded-lg border p-3 text-left transition-all ${
                  preferences.units === 'metric'
                    ? 'border-primary bg-primary/10 shadow-sm ring-1 ring-primary/20'
                    : 'border-slate-200 bg-slate-50/50 hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-900/30 dark:hover:bg-slate-800/50'
                }`}
              >
                <div className="font-medium text-slate-900 dark:text-white">Metric</div>
                <div className="mt-1 text-xs text-slate-600 dark:text-slate-400">
                  km, liters, kg
                </div>
              </button>
              <button
                onClick={() => setPreferences({ ...preferences, units: 'imperial' })}
                className={`rounded-lg border p-3 text-left transition-all ${
                  preferences.units === 'imperial'
                    ? 'border-primary bg-primary/10 shadow-sm ring-1 ring-primary/20'
                    : 'border-slate-200 bg-slate-50/50 hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-900/30 dark:hover:bg-slate-800/50'
                }`}
              >
                <div className="font-medium text-slate-900 dark:text-white">Imperial</div>
                <div className="mt-1 text-xs text-slate-600 dark:text-slate-400">
                  miles, gallons, lbs
                </div>
              </button>
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-900 dark:text-white">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Location
              </div>
            </label>
            <select
              value={preferences.location}
              onChange={(e) => setPreferences({ ...preferences, location: e.target.value })}
              className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-slate-900 transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 dark:border-slate-800 dark:bg-slate-900 dark:text-white"
            >
              <option value="auto">Detect Automatically</option>
              <option value="ua">Ukraine</option>
              <option value="pl">Poland</option>
              <option value="sk">Slovakia</option>
              <option value="de">Germany</option>
            </select>
          </div>
        </div>
      </div>

      {/* Email Preferences */}
      <div className="rounded-2xl border border-white/20 bg-white/80 p-8 backdrop-blur-xl dark:bg-slate-900/80">
        <div className="mb-6 flex items-center gap-3">
          <Globe className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Email Digest</h2>
        </div>
        
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-900 dark:text-white">
            Email Frequency
          </label>
          <select
            value={preferences.emailFrequency}
            onChange={(e) => setPreferences({ ...preferences, emailFrequency: e.target.value })}
            className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-slate-900 transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 dark:border-slate-800 dark:bg-slate-900 dark:text-white"
          >
            <option value="realtime">Real-time (as it happens)</option>
            <option value="daily">Daily Digest</option>
            <option value="weekly">Weekly Digest</option>
            <option value="never">Never</option>
          </select>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
            Choose how often you want to receive email updates about your saved searches and watchlist
          </p>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button className="rounded-xl bg-primary px-8 py-3 font-semibold text-white transition-all hover:bg-primary/90 hover:shadow-lg">
          Save Changes
        </button>
      </div>
    </div>
  );
}
