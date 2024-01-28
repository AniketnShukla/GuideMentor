import allowedOrigins from './allowedOrigins.js';

const corsOptions = {
    origin: (origin, callback) => {
        if(allowedOrigins.indexOf(origin) !== -1 || !origin){
            callback(null, true)
        }else{
            callback(new Error('NOT allowed by CORS' + origin))
        }
    },
    credentials: true,
    optionsSuccessStatus: 300
}

//There is an issue of preflighted requests with the corsOptions 
//solved with app.use('*', cors());

// const corsOptions = {
//     origin: "http://localhost:5173",
//     credentials: true,
//     methods: "GET, POST, PUT, DELETE",
//     optionsSuccessStatus: 300
// }

export default corsOptions;