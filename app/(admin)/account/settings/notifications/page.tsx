'use client';

import { useState } from 'react';
import { Bell, Mail, MessageSquare, ShoppingCart, Heart, TrendingUp } from 'lucide-react';
import { useTypedTranslation } from '@/lib/i18n';
import { Toggle } from '@/components/ui/Toggle';

export default function NotificationsSettingsPage() {
  const { t } = useTypedTranslation('client');
  
  const [notifications, setNotifications] = useState({
    email: {
      newListings: true,
      priceDrops: true,
      savedSearches: true,
      messages: true,
      newsletter: false,
    },
    push: {
      newListings: false,
      priceDrops: true,
      savedSearches: true,
      messages: true,
    },
    sms: {
      messages: false,
      priceDrops: false,
    },
  });

  const toggleNotification = (category: 'email' | 'push' | 'sms', key: string) => {
    setNotifications((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [key]: !prev[category][key as keyof typeof prev.email],
      },
    }));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="rounded-2xl border border-white/20 bg-white/80 p-8 backdrop-blur-xl dark:bg-slate-900/80">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-primary/10 p-3">
            <Bell className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
              {t('settings.notification.title') || 'Notification Settings'}
            </h1>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
              {t('settings.notification.subtitle') || 'Manage how you receive notifications from us'}
            </p>
          </div>
        </div>
      </div>

      {/* Email Notifications */}
      <div className="rounded-2xl border border-white/20 bg-white/80 p-8 backdrop-blur-xl dark:bg-slate-900/80">
        <div className="mb-6 flex items-center gap-3">
          <Mail className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Email Notifications</h2>
        </div>
        
        <div className="space-y-4">
          <NotificationToggle
            icon={ShoppingCart}
            title="New Listings"
            description="Get notified when new cars matching your preferences are listed"
            enabled={notifications.email.newListings}
            onChange={() => toggleNotification('email', 'newListings')}
          />
          <NotificationToggle
            icon={TrendingUp}
            title="Price Drops"
            description="Receive alerts when prices drop on cars you're watching"
            enabled={notifications.email.priceDrops}
            onChange={() => toggleNotification('email', 'priceDrops')}
          />
          <NotificationToggle
            icon={Heart}
            title="Saved Searches"
            description="Updates on your saved search criteria"
            enabled={notifications.email.savedSearches}
            onChange={() => toggleNotification('email', 'savedSearches')}
          />
          <NotificationToggle
            icon={MessageSquare}
            title="Messages"
            description="Get notified when you receive new messages"
            enabled={notifications.email.messages}
            onChange={() => toggleNotification('email', 'messages')}
          />
          <NotificationToggle
            icon={Mail}
            title="Newsletter"
            description="Weekly newsletter with market insights and tips"
            enabled={notifications.email.newsletter}
            onChange={() => toggleNotification('email', 'newsletter')}
          />
        </div>
      </div>

      {/* Push Notifications */}
      <div className="rounded-2xl border border-white/20 bg-white/80 p-8 backdrop-blur-xl dark:bg-slate-900/80">
        <div className="mb-6 flex items-center gap-3">
          <Bell className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Push Notifications</h2>
        </div>
        
        <div className="space-y-4">
          <NotificationToggle
            icon={ShoppingCart}
            title="New Listings"
            description="Real-time alerts for new listings"
            enabled={notifications.push.newListings}
            onChange={() => toggleNotification('push', 'newListings')}
          />
          <NotificationToggle
            icon={TrendingUp}
            title="Price Drops"
            description="Instant alerts for price changes"
            enabled={notifications.push.priceDrops}
            onChange={() => toggleNotification('push', 'priceDrops')}
          />
          <NotificationToggle
            icon={Heart}
            title="Saved Searches"
            description="Push updates for saved searches"
            enabled={notifications.push.savedSearches}
            onChange={() => toggleNotification('push', 'savedSearches')}
          />
          <NotificationToggle
            icon={MessageSquare}
            title="Messages"
            description="Instant message notifications"
            enabled={notifications.push.messages}
            onChange={() => toggleNotification('push', 'messages')}
          />
        </div>
      </div>

      {/* SMS Notifications */}
      <div className="rounded-2xl border border-white/20 bg-white/80 p-8 backdrop-blur-xl dark:bg-slate-900/80">
        <div className="mb-6 flex items-center gap-3">
          <MessageSquare className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white">SMS Notifications</h2>
        </div>
        
        <div className="space-y-4">
          <NotificationToggle
            icon={MessageSquare}
            title="Messages"
            description="SMS alerts for important messages"
            enabled={notifications.sms.messages}
            onChange={() => toggleNotification('sms', 'messages')}
          />
          <NotificationToggle
            icon={TrendingUp}
            title="Price Drops"
            description="SMS alerts for significant price drops"
            enabled={notifications.sms.priceDrops}
            onChange={() => toggleNotification('sms', 'priceDrops')}
          />
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

function NotificationToggle({
  icon: Icon,
  title,
  description,
  enabled,
  onChange,
}: {
  icon: any;
  title: string;
  description: string;
  enabled: boolean;
  onChange: () => void;
}) {
  return (
    <div className="flex items-start justify-between gap-4 rounded-lg border border-slate-200 bg-slate-50/50 p-4 dark:border-slate-800 dark:bg-slate-900/30">
      <div className="flex gap-3">
        <div className="rounded-lg bg-white p-2 dark:bg-slate-800">
          <Icon className="h-4 w-4 text-slate-600 dark:text-slate-400" />
        </div>
        <div>
          <h3 className="font-medium text-slate-900 dark:text-white">{title}</h3>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">{description}</p>
        </div>
      </div>
      <Toggle enabled={enabled} onChange={onChange} />
    </div>
  );
}
