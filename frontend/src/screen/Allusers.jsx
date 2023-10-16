import React from 'react'
import { useEffect } from "react"
import { AllUsers , nullDeletedUser } from "../Slices/AdminSlice"
import Looader from '../Assets/Loader'
import AlertErr from '../Assets/Alert'
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { RxCross2 } from "react-icons/rx"
import { FcApproval } from "react-icons/fc"
// import { userdetails} from "../Slices/UserSlice"
const Allusers = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { userInfo } = useSelector(state => state.user)
  const { loadingUsers, users, errorUsers } = useSelector(state => state.admin)
  useEffect(() => {
    if (!userInfo) {
      navigate('/login')
    }
    const id = null
    const obj = { userInfo, id }
    dispatch(AllUsers(obj))
    dispatch(nullDeletedUser())
  }, [userInfo])

  const fetchUserdata=(id)=>{
      navigate(`/adminpanel/allusers/${id}`)
  }
 
  return (
    <div>

      {
        loadingUsers && <Looader />
      }
      {
        errorUsers && <AlertErr>{errorUsers}</AlertErr>
      }
      {
       users &&
        <div>
           
          <table className='w-[100%] text-center'>
            <thead>
              <tr>
                <th>Sr</th>
                <th>Name</th>
                <th>Email</th>
                <th>Manager</th>
              </tr>
            </thead>
            <tbody>
              {
               users?.length && users.slice(1).map((ele, i) => {
                  
                  return (
                    <tr key={ele._id} className='border-2'>
                      <td>{i + 1}</td>
                      <td > <button onClick={()=>fetchUserdata(ele._id)} className='text-blue-500 hover:text-blue-300'>{ele.name}</button></td>
                      <td>{ele.email}</td>
                      <td>{ele.roles.Editor !==  5150 ?  <button  className='text-red-500'><RxCross2 /></button> : <button className='border-none'><FcApproval /></button>}
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

export default Allusers
