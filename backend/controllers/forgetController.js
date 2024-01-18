import UserModel from "../models/UserModel.js"
import jwt from "jsonwebtoken"
import nodemailer from "nodemailer"
import bcrypt from "bcrypt"
import asyncHandler from "express-async-handler"

const ForgetPassword = asyncHandler(async (req, res) => {

    const { email } = req.body
    // console.log(email);
    const user = await UserModel.findOne({ email })
    if (!user) {
        res.status(404)
        throw new Error("email not found")
    }
    const transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
            user: process.env.EMAIL_AD,
            pass: process.env.EMAIL_PASS
        }
    });
    const generateOtp = () => {
        return (Math.floor(100000 + Math.random() * 900000).toString());
    }


    const genrateOtp = generateOtp()
    const salt = await bcrypt.genSalt(10)
    const otp = await bcrypt.hash(genrateOtp, salt)
    const option = {
        from: process.env.EMAIL_AD,
        to: user.email,
        subject: 'Signup OTP',
        text: ` OTP : ${genrateOtp}`
    }


    user.otp = otp;
    await user.save()

    transporter.sendMail(option, (err) => {
        if (err) {
            res.status(403)
            throw new Error(err)
        }
        else {
            const token = jwt.sign(
                {
                    'userInfo': {
                        // otp: user.otp,
                        userId: user._id
                    },
                },
                process.env.SECRET_KEY,
                { expiresIn: '2m' }
            )

            res.status(200).json({ otptoken: token })
        }
    })

})


const verifyOtpAndUpdatePassword = asyncHandler(async (req, res) => {
    const { password, otp } = req.body
    // console.log(req.body);
    if (!password || !otp) {
        res.status(401)
        throw new Error("invalid credentials")

    }
    const authHeader = req.headers.authorization || req.headers.Authorization;

    if (!authHeader?.startsWith('Bearer ')) return res.sendStatus(403);



    let token = authHeader.split(' ')[1];

    jwt.verify(
        token,
        process.env.SECRET_KEY,
        (err, decoded) => {
            if (err) return res.sendStatus(401)
            req.id = decoded.userInfo.userId;
        }
    )

    const user = await UserModel.findById(req.id)
    const matchedOtp = await bcrypt.compare(otp, user.otp)

    if (!matchedOtp) {
        res.status(401)
        throw new Error(`Otp not found`)
    }

    user.password = password
    await user.save()
    res.json({ status: 'success' })

})

export { ForgetPassword, verifyOtpAndUpdatePassword } 