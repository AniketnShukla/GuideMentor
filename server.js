require('dotenv').config();

const express = require('express')
const app = express()
const path = require('path')
const { logger } = require('./middleware/logger')
const errorHandler = require('./middleware/errorHandler')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const connectDB = require('./config/dbConn')
const corsOptions = require('./config/corsOptions')
const mongoose = require('mongoose')
const PORT = process.env.PORT || 3200 
const { logEvents } = require('./middleware/logger')
const jwt = require('jsonwebtoken')  

if (process.env.NODE_ENV === 'production') {
    //*Set static folder up in production
    app.use(express.static('client/build'));

    app.get('*', (req,res) => res.sendFile(path.resolve(__dirname, 'client', 'build','index.html')));
  }

connectDB()

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

//Helps our REST API parse cookies
app.use(cookieParser())

//custom middleware
app.use(logger)

//makes those that are at other origins able to requirest resources from our API
//We want to sercure it, so only origins we want can access our api, we can do this using cors options
// app.use(cors(corsOptions))

//Lets our app reveive and parse json data and gives ability to parse json
app.use(express.json())

//tells express where to find static files
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', require('./routes/root'))

//url blockchian website sends data to
// app.use('/meds', require('./routes/medRoutes'))

app.use('/quote', require('./routes/quoteRoutes'))
app.use('/emotion', require('./routes/headSpaceRoutes'))

app.use('/raw-material', require('./routes/rawMaterialRoutes'))

//temporary url the customer will send information to interact with the database 
app.use('/customer', require('./routes/customerRoutes'))

// app.use('/users', require('./routes/userRoutes'))

//to handle wrong urls / 404 errors
app.all('*', (req, res) => {
    res.status(404);
    if(req.accepts('html')){
        res.sendFile(path.join(__dirname, 'views', '404.html'))
    }else if(req.accepts('json')){
        res.json({message: '404 Not Found'})
    }else{
        res.type('txt').send('404 not found.')
    }
})

//don't remember what it does
app.use(errorHandler)

// app.listen(PORT, ()=>{
//     console.log(`Server listening on PORT ${PORT}`)
// })
mongoose.connection.once('open', () => {
    console.log('COnnected to mongoDB')
    app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`))
})

mongoose.connection.on('error', err => {
    console.log(err)
    logEvents(`${err.no}\t${err.code}\t${err.syscall}\t${err.hostname}`, 'mongoErrLog.log')
})