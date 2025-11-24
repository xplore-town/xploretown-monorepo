import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { Role } from "@exploresg.frontend/utils";

// 1. Define the shape based on AuthResponse.java -> UserInfo
// This combines Identity fields (User) and Profile fields (UserProfile)
export interface UserInfo {
  userId: string;
  email: string;
  givenName: string;
  familyName: string;
  picture: string;

  // -- Profile Details (Nullable) --
  phone: string | null;
  dateOfBirth: string | null;
  drivingLicenseNumber: string | null;
  passportNumber: string | null;
  preferredLanguage: string | null;
  countryOfResidence: string | null;
}

// 2. Global State Shape
interface UserState {
  token: string | null;
  isAuthenticated: boolean;
  requiresProfileSetup: boolean;
  roles: Role[];
  userInfo: UserInfo | null;
}

const initialState: UserState = {
  token: localStorage.getItem("token"),
  isAuthenticated: !!localStorage.getItem("token"),
  requiresProfileSetup: false,
  roles: [],
  userInfo: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (
      state,
      action: PayloadAction<{
        token: string;
        userInfo: UserInfo;
        roles: Role[];
        requiresProfileSetup: boolean;
      }>
    ) => {
      state.token = action.payload.token;
      state.userInfo = action.payload.userInfo;
      state.isAuthenticated = true;
      state.roles = action.payload.roles;
      state.requiresProfileSetup = action.payload.requiresProfileSetup;

      // Side Effect: Persist token
      localStorage.setItem("token", action.payload.token);
    },
    updateProfile: (state, action: PayloadAction<Partial<UserInfo>>) => {
      // Useful when the user updates just their phone number later
      if (state.userInfo) {
        state.userInfo = { ...state.userInfo, ...action.payload };
      }
    },
    clearUser: (state) => {
      state.token = null;
      state.userInfo = null;
      state.roles = [];
      state.isAuthenticated = false;
      state.requiresProfileSetup = false;

      localStorage.removeItem("token");
    },
  },
});

export const { setUser, clearUser, updateProfile } = userSlice.actions;
export default userSlice.reducer;
