import { api } from '../../api/baseApi';

const dashboardSlice = api.injectEndpoints({
    endpoints: (builder) => ({
        getVisitors: builder.query({
            query: () => ({
                url: '/visitor',
                method: 'GET',
            }),
            transformResponse: (res: any) => res.data,
        }),

        getUsers: builder.query({
            query: () => ({
                url: '/user',
                method: 'GET',
            }),
            transformResponse: (res: any) => res.data.users,
        }),
        getAdmin: builder.query({
            query: () => ({
                url: '/admin',
                method: 'GET',
            }),
        }),
    }),
});

export const { useGetVisitorsQuery, useGetUsersQuery, useGetAdminQuery } = dashboardSlice;
