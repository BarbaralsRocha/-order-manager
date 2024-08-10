import { createSlice } from '@reduxjs/toolkit';
import { OrderManagerSectionType } from '../../utils/types/OrderManagerSection.type';

const initialState = {
  currentMenuSelected: 'orders' as OrderManagerSectionType,
};

const manageOrdersSlice = createSlice({
  name: 'manageOrdersSlice',
  initialState,
  reducers: {
    setCurrentMenuSelect: (
      state,
      { payload }: { payload: OrderManagerSectionType },
    ): void => {
      state.currentMenuSelected = payload;
    },
  },
});

export const ManageOrdersActions = manageOrdersSlice.actions;
export const { reducer: ManagerOrdersReducer } = manageOrdersSlice;
