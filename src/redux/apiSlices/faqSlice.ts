import { api } from '../api/baseApi';

const faqSlice = api.injectEndpoints({
    endpoints: (builder) => ({
        createFaq: builder.mutation({
            query: (data) => {
                return {
                    url: '/faq',
                    method: 'POST',
                    body: data,
                };
            },
        }),

        getAllFaq: builder.query({
            query: () => {
                return {
                    method: 'GET',
                    url: '/faq',
                };
            },
        }),

        getSingleFaq: builder.query({
            query: (id) => {
                return {
                    method: 'GET',
                    url: `/faq/${id}`,
                };
            },
        }),

        deleteFaq: builder.mutation({
            query: (id) => {
                return {
                    url: `/faq/${id}`,
                    method: 'DELETE',
                };
            },
        }),

        editFaq: builder.mutation({
            query: (data) => {
                return {
                    url: `/faq/${data?._id}`,
                    method: 'PATCH',
                    body: data,
                };
            },
        }),
    }),
});

export const {
    useCreateFaqMutation,
    useGetAllFaqQuery,
    useDeleteFaqMutation,
    useEditFaqMutation,
    useGetSingleFaqQuery,
} = faqSlice;
