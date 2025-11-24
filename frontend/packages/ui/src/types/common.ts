/**
 * Common shared types used across UI components
 */

// ============================================
// Variant & Style Types
// ============================================

export type Variant =
  | "default"
  | "primary"
  | "secondary"
  | "success"
  | "warning"
  | "error"
  | "info";

export type Size = "xs" | "sm" | "md" | "lg" | "xl";

export type Alignment = "left" | "center" | "right";

export type Position = "top" | "bottom" | "left" | "right";

// ============================================
// Component Base Types
// ============================================

/**
 * Base props that most UI components should support
 */
export interface BaseComponentProps {
  className?: string;
  id?: string;
  testId?: string;
}

/**
 * Props for components that can be disabled
 */
export interface DisableableProps {
  disabled?: boolean;
}

/**
 * Props for components with loading states
 */
export interface LoadableProps {
  loading?: boolean;
  loadingText?: string;
}

// ============================================
// Callback Types
// ============================================

export type VoidCallback = () => void;
export type ValueCallback<T> = (value: T) => void;
export type EventCallback<E = Event> = (event: E) => void;
