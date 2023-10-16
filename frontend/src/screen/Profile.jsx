
import React from "react"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { userdetails, userUpdate } from "../Slices/UserSlice"
import AlertErr from "../Assets/Alert"
import Looader from "../Assets/Loader"
import { Alert } from "@mui/material"
const Profile = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { userInfo } = useSelector(state => state.user)
    const { error, loading, userDetails } = useSelector(state => state.user)
    const { success } = useSelector(state => state.user)
    const [name, setName] = useState('')
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState('')
    const [repassword, setrePassword] = useState('')
    
    useEffect(() => {
        if(!userInfo){
            navigate('/login')
        }
        // console.log(`useeffact`);
        if (!userDetails) {
            dispatch(userdetails(userInfo))
            // console.log(`inneruseeffact`);
        }
        else {
            setName(userInfo?.name)
            setEmail(userInfo?.email)
        }

        if (userInfo === null) {
            setName("")
            setEmail("")
        }

    }, [dispatch, userInfo, userDetails])



    const handleSubmit = (e) => {
        e.preventDefault()
         if(password === repassword){

             dispatch(userUpdate({ userInfo, name, email, password }))
         }
    }

    return (
        <>
            <div className="w-[100%] flex-1 flex flex-col items-center justify-center  bg-gray-900 text-white">
                {
                    success && <Alert>{'User Updated'}</Alert>
                }

                {
                    error && <AlertErr>{error}</AlertErr>
                }


                {
                    loading && <Looader />
                }
                <form className="flex w-[30rem] flex-col space-y-10 " onSubmit={handleSubmit}>
                    <div className="text-center text-4xl font-medium">Profile Details </div>
                    {/* <button onClick={() => setDisabled(false)} className="w-[20%]  transform rounded-sm bg-indigo-600 py-2 font-bold duration-300 hover:bg-indigo-400">Edit</button> */}
                    <div className="w-full transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-indigo-500">
                        <input  onChange={(e) => setName(e.target.value)} value={name} type="text" placeholder="Name" required className="w-full border-none bg-transparent outline-none placeholder:italic focus:outline-none" />
                    </div>

                    <div className="w-full transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-indigo-500">
                        <input  onChange={(e) => setEmail(e.target.value)} value={email} type="email" placeholder="Email" required className="w-full border-none bg-transparent outline-none placeholder:italic focus:outline-none" />
                    </div>

                    <div className="w-full transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-indigo-500">
                        <input  onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" required className="w-full border-none bg-transparent outline-none placeholder:italic focus:outline-none" />
                    </div>
                    <div className="w-full transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-indigo-500">
                        <input  onChange={(e) => setrePassword(e.target.value)} type="password" placeholder="Re-Password" required className="w-full border-none bg-transparent outline-none placeholder:italic focus:outline-none" />
                    </div>

                    <button  className="transform rounded-sm bg-indigo-600 py-2 font-bold duration-300 hover:bg-indigo-400">Submit</button>


                </form>

            </div>
        </>
    )
}
export default Profile