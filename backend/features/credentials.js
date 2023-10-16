
import whiteList from "./whitelist.js";


const Credentials = (req, res, next) => {
    const origin = req.headers.origin;
    console.log(origin);
    if (whiteList.includes(origin)) {
        res.header('Access-Control-Allow-Credentials', true);
    }
    next();
}
export default Credentials