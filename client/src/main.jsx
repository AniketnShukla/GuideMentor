import React from 'react'
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

let loggedIn = false;
const user = sessionStorage.getItem('username')
console.log(user)
if(user != null) {
  loggedIn = true;
  console.log(`Logged In ${user}`)
}
console.log('loggedin?')
console.log(loggedIn);
ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
      <Provider store={ store }>
    <BrowserRouter>
        <Routes>
          <Route path="/" element={ sessionStorage.getItem('username') ? (<App />) : ( <Navigate replace to ={"/start"} />)} />
          {/* <Route path="/home" element={ loggedIn ? (<App />) : ( <Navigate replace to ={"/start"} />)} /> */}
          <Route path="/home" element={<App />}/>
          <Route exact path="/start" element={<Start />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/login" element={<Login />} />
          <Route path="/default" element={ sessionStorage.getItem('username') ? (<QuotePage />) : ( <Navigate replace to ={"/start"} />)} />
          <Route path="/add" element=  { sessionStorage.getItem('username') ? (<AddQuote />) : ( <Navigate replace to ={"/start"} />)} />
          <Route path="*" element={<Error404 />} />
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
