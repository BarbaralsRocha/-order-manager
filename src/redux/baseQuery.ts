import { fetchBaseQuery } from '@reduxjs/toolkit/query';

export const baseQuery = fetchBaseQuery({
  baseUrl: process.env.REACT_APP_BASE_URL,
  prepareHeaders: (headers) => {
    headers.set('Access-Control-Allow-Origin', '*');
    headers.set('Authorization', 'Bearer 123');
    headers.set('Content-Type', 'application/json');
    return headers;
  },
});
