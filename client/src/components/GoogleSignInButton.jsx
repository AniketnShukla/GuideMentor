import React from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import "./Signup/signup.css";
import google_btn from "./../assets/images/google.png"

const GoogleSignInButton = () => {

    const dispatch = useDispatch();
    
    const googleAuth = () => {
        console.log('avigayo')
        window.open(
          `${import.meta.env.VITE_SERVER_URL}/auth/google/callback`,
          "_self");
        };


  return (
    <div className="google_signin_signup_login" onClick={googleAuth}>
        <span>Sign up with Google</span>
        {/* <button > */}
        <img src={google_btn} alt="google icon"  />
        {/* </button> */}
    </div>
  )
}

export default GoogleSignInButton