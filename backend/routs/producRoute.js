import express from 'express';
import JwtVerify from "../middlewares/Jwtverify.js"
import RolesVerify from '../middlewares/RolesVerify.js';
import ROLES_LIST from "../utils/RolesOptions.js"
const productRoute = express.Router();
import { getProducts, productDetail, productReview, UpdatedProduct, createProduct, DeleteProduct, Search, getTopRating } from "../controllers/productController.js"
productRoute.route('/')
    .get(getProducts)
productRoute.route('/top')
    .get(getTopRating)
productRoute.route('/search')
    .get(Search)
productRoute.route('/:id')
    .get(productDetail)
    .delete(JwtVerify, RolesVerify(ROLES_LIST.Admin, ROLES_LIST.Editor), DeleteProduct)
productRoute.route('/review/:id')
    .post(JwtVerify, productReview)
productRoute.route('/updated/:id')
    .put(JwtVerify, RolesVerify(ROLES_LIST.Admin, ROLES_LIST.Editor), UpdatedProduct)
productRoute.route('/create')
    .post(JwtVerify, RolesVerify(ROLES_LIST.Admin, ROLES_LIST.Editor), createProduct)

export default productRoute