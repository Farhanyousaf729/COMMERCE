import React from 'react'
import { useEffect  } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { ProductDetail } from "../Slices/ProducdetailSlice"
import AlertErr from '../Assets/Alert';
import Rating from '../Assets/Rating';
import { format } from 'date-fns';
import ReactStars from 'react-stars'
import Loader from '../Assets/Loader'

const AdminProductDetails = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const dispatch = useDispatch()
  const { loading, error, product, submitloading, success, submiterror } = useSelector(state => state.product)
  const { userInfo } = useSelector(state => state.user)

  const stock = <select name="" id="" >

    {[...Array(product.countInStock).keys()].map((ele) => {
      return <option key={ele} value={ele + 1}>{ele + 1}</option>
    })
    }
  </select>


  useEffect(() => {
  
    if(!userInfo){
      navigate('/login')
    }

    dispatch(ProductDetail(id))
  }, [dispatch, id , userInfo])
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
                    {/* <button className='hover:text-blue-500' >GO BACK</button> */}

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
                      <button  className="w-full bg-gray-900 text-white py-2 px-4 rounded-full font-bold hover:bg-gray-800">Add to Cart</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        }
        <div className='px-4 2xl:container 2xl:mx-auto '>
         
        
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

export default AdminProductDetails
