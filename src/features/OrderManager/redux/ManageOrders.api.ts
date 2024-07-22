import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '../../../redux/baseQuery';
import { ContractResponse } from '../../../interfaces/IMockContract';
import { IProfile } from '../interfaces/IProfile';
import { IOrder } from '../interfaces/IOrder';

const endpoint = '/order-manager/api/v1';

export const ManageOrdersApi = createApi({
  reducerPath: 'ManageOrdersApi',
  baseQuery,
  refetchOnMountOrArgChange: true,
  endpoints: (builder) => ({
    getProfile: builder.query<ContractResponse<IProfile>, void>({
      query: () => ({
        url: `${endpoint}/profile`,
      }),
    }),
    getOrders: builder.query<ContractResponse<IOrder[]>, void>({
      query: () => ({
        url: `${endpoint}/orders`,
      }),
    }),
  }),
});

export const { useGetProfileQuery, useGetOrdersQuery } = ManageOrdersApi;
