import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import path from 'path';
import { logger } from './middleware/logger.js';
import { notFound, errorHandler } from './middleware/errorHandler.js';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import connectMongo from 'connect-mongo';
import cors from 'cors';
import connectDB from './config/dbConn.js';
import root from './routes/root.js';
import passport from "passport";
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
// import passportSetup from "./passport.js";
import authRoutes from "./routes/auth.js";
import presetDataRoutes from './routes/presetDataRoutes.js';
import userRoutes from './routes/userRoutes.js';
import corsOptions from './config/corsOptions.js';
import User from './models/userModel.js';
import generateToken from './utils/generateToken.js';
import mongoose from 'mongoose';
const PORT = process.env.PORT || 3201
connectDB();

const app = express();

app.use(express.json());

app.use(session({
  secret: process.env.JWT_SECRET,
  resave: false,
  saveUninitialized: false,
  store: connectMongo.create({
    client: mongoose.connection.getClient(),
    dbName: process.env.DATABASE_NAME,
    collectioName: "sessions",
    stringify: false,
    autoRemove:"interval",
    autoRemoveIntercal: 1
  })
}));

app.use(express.urlencoded({extended: true}));//Lets our app reveive and parse json data and gives ability to parse json

app.use(cookieParser());    //Helps our REST API parse cookies

app.use(passport.initialize()); //initializing passport
app.use(passport.session());  //use passport session


passport.use(
  new GoogleStrategy({
  clientID: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  callbackURL: `/auth/google/callback`,
  scope:["profile", "email"],
  passReqToCallback: true
  }, async (req, accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({username: profile.id})

        if(!user){
          user = new User({
          username: profile.id,
          // console.log(profile.displayName),
          email: profile.emails[0].value,
          image: profile.photos[0].value,
          });

        await user.save();
        generateToken(req.res, user._id);
        }
        return done(null, profile);
      } catch (error) {
        return done(error, profile);  
      }
  }));

  
passport.serializeUser((user, done) => {
  done(null, user) 
});    

passport.deserializeUser((user, done) => {
  done(null, user)    
});


if (process.env.NODE_ENV === 'production') {
  //*Set static folder up in production
    app.use(express.static('client/build'));
    app.get('*', (req,res) => res.sendFile(path.resolve(__dirname, 'client', 'build','index.html')));
    const __dirname = path.resolve();
    app.use(express.static(path.join(__dirname, 'backend', 'public')));
  }

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.use(logger);    //custom middleware

// app.use(cors(corsOptions));   //Enabling CORS pre-flight across the board
  app.use(cors({
    origin: ['http://localhost:5173', process.env.CLIENT_URL], //Allowed Origins
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed methods
    allowedHeader: ['Content-Type',  'Authorization'], 
    credentials: true, // Allows cookies
  }))
  
app.use('/', root);

app.use("/auth", authRoutes);   //for google authentication 

console.log(process.env.CLIENT_URL)

//health of server
app.get('/healthz', (req, res)=> {
    res.status(200).send('OK');
})

app.use('/preset', presetDataRoutes);

app.use('/user', userRoutes);

// app.use('/quote', require('./routes/quoteRoutes'))
// app.use('/emotion', require('./routes/emotionRoutes'))
// app.use('/users', require('./routes/userRoutes'))

app.use(notFound);

app.use(errorHandler)

app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));