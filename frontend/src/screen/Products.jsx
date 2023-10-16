import React from 'react'
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useLocation, useParams } from "react-router-dom"
import AlertErr from '../Assets/Alert'
import { getProducts, Search } from "../Slices/ProductSlice"
import Loader from '../Assets/Loader'
import Card from '../comp/Card'
import Paginate from '../comp/Paginate'
const Products = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { pathname } = useLocation()
    const { catogry, pageNumber, keyword } = useParams()
    const { loading, error, products, searchLoading, searchError } = useSelector(state => state.products)
    const { totalproducts, totalPages, pagenumber } = products
    useEffect(() => {
        const obj = {
            catogry, pageNumber, keyword
        }
        if (keyword) {
            dispatch(Search(obj))
        }
        else {
            dispatch(getProducts(obj))
        }



    }, [dispatch, catogry, pageNumber, keyword])

    const handleForward = (id) => {
        if (pathname.startsWith('/products')) {

            navigate(`/products/${catogry}/${pageNumber}/${id}`)
        }
        else {
            navigate(`/search/${keyword}/${pageNumber}/${id}`)
        }

    }
    return (
        <>

            {
                loading ? <Loader /> : searchLoading ? <Loader /> : error ? <AlertErr>{error}</AlertErr> : searchError ? <AlertErr>{searchError}</AlertErr> :
                    <div>
                        <div className='flex flex-wrap justify-center items-center '>

                            {totalproducts?.map((ele, i) => {
                                return (
                                    <div key={i + 1} onClick={() => handleForward(ele._id)} className='cursor-pointer'>  <Card data={ele} /></div>
                                )
                            })
                            }
                        </div>

                        <div className='flex justify-center py-2'>
                            <Paginate totalPages={totalPages} pagenumber={pagenumber} catogry={catogry} keyword={keyword} />
                        </div>
                    </div>
            }



        </>
    )
}

export default Products
