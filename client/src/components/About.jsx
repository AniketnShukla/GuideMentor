import React, { useEffect } from 'react';
import './../Home.css';
import './About.css';
import './AddQuote/AddQuote.css';
import img37 from "/src/assets/UnregisteredAuthor/img37.jpg";

import { useSelector } from 'react-redux';

const About = () => {
  const reduxImage = useSelector((state) => state.image.image);
  const img = reduxImage || img37;

  useEffect(() => {
    const app = document.getElementById('about');
    app.style.backgroundImage = `url(${img})`;
  }, []);

  return (
    <div id="about">
      <div className="about-content">
        <h3>Hey there 👋</h3>
        Welcome to <strong>Mentor</strong> — your personal space to save, revisit, and reflect on quotes that resonate with your current state of mind.
        <br /><br />
        This isn't just another quote archive. Mentor is a tool for self-expression. Create your own quotes, tag them with custom emotions, and watch your emotional timeline take shape.
        <br /><br />
        Whether you’re looking for comfort, clarity, or a simple reminder—you’ll find that words, when anchored in emotion, can guide, heal, and even confront you when needed.
        <br /><br />
        I built Mentor as a quiet companion—something that listens when no one does. A reminder that even the fleeting moments you feel and write down are worth holding onto.
        <br /><br />
        Please note: Mentor is not a substitute for professional mental health support. If you're struggling, don't hesitate to reach out to a licensed therapist or counselor.
        <br /><br />
        Thanks for stopping by. I genuinely hope you find something here that speaks to you.
        <br /><br />
        Feedback, thoughts, or just want to say hi? <a href="mailto:aniketnshukla.dev@gmail.com">aniketnshukla.dev@gmail.com</a>
        <br /><br />
        Curious about what else I’m building? <a href="https://aniketnshukla.netlify.com" id="other-projects">Explore my other projects</a>.
      </div>
    </div>
  );
};

export default About;
