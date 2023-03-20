import { apiSlice } from '../../app/api/apiSlice'
import { logout } from './authSlice'

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({

        login: builder.mutation({
            query: credentials => ({
                url: '/auth/authenticate',
                method: 'POST',
                body: { ...credentials }
            })
        }),

        verifyToken: builder.mutation({
            query: token => ({
                url: `/auth/verify/${token}`,
                method: 'POST',
                body: token
            })
        }),

        refresh: builder.mutation({
            query: () => ({
                url: '/auth/refresh',
                method: 'GET',
            }),
        }),

        sendLogout: builder.mutation({
            query: () => ({
                url: '/auth/logout',
                method: 'POST'
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    const data = await queryFulfilled
                    if (data) {
                        dispatch(logout())
                    }
                } catch (error) {
                    console.log(error)
                }
            }
        }),
        changePassword: builder.mutation({
            query: (passwords) => ({
                url: '/auth/change-password',
                method: 'POST',
                body: passwords
            }),
        }),
        forgotPassword: builder.mutation({
            query: (phone) => ({
                url: '/auth/forgot-password',
                method: 'POST',
                body: phone
            }),
        }),
        resetPassword: builder.mutation({
            query: ({ token, ...data }) => ({
                url: `/auth/password/reset/${token}`,
                method: 'POST',
                body: data
            }),
        })
    })

})

export const {
    useLoginMutation,
    useVerifyTokenMutation,
    useRefreshMutation,
    useSendLogoutMutation,
    useChangePasswordMutation,
    useForgotPasswordMutation,
    useResetPasswordMutation

} = authApiSlice