import { api } from '../api/baseApi';

const profileSlice = api.injectEndpoints({
    endpoints: (builder) => ({
        profile: builder.query({
            query: () => ({
                url: '/user/profile',
                method: 'GET',
            }),
        }),
    }),
});

export const { useProfileQuery } = profileSlice;
