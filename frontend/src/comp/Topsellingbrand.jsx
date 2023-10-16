import React from 'react'

const Topsellingbrand = () => {
    return (

        <div className='contaner max-w-[105rem] mx-auto  lg:px-10 2xl:px-0 pb-16'>
            <h1 className='text-3xl py-16 font-semibold'>Top Selling Products</h1>
            <div className=" grid lg:grid-cols-2 lg:gap-x-24 2xl:gap-x-36 gap-y-4 ">
                <div>
                    <div className='bg-[#F8F3F3]  flex justify-between p-4 2xl:px-16'>
                        <div className='flex flex-col justify-center'>
                            <h1 className='text-3xl font-semibold '><span className='font-normal'>Healthy</span> Porridge</h1>
                            <p className='py-4'>See the beauty of exotic world <br />with the luxurious glasses</p>
                            <button className='underline text-yellow-500  '>Discover Now</button>
                        </div>
                        <div className='    '>
                            <img src="/imgs/home/image14.jpg" className='' alt="" />
                        </div>
                    </div>
                </div>


                <div className='bg-[#F8F3F3]  flex justify-between p-4 2xl:px-16'>
                    <div className='flex flex-col justify-center'>
                        <h1 className='text-3xl font-semibold '><span className='font-normal'>Home</span> Appliances</h1>
                        <p className='py-4'>See the beauty of exotic world <br />with the luxurious glasses</p>
                        <button className='underline text-yellow-500  '>Discover Now</button>
                    </div>
                    <div className=''>
                        <img src="/imgs/home/image33.png" className='bg-red-500' alt="" />
                    </div>
                </div>
                <div className='grid grid-cols-2 lg:grid-cols-4  gap-2  font-normal text-base'>
                    <div className='bg-[#F8F3F3] flex flex-col items-center justify-center py-2'>
                        <img src="/imgs/home/image19.png" alt="" />
                        <p>Organic Food</p>
                    </div>
                    <div className='bg-[#F8F3F3] flex flex-col items-center justify-center py-2'>
                        <img src="/imgs/home/image21.png" alt="" />
                        <p>Fresh Food</p>
                    </div>
                    <div className='bg-[#F8F3F3] flex flex-col items-center justify-center py-2'>
                        <img src="/imgs/home/image27.png" alt="" />
                        <p>Organic Baby Food</p>
                    </div>
                    <div className='bg-[#F8F3F3] flex flex-col items-center justify-center py-2'>
                        <img src="/imgs/home/image44.png" alt="" />
                        <p>Fresh Food</p>
                    </div>
                </div>

                <div className='grid grid-cols-2 lg:grid-cols-4 gap-2  font-normal text-base'>
                    <div className='bg-[#F8F3F3] flex flex-col items-center justify-center py-2'>
                        <img src="/imgs/home/image19.png" alt="" />
                        <p>Organic Food</p>
                    </div>
                    <div className='bg-[#F8F3F3] flex flex-col items-center justify-center py-2'>
                        <img src="/imgs/home/image21.png" alt="" />
                        <p>Fresh Food</p>
                    </div>
                    <div className='bg-[#F8F3F3] flex flex-col items-center justify-center py-2'>
                        <img src="/imgs/home/image27.png" alt="" />
                        <p>Organic Baby Food</p>
                    </div>
                    <div className='bg-[#F8F3F3] flex flex-col items-center justify-center py-2'>
                        <img src="/imgs/home/image44.png" alt="" />
                        <p>Fresh Food</p>
                    </div>
                </div>

            </div>
        </div>

    )
}

export default Topsellingbrand
