import Home from './Home.jsx';
import { Container } from 'react-bootstrap';
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import NavBar from './components/NavBar/NavBar.jsx';
import './Toast.css';
import MoodMentor from './components/MoodMentor'; // <-- Add this

const App = () => {

  const [mentorOn, setMentorOn] = useState(false);

  return (
    <>
      <Container fluid className='p-0'>
        <ToastContainer className='toaster-container' />
        <NavBar />


        {/* Mentor overlay
        <MoodMentor enabled={mentorOn} /> */}

        <Outlet />
      </Container>
    </>
  );
}

export default App;
