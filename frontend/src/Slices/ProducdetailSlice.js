import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import Cookies from "js-cookie"


const cookie = Cookies.get('products')
const cartProducts = cookie ? JSON.parse(cookie) : []


export const ProductDetail = createAsyncThunk("product/fetchProduct", async (id) => {
    const res = await axios.get(`/api/products/${id}`)
    return res.data
})

export const ProductDelete = createAsyncThunk("productdelete", async ({userInfo ,id}) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userInfo.token}`
        },
    }
    const res = await axios.delete(`/api/products/${id}` , config)
    return res.data
})

export const submitReview = createAsyncThunk('review', async ({ userInfo, id, review }) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userInfo.token}`
        },
    }
    const res = await axios.post(`/api/products/review/${id}`, review, config)
    return res.data
})
export const editProduct = createAsyncThunk('editProduct', async ({ userInfo, id, product }) => {

    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userInfo.token}`
        },
    }
    const res = await axios.put(`/api/products/updated/${id}`, product , config)
    return res.data


})
export const CreateProduct = createAsyncThunk('createProduct', async ({ userInfo,  product }) => {

    // console.log(product);
    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userInfo.token}`
        },
    }
    const res = await axios.post("/api/products/create", product , config)
    return res.data


})
const initialState = {
    product: { reviews: [] },
    cartProducts: cartProducts,
}
const productDetail = createSlice({

    name: "productDetails",
    initialState: initialState,
    reducers: {
        addToCart: (state, action) => {
            const { id } = action.payload;
            const existingProductIndex = state.cartProducts.findIndex((ele) => ele.id === id);

            if (existingProductIndex !== -1) {
                state.cartProducts[existingProductIndex] = action.payload;

            } else {
                state.cartProducts = [...state.cartProducts, action.payload]
            }
            const cookie = JSON.stringify(state.cartProducts)
            Cookies.set('products', cookie, { expires: 30 })

        },
        removeFromCart: (state, action) => {

            const remove = state.cartProducts.filter(ele => ele.id !== action.payload)
            state.cartProducts = remove
            const cookie = JSON.stringify(remove)
            Cookies.set('products', cookie, { expires: 30 })
        },
        emptyCart: (state, action) => {
            Cookies.remove('products')
            state.cartProducts = []
        },
        resetSubmitReview: (state, action) => {
            state.success = false
            state.submiterror = false
        },
        resetProductDetails :(state , action)=>{
                state.product = null
        },
        resetCreatedProduct : (state, action)=>{
            state.createdProduct = null
        }
    },
    extraReducers: (builder) => {
        builder.addCase(ProductDetail.pending, (state, action) => {
            state.loading = true;
        })
        builder.addCase(ProductDetail.fulfilled, (state, action) => {
            state.product = action.payload
            state.loading = false

        })
        builder.addCase(ProductDetail.rejected, (state, action) => {
            state.error = action.error.message
            state.loading = false
        })

        // ========submitReview ====================
        builder.addCase(submitReview.pending, (state, action) => {
            state.submitloading = true;
        })
        builder.addCase(submitReview.fulfilled, (state, action) => {
            state.submitloading = false
            state.success = true

        })
        builder.addCase(submitReview.rejected, (state, action) => {
            state.submiterror = action.error.message
            state.submitloading = false
        })
        //  ===========updateProduct  ================
        builder.addCase( editProduct.pending, (state, action) => {
            state.editloading = true;
        })
        builder.addCase( editProduct.fulfilled, (state, action) => {
            state.editloading = false
            state.product = action.payload
            
        })
        builder.addCase( editProduct.rejected, (state, action) => {
            state.editerror = action.error.message
            state.editloading = false
        })
        // ==============createProduct =====================
        builder.addCase(CreateProduct.pending, (state, action) => {
            state.createloading = true;
        })
        builder.addCase(CreateProduct.fulfilled, (state, action) => {
            state.createloading = false
            state.createdProduct = true
            
        })
        builder.addCase(CreateProduct.rejected, (state, action) => {
            state.createError = action.error.message
            state.createloading = false

        })
        // ==============deleteProduct =============
        builder.addCase(ProductDelete.pending, (state, action) => {
            state.deleteloading = true;
        })
        builder.addCase(ProductDelete.fulfilled, (state, action) => {
            state.deleteloading = false
            state.deleteProduct = true
            
        })
        builder.addCase(ProductDelete.rejected, (state, action) => {
            state.deleteError = action.error.message
            state.deleteloading = false

        })
    }
})
export const { addToCart, removeFromCart, emptyCart,resetSubmitReview,resetProductDetails, resetCreatedProduct} = productDetail.actions
export default productDetail.reducer
