import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

export const AdminPanel = createAsyncThunk('adminpanel', async (userInfo) => {

    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userInfo.token}`

        },
    }

    const res = await axios.get('/api/users/adminpanel', config)
    return res.data
})
export const mangerApprovels = createAsyncThunk('fetchmangersapprovals', async (userInfo) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userInfo.token}`

        },
    }

    const res = await axios.get('/api/users/admin/requestsmangers', config)
    return res.data
})
export const mangerApproved = createAsyncThunk('fetchmangerapproved/approved', async ({ userInfo, id }) => {
    const order = {
        myid: id
    }
    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userInfo.token}`
        },
    }
    const res = await axios.post('/api/users/admin/requestsmangers', order, config)
    return res.data
})

export const AllUsers = createAsyncThunk('getuserbyid/allusers', async (obj) => {
    const token = obj.userInfo.token;
    const id = obj.id
    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
    }
    const url = id ? `/api/users/admin/users/${id}` : '/api/users/admin/users';
    const users = await axios.get(url, config)
    return users.data
})
export const EditUserDetails = createAsyncThunk('edituser/allusers' ,async({userInfo , id , user})=>{

    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userInfo.token}`
        },
    }
   const res = await axios.put(`/api/users/admin/users/${id}` , user , config)
   return res.data
})
export const deletetUser = createAsyncThunk('deleatuser/allusers' ,async(obj)=>{
    const token = obj.userInfo.token
    const id = obj.id
    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
    }
   const res = await axios.delete(`/api/users/admin/users/${id}` , config)
   return res.data
})

export const Allorders = createAsyncThunk('adminOrders/allorders' ,async(obj)=>{
    const token = obj.userInfo.token;
    const id = obj.id
    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
    }
    const url = id ? `/api/orders/admin/orders/${id}` : '/api/orders/admin/orders/';
    const orders = await axios.get(url, config)
    return orders.data
})

export const DeliverOrder =  createAsyncThunk('admindeliverorder/allorders' ,async(obj)=>{
    console.log(obj);
    const token = obj.userInfo.token;
    const order = {
        myid: obj.id
    }
    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
    }
    const Order = await axios.put('/api/orders/admin/deliver/',order, config)
    return Order.data
})
const AdminSlice = createSlice({
    name: 'admin',
    initialState: {
        mangersapproval: []
    },
    reducers: {
        Logout: (state, action) => {
            state.success = null
            state.loading = null
            state.error = null
            state.mangersapproval = null
            state.mangerLoading = null
            state.mangerError = null
            state.result = null
            state.loadingApproved = null
            state.errorApproved = null
            state.loadingUsers= null
            state.users = null
            state.errorUsers=null
            state.editloadingUsers=null
            state.editerrorUsers=null
            state.allorders = null
            state.allordersloading = null  
            state.allordersError = null
            state.deliverOrder = null
            state.deliverOrderloading = null
            state.deliverOrderError = null
        },
        nullResult: (state, action) => {
            state.result = false
        },
        nullDeletedUser : (state, action)=>{
            state.deletedUser = false
        }
    },
    // =============adminpanel ==================
    extraReducers: (builder) => {
        builder.addCase(AdminPanel.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(AdminPanel.fulfilled, (state, action) => {
            state.loading = false
            state.success = true
        })
        builder.addCase(AdminPanel.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message
        })
        // =============mangersApprovals==============
        builder.addCase(mangerApprovels.pending, (state, action) => {
            state.mangerLoading = true
        })
        builder.addCase(mangerApprovels.fulfilled, (state, action) => {
            state.mangerLoading = false
            state.mangersapproval = action.payload
        })
        builder.addCase(mangerApprovels.rejected, (state, action) => {
            state.mangerLoading = false
            state.mangerError = action.error.message
        })
        // ===============approvedManger===============
        builder.addCase(mangerApproved.pending, (state, action) => {
            state.loadingApproved = true
        })
        builder.addCase(mangerApproved.fulfilled, (state, action) => {
            state.loadingApproved = false
            state.result = true
        })
        builder.addCase(mangerApproved.rejected, (state, action) => {
            state.loadingApproved = false
            state.errorApproved = action.error.message
        })
        // ===============Allusers===================
        builder.addCase(AllUsers.pending, (state, action) => {
            state.loadingUsers = true
        })
        builder.addCase(AllUsers.fulfilled, (state, action) => {
            state.loadingUsers = false
            state.users = action.payload
        })
        builder.addCase(AllUsers.rejected, (state, action) => {
            state.loadingUsers = false
            state.errorUsers = action.error.message
        })
        // ===============edit userdetails============
        builder.addCase(EditUserDetails.pending, (state, action) => {
            state.editloadingUsers = true
        })
        builder.addCase(EditUserDetails.fulfilled, (state, action) => {
            state.editloadingUsers = false
            state.users = action.payload
        })
        builder.addCase(EditUserDetails.rejected, (state, action) => {
            state.editloadingUsers = false
            state.editerrorUsers = action.error.message
        })

        // ============deleat User =================
        builder.addCase(deletetUser.pending, (state, action) => {
            state.deleteloadingUsers = true
        })
        builder.addCase(deletetUser.fulfilled, (state, action) => {
            state.deleteloadingUsers = false
            state.deletedUser = true
        })
        builder.addCase(deletetUser.rejected, (state, action) => {
            state.deleteloadingUsers = false
            state.deleteerrorUsers = action.error.message
        })
        // ==============all orders =================
        builder.addCase(Allorders.pending, (state, action) => {
            state.allordersloading = true
        })
        builder.addCase(Allorders.fulfilled, (state, action) => {
            state.allorders = action.payload
            state.allordersloading = false
        })
        builder.addCase(Allorders.rejected, (state, action) => {
            state.allordersloading = false
            state.allordersError = action.error.message
        })
        // ==============deliverOrder============
        builder.addCase( DeliverOrder.pending, (state, action) => {
            state.deliverOrderloading = true
        })
        builder.addCase( DeliverOrder.fulfilled, (state, action) => {
            state.deliverOrderloading = false
            state.deliverOrder = true
        })
        builder.addCase( DeliverOrder.rejected, (state, action) => {
            state. deliverOrderloading = false
            state. deliverOrderError = action.error.message
        })
    }
})
export const { Logout, nullResult ,  nullDeletedUser } = AdminSlice.actions
export default AdminSlice.reducer