import Home from './Home.jsx';
import { Container } from 'react-bootstrap';
import React from 'react'
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css'
import NavBar from './components/NavBar/NavBar.jsx';

const App = () => {
  return (
    <>
        <Container fluid className='p-0'>
        <ToastContainer />
        <NavBar />
          <Outlet />
        </Container>
    </>
  )
}

export default App;