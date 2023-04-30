import React from 'react'
import emotions from './../data/currentmood.json'
import EmotionCircle from './EmotionCircle'
import './../css/emotionwheel.css'


const EmotionWheel = () => {

    const data = Object.keys(emotions);
    const circle = data.map((emotion, index) => (
        <EmotionCircle 
            key = { index }
            name = { emotion }
        />    
    ))
  return (
    <div className='emotionwheel'>
      <span>What do you feel</span>
        <div className="circle-wrapper">
          { circle }
        </div>
    </div>
  )
}

export default EmotionWheel