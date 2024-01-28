import { createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
    // baseUrl: 'http://localhost:3200/'
    baseUrl: import.meta.env.VITE_SERVER_URL
});

export const apiSlice = createApi({
    baseQuery,
    tagTypes: ['User'],
    endpoints: (builder) => ({})
});