import React from 'react'
import ReactDOM from 'react-dom/client'
import Home from './Home'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux'
import store from './store.js'
import { BrowserRouter, Routes, Route, Navigate, createRoutesFromElements, RouterProvider, createBrowserRouter } from 'react-router-dom'
import QuotePage from './components/QuotePage/QuotePage'
import AddQuote from './components/AddQuote/AddQuote'
import Error404 from './components/Error404'
import Signup from './components/Signup/Signup'
import Login from './components/Login/Login'
import Start from './components/Start'
import MySpace from './MySpace'
import App from './App.jsx'
import Test from './Test.jsx'
import PrivateRoute from './components/PrivateRoute.jsx'
import About from './components/About.jsx';

const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route exact path="/start" element={<Start />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/signup" element={<Signup />} />
      <Route path="/" element={  <App /> }>
        <Route exact path="/about" element={<About />} />
        <Route index={true} path="/" element={  <Test /> }/>
        <Route index={true} path="/home" element={  <Test /> }/>
        <Route path="/" element={  <PrivateRoute /> }>
        {/* <Route path="/test" element={  <Test /> }/> */}
        {/* <Route path="/home" element={  <Home /> }/> */}
        {/* <Route path="/default" element={  (<QuotePage />)    }/> */}
        {/* Private Routes */}
          <Route path="/add" element=  {  (<AddQuote />)    }/>
          <Route path="*" element={<Error404 />} />
          <Route path="/my-space" element={  (<MySpace />)    }/>
        </Route>
      </Route>
      </>
    )
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={ store } >
    <React.StrictMode>
      <RouterProvider router={ router } />
    </React.StrictMode>
  </Provider>
  )
