# Redux Toolkit State Management

## Overview

Redux manages **global application state** like user authentication, API data, and complex business logic.

## Stack

- **@reduxjs/toolkit**: 2.5.0 - Modern Redux with less boilerplate
- **react-redux**: 9.2.0 - React bindings

## Structure

```
apps/user-app/src/store/
├── store.ts           # Root store configuration
├── hooks.ts           # Typed hooks (useAppDispatch, useAppSelector)
└── slices/
    └── userSlice.ts   # User state slice
```

## Implementation

### 1. Store Configuration

**File**: `store/store.ts`

```tsx
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
```

### 2. Typed Hooks

**File**: `store/hooks.ts`

```tsx
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "./store";

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
```

### 3. Slice Example

**File**: `store/slices/userSlice.ts`

```tsx
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  name: string | null;
  email: string | null;
  isAuthenticated: boolean;
}

const initialState: UserState = {
  name: null,
  email: null,
  isAuthenticated: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (
      state,
      action: PayloadAction<{ name: string; email: string }>
    ) => {
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.isAuthenticated = true;
    },
    clearUser: (state) => {
      state.name = null;
      state.email = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
```

## Provider Setup

**File**: `apps/user-app/src/main.tsx`

```tsx
import { Provider } from "react-redux";
import { store } from "./store/store";

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
import { useAppSelector, useAppDispatch } from "../store/hooks";
import { setUser, clearUser } from "../store/slices/userSlice";

function Profile() {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);

  const handleLogin = () => {
    dispatch(setUser({ name: "John Doe", email: "john@example.com" }));
  };

  const handleLogout = () => {
    dispatch(clearUser());
  };

  return (
    <div>
      {user.isAuthenticated ? (
        <>
          <p>
            {user.name} ({user.email})
          </p>
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <button onClick={handleLogin}>Login</button>
      )}
    </div>
  );
}
```

## Best Practices

### ✅ Use Redux For:

- User authentication state
- Shopping cart/checkout data
- API data caching
- Complex forms with validation
- Data shared across many components
- State that needs persistence (via middleware)

### ❌ Don't Use Redux For:

- Form field values (use local state)
- UI toggles (use Context)
- Derived data (use selectors instead)
- Temporary UI state

## Adding New Slices

1. Create slice file: `store/slices/cartSlice.ts`
2. Import in `store.ts`:

```tsx
import cartReducer from "./slices/cartSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    cart: cartReducer, // Add here
  },
});
```

3. Use in components:

```tsx
const cart = useAppSelector((state) => state.cart);
```

## Async Operations

For API calls, use `createAsyncThunk`:

```tsx
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchUser = createAsyncThunk(
  "user/fetch",
  async (userId: string) => {
    const response = await fetch(`/api/users/${userId}`);
    return response.json();
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: { data: null, loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      });
  },
});
```

## DevTools

Redux DevTools extension auto-enabled with `configureStore`. Install browser extension to debug:

- Time-travel debugging
- Action history
- State diff viewer

## When to Use Redux vs Context

| Feature       | Redux     | Context        |
| ------------- | --------- | -------------- |
| User auth     | ✅        | ❌             |
| API data      | ✅        | ❌             |
| Shopping cart | ✅        | ❌             |
| Theme         | ❌        | ✅             |
| Locale        | ❌        | ✅             |
| Form state    | ❌        | ❌ (use local) |
| DevTools      | ✅        | ❌             |
| Middleware    | ✅        | ❌             |
| Performance   | ✅ Better | ⚠️ Re-renders  |
