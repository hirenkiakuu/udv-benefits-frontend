import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface UserProfile {
  email: string | null;
  firstName: string | null;
  lastName: string | null;
  middleName: string | null;
  birthDate: string | null;
  phone: string | null;
  hasChildren: boolean | null;
  position: string | null;
  isAdmin: boolean | null;
  coins: number | null;
}

interface UserState {
  tempToken: string | null;
  accessToken: string | null;
  refreshToken: string | null;
  userProfile: UserProfile;
}

const initialState: UserState = {
  accessToken: localStorage.getItem("accessToken") ?? null,
  refreshToken: localStorage.getItem("refreshToken") ?? null,
  tempToken: localStorage.getItem("token") ?? null,
  userProfile: {
    email: null,
    firstName: null,
    lastName: null,
    middleName: null,
    birthDate: null,
    phone: null,
    hasChildren: null,
    position: null,
    isAdmin: null,
    coins: null,
  },
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setTempToken(state, action: PayloadAction<string>) {
      state.tempToken = action.payload;
    },
    setTokens(
      state,
      action: PayloadAction<{ accessToken: string; refreshToken: string }>
    ) {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      localStorage.setItem("accessToken", state.accessToken);
      localStorage.setItem("refreshToken", state.refreshToken);
    },
    setProfile(state, action: PayloadAction<UserProfile>) {
      state.userProfile.email = action.payload.email;
      state.userProfile.firstName = action.payload.firstName;
      state.userProfile.lastName = action.payload.lastName;
      state.userProfile.middleName = action.payload.middleName;
      state.userProfile.birthDate = action.payload.birthDate;
      state.userProfile.phone = action.payload.phone;
      state.userProfile.hasChildren = action.payload.hasChildren;
      state.userProfile.position = action.payload.position;
      state.userProfile.isAdmin = action.payload.isAdmin;
      state.userProfile.coins = action.payload.coins;
    },
  },
});

export default userSlice.reducer;
export const userActions = userSlice.actions;
