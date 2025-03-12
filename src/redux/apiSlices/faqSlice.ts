import { api } from '../api/baseApi';

const faqSlice = api.injectEndpoints({
    endpoints: (builder) => ({
        getFaq: builder.query({
            query: () => {
                return {
                    method: 'GET',
                    url: '/faq',
                };
            },
        }),

        deleteEvent: builder.mutation({
            query: (id) => {
                return {
                    url: `/faq/${id}`,
                    method: 'DELETE',
                };
            },
        }),
    }),
});

export const { useGetFaqQuery, useDeleteEventMutation } = faqSlice;
