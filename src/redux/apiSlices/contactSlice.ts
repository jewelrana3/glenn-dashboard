import { api } from '../api/baseApi';

const contactSlice = api.injectEndpoints({
    endpoints: (builder) => ({
        getContacts: builder.query({
            query: () => {
                return {
                    url: '/contact',
                    method: 'GET',
                };
            },
        }),
    }),
});

export const { useGetContactsQuery } = contactSlice;
