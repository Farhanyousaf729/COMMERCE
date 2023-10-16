import React from 'react'

const Card1 = (props) => {
    const { pic, brand } = props.data
    return (
        <div className='bg-[#F8F3F3] '>
           <div className='w-full max-w-sm '>
            <div>
                <img src={pic} alt="" />
            </div>


            <div className='w-32 h-32 bg-white rounded-full flex items-center justify-center -mt-10 mx-auto '>
                <div className='w-auto h-auto'>
                    <img src={brand} alt="" />
                </div>
            </div>
            </div> 
          
        </div>
    )
}

export default Card1
