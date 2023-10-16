import express from 'express';
import { ForgetPassword, verifyOtpAndUpdatePassword } from "../controllers/forgetController.js";
const forgetRoute = express.Router()


forgetRoute.route('/forget')
    .post(ForgetPassword)
    .put(verifyOtpAndUpdatePassword)

export default forgetRoute