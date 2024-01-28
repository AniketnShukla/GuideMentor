import { apiSlice } from './apiSlice';
const USERS_URL = '/user';

export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/login`,
                method: 'POST',
                body: data
            })
        }),
        fetchData: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/all-data`,
                method: 'POST',
                body: data
            })
        }),
        register: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/signup`,
                method: 'POST',
                body: data
            }),
        }),
        logout: builder.mutation({
            query: () => ({
                url: `${USERS_URL}/logout`,
                method: 'POST',
            })
        }),
        updateUser: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/profile`,
                method: 'POST',
            })
        })
    })
});

export const {
    useLoginMutation,
    useRegisterMutation,
    useLogoutMutation,
    useUpateUserMutation,
    useFetchDataMutation
} = usersApiSlice;