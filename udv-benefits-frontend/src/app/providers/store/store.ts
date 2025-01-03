import { configureStore } from "@reduxjs/toolkit";
import registrationSlice from "./registration.slice";
import userSlice from "./user.slice";

export const store = configureStore({
  reducer: {
    registration: registrationSlice,
    user: userSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
