'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MessageCircle, 
  Edit, 
  Eye, 
  TrendingUp, 
  Calendar,
  ChevronRight,
  Bell,
  Filter,
  Check
} from 'lucide-react';
import { useTypedTranslation } from '@/lib/i18n';
import { ActivityItem, ActivityType, ActivityPriority } from '@/types/dashboard';
import { fetchRecentActivity, formatTimeAgo, getActivityStats } from '@/lib/dashboard-data';
import { Button } from '@/components/ui/Button';

const iconMap = {
  message: MessageCircle,
  edit: Edit,
  eye: Eye,
  'trending-up': TrendingUp,
  calendar: Calendar,
  bell: Bell
};

const priorityColors = {
  high: 'border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950/20',
  medium: 'border-yellow-200 bg-yellow-50 dark:border-yellow-800 dark:bg-yellow-950/20',
  low: 'border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950/20'
};

const priorityDots = {
  high: 'bg-red-500',
  medium: 'bg-yellow-500', 
  low: 'bg-green-500'
};

interface RecentActivitySectionProps {
  limit?: number;
  showFilters?: boolean;
  className?: string;
}

export function RecentActivitySection({ 
  limit = 5, 
  showFilters = true,
  className = '' 
}: RecentActivitySectionProps) {
  const { t } = useTypedTranslation('client');
  const [activities, setActivities] = useState<ActivityItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<ActivityType | 'all'>('all');
  const [showUnreadOnly, setShowUnreadOnly] = useState(false);

  useEffect(() => {
    const loadActivities = async () => {
      try {
        setLoading(true);
        const data = await fetchRecentActivity(limit * 2); // Load more for filtering
        setActivities(data);
      } catch (error) {
        console.error('Failed to load activity:', error);
      } finally {
        setLoading(false);
      }
    };

    loadActivities();
  }, [limit]);

  const filteredActivities = activities.filter(activity => {
    if (filter !== 'all' && activity.type !== filter) return false;
    if (showUnreadOnly && activity.read) return false;
    return true;
  }).slice(0, limit);

  const stats = getActivityStats(activities);

  const handleMarkAsRead = async (activityId: string) => {
    try {
      await markActivityAsRead(activityId);
      setActivities(prev => 
        prev.map(activity => 
          activity.id === activityId 
            ? { ...activity, read: true }
            : activity
        )
      );
    } catch (error) {
      console.error('Failed to mark as read:', error);
    }
  };

  const handleMarkAllAsRead = async () => {
    const unreadIds = activities.filter(a => !a.read).map(a => a.id);
    await Promise.all(unreadIds.map(id => handleMarkAsRead(id)));
  };

  if (loading) {
    return (
      <div className={`rounded-2xl border border-white/10 bg-white/95 p-6 shadow-2xl backdrop-blur-xl dark:bg-slate-900/95 ${className}`}>
        <div className="animate-pulse">
          <div className="h-6 bg-slate-200 rounded w-32 mb-4"></div>
          <div className="space-y-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-16 bg-slate-100 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`rounded-2xl border border-white/10 bg-white/95 p-6 shadow-2xl backdrop-blur-xl dark:bg-slate-900/95 ${className}`}>
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Bell className="h-5 w-5 text-slate-600 dark:text-slate-400" />
            {stats.unread > 0 && (
              <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full"></span>
            )}
          </div>
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
            {t('account.recent_activity')}
          </h2>
          {stats.unread > 0 && (
            <span className="rounded-full bg-red-100 px-2 py-1 text-xs font-medium text-red-700 dark:bg-red-900/30 dark:text-red-400">
              {stats.unread} new
            </span>
          )}
        </div>
        
        {stats.unread > 0 && (
          <Button 
            variant="ghost" 
            size="sm"
            onClick={handleMarkAllAsRead}
            className="text-xs"
          >
            <Check className="h-3 w-3 mr-1" />
            Mark all read
          </Button>
        )}
      </div>

      {/* Filters */}
      {showFilters && (
        <div className="flex flex-wrap gap-2 mb-6">
          <Button
            variant={filter === 'all' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setFilter('all')}
            className="text-xs"
          >
            All ({stats.total})
          </Button>
          <Button
            variant={showUnreadOnly ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setShowUnreadOnly(!showUnreadOnly)}
            className="text-xs"
          >
            Unread ({stats.unread})
          </Button>
          <Button
            variant={filter === 'new_inquiry' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setFilter('new_inquiry')}
            className="text-xs"
          >
            Inquiries ({stats.byType.new_inquiry || 0})
          </Button>
          <Button
            variant={filter === 'listing_updated' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setFilter('listing_updated')}
            className="text-xs"
          >
            Updates ({stats.byType.listing_updated || 0})
          </Button>
        </div>
      )}

      {/* Activity List */}
      <div className="space-y-3">
        <AnimatePresence>
          {filteredActivities.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-8 text-slate-500 dark:text-slate-400"
            >
              <Bell className="h-12 w-12 mx-auto mb-3 opacity-50" />
              <p className="text-sm">No recent activity</p>
            </motion.div>
          ) : (
            filteredActivities.map((activity, index) => {
              const Icon = iconMap[activity.icon as keyof typeof iconMap] || Bell;
              
              return (
                <motion.div
                  key={activity.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: index * 0.1 }}
                  className={`
                    group relative rounded-xl border p-4 transition-all duration-200
                    ${priorityColors[activity.priority]}
                    ${!activity.read ? 'shadow-sm' : ''}
                    ${activity.actionUrl ? 'cursor-pointer hover:shadow-md hover:scale-[1.02]' : ''}
                  `}
                >
                  {/* Priority indicator */}
                  <div className={`absolute top-4 left-4 h-2 w-2 rounded-full ${priorityDots[activity.priority]}`} />
                  
                  <div className="flex items-start gap-4">
                    {/* Icon */}
                    <div className={`
                      flex h-10 w-10 items-center justify-center rounded-lg
                      ${activity.priority === 'high' ? 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400' : ''}
                      ${activity.priority === 'medium' ? 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400' : ''}
                      ${activity.priority === 'low' ? 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400' : ''}
                    `}>
                      <Icon className="h-5 w-5" />
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1">
                          <h3 className="font-medium text-slate-900 dark:text-white text-sm">
                            {activity.title}
                          </h3>
                          <p className="mt-1 text-xs text-slate-600 dark:text-slate-400 line-clamp-2">
                            {activity.description}
                          </p>
                        </div>
                        
                        {!activity.read && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleMarkAsRead(activity.id);
                            }}
                            className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <Check className="h-3 w-3" />
                          </Button>
                        )}
                      </div>
                      
                      <div className="mt-2 flex items-center justify-between">
                        <span className="text-xs text-slate-500 dark:text-slate-500">
                          {formatTimeAgo(activity.timestamp)}
                        </span>
                        
                        {activity.actionUrl && (
                          <Link 
                            href={activity.actionUrl}
                            className="inline-flex items-center gap-1 text-xs text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
                          >
                            View
                            <ChevronRight className="h-3 w-3" />
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })
          )}
        </AnimatePresence>
      </div>

      {/* View All Link */}
      {activities.length > limit && (
        <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-800">
          <Link 
            href="/account/activity"
            className="flex items-center justify-center gap-2 text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
          >
            View all activity
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
      )}
    </div>
  );
}
