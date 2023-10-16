import React from 'react'
import { useEffect, useState } from "react"
import { registerUser } from "../Slices/UserSlice"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate, Link } from "react-router-dom"
import Looader from '../Assets/Loader'
import AlertErr from '../Assets/Alert'
const Register = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [repassword, setrePassword] = useState('')
    const [message, setMessage] = useState('')
    const [mangerRequest, setMangerRequest] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { error, loading, userInfo } = useSelector(state => state.user)
    const handleSubmit = (e) => {
        e.preventDefault()
        if (password !== repassword) {

            setMessage(`Password does not match`)

        }
        else {
            dispatch(registerUser({ name, email, password,mangerRequest}))
        }
    }
    useEffect(() => {
        if (userInfo) {
            navigate('/')
        }

    }, [userInfo])
    // console.log(`${name} ${email} ${password} ${repassword} ${mangerRequest}`);
    return (
        <>

            <div className="w-[100%] flex-1 flex flex-col items-center justify-center  bg-gray-900 text-white">
                {
                    message && <AlertErr>{message}</AlertErr>
                }
                {
                    error && <AlertErr>{error}</AlertErr>
                }
                {
                    loading && <Looader />
                }

                <form className="flex w-[90%] sm:w-[30rem] flex-col space-y-10 " onSubmit={handleSubmit}>
                    <div className="text-center text-4xl font-medium">Register</div>

                    <div className="w-full transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-indigo-500">
                        <input onChange={(e) => setName(e.target.value)} type="text" placeholder="Name" required className="w-full border-none bg-transparent outline-none placeholder:italic focus:outline-none" />
                    </div>

                    <div className="w-full transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-indigo-500">
                        <input onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email" required className="w-full border-none bg-transparent outline-none placeholder:italic focus:outline-none" />
                    </div>

                    <div className="w-full transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-indigo-500">
                        <input onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" required className="w-full border-none bg-transparent outline-none placeholder:italic focus:outline-none" />
                    </div>
                    <div className="w-full transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-indigo-500">
                        <input onChange={(e) => setrePassword(e.target.value)} type="password" placeholder="Re-Password" required className="w-full border-none bg-transparent outline-none placeholder:italic focus:outline-none" />
                    </div>
                    <div className='w-full italic flex border-b-2 justify-between '>
                        <p className=''>Register As Manger</p>
                        <input className='w-[20px] h-[20px]' value={mangerRequest} type='checkbox' onChange={(e)=>setMangerRequest(e.target.checked)} />
                    </div>
                    <button className="transform rounded-sm bg-indigo-600 py-2 font-bold duration-300 hover:bg-indigo-400">Submit</button>


                    <p className="text-center text-lg">
                        Have account?
                        <Link to='/login'><button className="py-2 px-5 ml-3  border rounded-sm hover:scale-110 duration-300 border-blue-400  ">Login</button></Link>

                    </p>


                </form>
            </div>
        </>
    )
}

export default Register
