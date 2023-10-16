import React from 'react'
import { userOrders } from "../Slices/OrderSlice"
import { useEffect } from "react"
import { useNavigate, Link } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import AlertErr from '../Assets/Alert'
import Looader from '../Assets/Loader'
import { FiMoreVertical } from "react-icons/fi"
const UserOrders = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { loading, error, userOrdersDetails } = useSelector(state => state.order)
    console.log(userOrdersDetails);

    const { userInfo } = useSelector(state => state.user)
    useEffect(() => {
        if (!userInfo) {
            navigate('/login')
        }
        dispatch(userOrders(userInfo))
    }, [dispatch, userInfo])


    return (
        <div className='flex-1 bg-gray-100 p-4'>
            {loading && <Looader />}
            {error && <AlertErr>{error}</AlertErr>}
            {userOrdersDetails && userOrdersDetails.length > 0 &&

                <div className=' overflow-auto'>
                    <table className='w-[100%] min-w-[40rem] md:w-[90%] mx-auto text-center'>
                        <thead>
                            <tr>
                                <th>Sr</th>
                                <th>Order#</th>
                                <th>Date</th>
                                <th>Total</th>
                                <th>Deliverd</th>
                                <th>Details</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                userOrdersDetails.map((ele, i) => {
                                    //  console.log(ele);
                                    return (
                                        <tr className='border-2' key={ele._id}>
                                            <td>{i + 1}</td>
                                            <td className='te'>{ele.paymentResult.id}</td>
                                            <td>{ele.updatedAt.split('T')[0]}</td>
                                            <td>{ele.totalPrice}</td>
                                            <td>{ele.isDelivered ? <span className='text-green-500'>Delivered</span> : <span className='text-red-300'>Proccessing</span>}</td>
                                            <td ><Link to={`/orderdetails/${ele._id}`}><button><FiMoreVertical /></button></Link></td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>


            }


        </div>
    )
}

export default UserOrders
