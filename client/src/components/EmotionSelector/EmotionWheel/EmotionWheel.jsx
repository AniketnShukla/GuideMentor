import React, { useEffect, useState } from 'react'
import emotions from '../../../data/currentmood.json'
import EmotionCircle from '../EmotionCircle/EmotionCircle'
import { Link, useNavigate } from "react-router-dom";
import './emotionwheel.css'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux';

const EmotionWheel = (props) => {
  const [emotions, setEmotions] = useState(props.emotions);
  const [quotes, setUserData] = useState(props.quotes);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const {userCred} = useSelector((state)=> state.auth);

  const currentUser = userCred ? userCred.name: null;
  // console.log(currentUser)
  const [circle, setCircle] = useState([]);

  // const emotions = props.emotions;
  // const userData = props.userData;
  // console.log(quotes);
  const [dataCheck, setDataCheck] = useState(false);
    let emotionQuoteArray;
  useEffect(()=>{
    // console.log(quotes);
    //HEREREREREREREREREREER
    (typeof quotes !== null || typeof emotions !== null) ? 
    emotionQuoteArray = quotes?.filter((quote) => quote?.emotion === 'sad' ) : []

    // console.log('quotes');
    console.log(props.presetEmotionsIconsObj);
    setCircle(emotions.map((emotion, index) => (
      <EmotionCircle 
      key = { index }
      emotion = { emotion }
      presetEmotionsIconsObj={props.presetEmotionsIconsObj}
      // quotes = { emotionQuoteArray }
      quotes = { quotes?.filter((quote)=> quote?.emotion === emotion)}
      />    
      ))
      )
      if(emotions.length > 0){
        setDataCheck(true);
      }else{
        setDataCheck(false);
      }
  },[quotes])
  // }
  return (
    <div className='emotionwheel'>
      <span id="header_line">What do you feel</span>
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