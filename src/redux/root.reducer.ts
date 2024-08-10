import { combineReducers } from '@reduxjs/toolkit';
import { ManageOrdersApi } from '../features/OrderManager/redux/ManageOrders.api';
import { ManagerOrdersReducer } from '../features/OrderManager/redux/slices/ManageOrders.slice';
import { SharedReducer } from './slices/SharedSlice';
import { OrdersApi } from '../features/Orders/redux/Orders.api';

export default combineReducers({
  [ManageOrdersApi.reducerPath]: ManageOrdersApi.reducer,
  [OrdersApi.reducerPath]: OrdersApi.reducer,
  ManagerOrdersReducer,
  SharedReducer,
});
