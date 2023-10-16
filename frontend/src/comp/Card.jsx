import React from 'react'
import Rating from '../Assets/Rating'
const Card = (props) => {
    const { pic, dis, price, rating, numReviews, name } = props.data


    return (
        <div>

            <div className="w-full max-w-sm  bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <img className=" w-full h-full object-cover p-8 rounded-t-lg" src={pic} alt="" />
                <div className="px-5 lg:pb-5">
                    <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">{name}</h5>
                    <Rating value={rating} numReviews={numReviews} />
                    <div className="flex items-center justify-between">
                        <span className="text-3xl font-bold text-gray-900 dark:text-white"> ${price}</span>
                        <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">watch</button>
                    </div>
                </div>
            </div>


        </div>
    )
}

export default Card
