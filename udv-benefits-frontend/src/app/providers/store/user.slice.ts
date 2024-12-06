import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { User } from "entities/user.model";

interface UserState {
  tempToken: string | null;
  accessToken: string | null;
  refreshToken: string | null;
  userProfile: User;
}

const initialState: UserState = {
  accessToken: localStorage.getItem("accessToken") ?? null,
  refreshToken: localStorage.getItem("refreshToken") ?? null,
  tempToken: localStorage.getItem("token") ?? null,
  userProfile: {
    id: null,
    email: null,
    firstName: null,
    lastName: null,
    middleName: null,
    birthDate: null,
    phone: null,
    hasChildren: null,
    position: null,
    isAdmin: null,
    balance: null,
    isVerified: false,
    workStartDate: null,
    workEndDate: null,
    department: null,
    workExperience: {
      months: null,
      years: null,
    },
    age: null,
    legalEntity: null,
    profilePhoto: null,
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
    setProfile(state, action: PayloadAction<User>) {
      state.userProfile = action.payload;
    },
    clearTokens(state) {
      state.accessToken = null;
      state.refreshToken = null;
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
    },
    decreaseBalance(state, action: PayloadAction<number>) {
      state.userProfile.balance -= action.payload;
    },
  },
});

export default userSlice.reducer;
export const userActions = userSlice.actions;
