# Frontend Monorepo

Turborepo-powered monorepo for ExploreSG frontend applications using React, TypeScript, Vite, and Tailwind CSS v4.

## Structure

```
frontend/
├── apps/                    # Applications (deployable)
│   ├── admin-app/          # Admin dashboard
│   ├── fleet-app/          # Fleet management
│   └── user-app/           # User-facing app
├── packages/               # Shared packages
│   └── ui/                # Shared UI components
├── package.json           # Root config & dependency management
├── turbo.json            # Turborepo pipeline configuration
└── tsconfig.base.json    # Shared TypeScript configuration
```

## Quick Start

```bash
# Install dependencies
npm install

# Run all apps in dev mode
npm run dev

# Build all apps
npm run build

# Type-check all packages
npm run type-check

# Lint all packages
npm run lint

# Format code
npm run format
```

## Technology Stack

- **Build System**: Turborepo 2.6+ for task orchestration
- **Package Manager**: npm workspaces
- **Framework**: React 19.2
- **Language**: TypeScript 5.9
- **Bundler**: Vite 7.2
- **Styling**: Tailwind CSS v4 with Vite plugin
- **Code Quality**: ESLint 9, Prettier 3

## Development

### Adding a New App

```bash
cd apps
# Copy existing app structure or scaffold new Vite app
npm create vite@latest new-app -- --template react-ts
```

### Adding a New Shared Package

```bash
cd packages
mkdir new-package
cd new-package
npm init -y
# Configure package.json with main: "./src/index.ts"
```

### Using Shared UI Components

```typescript
// In any app
import { Button } from "@exploresg.frontend/ui";

function App() {
  return <Button label="Click me" onClick={() => {}} />;
}
```

### Tailwind in Shared Packages

Tailwind classes in `packages/ui` are automatically scanned and processed by all apps. Hot-reload works across package boundaries.

## Key Configuration

### Dependency Management

All common dependencies are centralized in the root `package.json`. Apps only declare app-specific dependencies.

### TypeScript

- Root: `tsconfig.base.json` - shared compiler options
- Apps: Extend base config with app-specific settings
- Packages: Extend base config, use composite builds

### Turborepo Pipeline

- `dev`: Parallel dev servers (no cache)
- `build`: Sequential with type-check dependency
- `type-check`: Parallel type checking
- `lint`: Parallel linting

## Scripts

- `npm run dev` - Start all dev servers
- `npm run build` - Build all apps for production
- `npm run type-check` - Type-check all packages
- `npm run lint` - Lint all packages
- `npm run format` - Auto-format all code
- `npm run format:check` - Verify formatting (CI)
- `npm run clean` - Clean build artifacts

## Architecture Patterns

This monorepo mirrors Maven's parent POM structure:

- Root `package.json` = Maven parent POM
- Workspaces = Maven modules
- Turborepo = Maven reactor

## IDE Setup

- **VSCode**: Settings in `.vscode/settings.json` enable Tailwind IntelliSense
- **Extensions**: Install Tailwind CSS IntelliSense, ESLint, Prettier
