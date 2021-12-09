import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import ethereumReducer from "../features/ethSlice";
export const store = configureStore({
  reducer: {
    ethereum: ethereumReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
