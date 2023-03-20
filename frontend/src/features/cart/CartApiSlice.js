import { apiSlice } from '../../app/api/apiSlice'

export const CartApislice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getCart: builder.query({
            query: () => ({
                url: "/order",
                method: "GET",
            }),
            providesTags: (_) => ['Cart']

        }),
        addtoCart: builder.mutation({
            query: (cartItems) => ({
                url: "/order",
                method: "POST",
                body: cartItems
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const data = await queryFulfilled
                    if (data) {
                        dispatch(apiSlice.util.invalidateTags(['Cart', 'Products']))
                    }
                } catch (error) {
                    console.log(error)
                }
            }
        }),

        updateCart: builder.mutation({
            query: (cartData) => ({
                url: "/order",
                method: "PUT",
                body: cartData
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const data = await queryFulfilled
                    if (data) {

                        dispatch(apiSlice.util.invalidateTags(['Cart']))
                    }
                } catch (error) {
                }
            }
        }),
        deleteCart: builder.mutation({
            query: (id) => ({
                url: "/order",
                method: "DELETE",
                body: id
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const data = await queryFulfilled
                    if (data) {

                        dispatch(apiSlice.util.invalidateTags(['Cart', 'Products']))
                    }
                } catch (error) {
                }
            }
        }),

    })
})


export const {
    useGetCartQuery,
    useAddtoCartMutation,
    useDeleteCartMutation,
    useUpdateCartMutation
} = CartApislice