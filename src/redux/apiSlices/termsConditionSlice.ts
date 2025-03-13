import { api } from '../api/baseApi';

const termsConditionSlice = api.injectEndpoints({
    endpoints: (builder) => ({
        getTermsCondition: builder.query({
            query: () => ({
                url: '/rule/terms-and-conditions',
                method: 'GET',
            }),
        }),
        createTermsCondition: builder.mutation({
            query: (data) => ({
                url: '/rule/terms-and-conditions',
                method: 'POST',
                body: data,
            }),
        }),
    }),
});

export const { useGetTermsConditionQuery, useCreateTermsConditionMutation } = termsConditionSlice;
