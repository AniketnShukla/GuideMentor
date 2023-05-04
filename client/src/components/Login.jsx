import React, { useState } from "react";
// import "./login.css";
import "./signup.css";
import axios from "axios";
// import logo from "../assets/logo.png";


const Login = () => {
  //name can be username or email
    const [formData, setFormData] = useState({name: "",password: ""});
  
    const handleChange = (event) => {
      //name can be username or email
      const { name, value } = event.target;
      //need to understand the below line 
      setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    };
    const handleSubmit = (event) => {
        event.preventDefault();
      // alert(`Name: ${formData.username}, Password: ${formData.password}`); 
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
      <p class="start_header">HeadStache</p>
      <div className="gate-form">
        {/* start_header classis in start.css */}
        <br />
        <header>Login</header>
        <form 
        onSubmit={handleSubmit}
        >
          <div className="input-group">
            <span className="fa fa-user"></span>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              // placeholder="username | email"
              placeholder="username"
            />
          </div>
          <div className="input-group space">
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
          <div className="input-group1">
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