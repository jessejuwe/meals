import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface InitialState {
  ids: string[];
}

interface Payload {
  id: string;
}

const initialState: InitialState = {
  ids: [],
};

const favSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addFavorite(state, action: PayloadAction<Payload>) {
      state.ids.push(action.payload.id);
    },
    removeFavorite(state, action: PayloadAction<Payload>) {
      state.ids.splice(state.ids.indexOf(action.payload.id), 1);
      // state.ids.filter(favId => favId !== action.payload.id);
    },
  },
});

export const favActions = favSlice.actions;

export default favSlice;
