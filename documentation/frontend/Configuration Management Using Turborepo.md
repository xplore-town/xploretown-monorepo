# Frontend Monorepo Configuration

## Problem

- Initial `npm run build` failed due to missing `type-check` scripts in app packages
- Duplicate dependencies across all apps (React, TypeScript, Vite, ESLint, etc.)
- No centralized dependency management

## Solution Implemented

### 1. Fixed Turborepo Build Pipeline

**File: `turbo.json`**

- Added `type-check` task configuration with empty outputs
- Updated `build` task to depend on `^build` and `type-check`
- Extended outputs to support multiple build directories: `["dist/**", ".next/**", "build/**"]`

### 2. Added Missing Scripts to Apps

**Files: `apps/{admin-app,fleet-app,user-app}/package.json`**

- Added `type-check: "tsc -b"` script to all apps
- Separated type-checking from build process (removed `tsc -b &&` from build script)
- Build now runs `vite build` only; type-checking handled by Turborepo task orchestration

### 3. Fixed TypeScript Configuration

**File: `tsconfig.base.json`**

- Added comprehensive compiler options (previously only had paths + composite)
- Set `target: "ES2020"`, `module: "ESNext"`, `moduleResolution: "bundler"`
- Enabled `jsx: "react-jsx"`, `strict: true`, `skipLibCheck: true`
- Added `lib: ["ES2020", "DOM", "DOM.Iterable"]`

**File: `packages/ui/tsconfig.json`**

- Added `skipLibCheck: true` to ignore node_modules type errors

### 4. Centralized Dependency Management

**File: `frontend/package.json` (root)**

- Moved all common dependencies from apps to root
- `dependencies`: React 19.2.0, React-DOM 19.2.0
- `devDependencies`: TypeScript, Vite, ESLint, @types packages, all plugins
- Added `lint` and `clean` scripts to root

**Files: `apps/{admin-app,fleet-app,user-app}/package.json`**

- Removed all `dependencies` and `devDependencies`
- Kept only `name`, `version`, `type`, and `scripts`
- Dependencies now inherited from workspace root

**File: `packages/ui/package.json`**

- Removed `devDependencies.typescript` (inherited from root)
- Updated `peerDependencies` to support React 18.x or 19.x

## Result

- ✅ Build passes: 8 tasks successful (4 type-checks + 4 builds)
- ✅ Single source of truth for versions (root package.json)
- ✅ Minimal app configs (~10 lines vs ~40 lines)
- ✅ Workspace hoisting reduces node_modules duplication
- ✅ Vitest configured for component testing
- ✅ React Router v7 with data router pattern
- ✅ UI component library with Headless UI + Tailwind CSS

## Current Stack

### Build & Tooling

- **Turborepo**: 2.6.1 - Task orchestration and caching
- **Vite**: 7.2.2 - Dev server and production bundler
- **TypeScript**: 5.9.3 - Type safety across monorepo
- **npm Workspaces**: Dependency hoisting and linking

### UI Framework

- **React**: 19.2.0
- **React Router DOM**: 7.1.1 - Data router pattern with loaders/actions
- **Tailwind CSS**: 4.1.17 - Utility-first styling
- **Headless UI**: 2.2.0 - Accessible components (Dialog, Dropdown, Tabs)

### State Management

- **Redux Toolkit**: 2.5.0 - Global state (user auth, complex data)
- **React Redux**: 9.2.0 - React bindings
- **Context API**: UI state (theme, preferences)

### Testing

- **Vitest**: 1.2.2 - Unit testing with globals
- **React Testing Library**: 15.0.7 - Component testing
- **@testing-library/jest-dom**: 6.1.5 - DOM matchers

### Code Quality

- **ESLint**: 9 - Linting with React hooks/refresh plugins
- **Prettier**: 3.6.2 - Code formatting with Tailwind class sorting

## Project Structure

