import { api } from '../api/baseApi';

const categorySlice = api.injectEndpoints({
    endpoints: (builder) => ({
        createCategory: builder.mutation({
            query: (data) => {
                return {
                    url: '/category',
                    method: 'POST',
                    body: data,
                };
            },
        }),

        getAllCategory: builder.query({
            query: () => {
                return {
                    method: 'GET',
                    url: '/category/admin-category',
                };
            },
        }),

        deleteCategory: builder.mutation({
            query: (id) => {
                return {
                    url: `/category/${id}`,
                    method: 'DELETE',
                };
            },
        }),

        editCategory: builder.mutation({
            query: (data) => {
                return {
                    url: `/category/${data?._id}`,
                    method: 'PATCH',
                    body: data,
                };
            },
        }),
    }),
});

export const { useCreateCategoryMutation, useGetAllCategoryQuery, useEditCategoryMutation, useDeleteCategoryMutation } =
    categorySlice;
