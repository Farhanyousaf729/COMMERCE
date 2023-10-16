import React from 'react'
import { useEffect, useState } from "react"
import { useParams , useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { AllUsers, EditUserDetails, deletetUser  } from "../Slices/AdminSlice"
import Looader from '../Assets/Loader'
import AlertErr from '../Assets/Alert'
const AdminUsersDetail = () => {
    const [mangerRemovel, setMangerRemovel] = useState(false)
    // console.log(mangerRemovel);
    const navigate = useNavigate()
    const [name, setName] = useState('')
    const [email, setEmail] = useState("")
    const [disable, setDisabled] = useState(true)
    const dispatch = useDispatch()
    const { id } = useParams()
    const { userInfo } = useSelector(state => state.user)
    const { loadingUsers, users, errorUsers, editloadingUsers, editerrorUsers, deleteloadingUsers, deletedUser, deleteerrorUsers } = useSelector(state => state.admin)

    useEffect(() => {
           if(deletedUser){
            navigate('/adminpanel/allusers/')
           }
        const obj = { userInfo, id }

        if (!users?.name) {
            dispatch(AllUsers(obj))

        }
        else {
            setName(users.name)
            setEmail(users.email)
        }


    }, [users , deletedUser])
    const handleSubmit = (e) => {
        e.preventDefault()
        // const token = userInfo.token
        const user = {
            name,
            email,
            mangerRemovel
        }

        dispatch(EditUserDetails({ userInfo, id, user }))

    }

    const DeletUser = () => {
        const obj = {
            userInfo : userInfo,
            id: id
        }
        alert(`are you sure you want to delete`)
        
        dispatch(deletetUser(obj))
    }

    return (
        <div>
            <h1 className='font-semibold text-gray-500 py-2 text-2xl underline'>User Details</h1>
            <br />
            {
                loadingUsers && <Looader />
            }
            {
                editloadingUsers && <Looader />
            }
            {
                deleteloadingUsers && <Looader />
            }
            {
                errorUsers && <AlertErr>{errorUsers}</AlertErr>
            }
            {
                editerrorUsers && <AlertErr>{editerrorUsers}</AlertErr>
            }
            {
                deleteerrorUsers && <AlertErr>{deleteerrorUsers}</AlertErr>
            }
            {
                users &&
                <>

                    <form className=" w-[50%] flex  flex-col space-y-10 " onSubmit={handleSubmit}>
                        <div className="w-full transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-indigo-500">
                            <input disabled={disable} onChange={(e) => setName(e.target.value)} value={name} type="text" required className="w-full border-none bg-transparent outline-none placeholder:italic focus:outline-none" />
                        </div>

                        <div className="w-full transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-indigo-500">
                            <input disabled={disable} onChange={(e) => setEmail(e.target.value)} value={email} type="email" required className="w-full border-none bg-transparent outline-none placeholder:italic focus:outline-none" />
                        </div>
                        {
                            users.roles?.Editor &&

                            <div className='w-full text-lg flex border-b-2 justify-between '>
                                <p className=''>Disable As Manager</p>
                                <input disabled={disable} className='w-[20px] h-[20px]' value={mangerRemovel} type='checkbox' onChange={(e) => setMangerRemovel(e.target.checked)} />
                            </div>

                        }

                        {
                            disable && <button onClick={() => setDisabled(false)} className="w-[20%]  transform rounded-sm bg-indigo-600 py-2 font-bold duration-300 hover:bg-indigo-400">Edit</button>

                        }
                        {
                            !disable && <button className="w-[20%] transform rounded-sm bg-indigo-600 py-2 font-bold duration-300 hover:bg-indigo-400">Submit</button>

                        }
                    </form>
                    <br />
                    <button onClick={DeletUser} className=" w-[10%]  transform rounded-sm bg-indigo-600 py-2 font-bold duration-300 hover:bg-indigo-400">Del</button>

                </>
            }
        </div>
    )
}

export default AdminUsersDetail
