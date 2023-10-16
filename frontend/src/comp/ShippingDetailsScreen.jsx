import React, { useState } from 'react'
import {shippingAddress} from "../Slices/OrderSlice"
import {useDispatch , useSelector} from "react-redux"

const ShippingDetailsScreen = ({ setactiveStep }) => {
  const dispatch = useDispatch()
  const shippintDetail = useSelector(state => state.order)

  const obj = {
    name:"",
    address:"",
    city:"",
    state:"",
    postalCode:"",
    country:"",
    telephone:"",
    deliveryinformation:"",
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(shippingAddress(data));
    setactiveStep(1)
  }
const [data , setData] = useState(shippintDetail.shippingAddress || obj)

const OnChange = (e) => {
 setData({...data , [e.target.name] : e.target.value})

}
  return (
    <>
      <div className="w-full md:w-[50%] md:max-w-full mx-auto ">
        <div className="p-6 border border-gray-600 sm:rounded-md bg-gray-800">
          <form
            onSubmit={handleSubmit}
          >
            <label className="block mb-6">
              <span className="text-gray-300">Your name</span>
              <input
                name="name"
                type="text"
                value={data.name}
                required
                onChange={OnChange}
                className="
            block
            w-full
            mt-1
            border-gray-600
            rounded-md
            shadow-sm
            focus:border-indigo-300
            focus:ring
            focus:ring-indigo-200
            focus:ring-opacity-50
            bg-transparent
            placeholder-gray-600
            text-gray-300
              
          "
              />
            </label>
            <label className="block mb-6">
              <span className="text-gray-300">Address</span>
              <input
                name="address"
                onChange={OnChange}
                value={data.address}
                type="text"
                required
                className="
            block
            w-full
            mt-1
            border-gray-600
            rounded-md
            shadow-sm
            focus:border-indigo-300
            focus:ring
            focus:ring-indigo-200
            focus:ring-opacity-50
            bg-transparent
            placeholder-gray-600
            text-gray-300
          "
                placeholder=""
              />
            </label>

            <label className="block mb-6">
              <span className="text-gray-300">City</span>
              <input
                name="city"
                type="text"
                value={data.city}
                onChange={OnChange}
                required
                className="
            block
            w-full
            mt-1
            border-gray-600
            rounded-md
            shadow-sm
            focus:border-indigo-300
            focus:ring
            focus:ring-indigo-200
            focus:ring-opacity-50
            bg-transparent
            placeholder-gray-600
            text-gray-300
          "
                placeholder=""
              />
            </label>
            <label className="block mb-6">
              <span className="text-gray-300">State/Province</span>
              <input
                name="state"
                onChange={OnChange}
                value={data.state}
                type="text"
                required
                className="
            block
            w-full
            mt-1
            border-gray-600
            rounded-md
            shadow-sm
            focus:border-indigo-300
            focus:ring
            focus:ring-indigo-200
            focus:ring-opacity-50
            bg-transparent
            placeholder-gray-600
            text-gray-300
          "
                placeholder=""
              />
            </label>
            <label className="block mb-6">
              <span className="text-gray-300">Zip/Postal code</span>
              <input
                name="postalCode"
                type="text"
                onChange={OnChange}
                value={data.postalCode}
                required
                className="
            block
            w-full
            mt-1
            border-gray-600
            rounded-md
            shadow-sm
            focus:border-indigo-300
            focus:ring
            focus:ring-indigo-200
            focus:ring-opacity-50
            bg-transparent
            placeholder-gray-600
            text-gray-300
          "
                placeholder=""
              />
            </label>
            <label className="block mb-6">
              <span className="text-gray-300">Country</span>
              <input
                name="country"
                type="text"
                onChange={OnChange}
                value={data.country}
                required
                className="
            block
            w-full
            mt-1
            border-gray-600
            rounded-md
            shadow-sm
            focus:border-indigo-300
            focus:ring
            focus:ring-indigo-200
            focus:ring-opacity-50
            bg-transparent
            placeholder-gray-600
            text-gray-300
          "
                placeholder=""
              />
            </label>
            <label className="block mb-6">
              <span className="text-gray-300">Telephone</span>
              <input
                name="telephone"
                onChange={OnChange}
                value={data.telephone}
                type="text"
                className="
            block
            w-full
            mt-1
            border-gray-600
            rounded-md
            shadow-sm
            focus:border-indigo-300
            focus:ring
            focus:ring-indigo-200
            focus:ring-opacity-50
            bg-transparent
            placeholder-gray-600
            text-gray-300
          "
                placeholder=""
              />
            </label>
            <label className="block mb-6">
              <span className="text-gray-300">Delivery information</span>
              <textarea
                name="deliveryinformation"
                onChange={OnChange}
                value={data.deliveryinformation}
                className="
            block
            w-full
            mt-1
            border-gray-600
            rounded-md
            shadow-sm
            focus:border-indigo-300
            focus:ring
            focus:ring-indigo-200
            focus:ring-opacity-50
            bg-transparent
            placeholder-gray-600
            text-gray-300
          "
                rows="3"
                placeholder="floor/door lock code/etc."
              ></textarea>
            </label>
            <div className="mb-6">
              <button
                type="submit"
                className="
            h-10
            px-5
            text-indigo-100
            bg-indigo-700
            rounded-lg
            transition-colors
            duration-150
            focus:shadow-outline
            hover:bg-indigo-800
          "
              >
                Save
              </button>
            </div>
            <div>

            </div>
          </form>
        </div>
      </div>
    </>
  )
}


export default ShippingDetailsScreen
