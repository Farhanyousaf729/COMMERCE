import { createSlice} from "@reduxjs/toolkit"
import Cookies from "js-cookie"
const cookiesProducts = Cookies.get('products') ? Cookies.get("products") : []


const cookies = createSlice({
      name : 'cookies',
      initialState:{cookiesProducts: cookiesProducts},
      reducers : {
            addProductInCookies : (state , action)=>{
               state.cookiesProducts = action.payload
            }
      }
      
})
export const {addProductInCookies} = cookies.actions
export default cookies.reducer