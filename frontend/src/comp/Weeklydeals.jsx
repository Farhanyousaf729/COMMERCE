import React from 'react'
import Data from '../data'
import Card from './Card'
const Weeklydeals = () => {

    // const slice = Data.slice(0 , 6)



    return (
        <div className= '  max-w-[105rem] mx-auto lg:w-[90%]  2xl:px-0 py-16  hidden lg:block'>
        

                <h1 className='text-3xl pb-10 font-semibold'>Weekly Deals</h1>
                <ul className='  overflow-x-auto no-scrollbar  flex gap-8  '>
                    {
                        Data.length ? Data.map((ele, i) => {
                            return (
                                <li key={i} className=' hover:shadow-2xl border-none '><Card data={ele} /></li>
                            )
                        }) : <></>
                    }
                </ul>

    

        </div>
    )
}

export default Weeklydeals
