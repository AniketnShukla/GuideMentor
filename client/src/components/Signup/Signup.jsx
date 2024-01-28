import React, { useEffect, useState } from "react";
import "./signup.css";
import axios from "axios";
import images from '../../data/Images'
import google_btn from "../../assets/images/google.png"
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// import logo from "../assets/logo.png";
import { Navigate } from "react-router-dom";
import { useFetchDataMutation, useRegisterMutation } from "../../slices/usersApiSlice";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { setCredentials } from "../../slices/authSlice";
import { setUserData } from "../../features/userData/userDataSlice";
import GoogleSignInButton from "../GoogleSignInButton";

const Signup = () => {
  
  const [formData, setFormData] = useState({name: "",email: "", password: ""});

  const googleAuth = () => {
    alert(import.meta.env.VITE_SERVER_URL)
		window.open(
			`${import.meta.env.VITE_SERVER_URL}/auth/google/callback`,
			// `/auth/google/callback`,
			// "_self"
		);
	};

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [register, { isRegisterLoading } ] = useRegisterMutation();
  const [fetchData, { isFetchLoading } ] = useFetchDataMutation();

  let img = useSelector((state) => state.image.image)
  console.log(img)
  // useEffect(() => {
  //   if(!img){
  //     const size = images['UnregisteredAuthor'].length
  //     const randomNum = Math.floor( Math.random() * size);
  //     img = images['UnregisteredAuthor'][randomNum];
  //   }
  //   const app = document.getElementById('signup');
  //     app.style.backgroundImage = `url(${img})`;
  // },[])

  const handleChange = (event) => {
    const { name, value } = event.target;
    //need to understnad the below line 
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await register(formData).unwrap();
      dispatch(setCredentials({...response}));
      try {
        const res = await fetchData({currentUser: formData.name}).unwrap();
        console.log('fD');
        console.log(res);
        dispatch(setUserData({...res}));

      } catch (err) {
        console.log(err);
      }

      navigate('/home');
    } catch (err) {
      toast.error(err?.data?.message);
    }
    // axios.post(`${import.meta.env.VITE_SERVER_URL}/user/signup`, 
    //   formData
    // ).then((response) => {
    //   if (response.data.status === 'ok') {
    //     console.log('k');
    //     // < Navigate replace to = {"/login"} />
    //   } 
    //   else{
    //     const errorMessage = response.data.message;
    //     alert(response.data.message);
    //     console.log(response.data)
    //   }
    // })
  //   .catch((e) => {
  //     console.log(e);
  // })
  }

  return (
    <>
    <ToastContainer />
<div id="signup">
        {/* <p class="start_header">HeadStache</p> */}
        <p className="start_header">Mentor</p>
      <div className="gate-form" >
        {/* <img src={logo} className="logo" /> */}
        {/* start_header classis in start.css */}
        <br />
        <header>Signup</header>
        <form onSubmit = {handleSubmit}>
          <div className="input-group">
            <span className="fa fa-user"></span>
            <input
              placeholder="username"
              pattern="^[a-zA-Z0-9]{4,20}$"
              title="Length should be 4-10, No special characters allowed"
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group space">
            <span className="fa fa-envelope"></span>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              required
            />
          </div>
          <div className="input-group space">
            <span className="fa fa-lock"></span>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.p}
              onChange={handleChange}
              placeholder="Password"
              required
            />
            <span className="show">SHOW</span>
          </div>

          <div className="input-group1">
            <input
              type="submit"
              value="Submit"
            />
          </div>
          <br />
          <div className="signup">
            Have an account? <Link to="/login">Login</Link>!
          </div>
        </form>
      </div>
      < GoogleSignInButton />
    </div>
    </>
  )
}

export default Signup
