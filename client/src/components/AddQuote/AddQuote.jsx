import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import './AddQuote.css'
import { Link } from 'react-router-dom';
import axios from 'axios';
const AddQuote = () => {
    const [quote, setQuote] = useState('');
    const [author, setAuthor] = useState('');
    const [emotion, setEmotion] = useState('');
    const img = useSelector((state) => state.imageReducer.image)
    useEffect(() => {
        const app = document.getElementById('add-quote');
        app.style.backgroundImage = `url(${img})`;
    },[])
    const handleSubmit = (e) => {
        e.preventDefault();
        const currentUser = sessionStorage.getItem('username');

        axios.post('http://localhost:3200/user/quote', {
            currentUser: currentUser,
            quote: quote,
            author: author,
            emotion: emotion
    })
        setQuote('')
        setAuthor('')
    }
  return (
    <div className='add-quote' id="add-quote">
        <Link to='/'>
        <div className="home-btn">
            Home
        </div>
        </Link>
            
        <form onSubmit={handleSubmit} className="form">
            <label htmlFor="quote">Quote</label>
            <input 
                type="text"
                id="quote"
                value={quote}
                onChange={(e) => setQuote(e.target.value) } 
            />
            <label htmlFor="author">Author</label>
            <input 
                type="text"
                id="author"
                className='secondary-input'   
                value={author}
                onChange={(e) => setAuthor(e.target.value) } 
                />
            <label htmlFor="emotion">Emotion</label>
            <select
            id="emotion"
            className='secondary-input'
            onChange={(e) => setEmotion(e.target.value) } 
            >
                <option hidden selected>Select</option>
                <option value="rage">Rage</option>
                <option value="restless">Restless</option>
                <option value="lost">Lost</option>
                <option value="distracted">Distracted</option>
                <option value="lust">Lust</option>
                <option value="sad">Sad</option>
            </select>
            <button type="submit" className='submit-btn'>Submit</button>
        </form>
    </div>
  )
}

export default AddQuote

