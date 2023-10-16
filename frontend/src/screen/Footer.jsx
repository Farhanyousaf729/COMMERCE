import React from 'react'
import ReactStars from 'react-stars'
const Footer = () => {

  const ratingChanged = (newRating)=>{
       console.log(newRating);
  }
  return (
    <div className='bg-[#413FA7] py-2 text-center text-semibold text-white text-xl'> All Right Reserved <span>@ farhan yousaf</span> <span>{new Date().getFullYear()}</span>
      {/* <ReactStars
        count={5}
        onChange={ratingChanged}
        size={24}
        color2={'#ffd700'} /> */}
       
    </div>
  )
}

export default Footer
