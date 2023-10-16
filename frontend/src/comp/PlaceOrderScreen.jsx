import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { PostOrder, clearOrder } from "../Slices/OrderSlice"
import Looader from '../Assets/Loader'
import AlertErr from '../Assets/Alert'
import { PayPalButton } from 'react-paypal-button-v2'
import { emptyCart } from "../Slices/ProducdetailSlice"

import axios from 'axios'
const PlaceOrderScreen = () => {
  const [sdkReady, setSdkReady] = useState(false)

  const navigate = useNavigate()
  const { userInfo } = useSelector(state => state.user)
  const { cartProducts } = useSelector(state => state.product)
  const { shippingAddress, paymentMethod } = useSelector(state => state.order)
  const { order, loading, error } = useSelector(state => state.order)
  const dispatch = useDispatch()

  const Twodecimal = (value) => {
    return Math.round(value * 100) / 100
  }
  const itemsPrice = Twodecimal(Number(cartProducts.reduce((acc, item) => acc + item.quantity * item.price, 0)))
  const shippingPrice = 0
  const taxPrice = Twodecimal(Number((10 * itemsPrice / 100)))
  const totalPrice = Twodecimal((Number(itemsPrice) + Number(shippingPrice) + Number(taxPrice)))



  useEffect(() => {
    if (cartProducts.length !== 0) {


      const addPaypalScript = async () => {
        const { data: clientId } = await axios.get('/api/config/paypal')
        const script = document.createElement('script')
        script.type = 'text/javascript'
        script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`
        script.async = true

        script.onload = () => {
          setSdkReady(true)
        }
        document.body.appendChild(script)
      }
      if (!window.paypal) {
        addPaypalScript()
      }
      else {
        setSdkReady(true)
      }
    }
  }, [])

  const handleSuccess = (paymentResult) => {
    console.log(paymentResult);
    const Order = {
      orderItems: cartProducts,
      shippingAddre: shippingAddress,
      paymentMethod: paymentMethod,
      taxPrice: taxPrice,
      shippingPrice: shippingPrice,
      totalPrice: totalPrice,
      paymentResult: paymentResult
    }
    dispatch(PostOrder({ userInfo, Order }))
  }

  useEffect(() => {
    if (order) {
      dispatch(emptyCart())
      dispatch(clearOrder())
      navigate(`/orderDetails/${order._id}`)

    }

  }, [order, navigate])
  return (
    <>
      {
        error && <AlertErr>{error}</AlertErr>
      }



      <div className="py-14 px-4 md:px-6 2xl:px-20 2xl:container 2xl:mx-auto">

        {
          loading && <Looader />
        }

        <div className="flex justify-start item-start space-y-2 flex-col">

        </div>
        <div className="mt-10 flex flex-col xl:flex-row jusitfy-center items-stretch w-full xl:space-x-8 space-y-4 md:space-y-6 xl:space-y-0">
          <div className="flex flex-col justify-start items-start w-full space-y-4 md:space-y-6 xl:space-y-8">


            <div className="flex flex-col justify-start items-start dark:bg-gray-800 bg-gray-50 px-4 py-4 md:py-6 md:p-6 xl:p-8 w-full">
              <p className="text-lg md:text-xl dark:text-white font-semibold leading-6 xl:leading-5 text-gray-800">Customer’s Cart</p>

              <div className='mt-6'>
                {
                  cartProducts.length === 0 ? <p className='bg-yellow-300 p-2 rounded-sm text-gray-600 text-lg font-semibold'>No Product Selected</p> :
                    cartProducts.map((ele, i) => {
                      return (

                        <div key={i} className="mt-6 md:mt-0 flex justify-start flex-col md:flex-row items-start md:items-center space-y-4 md:space-x-6 xl:space-x-8 w-full">
                          <div className="w-full md:w-40">
                            <img className="w-full hidden md:block" src={ele.image} alt="dress" />
                            {/* <img className="w-full md:hidden" src="https://i.ibb.co/BwYWJbJ/Rectangle-10.png" alt="dress" /> */}
                          </div>
                          <div className="flex justify-between items-start w-full flex-col md:flex-row space-y-4 md:space-y-0">
                            <div className="w-full flex flex-col justify-start items-start space-y-8">
                              <h3 className="text-xl dark:text-white xl:text-2xl font-semibold leading-6 text-gray-800">{ele.name}</h3>
                              <div className="flex justify-start items-start flex-col space-y-2">
                                <p className="text-sm dark:text-white leading-none text-gray-800"><span className="dark:text-gray-400 text-gray-300">Brand: </span> {ele.brand}</p>
                                {/* <p className="text-sm dark:text-white leading-none text-gray-800"><span className="dark:text-gray-400 text-gray-300">Size: </span> Small</p>
                              <p className="text-sm dark:text-white leading-none text-gray-800"><span className="dark:text-gray-400 text-gray-300">Color: </span> Light Blue</p> */}
                              </div>
                            </div>
                            <div className="flex justify-between space-x-8 items-start w-full">
                              <p className="text-base dark:text-white xl:text-lg leading-6">{ele.price.toFixed(2)} <span className="text-red-300 line-through"> $</span></p>
                              <p className="text-base dark:text-white xl:text-lg leading-6 text-gray-800">{ele.quantity}</p>
                              <p className="text-base dark:text-white xl:text-lg font-semibold leading-6 text-gray-800">$ {(ele.price * ele.quantity).toFixed(2)}</p>
                            </div>
                          </div>
                        </div>


                      )
                    })
                }



              </div>




            </div>



            <div className="flex justify-center flex-col md:flex-row flex-col items-stretch w-full space-y-4 md:space-y-0 md:space-x-6 xl:space-x-8">
              <div className="flex flex-col px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 dark:bg-gray-800 space-y-6">
                <h3 className="text-xl dark:text-white font-semibold leading-5 text-gray-800">Summary</h3>
                <div className="flex justify-center items-center w-full space-y-4 flex-col border-gray-200 border-b pb-4">
                  <div className="flex justify-between w-full">
                    <p className="text-base dark:text-white leading-4 text-gray-800">Subtotal</p>
                    <p className="text-base dark:text-gray-300 leading-4 text-gray-600">$ {itemsPrice}</p>
                  </div>
                  <div className="flex justify-between items-center w-full">
                    <p className="text-base dark:text-white leading-4 text-gray-800">Tax </p>
                    <p className="text-base dark:text-gray-300 leading-4 text-gray-600">$ {taxPrice}</p>
                  </div>
                  <div className="flex justify-between items-center w-full">
                    <p className="text-base dark:text-white leading-4 text-gray-800">Shipping</p>
                    <p className="text-base dark:text-gray-300 leading-4 text-gray-600">$ 0</p>
                  </div>
                </div>
                <div className="flex justify-between items-center w-full">
                  <p className="text-base dark:text-white font-semibold leading-4 text-gray-800">Total</p>
                  <p className="text-base dark:text-gray-300 font-semibold leading-4 text-gray-600">$ {totalPrice}</p>
                </div>
              </div>

              {/* <div className="flex flex-col justify-center px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 dark:bg-gray-800 space-y-6">
              <h3 className="text-xl dark:text-white font-semibold leading-5 text-gray-800">Shipping</h3>
              <div className="flex justify-between items-start w-full">
                <div className="flex justify-center items-center space-x-4">
                  <div className="w-8 h-8">
                    <img className="w-full h-full" alt="logo" src="https://i.ibb.co/L8KSdNQ/image-3.png" />
                  </div>
                  <div className="flex flex-col justify-start items-center">
                    <p className="text-lg leading-6 dark:text-white font-semibold text-gray-800">DPD Delivery<br /><span className="font-normal">Delivery with 24 Hours</span></p>
                  </div>
                </div>
                <p className="text-lg font-semibold leading-6 dark:text-white text-gray-800">$8.00</p>
              </div>
              <div className="w-full flex justify-center items-center">
                <button className="hover:bg-black dark:bg-white dark:text-gray-800 dark:hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 py-5 w-96 md:w-full bg-gray-800 text-base font-medium leading-4 text-white">View Carrier Details</button>
              </div>
            </div> */}

            </div>
          </div>
          <div className="bg-gray-50 dark:bg-gray-800 w-full xl:w-96 flex justify-between items-center md:items-start px-4 py-6 md:p-6 xl:p-8 flex-col">
            <h3 className="text-xl dark:text-white font-semibold leading-5 text-gray-800">Customer</h3>

            <div className="flex  flex-col md:flex-row xl:flex-col justify-start items-stretch h-full w-full md:space-x-6 lg:space-x-8 xl:space-x-0">

              <div className=" md:flex md:flex-col justify-start items-start flex-shrink-0">


                <h1 className="text-lg dark:text-white font-semibold leading-5 text-gray-500 pt-2">{userInfo.name}</h1>
                <div className=" flex   text-gray-800 dark:text-white md:justify-start items-center space-x-4 py-4 border-b border-gray-200 w-full">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19 5H5C3.89543 5 3 5.89543 3 7V17C3 18.1046 3.89543 19 5 19H19C20.1046 19 21 18.1046 21 17V7C21 5.89543 20.1046 5 19 5Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M3 7L12 13L21 7" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <div className='underline '>
                    <a href={`mailto:${userInfo.email}`} className="cursor-pointer text-sm leading-5 ">
                      {userInfo.email}
                    </a>
                  </div>

                </div>

              </div>


              <div className="flex  justify-between  xl:h-full items-stretch w-full xl:flex-col  ">

                <div className="flex justify-center md:justify-start xl:flex-col flex-col md:space-x-6 lg:space-x-8 xl:space-x-0 space-y-4 xl:space-y-12 md:space-y-0 md:flex-row items-center md:items-start">
                  <div className="flex justify-center md:justify-start items-center md:items-start flex-col space-y-4 xl:mt-8">
                    <p className="text-base dark:text-white font-semibold leading-4 text-center md:text-left text-gray-800">Shipping Address</p>
                    <p className="w-48 lg:w-full dark:text-gray-300 xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600">{shippingAddress?.address}</p>
                  </div>
                </div>
                <div className="flex w-full justify-center items-center md:justify-start md:items-start">
                  {
                    sdkReady && <PayPalButton amount={totalPrice.toFixed(2)} onSuccess={handleSuccess} />
                  }

                  {/* <button onClick={handlePlaceOrder} className="mt-6 md:mt-0 dark:border-white dark:hover:bg-gray-900 dark:bg-transparent dark:text-white py-5 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 border border-gray-800 font-medium w-96 2xl:w-full text-base font-medium leading-4 text-gray-800">Place Order</button> */}
                </div>
              </div>
            </div>


          </div>
        </div>
      </div>
    </>
  )
}

export default PlaceOrderScreen
