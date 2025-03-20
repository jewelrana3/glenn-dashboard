import { api } from '../api/baseApi';

const transactionSlice = api.injectEndpoints({
    endpoints: (builder) => ({
        getTransaction: builder.query({
            query: () => ({
                url: '/transactions',
                method: 'GET',
            }),
        }),

        addTransaction: builder.mutation({
            query: (data) => ({
                url: `/transaction/${data?._id}`,
                method: 'POST',
                body: data,
            }),
        }),
    }),
});

export const { useGetTransactionQuery, useAddTransactionMutation } = transactionSlice;
