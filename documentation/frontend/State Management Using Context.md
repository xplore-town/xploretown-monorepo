# Context API State Management

## Overview

Context API manages **UI state** like theme, locale, and preferences that don't need Redux's complexity.

## Structure

```
apps/user-app/src/context/
├── themeContextInstance.ts  # Context instance + type
├── ThemeContext.tsx         # Provider component (exports only)
└── useTheme.ts              # Consumer hook
```

## Implementation

### 1. Context Instance + Type

**File**: `context/themeContextInstance.ts`

```tsx
import { createContext } from "react";

export interface ThemeContextType {
  theme: "light" | "dark";
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined
);
```

### 2. Provider Component

**File**: `context/ThemeContext.tsx`

```tsx
import { useState, type ReactNode } from "react";
import { ThemeContext } from "./themeContextInstance";

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
```

### 3. Consumer Hook

**File**: `context/useTheme.ts`

```tsx
import { useContext } from "react";
import { ThemeContext } from "./themeContextInstance";

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
};
```

## Provider Setup

**File**: `apps/user-app/src/main.tsx`

```tsx
import { ThemeProvider } from "./context/ThemeContext";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider>
        <RouterProvider router={router} />
      </ThemeProvider>
    </Provider>
  </StrictMode>
);
```

## Usage in Components

```tsx
import { useTheme } from "../context/useTheme";

function Header() {
  const { theme, toggleTheme } = useTheme();

  return <button onClick={toggleTheme}>Current: {theme}</button>;
}
```

## Best Practices

### ✅ Use Context For:

- Theme (light/dark mode)
- Language/locale selection
- UI preferences (sidebar collapsed)
- Simple boolean flags

### ❌ Don't Use Context For:

- User authentication (use Redux)
- API data/caching (use Redux)
- Shopping cart (use Redux)
- Complex derived state (use Redux)

## File Separation Pattern

**Why separate files?**

- React Fast Refresh requires components in separate files from hooks
- Prevents "Fast refresh only works when a file only exports components" error
- Cleaner imports: `import { ThemeProvider }` vs `import { useTheme }`

## Adding More Contexts

Follow the same pattern:

```
context/
├── localeContextInstance.ts
├── LocaleContext.tsx
└── useLocale.ts
```

Then wrap in `main.tsx`:

```tsx
<ThemeProvider>
  <LocaleProvider>
    <RouterProvider router={router} />
  </LocaleProvider>
</ThemeProvider>
```
