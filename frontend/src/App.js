import Header from "./screen/Header";
import Footer from "./screen/Footer";
import Home from "./screen/Home";
import Products from "./screen/Products";
import NotFound from "./comp/404";
import Product from "./screen/Productdetail";
import Cart from "./screen/Cart";
import Login from "./screen/Login";
import Register from "./screen/Register";
import Profile from "./screen/Profile";
import CheckOut from "./screen/CheckOut";
import OrderDetails from "./screen/orderDetails";
import UserOrders from "./screen/userOrders";
import AdminPanele from "./screen/AdminPanel";
import Allusers from "./screen/Allusers";
import RequestManeger from "./screen/RequestManeger";
import AllProducts from "./screen/AllProducts";
import AdminUsersDetail from "./screen/AdminUsersDetail";
import AdminProductDetails from "./screen/AdminProductDetails";
import AdminEditProduct from "./screen/AdminEditProduct"
import AdminAllOrders from "./screen/AdminAllOrders";
import ForgetPassword from "./screen/ForgetPassword";
import { Route, Routes } from "react-router-dom"
function App() {
  return (
    <>

      <div className="max-w-[120rem] mx-auto bg-white justify-between min-h-screen flex flex-col">

        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route exact path="/products/:catogry" element={<Products />} />
          <Route exact path="/products/:catogry/:pageNumber" element={<Products />} />
          <Route exact path="/products/:catogry?/:pageNumber?/:id" element={<Product />} />
          <Route exact path="/search/:keyword/:pageNumber?" element={<Products />} />
          <Route exact path="/search/:keyword/:pageNumber?/:id" element={<Product/>}/>

          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forget" element={<ForgetPassword/>}/>
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/orders" element={<UserOrders />} />
          <Route path="/checkout" element={<CheckOut />} />
          <Route path="/orderdetails/:id" element={<OrderDetails />} />
          <Route path="/adminpanel" element={<AdminPanele />} >
            <Route path="requestmanger" element={<RequestManeger />} />
            <Route path="allusers" element={<Allusers />} />
            <Route path="allusers/:id" element={<AdminUsersDetail />} />
            <Route path="allproducts" element={<AllProducts />} />
            <Route path="allproducts/:id" element={<AdminProductDetails />} />
            <Route path="allproducts/edit/:id" element={<AdminEditProduct />} />
            <Route path="allproducts/create" element={<AdminEditProduct />} />
            <Route path="allorders" element={<AdminAllOrders />} />
          </Route>
          <Route path={`*`} element={<NotFound />} />
        </Routes>


        <Footer />


      </div>

    </>
  );
}

export default App;
