import React, { useEffect, useState } from 'react'
import emotions from '../../../data/currentmood.json'
import EmotionCircle from '../EmotionCircle/EmotionCircle'
import { Link, useNavigate } from "react-router-dom";
import './emotionwheel.css'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux';


const EmotionWheel = (props) => {
  const [emotions, setEmotions] = useState([]);
  const [userData, setUserData] = useState([]);
  const dispatch = useDispatch();
  useEffect(()=>{
    axios.post(`${import.meta.env.VITE_SERVER_URL}/user/emotion`, {
      currentUser: currentUser
    })
    .then((response)=>{
      console.log(response.data);
      setUserData(response.data)
      setEmotions(response.data?.emotionData)
      // dispatch(setUserData(response.data))
      // dispatch(setUserEmotions(response.data))
    },[])
    .catch((e)=>{
      console.log(e);
    })
  },[])
  // console.log(state);
//   const emotions = useSelector((state) => {
//     return state.emotionReducer.emotions;
// });
//   const userData = useSelector((state) => {
//     return state.emotionReducer.userData;
// });
console.log(emotions)
// console.log(userData)
const navigate = useNavigate();
const currentUser = sessionStorage.getItem('username')
  console.log(currentUser)
  const [circle, setCircle] = useState([]);

  // const emotions = props.emotions;
  // const userData = props.userData;
  console.log(userData);
  const [dataCheck, setDataCheck] = useState(false);
    let emotionQuoteArray;
  useEffect(()=>{
    // console.log(userData);
    (userData?.quoteData) ? emotionQuoteArray = userData.quoteData.filter((quote) => quote.emotion === 'sad' ) : []
    setCircle(emotions.map((emotion, index) => (
      <EmotionCircle 
      key = { index }
      emotion = { emotion }
      // quotes = { emotionQuoteArray }
      quotes = { userData.quoteData.filter((quote)=> quote.emotion === emotion)}
      />    
      ))
      )
      if(userData?.emotionData?.length > 0){
        setDataCheck(true);
      }else{
        setDataCheck(false);
      }
  },[userData])
  // }
  return (
    <div className='emotionwheel'>
      <span>What do you feel</span>
        <div className="circle-wrapper">
          {(dataCheck) ? 
          ( circle )
          :
          // (<h2>L o a d i n g. . . . </h2>)
          (<div className="add-quote-btn" onClick={()=>{
          // window.location.href = '/add'
           navigate('/add');
          }
          }>
            Add Quotes
            </div>
          )
          }
        </div>
    </div>
  )
}

export default EmotionWheel