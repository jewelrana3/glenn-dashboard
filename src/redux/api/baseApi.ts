import { createApi } from '@reduxjs/toolkit/query/react';

import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://148.66.158.106:5000/api/v1',
        prepareHeaders: (headers) => {
            const token = localStorage.getItem('accressToken') || sessionStorage.getItem('accressToken');

            if (token) {
                headers.set('Authorization', ` Bearer ${token}`);
            }
            return headers;
        },
    }),
    tagTypes: ['Business'],
    endpoints: () => ({}),
});

export const imageUrl = 'http://148.66.158.106:5000';
