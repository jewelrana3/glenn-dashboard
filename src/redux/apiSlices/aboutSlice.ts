import { api } from '../api/baseApi';

const AboutSlice = api.injectEndpoints({
    endpoints: (builder) => ({
        getAbout: builder.query({
            query: () => ({
                url: '/rule/about',
                method: 'GET',
            }),
        }),
        createAbout: builder.mutation({
            query: (data) => ({
                url: '/rule/about',
                method: 'POST',
                body: data,
            }),
        }),
    }),
});

export const { useCreateAboutMutation, useGetAboutQuery } = AboutSlice;
