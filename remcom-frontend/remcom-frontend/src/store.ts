import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import recordsReducer from './slices/recordsSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    records: recordsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
