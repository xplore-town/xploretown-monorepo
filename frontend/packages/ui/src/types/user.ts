import type { Role } from "@exploresg.frontend/utils";

/**
 * User types for UI components
 * Separated from business logic user types in apps
 */

/**
 * Minimal user info for navbar/header display
 */
export interface NavbarUser {
  name: string;
  email: string;
  picture?: string;
  roles?: Role[];
}

/**
 * Full user profile with all optional fields
 * Used for profile pages and detailed views
 */
export interface UserProfile {
  // Identity
  userId?: string;
  name: string;
  email: string;

  // Visual
  avatar?: string;
  picture?: string;

  // Additional details
  role?: string; // Display role string
  roles?: Role[]; // Actual role enums
  phone?: string | null;
  dateOfBirth?: string | null;
  bio?: string;
}
