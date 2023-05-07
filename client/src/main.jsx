import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { Provider } from 'react-redux'
import { store } from './app/store'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import QuotePage from './components/QuotePage/QuotePage'
import AddQuote from './components/AddQuote/AddQuote'
import Error404 from './components/Error404'
import Signup from './components/Signup'
import Login from './components/Login'
import Start from './components/Start'
import MySpace from './MySpace'


const Main = () => {
  const [loggedIn, setLoggedIn ] = useState(false)
  const [currentUser, setCurrentUser ] = useState('')
  useEffect(()=>{
    setCurrentUser(sessionStorage.getItem('username'))
  },[]);
  useEffect(()=>{
    if(currentUser != '')
    setLoggedIn(true);
  },[currentUser])
  // useEffect(()=>{
  //   (!= null) ? (setLoggedIn(true)) : (setLoggedIn(false))
  //   console.log(user)
  //   console.log(loggedIn)
  // },[loggedIn]);
// <React.StrictMode>
return (
<Provider store={ store }>
<BrowserRouter>
    <Routes>
      {/* *************TEMPORARY CHANGE *************change myspace for root path to app because app is home */}
      <Route path="/" element={ loggedIn ? (<App />) : ( <Navigate replace to ={"/start"} />)} />
      {/* <Route path="/home" element={ (<App />) } /> */}
      <Route path="/home" element={ loggedIn ? (<App />) : ( <Navigate replace to ={"/start"} />)} />
      <Route path="/my-space" element={loggedIn ? (<MySpace />) : ( <Navigate replace to ={"/start"} />)} />
      <Route exact path="/start" element={<Start />} />
      <Route exact path="/signup" element={<Signup />} />
      <Route exact path="/login" element={<Login />} />
      <Route path="/default" element={loggedIn ? (<QuotePage />) : ( <Navigate replace to ={"/start"} />)} />
      <Route path="/add" element=  {loggedIn ? (<AddQuote />) : ( <Navigate replace to ={"/start"} />)} />
      <Route path="*" element={<Error404 />} />
      {/* *************TEMPORARY CHANGE *************change myspace for root path to app because app is home */}
      {/* <Route path="/" element={ sessionStorage.getItem('username') ? (<App />) : ( <Navigate replace to ={"/start"} />)} />
      <Route path="/home" element={ sessionStorage.getItem('username') ? (<App />) : ( <Navigate replace to ={"/start"} />)} />
      <Route path="/my-space" element={ sessionStorage.getItem('username') ? (<MySpace />) : ( <Navigate replace to ={"/start"} />)} />
      <Route exact path="/start" element={<Start />} />
      <Route exact path="/signup" element={<Signup />} />
      <Route exact path="/login" element={<Login />} />
      <Route path="/default" element={ sessionStorage.getItem('username') ? (<QuotePage />) : ( <Navigate replace to ={"/start"} />)} />
      <Route path="/add" element=  { sessionStorage.getItem('username') ? (<AddQuote />) : ( <Navigate replace to ={"/start"} />)} />
      <Route path="*" element={<Error404 />} /> */}
      {/* <Route path="/" element= {<App />} />
      <Route path="/home" element={ <App />} />
      <Route exact path="/start" element={<Start />} />
      <Route exact path="/signup" element={<Signup />} />
      <Route exact path="/login" element={<Login />} />
      <Route path="/default" element={ <QuotePage />} />
      <Route path="/add" element=  { <AddQuote />} />
      <Route path="*" element={<Error404 />} /> */}
    </Routes>
</BrowserRouter>
  </Provider>
// </React.StrictMode>,
)
}
// let loggedIn = false;
// // const user = sessionStorage.getItem('username')
// // console.log(user)
// // if(user != null) {
// //   loggedIn = true;
// //   console.log(`Logged In ${user}`)
// // }
// console.log('loggedin?')
// console.log(loggedIn);
ReactDOM.createRoot(document.getElementById('root')).render(<Main />)
