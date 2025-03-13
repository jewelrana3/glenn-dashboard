import { api } from '../api/baseApi';

const categorySlice = api.injectEndpoints({
    endpoints: (builder) => ({
        createCategory: builder.mutation({
            query: (data) => {
                return {
                    url: '/category',
                    method: 'POST',
                    body: data,
                };
            },
        }),

        getAllCategory: builder.query({
            query: () => {
                return {
                    method: 'GET',
                    url: '/category',
                };
            },
        }),

        // getSingleFaq: builder.query({
        //     query: (id) => {
        //         return {
        //             method: 'GET',
        //             url: `/faq/${id}`,
        //         };
        //     },
        // }),

        // deleteFaq: builder.mutation({
        //     query: (id) => {
        //         return {
        //             url: `/faq/${id}`,
        //             method: 'DELETE',
        //         };
        //     },
        // }),

        // editFaq: builder.mutation({
        //     query: (data) => {
        //         return {
        //             url: `/faq/${data?._id}`,
        //             method: 'PATCH',
        //             body: data,
        //         };
        //     },
        // }),
    }),
});

export const { useCreateCategoryMutation, useGetAllCategoryQuery } = categorySlice;
