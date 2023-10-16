import mongoose from 'mongoose';
import ProductModel from './models/ProductModel.js';
import UserModel from './models/UserModel.js';
import Dbconnection from './config/dbconnect.js';
import Products from './data/Products.js';
import Users from './data/User.js';
import colors from "colors"
import dotenv from "dotenv"
dotenv.config()
const dburl = process.env.DB_URL
Dbconnection(dburl)

const inputData = async () => {           
    try {
        await ProductModel.deleteMany()
        await UserModel.deleteMany()
        await ProductModel.insertMany(Products)
        await UserModel.insertMany(Users)
        console.log('data imported successfully'.green.inverse);
        process.exit(0);
    }
    catch (err) {
          console.error(err)
          process.exit(1)
    }

    
}
const deleteData = async()=>{
    try{
        await ProductModel.deleteMany()
        await UserModel.deleteMany()
        console.log('data deleted successfully'.red.inverse);
    }
    catch(err){
        console.error(err)
        process.exit(1)
    }
}

if(process.argv[2] === '-d'){
    deleteData()
}
else{
    inputData()

}