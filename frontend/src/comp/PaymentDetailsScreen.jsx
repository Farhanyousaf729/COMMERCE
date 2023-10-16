import React from 'react'
import { paymentMethode } from "../Slices/OrderSlice"
import { useDispatch, useSelector } from "react-redux"
const PaymentDetailsScreen = ({ setactiveStep }) => {
  const dispatch = useDispatch()
  const payment = useSelector(state => state.order)
  // console.log(payment.paymentMethod);
  
  const paymentMethod = (e) => {
   

     dispatch(paymentMethode(e.target.value))
   

    if (e.target.value) {
      setactiveStep(2)

    }
  }



  return (
    <form action="" className=' flex flex-col w-full md:w-[50%] md:max-w-full mx-auto border border-gray-600 sm:rounded-md  bg-gray-800 text-white p-6'>

      <div>
        <input id='paypal' type="radio" name='payment' value="paypal"className={`${payment.paymentMethod === 'paypal' ? 'checked' : ''}`} onChange={paymentMethod} />
        <label className='pl-2' htmlFor="paypal">PayPal</label>
      </div>
      <div>
        <input id='debitcard' type="radio" name='payment' value="debitcard" className={`${payment.paymentMethod === 'debitcard' ? 'checked':'' }`} onChange={paymentMethod} />
        <label className='pl-2' htmlFor="debitcard">Debit Card</label>
      </div>
      <div>
        <input id='cradetcard' type="radio" name='payment' value='craditcard' className={`${payment.paymentMethod === 'craditcard' ? 'checked':'' }`} onChange={paymentMethod} />
        <label className='pl-2' htmlFor="cradetcard">Credit Card</label>
      </div>


    </form>
  )
}

export default PaymentDetailsScreen
