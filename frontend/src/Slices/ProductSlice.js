import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"




export const getProducts = createAsyncThunk('products/fetchProducts', async (obj) => {
        //  console.log(obj);
    const res = await axios.get(`/api/products?catgorey=${obj.catogry}&pageNumber=${obj.pageNumber}`)
    return res.data
})
export const Search  = createAsyncThunk("search", async(obj)=>{
    // console.log(obj);
    const res = await axios.get(`/api/products/search?keyword=${obj.keyword}&pageNumber=${obj.pageNumber}`)
    return res.data
})

export const GetTopRatedProducts = createAsyncThunk('topRated', async()=>{     

    const res = await axios.get("/api/products/top")
    return res.data
})
const productSlice = createSlice({
    name: 'product',
    initialState: { products:{ totalproducts:[] } , topProducts : []},
    reducers: {},
    extraReducers(builder) {
        // ============get AllProducts================================
        builder.addCase(getProducts.pending, (state, action) => {
            state.loading = true;
        })
        builder.addCase(getProducts.fulfilled, (state, action) => {
            state.products = action.payload
            state.loading = false;
        })
        builder.addCase(getProducts.rejected, (state, action) => {
            state.error = action.error.message
            state.loading = false
        })

        // =================search products ========================

        builder.addCase(Search.pending, (state, action) => {
            state.searchLoading = true;
        })
        builder.addCase(Search.fulfilled, (state, action) => {
            state.products = action.payload
            state.searchLoading = false;
        })
        builder.addCase(Search.rejected, (state, action) => {
            state.searchError = action.error.message
            state.searchLoading = false
        })
        // =================top ratedproducts====================
        builder.addCase(GetTopRatedProducts.pending, (state, action) => {
            state.topLoading = true;
        })
        builder.addCase(GetTopRatedProducts.fulfilled, (state, action) => {
            state.topProducts = action.payload
            state.topLoading = false;
        })
        builder.addCase(GetTopRatedProducts.rejected, (state, action) => {
            state.topError = action.error.message
            state.topLoading = false;

        })

    }
})

export default productSlice.reducer