import Home from './Home.jsx';
import { Container } from 'react-bootstrap';
import React from 'react';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import NavBar from './components/NavBar/NavBar.jsx';
import './Toast.css';
const App = () => {
  console.log(import.meta.env.VITE_SERVER_URL)
  return (
    <>
        <Container fluid className='p-0'>
        <ToastContainer className='toaster-container' />
        <NavBar />
          <Outlet />
        </Container>
    </>
  )
}

export default App;