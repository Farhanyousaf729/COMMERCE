import React from 'react'
import { useEffect } from "react"
import { AdminPanel } from "../Slices/AdminSlice"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate, Outlet, NavLink } from "react-router-dom"
import Looader from '../Assets/Loader'
import AlertErr from '../Assets/Alert'
const AdminPanele = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { userInfo } = useSelector(state => state.user)
    const { loading, error, success } = useSelector(state => state.admin)
    useEffect(() => {
        console.log(`rrrrrrrrrrrrrrrr`);
        if (!userInfo) {
            navigate('/login')
        }
        if (userInfo) {
            console.log(`bbbbbbbbbbbbbbbbb`);
            dispatch(AdminPanel(userInfo))
        }


    }, [])
    return (
        <div className='flex-1 px-4 bg-gray-100'>
            {
                loading && <Looader />
            }
            {
                error && <AlertErr>{`${error} unauthorised`}</AlertErr>
            }
            {
                success &&
                (
                    <div>
                        <nav>
                            <ul className='flex justify-between items-center w-[100%] bg-gray-500 py-4 px-4'>
                                <li >
                                    <NavLink to='requestmanger' className={({ isActive }) => isActive ? "text-blue-700 font-bold" : "font-bold"}>Approvals</NavLink>
                                </li>
                                <li>
                                    <NavLink to='allusers' className={({ isActive }) => isActive ? "text-blue-700 font-bold" : "font-bold"}>All Users</NavLink>
                                </li>
                                <li>
                                    <NavLink to='allproducts' className={({ isActive }) => isActive ? "text-blue-700 font-bold" : "font-bold"}>All Products</NavLink>
                                </li>
                                <li>
                                    <NavLink to='allorders' className={({ isActive }) => isActive ? "text-blue-700 font-bold" : "font-bold"}>All Orders</NavLink>
                                </li>
                            </ul>
                        </nav>
                        <div className='mt-8'>
                            <Outlet />
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default AdminPanele
