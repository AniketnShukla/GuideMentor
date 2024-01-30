import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import './AddQuote.css'
import { Link, useNavigate } from 'react-router-dom';
import img3 from "/src/assets/UnregisteredAuthor/img3.jpg";
import axios from 'axios';
import { useFetchDataMutation } from '../../slices/usersApiSlice';
import { toast } from 'react-toastify';
import { setUserData } from '../../features/userData/userDataSlice';
const AddQuote = () => {
    
    const [quote, setQuote] = useState('');
    const [author, setAuthor] = useState('');
    const [emotion, setEmotion] = useState('');
    const [checkMultiple, setCheckMultiple] = useState(false);
    const [userEmotions, setUserEmotions] = useState([]);
    const [radioEmotion, setRadioEmotion] = useState(null);
    
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    
    let img = useSelector((state) => state.image.image)
    const { userCred } = useSelector((state) => state.auth)
    const { userData } = useSelector((state) => state.userData)

    const [fetch, { isFetchLoading } ] = useFetchDataMutation();

    const currentUser = userCred.name;
    

    //img not updating when author not set check
    if(!img) img = img3; 

    useEffect(() => {
        const app = document.getElementById('add-quote');
        app.style.backgroundImage = `url(${img})`;
        if(userData !== null){
            console.log(userData);
            setUserEmotions(userData.emotionData);
        }
    },[userData]);

    if(userEmotions?.length > 0){

    }
    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post(`${import.meta.env.VITE_SERVER_URL}/user/quote`, {
            currentUser: currentUser,
            quote: quote,
            author: author,
            emotion: emotion
        }).then(()=>{
            axios.post(`${import.meta.env.VITE_SERVER_URL}/user/emotion-data`, { //get update emotionArray
                currentUser: currentUser,
            }).then( async (response)=>{
                setUserEmotions(response.data);
                const res = await fetch({currentUser: currentUser}).unwrap();
                dispatch(setUserData(res));
                toast.success('Quote Added.')
            })
        }).catch((e)=>{
            console.log(e)
        })
    /*******/
    // if(!checkMultiple) {
    //     navigate('/home');
    // }
        console.log(emotion)
        setQuote('')
        setAuthor('')
    }
  return (
    <div className='add-quote' id="add-quote">
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

            <label htmlFor="emotion">Enter Emotion</label>
            <select
            id='emotion'
            className='secondary-input'
            value={emotion}
            onChange={(e) =>{
                setRadioEmotion(null);
                setEmotion(e.target.value);
            }}>
            <option value="" hidden>Select previous emotion</option>
            {userEmotions.map((emotion, index) => (
                <option key={index} value={emotion}>
                {emotion}
                </option>
            ))}
            </select>
            {/* <div className="radio-group">
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
            </div> */}
            <input 
                type="text"
                id="emotion"
                className='secondary-input'   
                placeholder="Use emojis or words < 5 letters! :)"
                maxLength="5"
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
{/* //MULTIPLE CHECK BOX FOR WHEN YOU IMPLEMENT NAVIGATING TO HOME ON SUBMIT, Currently doing so does not refetch the updated data, 
IDEA. put the user Emotion Array in redux and dispatch and fetch it where required, can check */}
            {/* <div className="multi-checkbox">
                <label htmlFor="multipleInput">multiple inputs</label>
                <input 
                    type="checkbox"
                    id="multipleInput"
                    checked={checkMultiple}
                    className='tertiary-input'   
                    value={author}
                    onChange={(e) => setCheckMultiple(!checkMultiple) } 
                    />
            </div> */}
            <button type="submit" className='submit-btn' onClick={()=>{
            }}>Submit</button>
        </form>
    </div>
  )
}

export default AddQuote

