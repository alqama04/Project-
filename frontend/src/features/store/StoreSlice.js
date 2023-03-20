import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    productquery: {
        search: '',
        category: '',
        subCategory: ''

    }
}

const storeSlice = createSlice({
    name: 'store',
    initialState: initialState,

    reducers: {
        setQuery: (state, action) => {
            const { search} = action.payload
            state.productquery.search = search
        },
    }
})
export const { setQuery, setUserReview } = storeSlice.actions
export default storeSlice.reducer

export const selectQuery = (state) => state.myStore.productquery
