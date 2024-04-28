import React, { useState } from 'react'
import { AiOutlineMenu } from "react-icons/ai"
import { PiCoatHanger } from "react-icons/pi"
import { MdLocalMovies } from "react-icons/md"
import { useNavigate } from "react-router-dom"
import { BsFillLightningChargeFill } from "react-icons/bs"
const Firstsection = () => {
  const navigate = useNavigate()
  const [colorChange, setColorchange] = useState(false);
  const changeNavbarColor = () => {
    if (window.scrollY >= 80) {
      setColorchange(true);
    }
    else {
      setColorchange(false);
    }
  }
  window.addEventListener('scroll', changeNavbarColor);
  
  const handleForword = (e) => {
    navigate(`/products/${e.target.innerText}`)

  }
  console.log(colorChange);
  return (
    <>

      <div className={`  max-w-[87rem] mx-auto font-medium text-lg text_color py-5 text-white ${colorChange ? 'bg-yellow-300' : ""}  `}>
        <ul className='grid grid-cols-3 justify-between  '>

          <li className=' flex flex-col items-center  '>
            <PiCoatHanger />
            <button onClick={handleForword}>Clothing </button>
          </li>
          <li className=' flex flex-col items-center font-normal'>
            <BsFillLightningChargeFill />
            <button onClick={handleForword}>Electron</button>
          </li>
          <li className=' flex flex-col items-center font-normal'>
            <MdLocalMovies />
            <button onClick={handleForword}>Entertainment</button>
          </li>

        </ul>
      </div>
    </>
  )
}

export default Firstsection
