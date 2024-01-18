import React, { useState, useEffect } from 'react'
import OTPInput, { ResendOTP } from "otp-input-react";
import axios from 'axios';
import AlertErr from '../Assets/Alert';
import { useNavigate } from "react-router-dom"

const ForgetPassword = () => {
    const [res, setRes] = useState(null)

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState("")
    const [state, setState] = useState({ email: "" })
    const [OTP, setOTP] = useState("");
    const [password, setPassword] = useState(null)
    const [confirmPassword, setConfirmPassword] = useState(null)
    const navigate = useNavigate()
    useEffect(() => {
        setError("")
        setOTP("")
    }, [res, password, confirmPassword])

    

    const getOtp = async () => {
        try {

            const response = await axios.post("/api/password/forget", state)
            setRes(response.data.otptoken)
        }
        catch (err) {
            setError(err.message)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsSubmitting(true)
        getOtp()

    }
    const AuthOtp = async () => {
        try {
            if (password !== confirmPassword || password === null || confirmPassword === null) {
                throw new Error("Password and confirmed password do not match");
            }
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${res}`

                },
            }


            const obj = {
                password: password,
                otp: OTP
            }

            const update = await axios.put("/api/password/forget", obj, config)
            
            if (update.data.status === "success") {
                navigate('/login')
            }
        }
        catch (err) {
            setError(err.message)
        }

    }
    useEffect(() => {
        if (OTP.length === 6) {
            AuthOtp()
        }

    }, [OTP])

    return (
        <>

            <div className=' text-black flex-1 flex flex-col justify-center items-center bg-black '>
                {
                    error && <AlertErr>{error}</AlertErr>
                }

                {
                    !res && <form action="" className=' w-[80%] md:w-[50%] bg-blue-400 px-4 py-6 rounded-md flex flex-col pt-4' onSubmit={handleSubmit}>
                        <input className='border-4 outline-none rounded-md p-2 mt-2' onChange={(e) => { setState({ email: e.target.value }); setError(""); setIsSubmitting(false) }} value={state.email} name='email' type="email" placeholder='Write Registered Email' required />
                        <input
                            className={`border-4 w-[100%] outline-none rounded-md p-2 mt-2 text-white cursor-pointer ${isSubmitting ? "bg-gray-300 " : 'bg-blue-400'}`}
                            type='submit'
                            value={isSubmitting ? 'Sending...' : 'SEND OTP'}
                            disabled={isSubmitting}
                        />
                    </form>
                }



                {res && <div className='w-[400px] max-w-[50%] mx-auto border-2 px-4 py-2 bg-gray-400 rounded-md'>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="block w-full py-2 my-2 rounded-sm" placeholder='New Password' required />
                    <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="block w-full py-2 my-2  rounded-sm" placeholder='Confirm New Password' required />


                    <OTPInput className='py-2 font-bold px-2'
                        value={OTP} onChange={setOTP} autoFocus OTPLength={6} otpType="number" disabled={false} />

                    <ResendOTP className="text-semibold text-lg" maxTime={120} onResendClick={getOtp} />
                </div>
                }


            </div>


        </>
    )
}

export default ForgetPassword
