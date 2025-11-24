import type { VoidCallback } from "./common";

/**
 * Navigation and menu-related types
 */

/**
 * Link item for navigation bars
 */
export interface NavLink {
  label: string;
  href: string;
  icon?: React.ReactNode;
  badge?: string | number;
  disabled?: boolean;
}

/**
 * Menu item for dropdowns and context menus
 */
export interface MenuItem {
  label: string;
  icon?: React.ReactNode;
  href?: string;
  onClick?: VoidCallback;
  disabled?: boolean;
  divider?: boolean; // Show divider after this item
}

/**
 * Profile menu item (alias for clarity)
 */
export type ProfileMenuItem = MenuItem;
