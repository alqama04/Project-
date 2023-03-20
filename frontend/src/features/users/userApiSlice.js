import { apiSlice } from '../../app/api/apiSlice'
import { logout } from '../auth/authSlice';


export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getUsers: builder.query({
            query: (search) => ({
                url: `/users/admin/users${search}`,
                method: "GET",
            }),
        }),

        getUserDetail: builder.query({
            query: (id) => ({
                url: `/users/admin/users/${id}`,
                method: "GET",
            })
        }),

        addNewUser: builder.mutation({
            query: newUserData => ({
                url: '/users/register',
                method: "POST",
                body: {
                    ...newUserData
                }
            }),
        }),
        profile: builder.query({
            query: (id) => ({
                url: `/users/profile/${id}`,
                method: 'GET'
            })
        }),

        
        updateProfile: builder.mutation({
            query: ({ id, ...userData }) => ({
                url: `/users/profile/${id}`,
                method: "POST",
                body: userData
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    const data = await queryFulfilled
                    console.log(data)
                    if (!data.data.user) {
                        dispatch(logout())
                    }
                } catch (error) {
                    console.log(error)
                }
            }
        })

    })
})


export const {
    useGetUsersQuery,
    useGetUserDetailQuery,
    useAddNewUserMutation,
    useProfileQuery,
    useUpdateProfileMutation
} = usersApiSlice