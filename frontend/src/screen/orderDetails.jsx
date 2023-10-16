import React from 'react'
import { useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { paidOrderDetail } from "../Slices/OrderSlice"
import AlertErr from '../Assets/Alert'
import Looader from '../Assets/Loader'
const OrderDetails = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { loading, error, paidorderDetails } = useSelector(state => state.order)
  console.log(paidorderDetails);

  const { userInfo } = useSelector(state => state.user)

  useEffect(() => {
    if (!userInfo) {
      navigate('/login')
    }
    dispatch(paidOrderDetail({ userInfo, id }))
  }, [id, userInfo])

  return (
    <div className='flex-1 bg-gray-100 p-2 sm:p-4 '>
      {loading && <Looader />}
      {error && <AlertErr>{error}</AlertErr>}
      {paidorderDetails &&
        <div className=''>
          <h1 className='text-xl font-semibold'>DETAILS</h1>

          <table className='table '>
            <tbody>
              <tr className='border border-blue-500' >
                <td className=' font-semibold text-blue-500'>Order#</td>
                <td className=''>{paidorderDetails.paymentResult.id}</td>
              </tr>
              <tr className=' border border-blue-500'>
                <td className='font-semibold text-blue-500'>Name</td>
                <td>{paidorderDetails.user.name}</td>
              </tr>
              <tr className=' border border-blue-500'>
                <td className='font-semibold text-blue-500'>Email</td>
                <td>{paidorderDetails.user.email}</td>
              </tr>
              <tr className=' border border-blue-500'>
                <td className='font-semibold text-blue-500'>Contact#</td>
                <td>{paidorderDetails.shippingAddre.telephone}</td>
              </tr>
              <tr className=' border border-blue-500'>
                <td className='font-semibold text-blue-500'>Address</td>
                <td>{paidorderDetails.shippingAddre.address}</td>
              </tr>
              <tr className=' border border-blue-500'>
                <td className='font-semibold text-blue-500'>Total</td>
                <td>${paidorderDetails.totalPrice}</td>
              </tr>
              <tr className=' border border-blue-500'>
                <td className='font-semibold text-blue-500'>Method</td>
                <td>{paidorderDetails.paymentMethod}</td>
              </tr>
              <tr className=' border border-blue-500'>
                <td className='font-semibold text-blue-500'>Date</td>
                <td>{paidorderDetails.updatedAt.split('T')[0]}</td>
              </tr>
              <tr className=' border border-blue-500'>
                <td className='font-semibold text-blue-500'>Payment Status</td>
                <td>{paidorderDetails.paymentResult.status}</td>
              </tr>
              <tr className=' border border-blue-500'>
                <td className='font-semibold text-blue-500'>Delivery Status</td>
                <td>{paidorderDetails.isDelivered ? "Delivered" : 'Processing'}</td>
              </tr>
            </tbody>
          </table>
          <div className='mt-6'>
            <h1 className='text-xl font-semibold'>PRODUCTS</h1>

            <div className=''>
              {paidorderDetails.orderItems.map((ele, i) => {
                return (

                  <div key={i} className="mt-6 md:mt-0 flex justify-start flex-col md:flex-row items-start md:items-center space-y-4 md:space-x-6 xl:space-x-8 w-full">
                    <div className="w-full  sm:w-40">
                      <img className="w-full " src={ele.image} alt="dress" />
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

        </div>

      }


    </div>
  )
}

export default OrderDetails
