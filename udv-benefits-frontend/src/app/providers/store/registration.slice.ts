import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface RegistrationState {
  email: string;
  firstName: string;
  secondName: string;
  lastName: string;
  birthDate: string;
  phoneNumber: string;
}

const initialState: RegistrationState = {
  email: "",
  firstName: "",
  secondName: "",
  lastName: "",
  birthDate: "",
  phoneNumber: "",
};

const registrationSlice = createSlice({
  name: "registration",
  initialState,
  reducers: {
    setEmail(state, action: PayloadAction<string>) {
      state.email = action.payload;
    },
    setDetails() {},
  },
});

export default registrationSlice.reducer;
export const registrationActions = registrationSlice.actions;
