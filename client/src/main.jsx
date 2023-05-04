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

let loggedIn = false;
const user = sessionStorage.getItem('username')
if(user) {
  loggedIn = true;
}
ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
      <Provider store={ store }>
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/" element={ loggedIn ? (<App />) : ( <Navigate replace to ={"/"} />)} />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/login" element={<Login />} />
          <Route path="/default" element={ loggedIn ? (<QuotePage />) : ( <Navigate replace to ={"/"} />)} />
          <Route path="/add" element=  { loggedIn ? (<AddQuote />) : ( <Navigate replace to ={"/"} />)} />
          <Route path="*" element={<Error404 />} />
           
          <Route exact path="/default" element={<QuotePage />} />
          <Route exact path="/add" element={<AddQuote />} />
        </Routes>
    </BrowserRouter>
      </Provider>
  // </React.StrictMode>,
)
