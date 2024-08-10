import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './root.reducer';
import { ManageOrdersApi } from '../features/OrderManager/redux/ManageOrders.api';
import { OrdersApi } from '../features/Orders/redux/Orders.api';

export const store = (preloadedState?: Partial<RootState>) =>
  configureStore({
    reducer: rootReducer,
    devTools: process.env.NAME !== 'PRD',
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        immutableCheck: false,
        serializableCheck: false,
      }).concat(ManageOrdersApi.middleware, OrdersApi.middleware),
    preloadedState,
  });

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof store>;
export type AppDispatch = AppStore['dispatch'];
