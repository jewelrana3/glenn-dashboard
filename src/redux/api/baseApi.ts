import { createApi } from '@reduxjs/toolkit/query/react';

import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://10.0.80.75:6006/api/v1',
        prepareHeaders: (headers) => {
            const token = localStorage.getItem('accressToken') || sessionStorage.getItem('accressToken');
            // localStorage.getItem('resetToken');
            // const resetToken = localStorage.getItem('resetToken');
            if (token) {
                headers.set('Authorization', ` Bearer ${token}`);
            }
            return headers;
        },
    }),
    tagTypes: ['Business'],
    endpoints: () => ({}),
});

export const imageUrl = 'http://10.0.80.75:6006';
