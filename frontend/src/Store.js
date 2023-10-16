
import {configureStore} from "@reduxjs/toolkit"
import productsReducer from "./Slices/ProductSlice"
import productDetailReducer from "./Slices/ProducdetailSlice"
import userReducer from "./Slices/UserSlice"
import orderReducer from "./Slices/OrderSlice"
import  adminReducer from "./Slices/AdminSlice"
import Cookies from "js-cookie"
const store = configureStore({
    reducer:{
        products : productsReducer,
        product :  productDetailReducer,
        user : userReducer,
        order: orderReducer,
        admin : adminReducer
        // cookies : cookiesProduct
    },
})
export default store