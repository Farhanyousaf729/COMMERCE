import { createSlice } from "@reduxjs/toolkit"
import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"


export const PostOrder = createAsyncThunk('order/fetchOrder', async ({ userInfo, Order }) => {
    // console.log(userInfo)
    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userInfo.token}`

        },
    }
    const res = await axios.post('/api/orders', Order, config)
    return res.data
})
export const paidOrderDetail = createAsyncThunk('paidorder/paidorderfetchOrder', async ({ userInfo, id }) => {
    // console.log(userInfo)
    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userInfo.token}`

        },
    }
    const res = await axios.get(`/api/orders/${id}`, config)
    return res.data
})
export const userOrders = createAsyncThunk('userorder/userorderfetchOrder', async ( userInfo ) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userInfo.token}`

        },
    }
    const res = await axios.get('/api/orders/orders', config)
    return res.data
})

const intialState = {

}

const orderSlice = createSlice({
    name: 'order',
    initialState: intialState,
    reducers: {
        shippingAddress: (state, action) => {
            state.shippingAddress = action.payload
        },
        paymentMethode: (state, action) => {
            state.paymentMethod = action.payload
        },
        clearOrder: (state, action) => {
            state.order = null
            state.shippingAddress = null
            state.paymentMethod = null
        }

    },
    extraReducers: (builder) => {
        builder.addCase(PostOrder.pending, (state, action) => {
            state.loading = true;
        })
        builder.addCase(PostOrder.fulfilled, (state, action) => {
            state.order = action.payload
            state.loading = false
            state.error = false;

        })
        builder.addCase(PostOrder.rejected, (state, action) => {
            // console.log(state, 'state');
            state.error = action.error.message
            state.loading = false
        })
        // ======paidOrderDetailsReducer===============
        builder.addCase(paidOrderDetail.pending, (state, action) => {
            state.loading = true;
        })
        builder.addCase(paidOrderDetail.fulfilled, (state, action) => {
            state.paidorderDetails = action.payload
            state.loading = false
            state.error = false;

        })
        builder.addCase(paidOrderDetail.rejected, (state, action) => {
            state.error = action.error.message
            state.loading = false
        })

        // ======userOrders ==========================
        builder.addCase(userOrders.pending, (state, action) => {
            state.loading = true;
        })
        builder.addCase(userOrders.fulfilled, (state, action) => {
            state.userOrdersDetails = action.payload
            state.loading = false
            state.error = false;

        })
        builder.addCase(userOrders.rejected, (state, action) => {
            state.error = action.error.message
            state.loading = false
        })
    }
})

export const { shippingAddress, paymentMethode, clearOrder } = orderSlice.actions
export default orderSlice.reducer