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
    setUser: (state, action: PayloadAction<{ name: string; email: string }>) => {
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
