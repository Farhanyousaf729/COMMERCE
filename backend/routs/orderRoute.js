import express from 'express';
import { saveOrder, orderDetails, userOrders, allOrders, deliveredOrder } from "../controllers/orderController.js"
import JwtVerify from '../middlewares/Jwtverify.js';
import RolesVerify from '../middlewares/RolesVerify.js';
import ROLES_LIST from "../utils/RolesOptions.js"

const OrderRoute = express.Router()
OrderRoute.route('/').post(JwtVerify, RolesVerify(ROLES_LIST.User), saveOrder)
OrderRoute.route('/orders').get(JwtVerify, RolesVerify(ROLES_LIST.User), userOrders)
OrderRoute.route('/:id').get(JwtVerify, RolesVerify(ROLES_LIST.User), orderDetails)
OrderRoute.route("/admin/deliver").put(JwtVerify, RolesVerify(ROLES_LIST.Admin, ROLES_LIST.Editor), deliveredOrder)
OrderRoute.route('/admin/orders/:id?').get(JwtVerify, RolesVerify(ROLES_LIST.Admin, ROLES_LIST.Editor), allOrders)
export default OrderRoute

