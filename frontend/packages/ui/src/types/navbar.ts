/**
 * Navbar-specific types
 */

/**
 * Notification item structure
 */
export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time?: string;
  avatar?: string;
  icon?: string;
  isOnline?: boolean;
  isAway?: boolean;
  read?: boolean;
  link?: string;
}

/**
 * Notification action/button
 */
export interface NotificationAction {
  label: string;
  onClick: () => void;
  variant?: "primary" | "secondary";
}

// Re-export from centralized locations
export type { NavbarUser } from "./user";
export type { ProfileMenuItem, NavLink } from "./navigation";
