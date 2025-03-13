import { api } from '../api/baseApi';

const currentPasswordSlice = api.injectEndpoints({
    endpoints: (builder) => ({
        changePassword: builder.mutation({
            query: (data) => {
                return {
                    url: '/auth/change-password',
                    method: 'POST',
                    body: data,
                };
            },
        }),
    }),
});

export const { useChangePasswordMutation } = currentPasswordSlice;
