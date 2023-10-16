
import OrderModle from "../models/OrderModel.js"
import asyncHandler from "express-async-handler"
import ProductModel from "../models/ProductModel.js"
const saveOrder = asyncHandler(async (req, res) => {
  // console.log(req.body);
  const id = req.id
  const { orderItems, shippingAddre, paymentMethod, taxPrice, shippingPrice, totalPrice, paymentResult } = req.body

  if (!orderItems && orderItems.length === 0) {
    res.status(400)
    throw new Error('Product not Selected')
  }
  else {
    const order = await OrderModle.create({
      orderItems,
      user: id,
      shippingAddre,
      paymentMethod,
      taxPrice,
      shippingPrice,
      totalPrice,
      paymentResult,
    });

    for (const orderItem of order.orderItems) {
      const result = await ProductModel.findById(orderItem.id); 
      if (result.countInStock > 0) {
        const finalCountInStock = result.countInStock - orderItem.quantity;
        await ProductModel.findByIdAndUpdate(orderItem.id, { countInStock: finalCountInStock });
      }
    }
    res.status(201).json(order)
  }
})


const orderDetails = asyncHandler(async (req, res) => {

  const orderId = req.params.id
  const order = await OrderModle.findById(orderId).populate('user', 'name email')
  if (order) res.status(200).json(order)
  else {
    res.status(404)
    throw new Error("Not Found")
  }
})

const userOrders = asyncHandler(async (req, res) => {
  const id = req.id
  const userOrders = await OrderModle.find({ user: id })
  // console.log(userOrders);
  if (userOrders && userOrders.length > 0) {
    res.status(201).json(userOrders)
  }
  else {
    res.status(404)
    throw new Error("Not Found")
  }
})

const allOrders  = asyncHandler(async(req , res)=>{
     const id =  req.id
     if(id) {
       
       const orders = await OrderModle.find({})
       res.status(201).json(orders)
     }
     else{
      res.status(404)
      throw new Error("Not Found")
     }

})


const deliveredOrder =  asyncHandler(async(req , res)=>{
  // console.log(req.body);
       
  const {myid} = req.body
  const order = await OrderModle.findById(myid)
  if (order) {
    await OrderModle.findByIdAndUpdate(myid, { isDelivered: true });
    res.status(200).json("Order delivered successfully");
  } else {
    res.status(404)
    throw new Error("Not Found");
  }

})
export { saveOrder, orderDetails, userOrders , allOrders ,deliveredOrder}