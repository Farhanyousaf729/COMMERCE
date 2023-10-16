import React from 'react'
import { useEffect } from "react"
import { mangerApprovels, mangerApproved, nullResult } from "../Slices/AdminSlice"
import Looader from '../Assets/Loader'
import AlertErr from '../Assets/Alert'
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { FcApproval } from "react-icons/fc"
import { RxCross2 } from "react-icons/rx"
import { GoThumbsup } from 'react-icons/go'
const RequestManeger = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { mangersapproval, mangerLoading, mangerError, loadingApproved, result, errorApproved } = useSelector(state => state.admin)
    const { userInfo } = useSelector(state => state.user)
    useEffect(() => {
        if (!userInfo) {
            navigate('/login')
        }
        dispatch(nullResult())
        if (!result) {
            dispatch(mangerApprovels(userInfo))
        }
    }, [dispatch , result]);

    const handleApproved = (id) => {

        dispatch(mangerApproved({ userInfo, id }))
    }
    return (
        <div>
            {
                loadingApproved && <Looader />
            }
            {
                mangerLoading && <Looader />
            }
            {
                mangerError && <AlertErr>{mangerError}</AlertErr>
            }
            {
                errorApproved && <AlertErr>{errorApproved}</AlertErr>
            }

            {
                mangersapproval && mangerApprovels.length > 0 &&

                <div>
                    <table className='w-[100%] text-center'>
                        <thead>
                            <tr>
                                <th>Sr</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                mangersapproval.map((ele, i) => {
                                    return (
                                        <tr key={ele._id} className='border-2'>
                                            <td>{i + 1}</td>
                                            <td>{ele.name}</td>
                                            <td>{ele.email}</td>
                                            <td>{ele.mangerRequest ? <button className='text-red-500'><RxCross2 /></button> : <button><FcApproval /></button>}
                                            </td>
                                            <td>
                                                <button className='text-xl text-green-500 ml-2' onClick={() => handleApproved(ele._id)}><GoThumbsup /></button>
                                            </td>
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

export default RequestManeger
