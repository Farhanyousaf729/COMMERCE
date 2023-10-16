const whiteList = [
    'https://yoursite.com',
    'http://localhost:4000/',
    'http://localhost:3500/',
]

const corsOptions = {
    origin: (origin, callback) => {

        if (whiteList.indexOf(origin) !== -1 || !origin) {
            callback(null, true)
        }
        else {
            callback(  new Error('Not allowed by CORS'))
        }
    },
    credentials: true,
    optionsSuccessStatus: 200
}
export default corsOptions