import { api } from '../api/baseApi';

const notificationSlice = api.injectEndpoints({
    endpoints: (builder) => ({
        notification: builder.query({
            query: () => ({
                url: '/notification/admin',
                method: 'GET',
            }),
        }),
    }),
});

export const { useNotificationQuery } = notificationSlice;
