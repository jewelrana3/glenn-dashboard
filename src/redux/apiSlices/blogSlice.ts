import { api } from '../api/baseApi';

const blogSlice = api.injectEndpoints({
    endpoints: (builder) => ({
        AllBlogData: builder.query({
            query: () => {
                return {
                    method: 'GET',
                    url: '/blog',
                };
            },
        }),

        addBlog: builder.mutation({
            query: (data) => {
                return {
                    url: '/blog',
                    method: 'POST',
                    body: data,
                };
            },
        }),
    }),
});

export const { useAllBlogDataQuery, useAddBlogMutation } = blogSlice;
