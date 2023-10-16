import mongoose from "mongoose";
import bcrypt from "bcryptjs"
const userSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    otp :{ type: String},
    roles: {
        User: {
            type: Number,
            default: 2001
        },
        Editor: Number,
        Admin: Number
    },
  mangerRequest : {type : Boolean  , default : false},
},
    { timestamps: true }

)
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}

userSchema.pre('save', async function (next) {
    if(!this.isModified('password')){

        next()

    }
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})
const UserModel = mongoose.model('User', userSchema)
export default UserModel