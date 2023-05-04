import React, { useEffect, useState } from "react";
import "./signup.css";
import axios from "axios";
import images from './../data/Images'
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
// import logo from "../assets/logo.png";


const Signup = () => {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({name: "",email: "", password: ""});
  let img = useSelector((state) => state.imageReducer.image)
  console.log(img)
  useEffect(() => {
    if(!img){
      const size = images['Unregistered-author'].length
      const randomNum = Math.floor( Math.random() * size);
      img = images['Unregistered-author'][randomNum];
    }
    const app = document.getElementById('signup');
      app.style.backgroundImage = `url(${img})`;
  },[])

  const handleChange = (event) => {
    const { name, value } = event.target;
    //need to understnad the below line 
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    alert(`Name: ${formData.name}, Email: ${formData.email}, Password: ${formData.password}`);
    axios.post('http://localhost:3200/user/signup', 
      formData
    ).then((response) => {
      alert(response.status)
      if (response.status === 'ok') {
        navigate.push('/login')
      } 
    }).catch((e) => {
      console.log(e);
  })
  }

  return (
<div id="signup">
      <div className="content" >
        {/* <img src={logo} className="logo" /> */}
        <br />
        <header>Signup </header>
        <form 
        onSubmit={handleSubmit}
        >
          <div className="field">
            <span className="fa fa-user"></span>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Full Name"
            />
          </div>
          <div className="field space">
            <span className="fa fa-envelope"></span>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
            />
          </div>
          <div className="field space">
            <span className="fa fa-lock"></span>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.p}
              onChange={handleChange}
              placeholder="Password"
            />
            <span className="show">SHOW</span>
          </div>

          <br />
          <div className="field1">
            <input
              type="submit"
              onClick={() => (window.location.href = "/login")}
              value="Submit"
            />
          </div>
          <br />
          <div className="signup">
            Have an account? <a href="/login">Login</a>!
          </div>
        </form>
      </div>
    </div>
  )
}

export default Signup
