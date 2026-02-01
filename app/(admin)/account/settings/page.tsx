'use client';

import { useState } from 'react';
import { User, Mail, Phone, MapPin, Camera, Save } from 'lucide-react';
import { useTypedTranslation } from '@/lib/i18n';
import { useAuth } from '@/contexts/auth/AuthContext';
import Image from 'next/image';

export default function ProfileSettingsPage() {
  const { t } = useTypedTranslation('client');
  const { user } = useAuth();
  
  const [formData, setFormData] = useState({
    firstName: user?.name?.split(' ')[0] || '',
    lastName: user?.name?.split(' ')[1] || '',
    username: user?.username || '',
    email: user?.email || '',
    phone: '',
    bio: '',
    location: '',
    website: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Saving profile:', formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Header */}
      <div className="rounded-2xl border border-white/20 bg-white/80 p-8 backdrop-blur-xl dark:bg-slate-900/80">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-primary/10 p-3">
            <User className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
              {t('settings.profile.title') || 'Profile Settings'}
            </h1>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
              {t('settings.profile.description') || 'Manage your personal information and profile'}
            </p>
          </div>
        </div>
      </div>

      {/* Profile Picture */}
      <div className="rounded-2xl border border-white/20 bg-white/80 p-8 backdrop-blur-xl dark:bg-slate-900/80">
        <h2 className="mb-6 text-xl font-semibold text-slate-900 dark:text-white">Profile Picture</h2>
        
        <div className="flex items-center gap-6">
          <div className="relative">
            <div className="h-24 w-24 overflow-hidden rounded-full border-4 border-white shadow-lg dark:border-slate-800">
              {user?.avatar ? (
                <Image
                  src={user.avatar}
                  alt="Profile"
                  width={96}
                  height={96}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-primary/10">
                  <User className="h-10 w-10 text-primary" />
                </div>
              )}
            </div>
            <button
              type="button"
              className="absolute bottom-0 right-0 rounded-full bg-primary p-2 text-white shadow-lg transition-transform hover:scale-110"
            >
              <Camera className="h-4 w-4" />
            </button>
          </div>
          <div>
            <h3 className="font-medium text-slate-900 dark:text-white">Change Profile Picture</h3>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
              JPG, PNG or GIF. Max size 2MB
            </p>
            <div className="mt-3 flex gap-2">
              <button
                type="button"
                className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary/90"
              >
                Upload New
              </button>
              <button
                type="button"
                className="rounded-lg px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-200 dark:text-slate-300 dark:hover:bg-slate-800"
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Personal Information */}
      <div className="rounded-2xl border border-white/20 bg-white/80 p-8 backdrop-blur-xl dark:bg-slate-900/80">
        <h2 className="mb-6 text-xl font-semibold text-slate-900 dark:text-white">Personal Information</h2>
        
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-900 dark:text-white">
              First Name
            </label>
            <input
              type="text"
              value={formData.firstName}
              onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
              className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-slate-900 transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 dark:border-slate-800 dark:bg-slate-900 dark:text-white"
              placeholder="John"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-900 dark:text-white">
              Last Name
            </label>
            <input
              type="text"
              value={formData.lastName}
              onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
              className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-slate-900 transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 dark:border-slate-800 dark:bg-slate-900 dark:text-white"
              placeholder="Doe"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-900 dark:text-white">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                Username
              </div>
            </label>
            <input
              type="text"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-slate-900 transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 dark:border-slate-800 dark:bg-slate-900 dark:text-white"
              placeholder="johndoe"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-900 dark:text-white">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                Email
              </div>
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-slate-900 transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 dark:border-slate-800 dark:bg-slate-900 dark:text-white"
              placeholder="john@example.com"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-900 dark:text-white">
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                Phone Number
              </div>
            </label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-slate-900 transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 dark:border-slate-800 dark:bg-slate-900 dark:text-white"
              placeholder="+1 (555) 000-0000"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-900 dark:text-white">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Location
              </div>
            </label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-slate-900 transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 dark:border-slate-800 dark:bg-slate-900 dark:text-white"
              placeholder="Kyiv, Ukraine"
            />
          </div>
        </div>

        <div className="mt-6">
          <label className="mb-2 block text-sm font-medium text-slate-900 dark:text-white">
            Bio
          </label>
          <textarea
            value={formData.bio}
            onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
            rows={4}
            className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-slate-900 transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 dark:border-slate-800 dark:bg-slate-900 dark:text-white"
            placeholder="Tell us a bit about yourself..."
          />
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
            Brief description for your profile. URLs are hyperlinked.
          </p>
        </div>

        <div className="mt-6">
          <label className="mb-2 block text-sm font-medium text-slate-900 dark:text-white">
            Website
          </label>
          <input
            type="url"
            value={formData.website}
            onChange={(e) => setFormData({ ...formData, website: e.target.value })}
            className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-slate-900 transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 dark:border-slate-800 dark:bg-slate-900 dark:text-white"
            placeholder="https://yourwebsite.com"
          />
        </div>
      </div>

      {/* Account Information */}
      <div className="rounded-2xl border border-white/20 bg-white/80 p-8 backdrop-blur-xl dark:bg-slate-900/80">
        <h2 className="mb-6 text-xl font-semibold text-slate-900 dark:text-white">Account Information</h2>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between rounded-lg border border-slate-200 bg-slate-50/50 p-4 dark:border-slate-800 dark:bg-slate-900/30">
            <div>
              <div className="font-medium text-slate-900 dark:text-white">Member Since</div>
              <div className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                January 2025
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between rounded-lg border border-slate-200 bg-slate-50/50 p-4 dark:border-slate-800 dark:bg-slate-900/30">
            <div>
              <div className="font-medium text-slate-900 dark:text-white">Email Status</div>
              <div className="mt-1 flex items-center gap-2">
                <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700 dark:bg-green-950/50 dark:text-green-400">
                  Verified
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between rounded-lg border border-slate-200 bg-slate-50/50 p-4 dark:border-slate-800 dark:bg-slate-900/30">
            <div>
              <div className="font-medium text-slate-900 dark:text-white">Account ID</div>
              <div className="mt-1 font-mono text-sm text-slate-600 dark:text-slate-400">
                {user?.id || 'USR-12345678'}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end gap-3">
        <button
          type="button"
          className="rounded-xl border border-slate-300 px-8 py-3 font-semibold text-slate-700 transition-all hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="flex items-center gap-2 rounded-xl bg-primary px-8 py-3 font-semibold text-white transition-all hover:bg-primary/90 hover:shadow-lg"
        >
          <Save className="h-5 w-5" />
          Save Changes
        </button>
      </div>
    </form>
  );
}
