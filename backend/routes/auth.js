import dotenv from 'dotenv';
dotenv.config();
import express from "express";
import passport from "passport";

const router = express.Router();

// baseURL: /auth
router.get("/google", passport.authenticate("google",{ scope : ["profile", "email"] }));
    // console.log(`process.env.CLIENT_URL`);
    // console.log(`${process.env.CLIENT_URL}`);
router.get( "/google/callback", 
    passport.authenticate("google", {
        successRedirect: `${process.env.CLIENT_URL}/login`,
        failureRedirect: "/start",
    })
);

router.get("/login/success", (req, res) => {
    if (req.user) {
        //if not googleId return a value that you can avoid further computation on the frontend
        // console.log(req.user);
        res.status(200).json({
            message: "user Login",
            user: req.user
        })
    } else {
         res.status(400)
        throw new Error ("No Authorized");
    }
})

// router.get("/logout", (req, res) => {
//     req.logout();
//     res.redirect(`${process.env.CLIENT_URL}/start`);
// });    
    
export default router;




