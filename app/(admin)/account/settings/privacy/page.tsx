'use client';

import { useState } from 'react';
import { Shield, Eye, Lock, Users, Download, Trash2 } from 'lucide-react';
import { useTypedTranslation } from '@/lib/i18n';
import { Toggle } from '@/components/ui/Toggle';

export default function PrivacySettingsPage() {
  const { t } = useTypedTranslation('client');
  
  const [privacy, setPrivacy] = useState({
    profileVisibility: 'public',
    showEmail: false,
    showPhone: false,
    showListings: true,
    allowMessages: true,
    twoFactorAuth: false,
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="rounded-2xl border border-white/20 bg-white/80 p-8 backdrop-blur-xl dark:bg-slate-900/80">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-primary/10 p-3">
            <Shield className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
              {t('settings.privacy.title') || 'Privacy & Security'}
            </h1>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
              {t('settings.privacy.description') || 'Manage your privacy preferences and security settings'}
            </p>
          </div>
        </div>
      </div>

      {/* Privacy Settings */}
      <div className="rounded-2xl border border-white/20 bg-white/80 p-8 backdrop-blur-xl dark:bg-slate-900/80">
        <div className="mb-6 flex items-center gap-3">
          <Eye className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Profile Visibility</h2>
        </div>
        
        <div className="space-y-4">
          <div className="space-y-3">
            <label className="text-sm font-medium text-slate-900 dark:text-white">
              Who can see your profile?
            </label>
            <div className="space-y-2">
              <label className="flex items-center gap-3 rounded-lg border border-slate-200 bg-slate-50/50 p-4 dark:border-slate-800 dark:bg-slate-900/30">
                <input
                  type="radio"
                  name="profileVisibility"
                  checked={privacy.profileVisibility === 'public'}
                  onChange={() => setPrivacy({ ...privacy, profileVisibility: 'public' })}
                  className="h-4 w-4 text-primary"
                />
                <div>
                  <div className="font-medium text-slate-900 dark:text-white">Public</div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">Anyone can see your profile</div>
                </div>
              </label>
              <label className="flex items-center gap-3 rounded-lg border border-slate-200 bg-slate-50/50 p-4 dark:border-slate-800 dark:bg-slate-900/30">
                <input
                  type="radio"
                  name="profileVisibility"
                  checked={privacy.profileVisibility === 'registered'}
                  onChange={() => setPrivacy({ ...privacy, profileVisibility: 'registered' })}
                  className="h-4 w-4 text-primary"
                />
                <div>
                  <div className="font-medium text-slate-900 dark:text-white">Registered Users Only</div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">Only logged-in users can see your profile</div>
                </div>
              </label>
              <label className="flex items-center gap-3 rounded-lg border border-slate-200 bg-slate-50/50 p-4 dark:border-slate-800 dark:bg-slate-900/30">
                <input
                  type="radio"
                  name="profileVisibility"
                  checked={privacy.profileVisibility === 'private'}
                  onChange={() => setPrivacy({ ...privacy, profileVisibility: 'private' })}
                  className="h-4 w-4 text-primary"
                />
                <div>
                  <div className="font-medium text-slate-900 dark:text-white">Private</div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">Hide your profile from everyone</div>
                </div>
              </label>
            </div>
          </div>

          <div className="border-t border-slate-200 pt-4 dark:border-slate-800">
            <PrivacyToggle
              title="Show Email Address"
              description="Display your email on your public profile"
              enabled={privacy.showEmail}
              onChange={() => setPrivacy({ ...privacy, showEmail: !privacy.showEmail })}
            />
          </div>
          <PrivacyToggle
            title="Show Phone Number"
            description="Display your phone number on your public profile"
            enabled={privacy.showPhone}
            onChange={() => setPrivacy({ ...privacy, showPhone: !privacy.showPhone })}
          />
          <PrivacyToggle
            title="Show My Listings"
            description="Allow others to see your car listings"
            enabled={privacy.showListings}
            onChange={() => setPrivacy({ ...privacy, showListings: !privacy.showListings })}
          />
          <PrivacyToggle
            title="Allow Messages"
            description="Let other users send you messages"
            enabled={privacy.allowMessages}
            onChange={() => setPrivacy({ ...privacy, allowMessages: !privacy.allowMessages })}
          />
        </div>
      </div>

      {/* Security Settings */}
      <div className="rounded-2xl border border-white/20 bg-white/80 p-8 backdrop-blur-xl dark:bg-slate-900/80">
        <div className="mb-6 flex items-center gap-3">
          <Lock className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Security</h2>
        </div>
        
        <div className="space-y-4">
          <PrivacyToggle
            title="Two-Factor Authentication"
            description="Add an extra layer of security to your account"
            enabled={privacy.twoFactorAuth}
            onChange={() => setPrivacy({ ...privacy, twoFactorAuth: !privacy.twoFactorAuth })}
          />
          
          <div className="rounded-lg border border-slate-200 bg-slate-50/50 p-4 dark:border-slate-800 dark:bg-slate-900/30">
            <h3 className="font-medium text-slate-900 dark:text-white">Password</h3>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
              Last changed 3 months ago
            </p>
            <button className="mt-3 rounded-lg bg-slate-200 px-4 py-2 text-sm font-medium text-slate-900 transition-colors hover:bg-slate-300 dark:bg-slate-800 dark:text-white dark:hover:bg-slate-700">
              Change Password
            </button>
          </div>

          <div className="rounded-lg border border-slate-200 bg-slate-50/50 p-4 dark:border-slate-800 dark:bg-slate-900/30">
            <h3 className="font-medium text-slate-900 dark:text-white">Active Sessions</h3>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
              You're signed in on 2 devices
            </p>
            <button className="mt-3 rounded-lg bg-slate-200 px-4 py-2 text-sm font-medium text-slate-900 transition-colors hover:bg-slate-300 dark:bg-slate-800 dark:text-white dark:hover:bg-slate-700">
              Manage Sessions
            </button>
          </div>
        </div>
      </div>

      {/* Data Management */}
      <div className="rounded-2xl border border-white/20 bg-white/80 p-8 backdrop-blur-xl dark:bg-slate-900/80">
        <div className="mb-6 flex items-center gap-3">
          <Users className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Data Management</h2>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-start justify-between gap-4 rounded-lg border border-slate-200 bg-slate-50/50 p-4 dark:border-slate-800 dark:bg-slate-900/30">
            <div className="flex gap-3">
              <div className="rounded-lg bg-white p-2 dark:bg-slate-800">
                <Download className="h-4 w-4 text-primary" />
              </div>
              <div>
                <h3 className="font-medium text-slate-900 dark:text-white">Download Your Data</h3>
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                  Get a copy of all your data in a downloadable format
                </p>
              </div>
            </div>
            <button className="shrink-0 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary/90">
              Download
            </button>
          </div>

          <div className="flex items-start justify-between gap-4 rounded-lg border border-red-200 bg-red-50/50 p-4 dark:border-red-900/50 dark:bg-red-950/20">
            <div className="flex gap-3">
              <div className="rounded-lg bg-white p-2 dark:bg-slate-800">
                <Trash2 className="h-4 w-4 text-red-600 dark:text-red-500" />
              </div>
              <div>
                <h3 className="font-medium text-red-900 dark:text-red-400">Delete Account</h3>
                <p className="mt-1 text-sm text-red-700 dark:text-red-500">
                  Permanently delete your account and all associated data
                </p>
              </div>
            </div>
            <button className="shrink-0 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-700">
              Delete
            </button>
          </div>
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

function PrivacyToggle({
  title,
  description,
  enabled,
  onChange,
}: {
  title: string;
  description: string;
  enabled: boolean;
  onChange: () => void;
}) {
  return (
    <div className="flex items-start justify-between gap-4 rounded-lg border border-slate-200 bg-slate-50/50 p-4 dark:border-slate-800 dark:bg-slate-900/30">
      <div>
        <h3 className="font-medium text-slate-900 dark:text-white">{title}</h3>
        <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">{description}</p>
      </div>
      <Toggle enabled={enabled} onChange={onChange} />
    </div>
  );
}
