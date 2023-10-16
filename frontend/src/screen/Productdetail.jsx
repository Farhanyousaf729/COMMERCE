import React from 'react';
import { useDispatch, useSelector } from "react-redux"
import Loader from '../Assets/Loader'
import { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom"
import { ProductDetail, addToCart, submitReview, resetSubmitReview } from "../Slices/ProducdetailSlice"
import AlertErr from '../Assets/Alert';
import Rating from '../Assets/Rating';
import ReactStars from 'react-stars'
import { format } from 'date-fns';
import { Button } from '@mui/material';


const Product = () => {
    const [comment, setComment] = useState('')
    const [rating, setRating] = useState(0)
    const navigate = useNavigate()
    const { pathname } = useLocation()

    const { catogry, pageNumber, id, keyword } = useParams()
    const { loading, error, product, submitloading, success, submiterror } = useSelector(state => state.product)
    const { userInfo } = useSelector(state => state.user)
    const dispatch = useDispatch()
    const [qty, setQty] = useState(1)

    useEffect(() => {
        dispatch(resetSubmitReview())
        dispatch(ProductDetail(id))
    }, [dispatch, id, success])

    const handleBack = () => {
        if (pathname.startsWith('/products')) {
            navigate(`/products/${catogry}/${pageNumber}`)
        }
        else {
            navigate(`/search/${keyword}/${pageNumber}`)
        }
    }


    const stock = <select name="" id="" onChange={(e) => setQty(Number(e.target.value))}>

        {[...Array(product.countInStock).keys()].map((ele) => {
            return <option key={ele} value={ele + 1}>{ele + 1}</option>
        })
        }
    </select>


    const handleAddToCart = () => {
        const payload = {
            name: product.name,
            brand: product.brand,
            image: product.pic,
            id: product._id,
            price: product.price,
            inStock: product.countInStock,
            quantity: qty
        }
        dispatch(addToCart(payload))
    }
    const checkLogin = () => {
        if (!userInfo) {
            navigate('/login')
        }
    }
    const HandleSubmitReview = () => {
        const review = {
            comment,
            rating
        }

        dispatch(submitReview({ userInfo, id, review }))
        setComment('')
        setRating(0)
    }
    // console.log(`${rating} ${comment}`);
    return (
        <>
            <div className=' flex-1 flex flex-col   '>
                {
                    loading ? <Loader /> : error ? <AlertErr>{error}</AlertErr> :
                        <div className="py-8   ">
                            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                                <div className="flex flex-col md:flex-row -mx-4">
                                    <div className="md:flex-1 px-4">
                                        <div className="h-[28.75]  rounded-lg bg-gray-300 mb-4 ">
                                            <img className="w-full h-full object-cover" src={product.pic} alt="" />
                                        </div>
                                        <button className='hover:text-blue-500' onClick={handleBack}>GO BACK</button>

                                    </div>
                                    <div className="md:flex-1 px-4">
                                        <h2 className="text-2xl font-bold mb-2">{product.name}</h2>
                                        <h2 className="text-2xl font-bold mb-2"><span className='text-lg font-normal'>Brand</span> {product.brand}</h2>
                                        <p className="text-gray-600 text-sm mb-4">{product.dis}</p>
                                        <div className="flex mb-4">
                                            <div className="mr-4">
                                                <span className="font-bold text-gray-700">{product.price}</span>
                                                <span className="text-gray-600">$</span>
                                            </div>
                                            <div>
                                                <span className="font-bold text-gray-700">Availability : </span>
                                                <span className="text-gray-600">{product.countInStock ? stock : `out of stock`}</span>
                                            </div>
                                        </div>
                                        <Rating value={product.rating} numReviews={product.numReviews} />
                                        <div className="w-1/2 mt-2 ">
                                            <Button  variant="contained" onClick={handleAddToCart} className="w-full bg-gray-900 text-white py-2 px-4 rounded-full font-bold hover:bg-gray-800">Add to Cart</Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                }
                <div className='px-4 2xl:container 2xl:mx-auto '>
                    <button onClick={checkLogin} className='font-semibold text-xl '>Review this product</button>
                    {
                        userInfo && <div>
                            <ReactStars
                                count={5}
                                onChange={setRating}
                                size={20}
                                color2={'#ffd700'}
                                value={rating}
                            />
                            <div className='flex flex-col w-full sm:w-[50%]'>
                                <label htmlFor="1">Comments</label>
                                <textarea onChange={(e) => setComment(e.target.value)} value={comment} className='border-2 p-2 max-h-[100px]' name="" id="1" cols="" rows="5"></textarea>
                            </div>
                            <br />
                            <button onClick={HandleSubmitReview} className=' bg-gray-900 text-white py-2 px-4 rounded-full font-bold hover:bg-gray-800'>Submit Review</button>

                        </div>
                    }
                    <div className="py-12  2xl:container 2xl:mx-auto flex justify-center items-center">
                        <div className="flex flex-col justify-start items-start w-full space-y-8">
                            <div className="flex justify-start items-start">
                                <p className="text-3xl lg:text-4xl font-semibold leading-7 lg:leading-9 text-gray-800 dark:text-white ">Reviews</p>
                            </div>
                            {

                                submitloading ? <Loader /> : submiterror ? <AlertErr>{submiterror}</AlertErr> :
                                    product.reviews.length > 0 && product.reviews.map((ele) => {
                                        return (
                                            <div key={ele._id} className="w-full flex justify-start items-start flex-col bg-gray-50 dark:bg-gray-800 p-8">

                                                <div className="cursor-pointer mt-2 md:mt-0">
                                                    <ReactStars
                                                        count={5}
                                                        size={20}
                                                        color2={'#ffd700'}
                                                        value={ele.rating}
                                                        edit={false}
                                                    />
                                                </div>
                                                <div id="menu" className="md:block">
                                                    <p className="mt-3 text-base leading-normal text-gray-600 dark:text-white w-full md:w-9/12 xl:w-5/6">{ele.comment}</p>
                                                    <div className="mt-6 flex justify-start items-center flex-row space-x-2.5">
                                                        <div className="flex flex-col justify-start items-start space-y-2">
                                                            <p className="text-base font-medium leading-none text-gray-800 dark:text-white">{ele.name}</p>
                                                            <p className="text-sm leading-none text-gray-600 dark:text-white">{format(new Date(ele.createdAt), "dd MMMM yyyy")}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}

export default Product
