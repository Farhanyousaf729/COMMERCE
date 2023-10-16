import React from 'react'
import { useEffect, useState } from "react"
import { userLogin } from "../Slices/UserSlice"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate, Link, useLocation } from "react-router-dom"
import Looader from '../Assets/Loader'
import AlertErr from '../Assets/Alert'
const Login = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const location = useLocation()
    const [mangerRequest, setMangerRequest] = useState(false)

    const { loading, error, userInfo } = useSelector(state => state.user)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    // const redirct = location.search?location.search.split('=')[1] : '/'

    useEffect(() => {
        if (userInfo) {

            navigate('/')
        }
    }, [userInfo])
    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(userLogin({ password, email , mangerRequest}))
    }
    // console.log(mangerRequest);
    return (
        <>

            <div className="w-[100%] flex-1 flex flex-col items-center justify-center  bg-gray-900 text-white">

                {
                    error && <AlertErr>{error}</AlertErr>
                }


                {
                    loading && <Looader />
                }

                <form className="flex w-[90%]  sm:w-[30rem] flex-col space-y-10  " onSubmit={handleSubmit}>
                    <div className="text-center text-4xl font-medium">Log In</div>

                    <div className="w-full transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-indigo-500">
                        <input onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email" required className="w-full border-none bg-transparent outline-none placeholder:italic focus:outline-none" />
                    </div>

                    <div className="w-full transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-indigo-500">
                        <input onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" required className="w-full border-none bg-transparent outline-none placeholder:italic focus:outline-none" />
                    </div>
                    <div className='w-full italic flex border-b-2 justify-between '>
                        <p className=''>Register As Manger</p>
                        <input className='w-[20px] h-[20px]' value={mangerRequest} type='checkbox' onChange={(e)=>setMangerRequest(e.target.checked)} />
                    </div>
                    <button className="transform rounded-sm bg-indigo-600 py-2 font-bold duration-300 hover:bg-indigo-400">LOG IN</button>

                   <Link to='/forget'><p className="transform text-center font-semibold text-gray-500 duration-300 hover:text-gray-300">FORGOT PASSWORD?</p></Link> 

                    <p className="text-center text-lg">
                        No account?
                        <Link to='/register'><button className="py-2 px-5 ml-3  border rounded-sm hover:scale-110 duration-300 border-blue-400  ">Register</button></Link>

                    </p>

                </form>
            </div>
        </>

    )
}

export default Login
