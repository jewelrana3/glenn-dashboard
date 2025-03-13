import { api } from '../api/baseApi';

const PrivacyPolicySlice = api.injectEndpoints({
    endpoints: (builder) => ({
        getPrivacyPolicy: builder.query({
            query: () => ({
                url: '/rule/privacy-policy',
                method: 'GET',
            }),
        }),
        createPolicy: builder.mutation({
            query: (data) => ({
                url: '/rule/privacy-policy',
                method: 'POST',
                body: data,
            }),
        }),
    }),
});

export const { useGetPrivacyPolicyQuery, useCreatePolicyMutation } = PrivacyPolicySlice;
