import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import Cookies from "js-cookie"


const cookie = Cookies.get('user')
const cookieUser = cookie ? JSON.parse(cookie) : null
const initialState = {
    userInfo: cookieUser,
    userDetails: {}
}


export const userdetails = createAsyncThunk("userdetails/fetchUserDetails", async (userInfo) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userInfo.token}`

        },
    }
    const res = await axios.get('/api/users/profile', config)
    return res.data
})


export const userUpdate = createAsyncThunk("userupdate/fetchUserupdate", async ({userInfo , name , email , password}) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userInfo.token}`

        },
    }
    const res = await axios.post('/api/users/profile',{name , email , password}, config)
    return res.data
})


export const userLogin = createAsyncThunk('userLogin/fetchUser', async ({ email, password,mangerRequest }) => {
    const res = await axios.post("/api/users/login", { email, password,mangerRequest })
    return res.data
})
export const registerUser = createAsyncThunk('userRegister/fetchUser', async ({ name, email, password,mangerRequest }) => {
    const res = await axios.post('/api/users/register', { name, email, password ,mangerRequest})
    return res.data
})

const userSlice = createSlice({

    name: "user",
    initialState: initialState,
    reducers: {
        logout: (state, action) => {
            Cookies.remove('user');
            // Cookies.remove('products');
            state.userInfo = null
             
        }
    },
    extraReducers: (builder) => {
        //  ===============login reducers============
        builder.addCase(userLogin.pending, (state, action) => {
            state.loading = true;
        })
        builder.addCase(userLogin.fulfilled, (state, action) => {
            state.userInfo = action.payload
            state.loading = false
            state.error = false;
            const cookie = JSON.stringify(action.payload)
            Cookies.set('user', cookie, { expires: 30 })
        })
        builder.addCase(userLogin.rejected, (state, action) => {
            // console.log(state, 'state');
            state.error = action.error.message
            state.loading = false
        })
        // =========register reducer===================
        builder.addCase(registerUser.pending, (state, action) => {
            state.loading = true;
        })
        builder.addCase(registerUser.fulfilled, (state, action) => {
            state.userInfo = action.payload
            state.loading = false
            state.error = false;
            const cookie = JSON.stringify(action.payload)
            Cookies.set('user', cookie, { expires: 30 })
        })
        builder.addCase(registerUser.rejected, (state, action) => {
            console.log(state, 'state');
            state.error = action.error.message
            state.loading = false
        })
        //  ========== userdetails reducer =================
        builder.addCase(userdetails.pending, (state, action) => {
            state.loading = true;
        })
        builder.addCase(userdetails.fulfilled, (state, action) => {
            state.userDetails = action.payload
            state.loading = false
            state.error = false;
        })
        builder.addCase(userdetails.rejected, (state, action) => {
            state.error = action.error.message
            state.loading = false
        })

        // ==========userupdate reducer =================
        builder.addCase(userUpdate.pending, (state, action) => {
            state.loading = true;
        })
        builder.addCase(userUpdate.fulfilled, (state, action) => {
            state.userInfo = action.payload
            state.loading = false
            state.error = false;
            state.success = true;

            const cookie = JSON.stringify(action.payload)
            Cookies.set('user', cookie, { expires: 30 })
        })
        builder.addCase(userUpdate.rejected, (state, action) => {
            state.error = action.error.message
            state.loading = false
        })
    }
})
export const { logout } = userSlice.actions
export default userSlice.reducer