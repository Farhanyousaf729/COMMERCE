import ProductModel from "../models/ProductModel.js";
import UserModel from "../models/UserModel.js"
import asyncHandler from "express-async-handler"
import mongoose from "mongoose"


export const Search = asyncHandler(async(req , res)=>{

        // const {pageNumber , keyword} = req.query
        // console.log(req.query);
        const keyword = req.query.keyword ? {
            name: {
              $regex: req.query.keyword,
              $options: 'i'
            }
          }:{}
        
            const pageLimit = 4
            const pagenumber = Number(req.query.pageNumber) || 1
            const skip = (pagenumber - 1 ) * pageLimit
            const count = await ProductModel.countDocuments({...keyword})
            const totalproducts = await ProductModel.find({...keyword}).limit(pageLimit).skip(skip)
            const totalPages = Math.ceil(count/pageLimit)
            res.status(201).json({totalproducts , totalPages , pagenumber})

})





export const getProducts = asyncHandler(async (req, res) => {
    const {pageNumber , catgorey } = req.query
    const pageLimit = 4
    const pagenumber = Number(pageNumber) || 1
    const skip = (pagenumber - 1 ) * pageLimit
    if (pageNumber === "undefined" && catgorey === "undefined") {
        const products = await ProductModel.find({})
        res.json({totalproducts : products})
    }
    else {
        const count = await ProductModel.countDocuments({ catgorey: catgorey })
        const totalproducts = await ProductModel.find({ catgorey: catgorey }).limit(pageLimit).skip(skip)
         const totalPages = Math.ceil(count/pageLimit)
        res.json({totalproducts , totalPages , pagenumber})
    }
})



export const productDetail = asyncHandler(async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.json({ message: 'Invalid ID format' });
        return;
    }
    try {
        const product = await ProductModel.findById(id);
        if (!product) {
            res.json({ message: 'Product not found' });
        } else {
            res.status(200).json(product);
        }
    } catch (error) {
        res.status(500).json({ error: 'An error occurred' });
    }


})


export const productReview = asyncHandler(async (req, res) => {
    const userId = req.id;
    const productId = req.params.id;
    const { rating, comment } = req.body;

    if (rating && comment) {
        // Find the user by ID
        const user = await UserModel.findById(userId);

        if (!user) {
            res.status(401);
            throw new Error(`User not found`);
        }

        // Find the product by ID
        const product = await ProductModel.findById(productId);

        if (!product) {
            res.status(404);
            throw new Error(`Product not found`);
        }

        // Check if the user has already reviewed the product
        const alreadyReviewed = product.reviews.find((review) => review.user.toString() === userId);

        if (alreadyReviewed) {
            res.status(400);
            throw new Error(`Product already reviewed`);
        }

        // Create a new review
        const review = {
            name: user.name,
            rating: Number(rating),
            comment,
            user: userId,
        };

        // Add the review to the product
        product.reviews.push(review);

        // Update the number of reviews and average rating
        product.numReviews = product.reviews.length;
        const totalRating = product.reviews.reduce((acc, review) => acc + review.rating, 0);
        product.rating = Math.round((totalRating / product.numReviews) * 2) / 2;

        // Save the updated product
        await product.save();

        res.status(200).json({ message: "Review successfully added" });
    }
    else {
        res.status(500);
        throw new Error(`Error adding review: ${error.message}`);
    }
});


export const UpdatedProduct = asyncHandler(async (req, res) => {
    console.log(req.body);
    const { name, catgorey, brand, price, countInStock, dis, pic } = req.body
    const id = req.params.id
    console.log(id);
    const product = await ProductModel.findById(id)
    if (product) {
        product.name = name || product.name
        product.catgorey = catgorey || product.catgorey
        product.brand = brand || product.brand
        product.price = Number(price) || product.price
        product.countInStock += Number(countInStock) || 0
        product.dis = dis || product.dis
        product.pic = pic || product.pic

        await product.save()
        res.status(200).json(product)
    }
    else {
        res.status(401)
        throw new Error('product not found')
    }

})

export const createProduct = asyncHandler(async (req, res) => {
    console.log(req.body);
    const { name, catgorey, brand, price, countInStock, dis, pic } = req.body
    if (!name || !catgorey || !brand || !price || !countInStock || !dis || !pic) {
        res.status(401)
        throw new Error("Invalid request")
    }

    const product = await ProductModel.create({
        rating: 0,
        numReviews: 0,
        name: name,
        catgorey: catgorey,
        brand: brand,
        price: Number(price),
        countInStock: Number(countInStock),
        dis: dis,
        pic: pic

    })
    await product.save()
    res.status(201).json(product)
})

export const DeleteProduct = asyncHandler(async(req , res)=>{
    
    const id = req.params.id
    const product= await UserModel.findById(id)
    if (product) {
        await ProductModel.findByIdAndDelete(id)
        res.status(201).json('deleated succefully',)

    }
    else {
        res.status(404)
        throw new Error('Not Found')
    }


})

export const getTopRating = asyncHandler(async(req , res) => {

     const products = await ProductModel.find({}).sort({rating:-1}).limit(6)
     res.status(200).json(products)

})