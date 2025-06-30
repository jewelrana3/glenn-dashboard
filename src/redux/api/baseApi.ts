import { createApi } from '@reduxjs/toolkit/query/react';

import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://api.ambitiousbizxchange.com/api/v1',
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

export const imageUrl = 'https://api.ambitiousbizxchange.com';
