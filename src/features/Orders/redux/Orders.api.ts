import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '../../../redux/baseQuery';
import { ContractResponse } from '../../../interfaces/IMockContract';
import { IOrder } from '../interfaces/IOrder.interface';
import { IOptionSelect } from '../interfaces/ICommon.interface';

const endpoint = '/order-manager/api/v1';

export const OrdersApi = createApi({
  reducerPath: 'OrdersApi',
  baseQuery,
  refetchOnMountOrArgChange: true,
  endpoints: (builder) => ({
    getOrders: builder.query<ContractResponse<IOrder[]>, void>({
      query: () => ({
        url: `${endpoint}/orders/summary`,
      }),
    }),
    getCustomerList: builder.query<ContractResponse<IOptionSelect[]>, void>({
      query: () => ({
        url: `${endpoint}/orders/customers`,
      }),
    }),
    getProductsList: builder.query<ContractResponse<IOptionSelect[]>, void>({
      query: () => ({
        url: `${endpoint}/orders/products`,
      }),
    }),
  }),
});

export const {
  useGetOrdersQuery,
  useGetProductsListQuery,
  useGetCustomerListQuery,
} = OrdersApi;
