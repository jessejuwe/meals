import { configureStore } from '@reduxjs/toolkit';

import favSlice from '../slices/favorites';

const rootReducer = { [favSlice.name]: favSlice.reducer };

// creating the store
const store = configureStore({
  reducer: rootReducer,
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
