import React from 'react'
import propTypes from 'prop-types'
import { AiTwotoneStar } from "react-icons/ai"
import { BsStarHalf } from "react-icons/bs"
const Rating = ({ value, numReviews    , color }) => {

    return (
        <div className="flex items-center">

            <span>
                {
                    value >= 1 ? <AiTwotoneStar className='text-yellow-500' />
                        : value >= 0.5 ? <BsStarHalf className='text-yellow-500' /> : <AiTwotoneStar className='text-gray-200' />
                }

            </span>

            <span>
                {
                    value >= 2 ? <AiTwotoneStar className='text-yellow-500' />
                        : value >= 1.5 ? <BsStarHalf className='text-yellow-500' /> : <AiTwotoneStar className='text-gray-200' />
                }
            </span>

            <span>
                {
                    value >= 3 ? <AiTwotoneStar className='text-yellow-500' />
                        : value >= 2.5 ? <BsStarHalf className='text-yellow-500' /> : <AiTwotoneStar className='text-gray-200' />
                }
            </span>

            <span>
                {
                    value >= 4 ? <AiTwotoneStar className='text-yellow-500' />
                        : value >= 3.5 ? <BsStarHalf className='text-yellow-500' /> : <AiTwotoneStar className='text-gray-200' />
                }
            </span>

            <span>
                {
                    value >= 5 ? <AiTwotoneStar className='text-yellow-500' />
                        : value >= 4.5 ? <BsStarHalf className='text-yellow-500' /> : <AiTwotoneStar className='text-gray-200' />
                }
            </span>
            <br />

            <span className='ml-2'> {numReviews ? numReviews: 0}</span>

        </div>
    )
}

Rating.defaultProps = {
    value:0,
    numReviews :0   
}

Rating.propTypes = {
    value: propTypes.number.isRequired,
    numReviews : propTypes.number.isRequired,
}


export default Rating   