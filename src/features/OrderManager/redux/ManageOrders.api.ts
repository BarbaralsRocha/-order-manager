import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '../../../redux/baseQuery';
import { ContractResponse } from '../../../interfaces/IMockContract';
import { IProfile } from '../interfaces/IProfile';

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
  }),
});

export const { useGetProfileQuery } = ManageOrdersApi;
