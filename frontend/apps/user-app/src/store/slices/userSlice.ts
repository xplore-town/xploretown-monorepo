import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { Role } from "@exploresg.frontend/utils";
interface UserState {
  name: string | null;
  email: string | null;
  isAuthenticated: boolean;
  roles: Role[];
}

const initialState: UserState = {
  name: null,
  email: null,
  isAuthenticated: false,
  roles: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<{ name: string; email: string; roles: Role[] }>) => {
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.isAuthenticated = true;
      state.roles = action.payload.roles;
    },
    clearUser: (state) => {
      state.name = null;
      state.email = null;
      state.isAuthenticated = false;
      state.roles = [];
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
