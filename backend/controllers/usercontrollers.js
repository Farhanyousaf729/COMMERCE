import UserModel from "../models/UserModel.js";
import asyncHandler from "express-async-handler"
import jwt from "jsonwebtoken"



// ================admin===========================================



export const MangerRequests = asyncHandler(async (req, res) => {
    const users = await UserModel.find({ mangerRequest: true }).select('-password -roles')
    if (users.length > 0) {
        res.json(users)
    }
    else {
        res.json([])
    }

})
export const AdminPanel = asyncHandler(async (req, res) => {
    if (req.id) {

        res.status(201).json('adminPanel')
    }
    else {
        res.status(404).json('adminPanel')
    }

})
export const ApprovedManger = asyncHandler(async (req, res) => {
    const { myid } = req.body
    await UserModel.findByIdAndUpdate(myid, { roles: { Editor: 5150 }, mangerRequest: false })
    res.send("success")

})
export const AllUsers = asyncHandler(async (req, res) => {
    const id = req.params.id;
    if (id) {
        const user = await UserModel.findById(id).select('-password -mangerRequest');
        res.json(user);
    } else {
        const users = await UserModel.find({}).select('-password -mangerRequest');
        res.json(users);
    }
});

export const EditUserDetails = asyncHandler(async (req, res) => {
    // const id = req.params.id;

    const user = await UserModel.findById(req.params.id)
    if (user) {
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        if (req.body.mangerRemovel) {
            user.roles.Editor = ""
        }
        const updatedUser = await user.save()
        res.json({
            _id: updatedUser._id,
            roles: updatedUser.roles,
            email: updatedUser.email,
            name: updatedUser.name
        })

    } else {
        res.status(404)
        throw new Error("User Not Found")
    }


})
export const DeletUser = asyncHandler(async (req, res) => {
    // console.log(req.id);

    const user = await UserModel.findById(req.params.id)
    if (user) {
        await UserModel.findByIdAndDelete(req.params.id)
        res.status(201).json('deleated succefully',)

    }
    else {
        res.status(404)
        throw new Error('Not Found')
    }

})


// ===============users =============================





export const Login = asyncHandler(async (req, res) => {
    // console.log(req.body);
    const { email, password, mangerRequest } = req.body
    if (!email || !password) {
        res.status(400)
        throw new Error("All Fields must be")
    }


    const user = await UserModel.findOne({ email: email })



    if (user && (await user.matchPassword(password))) {

        user.mangerRequest = mangerRequest ? true : false;
        user.save();
        const roles = Object.values(user.roles).filter(Boolean)

        const token = jwt.sign(
            {
                'userInfo': {
                    roles: roles,
                    userId: user._id
                },


            },
            process.env.SECRET_KEY,
            { expiresIn: '30d' }
        )
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: token,
            roles: user.roles
        })
    }
    else {
        res.status(401)
        throw new Error('Invalid credentials')
        // res.status(401)
        // res.send("Invalid credentials")
    }

})





export const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password, mangerRequest } = req.body
    if (!email || !password || !name) {
        res.status(401)
        throw new Error('ALL credentials required')
    }

    const existinguser = await UserModel.findOne({ email })
    if (existinguser) {
        res.status(400)
        throw new Error('Email already in use')
    }
    const user = await UserModel.create({ name, email, password, mangerRequest })
    if (user) {
        const roles = Object.values(user.roles).filter(Boolean)

        const token = jwt.sign(
            {
                'userInfo': {
                    roles: roles,
                    userId: user._id
                },
            },
            process.env.SECRET_KEY,
            { expiresIn: '30d' }
        )
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: token,
            roles: user.roles
        })
    } else {
        res.status(400)
        throw new Error('Invalid user data')
    }

})

export const GetUserDetails = asyncHandler(async (req, res) => {
    const id = req.id
    const user = await UserModel.findById(id).select('-password')
    res.json({
        _id: user._id,
        name: user.name,
        email: user.email,

    })
})
export const upDateUser = asyncHandler(async (req, res) => {

    const id = req.id
    const user = await UserModel.findById(id)

    if (user) {

        if (req.body.email !== user.email) {
            const duplicateEmail = await UserModel.findOne({ email: req.body.email })
            if (duplicateEmail) {
                res.status(401)
                throw new Error('Email already used by another user')
            }

        }



        user.name = req.body.name,
            user.email = req.body.email

        if (req.body.password) {
            user.password = req.body.password
        }


        const upDateUser = await user.save()
        const roles = Object.values(upDateUser.roles).filter(Boolean)

        const token = jwt.sign(
            {
                'userInfo': {
                    roles: roles,
                    userId: upDateUser._id
                },
            },
            process.env.SECRET_KEY,
            { expiresIn: '30d' }
        )
        res.status(200).json({
            _id: upDateUser._id,
            name: upDateUser.name,
            email: upDateUser.email,
            token: token
        })



    }
    else {
        res.status(404)
    }


})