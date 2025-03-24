import { api } from '../api/baseApi';

const transactionSlice = api.injectEndpoints({
    endpoints: (builder) => ({
        getTransaction: builder.query({
            query: (input) => {
                const params = new URLSearchParams();
                if (input) params.append('searchTerm', input);
                return {
                    url: `/transaction?${params.toString()}`,
                    method: 'GET',
                };
            },
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
