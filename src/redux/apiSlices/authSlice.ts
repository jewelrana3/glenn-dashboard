import { api } from '../api/baseApi';

const authSlice = api.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (data) => {
                return {
                    method: 'POST',
                    url: '/auth/login',
                    body: data,
                };
            },
        }),

        forgetPassword: builder.mutation({
            query: (data) => {
                return {
                    method: 'POST',
                    url: '/auth/forgot-password',
                    body: data,
                };
            },
        }),

        otpVerify: builder.mutation({
            query: (data) => {
                return {
                    method: 'POST',
                    url: '/auth/verify-email',
                    body: data,
                };
            },
        }),

        resetPasswod: builder.mutation({
            query: (value) => {
                const token = localStorage.getItem('oneTimeToken');

                if (!token) {
                    console.error('Token is missing!');
                }

                return {
                    method: 'POST',
                    url: '/auth/reset-password',
                    body: value,
                    headers: {
                        Authorization: `${token}`,
                    },
                };
            },
        }),

        resendCode: builder.mutation({
            query: (data) => {
                return {
                    method: 'POST',
                    url: '/auth/resend-otp',
                    body: data,
                };
            },
        }),
    }),
});

export const {
    useLoginMutation,
    useForgetPasswordMutation,
    useOtpVerifyMutation,
    useResetPasswodMutation,
    useResendCodeMutation,
} = authSlice;
