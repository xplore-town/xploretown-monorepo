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
