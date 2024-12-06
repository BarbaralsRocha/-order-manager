import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '../../../commons/redux/baseQuery';
import { ContractResponse } from '../../../commons/interfaces/IMockContract';
import { IProduct } from '../utils/interfaces/IProduct';

const endpoint = '/order-manager/api/v1';

export const ProductsApi = createApi({
  reducerPath: 'ProductsApi',
  baseQuery,
  refetchOnMountOrArgChange: true,
  endpoints: (builder) => ({
    getProducts: builder.query<ContractResponse<IProduct[]>, string>({
      query: (params) => ({
        url: `${endpoint}/products/summary?${params}`,
      }),
    }),
    addProduct: builder.mutation<ContractResponse<boolean>, IProduct>({
      query: (order: IProduct) => ({
        url: `${endpoint}/product`,
        method: 'POST',
        body: order,
      }),
    }),
    editProduct: builder.mutation<
      ContractResponse<boolean>,
      { body: IProduct; date: string }
    >({
      query: ({ body, date }) => ({
        url: `${endpoint}/product?${date}`,
        method: 'PUT',
        body: body,
      }),
    }),
    deleteProduct: builder.mutation<
      ContractResponse<boolean>,
      { productId: number }
    >({
      query: ({ productId }) => ({
        url: `${endpoint}/product/${productId}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetProductsQuery,
  useAddProductMutation,
  useDeleteProductMutation,
  useEditProductMutation,
} = ProductsApi;