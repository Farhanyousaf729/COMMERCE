import React from 'react'
import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams, useLocation, useNavigate } from "react-router-dom"
import Looader from '../Assets/Loader'
import AlertErr from '../Assets/Alert'
import { ProductDetail, editProduct, CreateProduct } from "../Slices/ProducdetailSlice"
import axios from 'axios'

const AdminEditProduct = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const [upLoading, setUploading] = useState(false)

  const [name, setName] = useState('')
  const [catgorey, setCatgorey] = useState('')
  const [brand, setBrand] = useState('')
  const [price, setPrice] = useState(0)
  const [countInStock, setCountInStock] = useState(0)
  const [dis, setDis] = useState('')
  const [pic, setPic] = useState('')
  const dispatch = useDispatch()
  const { id } = useParams()
  const { loading, error, product, editloading, editerror, createloading,createdProduct,  createError } = useSelector(state => state.product)

  console.log(location.pathname);




  const { userInfo } = useSelector(state => state.user)
  // console.log(product);
  useEffect(() => {
    console.log(`ppppppppppppppp`);
    if (!product?.name) {
      if (id) {
        console.log(`iiiiiiiiiiiiiiiii`);
        dispatch(ProductDetail(id))
      }
      console.log(`ggggggggggggggggggg`);
    }

    else if (location.pathname === `/adminpanel/allproducts/edit/${id}`) {
      console.log(`ssssssssssssssssssssssssssssssssssssss`);
      setName(product.name)
      setCatgorey(product.catgorey)
      setBrand(product.brand)
      setPrice(product.price)
      setCountInStock(product.countInStock)
      setDis(product.dis)
      setPic(product.pic)
    } 
    if(createdProduct){
      console.log(`kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk`);
      navigate('/adminpanel/allproducts')

    }
    
   
   
  }, [id, dispatch, product , createdProduct])

  const ImageHnadler = async (e) => {
    // console.log(e.target.files[0]);
    const file = e.target.files[0];
    const formData = new FormData()
    formData.append('image', file)
    setUploading(true)
    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }

      const res = await axios.post('/api/upload', formData, config)
      // console.log(res.data);
      setPic(res.data)
      setUploading(false)


    }
    catch (e) {
      console.error(e)
      setUploading(false)

    }
  }
  const submitData = (e) => {
    e.preventDefault()
    alert('Uploading')
    const product = {
      name,
      catgorey,
      brand,
      price,
      countInStock,
      dis,
      pic
    }
    if (location.pathname === `/adminpanel/allproducts/edit/${id}`) {
      dispatch(editProduct({ userInfo, id, product }))
    }
    else {
      dispatch(CreateProduct({ userInfo, product }))
    }
  }

  return (
    <div>
      {
        loading && <Looader />
      }
      {
        editloading && <Looader />
      }
      {
        createloading && <Looader />
      }
      {
        error && <AlertErr>{error}</AlertErr>
      }
      {
        editerror && <AlertErr>{editerror}</AlertErr>
      }
      {
        createError && <AlertErr>{createError}</AlertErr>
      }
      {
        product &&
        <div>
          <form action="" className='flex flex-col italic w-[80%] mx-auto  ' onSubmit={submitData} >

            <div className=' flex flex-col py-2 '>
              <label className='font-medium' htmlFor="1"> Name</label>
              <input type="text" name="" id="1" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className=' flex flex-col py-2'>
              <label className='font-medium' htmlFor="2">Catgorey</label>
              <input type="text" name="" id="2" value={catgorey} onChange={(e) => setCatgorey(e.target.value)} />
            </div>
            <div className=' flex flex-col py-2'>
              <label className='font-medium' htmlFor="3">Brand</label>
              <input type="text" name="" id="3" value={brand} onChange={(e) => setBrand(e.target.value)} />
            </div>
            <div className=' flex flex-col py-2'>
              <label className='font-medium' htmlFor="4">Price</label>
              <input type="number" name="" id="4" value={price} onChange={(e) => setPrice(e.target.value)} />
            </div>
            <div className=' flex flex-col py-2'>
              <label className='font-medium' htmlFor="5">CountInStock</label>
              <input type="number" name="" id="5" value={countInStock} onChange={(e) => setCountInStock(e.target.value)} />
            </div>
            <div className=' flex flex-col py-2'>
              <label className='font-medium' htmlFor="6">Description</label>
              <textarea className='max-h-[100px]' name="" id="6" cols="" rows="5" value={dis} onChange={(e) => setDis(e.target.value)}></textarea>
            </div>
            {
              upLoading && <Looader />
            }
            <div className=' flex flex-col py-2'>
              <label className='font-medium' htmlFor="7">Choose Image</label>
              <input type="text" name="" id="7" value={pic} onChange={(e) => setPic(e.target.value)} />
              <input type="file" name="" id='image-file' label="Choose File" onChange={ImageHnadler} />
            </div>
            <input type="submit" name="" id="" className='bg-green-400 rounded-md cursor-pointer py-2' />
          </form>


        </div>
      }
    </div>
  )
}

export default AdminEditProduct
