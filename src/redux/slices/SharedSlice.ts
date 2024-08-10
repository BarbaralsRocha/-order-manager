import { createSlice } from '@reduxjs/toolkit';
import { IDrawer } from '../../interfaces/IDrawer';

const initialState = {
  drawer: {
    isOpen: false,
    component: null,
    title: '',
  } as IDrawer,
};

const sharedSlice = createSlice({
  name: 'sharedSlice',
  initialState,
  reducers: {
    setDrawer: (state, { payload }: { payload: IDrawer }): void => {
      state.drawer = { ...state.drawer, ...payload };
    },
  },
});

export const SharedActions = sharedSlice.actions;
export const { reducer: SharedReducer } = sharedSlice;
