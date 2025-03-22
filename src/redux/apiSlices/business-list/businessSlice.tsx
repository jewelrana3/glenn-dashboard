import { api } from '../../api/baseApi';

const businessSlice = api.injectEndpoints({
    endpoints: (builder) => ({
        getBusinessList: builder.query({
            query: () => ({
                url: '/business',
                method: 'GET',
            }),
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
