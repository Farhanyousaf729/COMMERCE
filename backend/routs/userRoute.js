import express from 'express';
import JwtVerify from '../middlewares/Jwtverify.js';
import RolesVerify from '../middlewares/RolesVerify.js';
import ROLES_LIST from "../utils/RolesOptions.js"

import { Login, registerUser, GetUserDetails, upDateUser, MangerRequests, ApprovedManger, AdminPanel, AllUsers, EditUserDetails, DeletUser, } from "../controllers/usercontrollers.js"
const userRoute = express.Router()

userRoute.route('/login')
    .post(Login)
userRoute.route('/register')
    .post(registerUser)
userRoute.route('/profile')
    .get((JwtVerify), GetUserDetails).post((JwtVerify), upDateUser)
userRoute.route('/adminpanel')
    .get(JwtVerify, RolesVerify(ROLES_LIST.Admin, ROLES_LIST.Editor), AdminPanel)
userRoute.route('/admin/requestsmangers')
    .get(JwtVerify, RolesVerify(ROLES_LIST.Admin), MangerRequests)
    .post(JwtVerify, RolesVerify(ROLES_LIST.Admin), ApprovedManger);
userRoute.route('/admin/users/:id?')
    .get(JwtVerify, RolesVerify(ROLES_LIST.Admin, ROLES_LIST.Editor), AllUsers)
    .put(JwtVerify, RolesVerify(ROLES_LIST.Admin, ROLES_LIST.Editor), EditUserDetails)
    .delete(JwtVerify, RolesVerify(ROLES_LIST.Admin, ROLES_LIST.Editor), DeletUser)
export default userRoute