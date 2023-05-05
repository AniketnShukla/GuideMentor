import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import './AddQuote.css'
import { Link, useNavigate } from 'react-router-dom';
import img3 from "/src/assets/UnregisteredAuthor/img3.jpg";
import axios from 'axios';
const AddQuote = () => {
    const navigate = useNavigate();
    const [quote, setQuote] = useState('');
    const [author, setAuthor] = useState('');
    const [emotion, setEmotion] = useState('');
    const [checkMultiple, setCheckMultiple] = useState(false);
    const [userEmotions, setUserEmotions] = useState([]);
    const [radioEmotion, setRadioEmotion] = useState(null);
    let img = useSelector((state) => state.imageReducer.image)
    //img not updating when author not set check
    if(!img) img = img3; 

    useEffect(() => {
        const app = document.getElementById('add-quote');
        app.style.backgroundImage = `url(${img})`;
        const currentUser = sessionStorage.getItem('username')
        axios.post(`${import.meta.env.VITE_SERVER_URL}/user/emotion`, {
            currentUser: currentUser
          })
          .then((response)=>{
            console.log(response.data);
            setUserEmotions(response.data?.emotionData)
          },[])
          .catch((e)=>{
            console.log(e);
          })
    },[])

    if(userEmotions?.length > 0){

    }
    const handleSubmit = (e) => {
        e.preventDefault();
        const currentUser = sessionStorage.getItem('username');

        axios.post(`${import.meta.env.VITE_SERVER_URL}/user/quote`, {
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
            <label htmlFor="author">By</label>
            <input 
                type="text"
                id="author"
                className='secondary-input'   
                value={author}
                onChange={(e) => setAuthor(e.target.value) } 
                />
            <label htmlFor="emotion">Emotion</label>
            <div className="radio-group">
                {userEmotions.map((emotion, index)=>(
                    <div className="radio" key={index}>
                        <label>
                            <input
                            type="radio"
                            value= {emotion}
                            checked={radioEmotion === emotion}
                            onChange={(e) => {
                                setRadioEmotion(e.target.value)
                                setEmotion(e.target.value)
                            }}
                            />
                            &nbsp;{ emotion }
                        </label>  
                    </div>
                ))}
                <div className="radio">
                        <label>
                            <input
                            type="radio"
                            value= ""
                            checked={radioEmotion === null}
                            onChange={(e) => {

                                setRadioEmotion(null)
                                setEmotion('')
                            }}
                            />
                            &nbsp;clear
                        </label>  
                    </div>
            </div>
            <input 
                type="text"
                id="emotion"
                className='secondary-input'   
                value={emotion}
                disabled={radioEmotion !== null}
                onChange={(e) => {
                    setRadioEmotion(null);
                    setEmotion(e.target.value)
                }} 
                />
            {/* <label htmlFor="emotion">Emotion</label>
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
            </select> */}

            <div className="multi-checkbox">
                <label htmlFor="multipleInput">multiple inputs</label>
                <input 
                    type="checkbox"
                    id="multipleInput"
                    checked={checkMultiple}
                    className='tertiary-input'   
                    value={author}
                    onChange={(e) => setCheckMultiple(!checkMultiple) } 
                    />
            </div>
            <button type="submit" className='submit-btn' onClick={()=>{
                if(!checkMultiple) {
                    // window.location.href = '/'
                    navigate('/home');
                }
            }}>Submit</button>
        </form>
    </div>
  )
}

export default AddQuote

