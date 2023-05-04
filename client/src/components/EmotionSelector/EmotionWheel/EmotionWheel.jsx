import React, { useEffect, useState } from 'react'
import emotions from '../../../data/currentmood.json'
import EmotionCircle from '../EmotionCircle/EmotionCircle'
import './emotionwheel.css'
import axios from 'axios'


const EmotionWheel = () => {
  const currentUser = sessionStorage.getItem('username')
  console.log(currentUser)
  const [emotions, setEmotions] = useState([]);
  const [circle, setCircle] = useState([]);
  const [userData, setUserData] = useState([]);
  const [dataCheck, setDataCheck] = useState(false);
useEffect(()=>{
  axios.post('http://localhost:3200/user/emotion', {
    currentUser: currentUser
  })
  .then((response)=>{
    console.log(response.data);
    setUserData(response.data)
    setEmotions(response.data?.emotionData)
  },[])
  .catch((e)=>{
    console.log(e);
  })
},[])

    let emotionQuoteArray;

  useEffect(()=>{
    console.log(userData);
    (userData.quoteData) ? emotionQuoteArray = userData.quoteData.filter((quote) => quote.emotion === 'sad' ) : []
    // setDataCheck(true);
    setCircle(emotions.map((emotion, index) => (
      <EmotionCircle 
      key = { index }
      emotion = { emotion }
      // quotes = { emotionQuoteArray }
      quotes = { userData.quoteData.filter((quote)=> quote.emotion === emotion)}
      />    
      ))
      )
  },[userData])
  // }
  return (
    <div className='emotionwheel'>
      <span>What do you feel</span>
        <div className="circle-wrapper">
          {(circle) ? 
          ( circle )
          :
          (<h2>L o a d i n g. . . . </h2>)
          }
        </div>
    </div>
  )
}

export default EmotionWheel