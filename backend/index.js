import dotenv from "dotenv"
import colors from "colors"
import mongoose from "mongoose"
import dbconnection from "./config/dbconnect.js"
import cors from "cors"
import corsOptions from './features/cors.js';
import Credentials from "./features/credentials.js"
import { Logger , LogEvents } from "./features/logreporter.js"
import ErrHandler from './features/errorhandler.js';
import NotFound from "./features/notfound.js";
import ProductRoute from "./routs/producRoute.js"
import userRoute from "./routs/userRoute.js"
import OrderRoute from "./routs/orderRoute.js"
import upLoadsRoute from "./routs/uploadRoute.js"
import forgetRoute from "./routs/forgetRoute.js"
import path from "path"
import express from "express";
const app = express();
dotenv.config()
const port = process.env.PORT_URL || 3500;
const dbport = process.env.DB_URL
if(process.env.NODE_ENV !== 'production'){
  app.use(Logger)
}
dbconnection(dbport)
app.use(cors())
// app.use(Credentials)
// app.use(cors(corsOptions))
app.use(express.json())
const __dirname = path.resolve()
// const __dirname = path.dirname(new URL(import.meta.url).pathname);
// console.log(process.env.NODE_ENV);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))
app.use('/api/upload', upLoadsRoute)
app.use('/api/password',forgetRoute)
app.use('/api/products', ProductRoute)
app.use('/api/users', userRoute)
app.use('/api/orders', OrderRoute)
app.get('/api/config/paypal', (req, res) => res.send(process.env.PAYPAL_CLIENT_ID))

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '/frontend/build')))
  
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
    })
  }
  else {
    app.get('/', (req, res) => {
      res.send("API is running...")
    })
  }
  

app.use(NotFound)
app.use(ErrHandler)

mongoose.connection.once("open", () => {
    console.log('db is up'.cyan.underline);

    app.listen(port, () => {
        console.log(`server is up ${port} ${process.env.NODE_ENV}`.yellow.bold);
    })
})

mongoose.connection.on('error', err => {
    console.log(err)
    LogEvents(`${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`, 'mongoErrLog.log')
})

