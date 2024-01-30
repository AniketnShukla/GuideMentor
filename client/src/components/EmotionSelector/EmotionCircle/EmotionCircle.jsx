import React, { useEffect, useState } from 'react'
import './emotioncircle.css'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { 
  setCurrentState,
} from '../../../features/emotion/currentStateSlice'
// import quoteData from '../data/quotes.json';
// import emotionData from '../data/currentmood.json';

import { setQuote } from '../../../features/quote/quoteSlice';
import { Link } from 'react-router-dom';
import { Tooltip } from 'react-tooltip';

const EmotionCircle = (props) => {
  const [emotionData, setEmotionData] = useState(props.emotion);
  const [quoteData, setQuoteData] = useState(props.quotes);
  // const [ currentStateChanged, setCurrentStateChanged ] = useState(0) 
  const [ emotion, setEmotion ] = useState('') 
  const [count, setCount] = useState(0);
  const [active, setActive] = useState('');
  const dispatch = useDispatch();
  const [ stateQuote, setStateQuote ] = useState('') 
  const [ stateAuthor, setStateAuthor ] = useState('') 
  


  const handleQuote = () => {
    //error when emotion is not defined ir when currentstate is empty throws error, have to fix
      //only render quote when the currentState is set and the quoteData has been fetched from DB
      if(quoteData != null){
        const size =  quoteData.length;
      const RandomNumber = Math.floor( Math.random() * size )
      const resultQuote = quoteData.length > 0 ?  quoteData[RandomNumber]?.quote : '';
      const resultAuthor = quoteData.length > 0 ?  quoteData[RandomNumber]?.author : '';
      console.log(resultQuote)
      console.log(resultAuthor)
      dispatch(setQuote({stateQuote: resultQuote, stateAuthor: resultAuthor}))
    }
  }
  const handleClick = () => {
    handleQuote()
    console.log('---------------------------------------')
    document.getElementById('active')?.removeAttribute('id');
    setActive(props.emotion);
    console.log(props)
    console.log('hC props.name ' + props)
    setEmotion(props.emotion);
    setCount((prev)=> prev+1);
  }
 console.log(props)
  return (
    <>
    <Tooltip id="my-tooltip" style={{backgroundColor: "rgba(0, 0, 0, 0.1", fontSize: "0.8rem", opacity: "0.7", zIndex:"999"}}/>
      <a 
        style={{textDecoration:"none"}}
        className='emotioncircle' onClick={handleClick} 
        id={active === props.emotion ? 'active':''} 
        data-tooltip-id="my-tooltip"
        data-tooltip-content={
          props.presetEmotionsIconsObj ? props.emotion: ''}
        // data-tooltip-content={props.emotion}
        data-tooltip-place="bottom"
          >  
           {
             (true) ?  
             ( props.presetEmotionsIconsObj ? props.presetEmotionsIconsObj[props.emotion] : props.emotion )
             :
             //  (<div>
             ( `Loading` )
             //  </div>)
            }
      </a>
    </>
  )
}

export default EmotionCircle