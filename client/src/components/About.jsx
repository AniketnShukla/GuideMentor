import React, { useEffect } from 'react';
import './../Home.css';
import './About.css';
import './AddQuote/AddQuote.css'
import img37 from "/src/assets/UnregisteredAuthor/img37.jpg";

import { useSelector } from 'react-redux';

const About = () => {
    const reduxImage = useSelector((state) => { return state.image.image; });
    const img = reduxImage ? reduxImage : img37;
    useEffect(() => {
        const app = document.getElementById('about');
        app.style.backgroundImage = `url(${img})`;

    },[]);
  return (
    <div id='about' >

<div className='about-content'>
        <h3>Hello!</h3>
Welcome to Mentor, a website that helps you find and save quotes that match your mood. 
<br /> 
<br /> 
Mentor is more than just a collection of quotes. It is also a platform where you can express yourself and&nbsp;
{/* connect with others who share your feelings.  */}
 you can create your own quotes and save them with your own custom emotions. 
{/* You can also browse other users' quotes and see what they are feeling. */}
<br /> 
Mentor is designed to be private space, a source of inspiration, comfort, and support for anyone who needs it.
<br /> 
<br /> 
I hope that by reading and writing quotes, you can discover new perspectives, and find solace in words and learn from your own experiences, which we might forget as days slip past our hands.
<br /> 
<br /> 
Mentor is not a substitute for professional help. If you are struggling with mental health issues, please seek help from a qualified therapist or counselor.

Thank you for visiting Mentor. I hope you enjoy your stay and find what you are looking for. 
<br /> 
<br /> 
Love it, hate it, would love to hear! <a href="mailto:aniketnshukla.dev@gmail.com">aniketnshukla.dev@gmail.com</a>
<br /> 
<br /> 
<a href="https://aniketnshukla.netlify.com" id="other-projects">Check out my other projects!</a> 
</div>

        </div>
  )
}

export default About