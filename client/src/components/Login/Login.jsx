import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setSessionUser } from "../../features/session/sessionSlice";
import { useFetchDataMutation, useLoginMutation } from '../../slices/usersApiSlice.js'
import { logout, setCredentials } from '../../slices/authSlice.js'
import "./../Signup/signup.css";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { setUserData } from "../../features/userData/userDataSlice.js";
import GoogleSignInButton from "../GoogleSignInButton.jsx";
import Loader from './../Loader.jsx';

const Login = () => {
  const [formData, setFormData] = useState({name: "",password: ""});
  const [loading, setLoading ] = useState(null);

  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const { userData } = useSelector((state) => state.userData);

  console.log(userData)

    
    const [ login, {isloginLoading} ] = useLoginMutation();
    const [fetchData, { isfetchLoading } ] = useFetchDataMutation();
  
    const { userCred } = useSelector((state) => state.auth)
    console.log('userCred saved' );

    useEffect(()=>{
      const getUser = async () => {
          await axios.get(`${import.meta.env.VITE_SERVER_URL}/auth/login/success`, { withCredentials: true })
          .then((response)=>{
            //why is it respnse.request.status
            console.log(response.request.status)
            // if (response.request.status == 200) {
              dispatch(setCredentials({
                //FIX THIS, THE NAME AND USERNAME, FOR NON GOOGLE LOGIN< NAME IS FIRST ANEMLASGT ANME< FOR GOOGLE LOGIN USERNAME IS THEIR PROFILE ID
                name: response.data.user.id,
                email: response.data.user.emails[0].value
              }));
              const fetchFucn = async () => {
                try {
                  const res = await fetchData({currentUser: response.data.user.id}).unwrap();
                  console.log(res);
                  dispatch(setUserData({...res}));
                } catch (err) {
                  console.log(err);
                  toast.error(err?.data?.message);
                }
                navigate('/home');
              }
              fetchFucn();
            // }
            })
          }
          getUser();
    },[])
    // useEffect(()=>{
    //   if (userCred) {
    //     navigate('/');

    //   }
    // },[navigate, userCred])

    const handleChange = (e) => {      
      const { name, value } = e.target;       //name can be username or email 
      setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));     //need to understand the below line
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
          const {name, password} = formData;
          const res = await login({name, password}).unwrap();
          dispatch(setCredentials({...res}));
          console.log(name);
          try {
            const res = await fetchData({currentUser: name}).unwrap();
            // console.log(res);
            dispatch(setUserData({...res}));
          } catch (err) {
            console.log(err);
          }

          navigate('/home');
          setLoading(false);
        } catch (err) {
          toast.error(err?.data?.message);
          setLoading(false);
        }
        // axios.post(`${import.meta.env.VITE_SERVER_URL}/user/login`, 
        // formData
        // ).then((response) => {
        //   const data = response.data;
        //   if(data.status === 'ok'){
        //     console.log(data)
        //     // window.location.href = '/'
        //     sessionStorage.setItem('username', data.username)
        //     dispatch(setSessionUser(sessionStorage.getItem('username')))
        //     console.log('kkk')
        //     navigate("/");
        //     alert('Login Successful')
        //   }
        //   else{
        //     alert('Please check your username and password')
        //   }
        // // alert(response.data)
        // console.log(response.data)
        // }).catch((e) => {
        // console.log(e);
    // })
    }
  return (
    <>
    <ToastContainer />
    <div className="bg-img" id="signup">
      {/* <p class="start_header">HeadStache</p> */}
      <p className="start_header">Mentor</p>
      <div className="gate-form">
        {/* start_header class is in start.css */}
        <br />
        <header>Login</header>
        <form className="login-form" onSubmit={handleSubmit}>
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
              required
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
              required
            />
          </div>

          <div className="input-group1">
            <input type="submit" value="Submit" />
          </div>
          <br />
          {loading && 
          <div className="loader-screen">
            <Loader />
            <span className="loading-text">Thankyou for waiting! (it might take a minute)</span>
          </div>
          }
          <div className="signup">
            Don't have an account? <Link to="/signup">Signup now</Link>
          </div>
        </form>
      </div>
      < GoogleSignInButton />
    </div> 
    </>
    )
}

export default Login

