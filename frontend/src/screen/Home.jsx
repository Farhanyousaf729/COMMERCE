import React from 'react'
import Hero from '../comp/Hero'
import Homeslider from '../comp/Homeslider'
import Topsellingbrand from '../comp/Topsellingbrand'
import Essential from '../comp/Essential'
import Shoptopbrands from '../comp/Shoptopbrands'
import Weeklydeals from '../comp/Weeklydeals'
import Noname from '../comp/Noname'
const Home = () => {
  return (
    <>
      <div className='flex-1'>
        <Hero />
        <Homeslider />
        <Topsellingbrand />
        <Essential />
        <Shoptopbrands />
        {/* <Weeklydeals /> */}
        <Noname />  
      </div>

    </>
  )
}

export default Home
