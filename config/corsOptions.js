const allowedOrigins = require('./allowedOrigins')

const corsOptions = {
    origin: (origin, callback) => {
        if(allowedOrigins.indexOf(origin) !== -1 || !origin){
            callback(null, true)
        }else{
            callback(new Error('NOT allowed by CORS'))
        }
    },
    credentials: true,
    optionsSuccessStatus: 300
}

module.exports = corsOptions