

import jwt from "jsonwebtoken"


const JwtVerify = (req, res, next) => {

    const authHeader = req.headers.authorization || req.headers.Authorization;

    if (!authHeader?.startsWith('Bearer ')) return res.sendStatus(403);



    let token = authHeader.split(' ')[1];

    jwt.verify(
        token,
        process.env.SECRET_KEY,
        (err, decoded) => {
            if (err) return res.sendStatus(401)
            req.id = decoded.userInfo.userId;
            req.roles = decoded.userInfo.roles;
            next()
        }
    )



}
export default JwtVerify