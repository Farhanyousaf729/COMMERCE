import React from 'react'
import { Stepper, Step } from 'react-form-stepper';
import { useState } from "react"
import ShippingDetailsScreen from '../comp/ShippingDetailsScreen';
import PaymentDetailsScreen from '../comp/PaymentDetailsScreen';
import PlaceOrderScreen from '../comp/PlaceOrderScreen';
const CheckOut = () => {
    const [active, setactiveStep] = useState(0)

    const handleClick = (e) => {
        setactiveStep(Number(e.target.innerHTML-1))
    }

    return (
        <div className='flex-1'>

            <Stepper activeStep={active}>
                <Step label="Shipping Details" onClick={handleClick} />
                <Step label="Payment Methode" onClick={handleClick} />
                <Step label="Place Order" onClick={handleClick} />
            </Stepper>


            {active === 0 && <ShippingDetailsScreen setactiveStep={setactiveStep}/>}
            {active === 1 && <PaymentDetailsScreen setactiveStep={setactiveStep} />}
            {active === 2 && <PlaceOrderScreen setactiveStep={setactiveStep}/>}
        </div>
    )
}

export default CheckOut
