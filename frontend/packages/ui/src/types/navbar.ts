export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time?: string;
  avatar?: string;
  icon?: string;
  isOnline?: boolean;
  isAway?: boolean;
}

export interface UserProfile {
  name: string;
  role: string;
  avatar: string;
  picture?: string;
}

export interface ProfileMenuItem {
  label: string;
  icon: React.ReactNode;
  href?: string;
  onClick?: () => void;
}
