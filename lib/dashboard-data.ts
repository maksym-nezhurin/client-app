import { ActivityItem, ActivityStats } from '@/types/dashboard';

// Mock data - replace with real API calls later
export const mockRecentActivity: ActivityItem[] = [
  {
    id: '1',
    type: 'listing_updated',
    title: 'BMW X5 listing updated',
    description: 'Price reduced by $2,000 and new photos added',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    priority: 'medium',
    actionUrl: '/account/cars/1',
    icon: 'edit',
    read: false
  },
  {
    id: '2', 
    type: 'new_inquiry',
    title: 'New inquiry for Tesla Model 3',
    description: 'Potential buyer interested in your 2022 Tesla Model 3',
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
    priority: 'high',
    actionUrl: '/account/cars/2/inquiries/1',
    icon: 'message',
    read: false
  },
  {
    id: '3',
    type: 'status_changed',
    title: 'Audi A4 moved to for sale',
    description: 'Your Audi A4 is now visible to buyers',
    timestamp: new Date(Date.now() - 48 * 60 * 60 * 1000), // 2 days ago
    priority: 'low',
    actionUrl: '/account/cars/3',
    icon: 'eye',
    read: true
  },
  {
    id: '4',
    type: 'view_milestone',
    title: 'Mercedes C-Class reached 500 views',
    description: 'Your listing is getting great attention',
    timestamp: new Date(Date.now() - 72 * 60 * 60 * 1000), // 3 days ago
    priority: 'low',
    actionUrl: '/account/cars/4/analytics',
    icon: 'trending-up',
    read: true
  },
  {
    id: '5',
    type: 'test_drive_request',
    title: 'Test drive request for BMW 3 Series',
    description: 'Buyer wants to schedule a test drive this weekend',
    timestamp: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000), // 4 days ago
    priority: 'high',
    actionUrl: '/account/cars/5/inquiries/2',
    icon: 'calendar',
    read: false
  }
];

// Helper functions for formatting
export const formatTimeAgo = (date: Date): string => {
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  if (diffInSeconds < 60) return 'Just now';
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} min ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
  if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)} days ago`;
  
  return date.toLocaleDateString();
};

export const getActivityStats = (activities: ActivityItem[]): ActivityStats => {
  const stats: ActivityStats = {
    total: activities.length,
    unread: activities.filter(a => !a.read).length,
    highPriority: activities.filter(a => a.priority === 'high').length,
    byType: {} as Record<ActivityType, number>
  };

  activities.forEach(activity => {
    stats.byType[activity.type] = (stats.byType[activity.type] || 0) + 1;
  });

  return stats;
};

// API functions (to be implemented)
export const fetchRecentActivity = async (limit: number = 10): Promise<ActivityItem[]> => {
  // TODO: Replace with actual API call
  // const response = await fetch('/api/activity/recent?limit=' + limit);
  // return response.json();
  
  return mockRecentActivity.slice(0, limit);
};

export const markActivityAsRead = async (activityId: string): Promise<void> => {
  // TODO: Replace with actual API call
  // await fetch(`/api/activity/${activityId}/read`, { method: 'POST' });
};
