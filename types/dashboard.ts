export type ActivityType = 
  | 'listing_updated'
  | 'new_inquiry' 
  | 'status_changed'
  | 'view_milestone'
  | 'test_drive_request'
  | 'price_change'
  | 'photo_added'
  | 'message_received';

export type ActivityPriority = 'high' | 'medium' | 'low';

export interface ActivityItem {
  id: string;
  type: ActivityType;
  title: string;
  description: string;
  timestamp: Date;
  priority: ActivityPriority;
  actionUrl?: string;
  icon: string;
  read?: boolean;
}

export interface ActivityStats {
  total: number;
  unread: number;
  highPriority: number;
  byType: Record<ActivityType, number>;
}
