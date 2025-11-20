# UI Component Library

Shared React component library for all ExploreSG frontend applications. Built with **Headless UI** and **Tailwind CSS** for maximum flexibility and accessibility.

## Components

- **Button** - Primary action component with variants
- **Input** - Form input field with label and error support
- **Dialog** - Modal dialog with smooth transitions (Headless UI)
- **Dropdown** - Menu component with rich interactions (Headless UI)
- **Tabs** - Tab navigation component (Headless UI)
- **Card** - Container component for content organization
- **Badge** - Status/tag indicator with multiple variants

## Structure

```
packages/ui/src/
├── components/          # Reusable UI components
│   ├── Button.tsx      # Button component
│   ├── Input.tsx       # Text input component
│   ├── Dialog.tsx      # Modal dialog (Headless UI)
│   ├── Dropdown.tsx    # Menu dropdown (Headless UI)
│   ├── Tabs.tsx        # Tab navigation (Headless UI)
│   ├── Card.tsx        # Card container
│   ├── Badge.tsx       # Badge/tag component
│   └── index.ts        # Components barrel export
├── hooks/              # Custom React hooks (placeholder)
├── utils/              # Utility functions (placeholder)
├── types/              # Shared TypeScript types (placeholder)
├── styles.css          # Global Tailwind directives
└── index.ts            # Main entry point
```

## Usage

```typescript
import { Button, Input, Dialog, Card, Badge } from "@exploresg.frontend/ui";

function App() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button
        label="Open Dialog"
        onClick={() => setIsOpen(true)}
        variant="primary"
      />

      <Dialog
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Welcome"
      >
        <Input label="Name" placeholder="Enter your name" />
        <Badge label="Important" variant="success" />
      </Dialog>

      <Card
        title="My Card"
        description="Card description"
        footer={<Button label="Submit" />}
      >
        Your content here
      </Card>
    </>
  );
}
```

## Component Details

### Button

```typescript
interface ButtonProps {
  label: string;
  onClick?: () => void;
  variant?: "primary" | "secondary"; // Tailwind styled variants
}
```

### Input

```typescript
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}
```

### Dialog (Headless UI)

```typescript
interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  size?: "sm" | "md" | "lg" | "xl";
}
```

### Dropdown (Headless UI)

```typescript
interface DropdownProps {
  items: Array<{
    label: string;
    onClick: () => void;
    disabled?: boolean;
  }>;
  trigger: React.ReactNode;
  align?: "left" | "right";
}
```

### Tabs (Headless UI)

```typescript
interface TabsProps {
  tabs: Array<{
    label: string;
    content: React.ReactNode;
  }>;
  defaultIndex?: number;
  onChange?: (index: number) => void;
}
```

### Card

```typescript
interface CardProps {
  title?: string;
  description?: string;
  children?: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
}
```

### Badge

```typescript
interface BadgeProps {
  label: string;
  variant?: "default" | "success" | "warning" | "error" | "info";
  size?: "sm" | "md" | "lg";
}
```

## Adding New Components

### 1. Create component file in `components/`

```typescript
// src/components/NewComponent.tsx
import React from "react";

export interface NewComponentProps {
  // Define props
}

const NewComponent: React.FC<NewComponentProps> = (props) => {
  return (
    <div className="rounded-lg border p-4">
      {/* Component implementation */}
    </div>
  );
};

export default NewComponent;
```

### 2. Export from `components/index.ts`

```typescript
export { default as NewComponent, type NewComponentProps } from "./NewComponent";
```

### 3. Export from main `index.ts`

```typescript
export { default as NewComponent, type NewComponentProps } from "./components/NewComponent";
```

### 4. Use in apps

```typescript
import { NewComponent } from "@exploresg.frontend/ui";
```

## Styling

All components use **Tailwind CSS v4** and **Headless UI** for:

- **Tailwind**: Utility-first styling, no custom CSS
- **Headless UI**: Accessible, unstyled components (Dialog, Dropdown, Tabs)

Styles are automatically scanned and included in consuming apps via the `@source` directive in `apps/*/src/index.css`.

## Dependencies

- `react@^19.0.0` - React framework
- `@headlessui/react@^2.2.0` - Headless UI components library
- `tailwindcss@^4.1.17` - CSS utility framework
- `@tailwindcss/vite@^4.1.17` - Vite plugin for Tailwind

## Development

- **Hot-reload**: Changes to components auto-update in all consuming apps
- **Type-safe**: All components are fully typed with TypeScript
- **Accessible**: Headless UI components include ARIA attributes and keyboard support
- **Shared**: Used across admin-app, fleet-app, and user-app

## Best Practices

- ✅ Keep components small and focused
- ✅ Use descriptive prop names and TypeScript interfaces
- ✅ Export interfaces for prop types
- ✅ Add JSDoc comments for documentation
- ✅ Use Tailwind for all styling (no CSS files per component)
- ✅ Export as both named and default exports
- ✅ Use Headless UI for complex interactive components (dialogs, dropdowns, etc.)
- ✅ Keep components unstyled/minimal - let consumers customize via Tailwind
