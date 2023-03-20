import { apiSlice } from '../../app/api/apiSlice'


export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getUsers: builder.query({
            query: (search) => ({
                url: `/users/admin/users${search}`,
                method: "GET",
                validateStatus: (response, result) => {
                    return response.status === 200 && !result.isError
                }
            }),
        }),


    })

})