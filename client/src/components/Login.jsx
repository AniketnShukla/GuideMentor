import React, { useState } from "react";
import "./login.css";
import axios from "axios";
// import logo from "../assets/logo.png";


const Login = () => {
    const [formData, setFormData] = useState({username: "",password: ""});
  
    const handleChange = (event) => {
      const { name, value } = event.target;
      //need to understand the below line 
      setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    };
    const handleSubmit = (event) => {
        event.preventDefault();
      alert(`Name: ${formData.username}, Password: ${formData.password}`);
      axios.post('http://localhost:3200/user/login', 
      formData
      ).then((response) => {
        const data = response.data;
        if(data.username){
          alert('Login Successful')
          window.location.href = '/'
          sessionStorage.setItem('username', data.username)
        }
        else{
          alert('Please check your username and password')
        }
        // alert(response.data)
        console.log(response.data)
      }).catch((e) => {
        console.log(e);
    })
    }
  return (
   <div className="bg-img" id="signup">
      <div className="content">
        {/* <img src={logo} className="logo" /> */}
        <br />
        <header>Login</header>
        <form 
        onSubmit={handleSubmit}
        >
          <div className="field">
            <span className="fa fa-user"></span>
            <input
              type="text"
              id="name"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Full Name"
            />
          </div>
          <div className="field space">
            <span className="fa fa-lock"></span>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
            />
          </div>

          <br />
          <div className="field1">
            <input type="submit" value="Submit" />
          </div>
          <br />
          <div className="signup">
            Don't have an account? <a href="/signup">Signup now</a>
          </div>
        </form>
      </div>
    </div> )
}

export default Login
