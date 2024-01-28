import React, { useEffect } from 'react'
import './Start.css'
import axios from 'axios'
import google_btn from "./../assets/images/google.png"
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useLogoutMutation } from '../slices/usersApiSlice'
import GoogleSignInButton from './GoogleSignInButton'
const Start = () => {
  // const googleAuth = () => {
	// 	window.open(
	// 		`${import.meta.env.VITE_SERVER_URL}/auth/google/callback`,
	// 		// `/auth/google/callback`,
	// 		// "_self"
	// 	);
	// };

  const { userCred } = useSelector((state)=> state.auth);
  const currentUser = userCred?.name;
  console.log(currentUser)

  return (
    <div className='startPage'>
        <section className="start">
            {/* <p className="start_header">HeadStache</p> */}
            <p className="start_header">Mentor</p>
            <p className="small_header">Be the hand you seek for help.</p>
            <h1 className="btn-group">
                <Link to="/signup" className="btn">Signup</Link>
                <Link to={ currentUser ? "/home" : "/login" } className="btn">Login</Link>
            </h1>
            <div className='guest-button'>
            <Link to="/home" className="btn">Guest</Link>
            </div>
            < GoogleSignInButton />
            {/* <Link to="#" className="btn">get me out of here</Link> */}
        </section>
    </div>
  )
}

export default Start