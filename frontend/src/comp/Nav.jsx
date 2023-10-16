import React, { useState } from 'react'
import { BiSearch } from "react-icons/bi"
import { TfiLayoutMenuV } from "react-icons/tfi"
import { RxCross2 } from "react-icons/rx"
import { Link } from "react-router-dom"
import { BsFillCartFill, BsFillPersonFill, BsFillPersonPlusFill } from "react-icons/bs"
import { UseSelector, useSelector } from 'react-redux'
import { logout } from "../Slices/UserSlice"
import { useDispatch } from "react-redux"
import { emptyCart } from "../Slices/ProducdetailSlice"
import { Logout } from "../Slices/AdminSlice"
import { useNavigate, useParams } from "react-router-dom"






const Nav = () => {
    const { pageNumber } = useParams()
    const navigate = useNavigate()
    const [keyword, setKeyword] = useState('')
    const { userInfo } = useSelector(state => state.user)
    const { cartProducts } = useSelector(state => state.product)
    const [toggle, setToggle] = useState(true);
    const dispatch = useDispatch()


    const handleForword = (e) => {
        navigate(`/products/${e.target.innerText}`)

    }
    const handleSearch = (e) => {
        e.preventDefault();
        const searchPath = pageNumber ? `/search/${keyword}/${pageNumber}` : `/search/${keyword}`;
        navigate(searchPath);
        setKeyword('');
      };
    return (
        <>

            <div className='w-[100%] bg-[#413FA7]  grid grid-cols-4 sm:grid-cols-4 place-items-center py-5 pr-4 sm:pr-0 '>

                <div className=''>
                    <h1 className='text-2xl font-bold text-white hidden sm:block '> <Link to='/'>LOGO</Link></h1>
                    <div onClick={() => setToggle(!toggle)} className={` pr-4 block sm:hidden text-4xl text-white cursor-pointer transform transition-transform ${toggle ? 'scale-110 ' : 'scale-100'}`}>
                        <TfiLayoutMenuV />
                    </div>
                </div>

                <form onSubmit={handleSearch} className='col-span-3 sm:col-span-2 w-[100%] flex justify-center items-center bg-white rounded-md  py-[2px] '>

                    <input onChange={(e) => setKeyword(e.target.value)} value={keyword} className='w-[90%] rounded-sm py-[2px] px-2 border-none outline-none text-transparent focus:text-black' type="text" name="" id="" placeholder='search' />
                    < BiSearch />
                </form>



                <div className=' hidden sm:block'>
                    <button onClick={() => setToggle(!toggle)} className=' border-2 border-white rounded-md text-white px-4 py-[0.37rem] font-bold text-xl'>{userInfo ? <BsFillPersonFill /> : <BsFillPersonPlusFill />}</button>
                    {
                        !toggle && !userInfo && <ul className='absolute bg-white rounded-sm px-2 top-16 decoration-2 underline underline-offset-4 border-2 py-2'>
                            <Link to='/register'><li onClick={() => setToggle(!toggle)} className='hover:underline decoration-blue-500 cursor-pointer'>Register</li></Link>
                            <Link to='/login'><li onClick={() => setToggle(!toggle)} className=' hover:underline decoration-blue-500 cursor-pointer pt-2'>Login</li></Link>
                        </ul>
                    }
                    {
                        !toggle && userInfo && <ul className='absolute  bg-white rounded-sm px-2 top-16 decoration-2 underline underline-offset-4 border-2 py-2'>
                            <Link to='/profile'><li onClick={() => setToggle(!toggle)} className='hover:underline decoration-blue-500 cursor-pointer'>Profile</li></Link>
                            <Link to='/orders'><li onClick={() => setToggle(!toggle)} className='hover:underline decoration-blue-500 cursor-pointer pt-2'>Orders</li></Link>
                            {
                                userInfo.roles.Editor && userInfo.roles.Admin && <Link to='/adminpanel'> <li onClick={() => setToggle(!toggle)} className='hover:underline decoration-blue-500 cursor-pointer pt-2'>Admin Panel</li></Link>


                            }

                            <li onClick={() => {
                                setToggle(!toggle);
                                dispatch(logout());
                                dispatch(emptyCart());
                                dispatch(Logout())
                            }} className=' hover:underline decoration-blue-500 cursor-pointer pt-2'>Logout</li>
                        </ul>
                    }


                    <Link to='/cart'> <button className='border-2 border-[#2979FF] relative  rounded-md bg-white text-[#1B4EA3] ml-5 px-4 py-[0.37rem] quicksand font-bold text-xl'> <BsFillCartFill /><span className='text-sm absolute  top-2 right-2'>
                        {cartProducts.length !== 0 ?
                            cartProducts.reduce((acc, item) => acc + item.quantity, 0) : null}</span></button></Link>
                </div>




            </div>

            <div className={`fixed block sm:hidden top-18 left-0 w-full h-full bg-red-200 text-white font-semibold text-lg px-2
                ${!toggle && !userInfo ? 'transform translate-x-0 transition-transform duration-1000' : 'transform -translate-x-full transition-transform duration-1000'}`}>

                <ul className='decoration-2 underline underline-offset-4  py-2'>
                    <li onClick={() => setToggle(!toggle)} className='hover:underline decoration-blue-500 cursor-pointer '> <Link to='/'>Home</Link> </li>
                    <li onClick={() => setToggle(!toggle)} className='Hover hover:underline decoration-blue-500 cursor-pointer '> <Link to='/'>Categories</Link>
                        <ul className='Hidden absolute  shadow-2xl p-2 left-28 top-8'>
                            <li onClick={handleForword}>Clothing</li>
                            <li onClick={handleForword}>Electronics</li>
                            <li onClick={handleForword}>Entertainment</li>
                        </ul>
                    </li>
                    <li onClick={() => setToggle(!toggle)} className='hover:underline decoration-blue-500 cursor-pointer'><Link to='/cart'>Cart</Link></li>

                    <li onClick={() => setToggle(!toggle)} className='hover:underline decoration-blue-500 cursor-pointer'><Link to='/register'>Register</Link></li>
                    <li onClick={() => setToggle(!toggle)} className='hover:underline decoration-blue-500 cursor-pointer'><Link to="/login">Login</Link></li>
                </ul>
            </div>

            <div className={`fixed block sm:hidden top-18 left-0 w-full h-full bg-red-200 text-white font-semibold text-lg px-2
                ${!toggle && userInfo ? 'transform translate-x-0 transition-transform duration-1000' : 'transform -translate-x-full transition-transform duration-1000'}`}>

                <ul className='decoration-2 underline underline-offset-4  py-2'>
                    <li onClick={() => setToggle(!toggle)} className='hover:underline decoration-blue-500 cursor-pointer'> <Link to='/'>Home </Link></li>
                    <li onClick={() => setToggle(!toggle)} className='hover:underline decoration-blue-500 cursor-pointer'><Link to='/cart'>Cart</Link></li>

                    <li onClick={() => setToggle(!toggle)} className='hover:underline decoration-blue-500 cursor-pointer'><Link to='/profile'>Profile</Link></li>
                    <li onClick={() => setToggle(!toggle)} className='hover:underline decoration-blue-500 cursor-pointer'><Link to="/orders">Orders</Link></li>
                    {
                        userInfo?.roles.Editor && userInfo?.roles.Admin && <Link to='/adminpanel'> <li onClick={() => setToggle(!toggle)} className='hover:underline decoration-blue-500 cursor-pointer '>Admin Panel</li></Link>


                    }
                    <li onClick={() => {
                        setToggle(!toggle);
                        dispatch(logout());
                        dispatch(emptyCart());
                        dispatch(Logout())
                    }} className=' hover:underline decoration-blue-500 cursor-pointer '>Logout</li>

                </ul>
            </div>

        </>
    )
}

export default Nav
