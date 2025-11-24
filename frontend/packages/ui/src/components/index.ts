/**
 * @exploresg.frontend/ui - Components
 *
 * Re-export all components from this folder for easy discovery
 */

export { default as Button, type ButtonProps } from "./Button";
export { default as Input, type InputProps } from "./Input";
export { default as Dialog, type DialogProps } from "./Dialog";
export { default as Dropdown, type DropdownProps, type DropdownItem } from "./Dropdown";
export { default as Tabs, type TabsProps, type TabItem } from "./Tabs";
export { default as Card, type CardProps } from "./Card";
export { default as Badge, type BadgeProps } from "./Badge";

// !TODO: Move this out
export { default as Navbar } from "../layout/Navbar";
export { default as Footer } from "../layout/Footer";

export {
  default as NotificationDropdown,
  type NotificationDropdownProps,
} from "./NotificationDropdown";
