import { apiSlice } from '../../app/api/apiSlice'

export const storeApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getProducts: builder.query({
            query: (query='') => ({
                url: `/store/products${query}`,
                method: "GET",
            }),
            providesTags: (_) => ['Products']
        }),

        productDetail: builder.query({
            query: ({ id, userId }) => ({
                url: `/store/product/${id}?userId=${userId ? userId : ''}`,
                method: "GET",
                validateStatus: (response, result) => {
                    return response.status === 200 && !result.isError
                },
            }),
            providesTags: (_) => ['Products']
        }),



        addProduct: builder.mutation({
            query: (data) => ({
                url: '/items/admin/product',
                method: "POST",
                body: data
            }),

            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                try {
                    const data = await queryFulfilled
                    if (data) {
                        dispatch(apiSlice.util.invalidateTags(['Products']))
                    }
                } catch (error) {

                }
            }

        }),

        updateProduct: builder.mutation({
            query: ({ id, formData }) => ({
                url: `/items/admin/product/${id}`,
                method: "PUT",
                body: formData
            }),

            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                try {
                    const data = await queryFulfilled
                    if (data) {
                        dispatch(apiSlice.util.invalidateTags(['Products']))
                    }
                } catch (error) {

                }
            }
        }),
        deleteProduct: builder.mutation({
            query: (id) => ({
                url: `/items/admin/product/${id}`,
                method: "Delete",
            }),

            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                try {
                    const data = await queryFulfilled
                    if (data) {
                        dispatch(apiSlice.util.invalidateTags(['Products']))
                    }
                } catch (error) {

                }
            }
        }),

        addReview: builder.mutation({
            query: (revData) => ({
                url: "store/review",
                method: "POST",
                body: revData
            }),
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                try {
                    const data = await queryFulfilled
                    if (data) {
                        dispatch(apiSlice.util.invalidateTags(['Products']))
                    }
                } catch (error) {

                }
            }
        }),

        deleteReview: builder.mutation({
            query: (rev) => ({
                url: "store/review",
                method: "DELETE",
                body: rev
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const data = await queryFulfilled
                    console.log(data)
                    if (data) {
                        dispatch(apiSlice.util.invalidateTags(['Products']))
                    }
                } catch (error) {

                }
            }
        }),

        getCategory: builder.query({
            query: () => ({
                url: '/store/category',
                method: "GET",
            }),
            providesTags: (_) => ['Categories']

        }),
        addCategory: builder.mutation({
            query: (data) => ({
                url: '/items/admin/category',
                method: "POST",
                body: data
            }),
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                try {
                    const data = await queryFulfilled
                    if (data) {
                        dispatch(apiSlice.util.invalidateTags(['Categories']))
                    }
                } catch (error) {

                }
            }
        }),
        updateCategory: builder.mutation({
            query: (data) => ({
                url: `/items/admin/category/${data.id}`,
                method: "PUT",
                body: data.formData
            }),

            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                try {
                    const data = await queryFulfilled
                    if (data) {
                        dispatch(apiSlice.util.invalidateTags(['Categories']))
                    }
                } catch (error) {
                    console.log(error)
                }
            }
        }),
        deleteCategory: builder.mutation({
            query: (id) => ({
                url: `/items/admin/category/${id}`,
                method: "DELETE",
            }),

            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                try {
                    const data = await queryFulfilled
                    if (data) {
                        console.log(data)
                        dispatch(apiSlice.util.invalidateTags(['Categories']))
                    }
                } catch (error) {
                    console.log('error', error)
                }
            }
        }),

        addSubCategory: builder.mutation({
            query: (data) => ({
                url: '/items/admin/subCategory',
                method: "POST",
                body: data
            }),

            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                try {
                    const data = await queryFulfilled
                    if (data) {
                        dispatch(apiSlice.util.invalidateTags(['Categories']))
                    }
                } catch (error) {
                }
            }
        }),
        deleteSubCategory: builder.mutation({
            query: (data) => ({
                url: '/items/admin/subCategory',
                method: "Delete",
                body: data
            }),

            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                try {
                    const data = await queryFulfilled
                    if (data) {
                        dispatch(apiSlice.util.invalidateTags(['Categories']))
                    }
                } catch (error) {
                }
            }
        }),



    })
})

export const {
    useGetProductsQuery,
    useProductDetailQuery,
    useAddProductMutation,
    useUpdateProductMutation,
    useDeleteProductMutation,

    useGetReviewsQuery,
    useAddReviewMutation,
    useDeleteReviewMutation,

    useGetCategoryQuery,
    useAddCategoryMutation,
    useUpdateCategoryMutation,
    useDeleteCategoryMutation,

    useAddSubCategoryMutation,
    useDeleteSubCategoryMutation

} = storeApiSlice

