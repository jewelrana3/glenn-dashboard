import { api } from '../api/baseApi';

const contactSlice = api.injectEndpoints({
    endpoints: (builder) => ({
        getContacts: builder.query({
            query: (input) => {
                const params = new URLSearchParams();
                if (input) params.append('searchTerm', input);
                return {
                    url: `/contact?${params.toString()}`,
                    method: 'GET',
                };
            },
        }),
    }),
});

export const { useGetContactsQuery } = contactSlice;
