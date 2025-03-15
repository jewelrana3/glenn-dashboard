import { api } from '../api/baseApi';

const contactSlice = api.injectEndpoints({
    endpoints: (builder) => ({
        createContact: builder.mutation({
            query: (data) => {
                return {
                    url: '/contact',
                    method: 'POST',
                    body: data,
                };
            },
        }),
    }),
});

export const { useCreateContactMutation } = contactSlice;
