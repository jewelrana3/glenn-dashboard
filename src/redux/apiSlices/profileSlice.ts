import { api } from '../api/baseApi';

const profileSlice = api.injectEndpoints({
    endpoints: (builder) => ({
        profile: builder.query({
            query: () => ({
                url: '/user/profile',
                method: 'GET',
            }),
        }),

        updateProfile: builder.mutation({
            query: (data) => ({
                url: '/user',
                method: 'PATCH',
                body: data,
            }),
        }),
    }),
});

export const { useProfileQuery, useUpdateProfileMutation } = profileSlice;
