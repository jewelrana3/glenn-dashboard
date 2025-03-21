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

        editBlog: builder.mutation({
            query: ({ _id, formData }) => {
                console.log(_id);
                return {
                    url: `/blog/${_id}`,
                    method: 'PATCH',
                    body: formData,
                };
            },
        }),

        blogDelete: builder.mutation({
            query: (id) => {
                return {
                    url: `/blog/${id}`,
                    method: 'DELETE',
                };
            },
        }),
    }),
});

// Export hooks to be used in your components
export const { useAllBlogDataQuery, useAddBlogMutation, useEditBlogMutation, useBlogDeleteMutation } = blogSlice;