```
frontend/
├── package.json           # Root config, centralized dependencies
├── turbo.json            # Task pipeline (dev, build, test, lint)
├── tsconfig.base.json    # Shared TypeScript config
├── vitest.config.ts      # Vitest root config
├── apps/
│   ├── admin-app/        # Admin dashboard
│   ├── fleet-app/        # Fleet management
│   └── user-app/         # Customer-facing app
│       ├── src/
│       │   ├── context/  # React Context providers
│       │   ├── store/    # Redux slices and store
│       │   ├── pages/    # Route components
│       │   └── main.tsx  # Router + providers setup
│       └── package.json  # Minimal (scripts only)
└── packages/
    └── ui/               # Shared component library
        ├── src/
        │   ├── components/   # Button, Input, Card, Dialog, etc.
        │   │   ├── *.tsx
        │   │   ├── *.test.tsx
        │   │   └── index.ts
        │   └── index.ts      # Re-exports from components/
        ├── vitest.config.ts
        └── package.json
```

## Component Library

**Location**: `packages/ui/src/components/`

**Available Components**:

- Button - Action component with variants
- Input - Form field with label/error support
- Card - Content container with header/footer
- Badge - Status indicators (success, warning, error, info)
- Dialog - Modal with transitions (Headless UI)
- Dropdown - Menu component (Headless UI)
- Tabs - Tab navigation (Headless UI)
- Navbar - Navigation bar
- Footer - Page footer

**Usage**:

```tsx
import { Button, Card, Dialog } from "@exploresg.frontend/ui";
```

**Hot-reload**: Changes to UI package auto-update in all apps

## Routing Setup

**Pattern**: Data router (React Router v7)

**Config**: `apps/user-app/src/main.tsx`

```tsx
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, // Layout with <Outlet>
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Home /> },
      { path: "about", element: <About /> },
    ],
  },
]);
```

**Benefits**:

- Built-in error boundaries
- Data loaders for pre-fetch
- Form actions for mutations
- Protected routes via loaders

## State Management Architecture

### Redux (Global State)

**Location**: `apps/user-app/src/store/`

**Structure**:

```
store/
├── store.ts           # configureStore
├── hooks.ts           # useAppDispatch, useAppSelector
└── slices/
    └── userSlice.ts   # User authentication state
```

**Usage**:

```tsx
import { useAppSelector, useAppDispatch } from "../store/hooks";
import { setUser } from "../store/slices/userSlice";

const user = useAppSelector((state) => state.user);
dispatch(setUser({ name: "John", email: "john@example.com" }));
```

**Use for**: Auth, shopping cart, API data, shared complex state

### Context (UI State)

**Location**: `apps/user-app/src/context/`

**Structure**:

```
context/
├── themeContextInstance.ts  # Context + type definition
├── ThemeContext.tsx         # Provider component
└── useTheme.ts              # Consumer hook
```

**Usage**:

```tsx
import { useTheme } from "../context/useTheme";

const { theme, toggleTheme } = useTheme();
```

**Use for**: Theme, locale, UI preferences, simple toggles

## Testing

**Run tests**:

```bash
npm run test        # All packages
npm run test:ui     # Interactive UI
```

**Test structure**: `*.test.tsx` files alongside components

**Example**:

```tsx
import { render, screen } from "@testing-library/react";
import { Button } from "./Button";

test("renders button", () => {
  render(<Button label="Click" />);
  expect(screen.getByRole("button")).toBeInTheDocument();
});
```

## Development Workflow

**Start dev servers**:

```bash
npm run dev         # All apps in parallel
```

**Build all**:

```bash
npm run build       # Type-check + build (cached)
```

**Lint**:

```bash
npm run lint        # ESLint all packages
```

**Format**:

```bash
npm run format      # Prettier all files
```

## Architecture Pattern

Mirrors Maven parent POM structure:

```
frontend/package.json (root)    → backend/pom.xml (parent)
├── packages/ui                 → common module
└── apps/*                      → service modules
```

## Task Execution Flow

```
turbo run build
  → Runs type-check in parallel (all 4 packages)
  → Runs build for @ui package (dependency of apps)
  → Runs build for apps in parallel (after dependencies)
```
