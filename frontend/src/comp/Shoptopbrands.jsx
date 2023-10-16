import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Navigation } from 'swiper/modules';
import Card1 from './Card1';
import Resposiveslider from '../Assets/Resposiveslider';
const Shoptopbrands = () => {
  const Imags = [
    { pic: 'imgs/slider/Rectangle12.png', brand: "/imgs/slider/image31.png" },
    { pic: 'imgs/slider/Rectangle13.png', brand: '/imgs/slider/image30.png' },
    { pic: 'imgs/slider/Rectangle11.png', brand: "/imgs/slider/image29.png" },
    { pic: 'imgs/slider/Rectangle15.png', brand: '/imgs/slider/image29.png' },
    { pic: 'imgs/slider/Rectangle16.png', brand: '/imgs/slider/Group545.png' },
    { pic: 'imgs/slider/Rectangle12.png', brand: "/imgs/slider/image31.png" },
    { pic: 'imgs/slider/Rectangle11.png', brand: "/imgs/slider/image29.png" },

  ]



  const slider = Resposiveslider()
  // console.log(slider, `topbrands`);
  return (
    <div className='bg-[#F8F3F3]   pt-10 pb-12 max-w-[105rem] w-[100%] mx-auto '>
      <h1 className='font-semibold text-3xl text-center pb-10'>Shop Top Brands</h1>

      <Swiper
        slidesPerView={`${slider}`}
        spaceBetween={30}
        loop={true}
        navigation={true}
        pagination={true}
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >

        {
          Imags.map((ele, i) => {
            return (
              <SwiperSlide key={i}><Card1 data={ele} /></SwiperSlide>
            )
          })
        }

      </Swiper>
    </div>
  )
}

export default Shoptopbrands
