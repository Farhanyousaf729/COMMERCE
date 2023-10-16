import React, { useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux"
import { GetTopRatedProducts } from "../Slices/ProductSlice"
import Looader from '../Assets/Loader';
import AlertErr from '../Assets/Alert';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Navigation } from 'swiper/modules';
import Card from './Card';
import Resposiveslider from '../Assets/Resposiveslider';
const Homeslider = () => {
    const dispatch = useDispatch()
    const { topLoading, topProducts, topError } = useSelector(state => state.products)

    const slider = Resposiveslider()
    useEffect(() => {
        dispatch(GetTopRatedProducts())

    }, [])
   

    return (
        <>
            <div className='bg-[#F8F3F3] text-black pt-10 pb-14 '>
            <h1 className='text-3xl pb-10 font-semibold text-center'>Top Selling Products</h1>
                {
                    topLoading ? <Looader /> : topError ? <AlertErr>{topError}</AlertErr> :

                        <Swiper
                            slidesPerView={`${slider - 1}`}
                            spaceBetween={30}
                            loop={true}
                            navigation={true}

                            modules={[Pagination, Navigation]}
                            className="mySwiper"
                        >

                            {
                                topProducts?.map((ele, i) => {
                                    return (
                                        <SwiperSlide key={i}><Card data={ele} /></SwiperSlide>
                                    )
                                })
                            }

                        </Swiper>
                }
            </div>
        </>
    )
}

export default Homeslider
