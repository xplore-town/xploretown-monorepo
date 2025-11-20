/**
 * UI Component Library for ExploreSG Frontend
 *
 * This package exports reusable React components with Tailwind CSS styling.
 * All components are built with TypeScript and support hot-reload in development.
 *
 * Usage:
 * ```
 * import { Button, Input, Dialog, Card } from "@exploresg.frontend/ui";
 *
 * function App() {
 *   return (
 *     <>
 *       <Button label="Click me" />
 *       <Input label="Name" placeholder="Enter your name" />
 *       <Card title="Info">Content here</Card>
 *     </>
 *   );
 * }
 * ```
 */

// Components
export { default as Button, type ButtonProps } from "./components/Button";
export { default as Input, type InputProps } from "./components/Input";
export { default as Dialog, type DialogProps } from "./components/Dialog";
export { default as Dropdown, type DropdownProps, type DropdownItem } from "./components/Dropdown";
export { default as Tabs, type TabsProps, type TabItem } from "./components/Tabs";
export { default as Card, type CardProps } from "./components/Card";
export { default as Badge, type BadgeProps } from "./components/Badge";

// Hooks (placeholder for future)
// export * from "./hooks";

// Utils (placeholder for future)
// export * from "./utils";

// Types (placeholder for future)
// export type * from "./types";
