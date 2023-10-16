import React from 'react'

const Essential = () => {
    return (
        <div className='max-w-[105rem] mx-auto pb-16   lg:px-10 2xl:px-0'>
            <h1 className='text-3xl pb-10 font-semibold'>Essential Deals</h1>
            <div className='max-w-[105rem] mx-auto   grid md:grid-cols-2 2xl:grid-cols-4 gap-8'>
                <div className='bg-[#f7ecda] flex items-center justify-between p-4'>
                    <div>
                        <h1 className='font-semibold text-3xl pb-2'>Dipers</h1>
                        <h1 className='font-bold text-red-500 text-3xl'>UPTO <br />30% OFF</h1>
                    </div>
                    <div>
                        <img src="/imgs/home/image42.png" alt="" />

                    </div>
                </div>
                <div className='bg-[#f7ecda] flex items-center justify-between p-4'>
                    <div>
                        <h1 className='font-semibold text-3xl pb-2'>Baby Oil</h1>
                        <h1 className='font-bold text-red-500 text-3xl'>UPTO <br />30% OFF</h1>
                    </div>
                    <img src="/imgs/home/image9.png" alt="" />
                </div>
                <div className='bg-[#f7ecda] flex items-center justify-between p-4'>
                    <div>
                        <h1 className='font-semibold text-3xl pb-2'>Home</h1>
                        <h1 className='font-bold text-red-500 text-3xl'>UPTO <br />30% OFF</h1>
                    </div>
                    <img src="/imgs/home/image38.png" alt="" />
                </div>
                <div className='bg-[#f7ecda] flex items-center justify-between p-4'>
                    <div className=''>
                        <h1 className='font-semibold text-3xl pb-2'>Appliances</h1>
                        <h1 className='font-bold text-red-500 text-3xl'>UPTO <br />30% OFF</h1>
                    </div>
                    <img className='mr-4' src="/imgs/home/image39.png" alt="" />
                </div>
            </div>
        </div>

    )
}

export default Essential
