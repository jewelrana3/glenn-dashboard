import { api } from '../../api/baseApi';

const businessSlice = api.injectEndpoints({
    endpoints: (builder) => ({
        getBusinessList: builder.query({
            query: ({ input, status }) => {
                const params = new URLSearchParams();
                if (input) params.append('searchTerm', input);
                if (status) params.append('status', status);

                return {
                    url: `/business?${params.toString()}`,
                };
            },
            providesTags: ['Business'],
        }),

        updateBusiness: builder.mutation({
            query: ({ _id, data }) => {
                return {
                    url: `/business/${_id}`,
                    method: 'PATCH',
                    body: data,
                };
            },
            invalidatesTags: ['Business'],
        }),
    }),
});

export const { useGetBusinessListQuery, useUpdateBusinessMutation } = businessSlice;
