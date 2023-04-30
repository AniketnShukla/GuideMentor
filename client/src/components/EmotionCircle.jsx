import React, { useEffect, useState } from 'react'
import './../css/emotioncircle.css'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { 
  setCurrentState,
} from '../features/emotion/currentStateSlice'
// import quoteData from '../data/quotes.json';
// import emotionData from '../data/currentmood.json';

import { setQuote } from '../features/quote/quoteSlice';
import { Link } from 'react-router-dom';

const EmotionCircle = (props) => {
  const [emotionData, setEmotionData] = useState('');
  const [quoteData, setQuoteData] = useState('');

  const [ currentStateChanged, setCurrentStateChanged ] = useState(0) 
  const [ emotion, setEmotion ] = useState('') 
  const [count, setCount] = useState(0);
  const [active, setActive] = useState('');
  const dispatch = useDispatch();
  const [ stateQuote, setStateQuote ] = useState('') 
  const [ stateAuthor, setStateAuthor ] = useState('') 
  
  useEffect(()=>{
    const getEmotionData = async() => {
      try {
        const response = await axios.get('http://localhost:3200/emotion')
        setEmotionData(response.data);
        // console.log('aaa')
        // console.log(response.data)
      } catch (error) {
        console.log(error)
      }
    }
    const getQuoteData = async() => {
      try {
        const response = await axios.get('http://localhost:3200/quote')
        setQuoteData(response.data);
        // console.log(response.data)
    } catch (error) {
      console.log(error)
    }
  }
  getEmotionData();
  getQuoteData();
  },[])

  const currentState = useSelector((state) => {
    // console.log(state)
    return state.stateReducer.state
  });
  
  useEffect(()=>{
    handleQuote();
  },[currentStateChanged])
  // useEffect(()=>{
  // },[emotion])
  useEffect(()=>{
      // console.log('=============================')
      console.log('above dispatch emotion: ' + emotion)
      dispatch(setCurrentState(emotion))
      setCurrentStateChanged(prev => prev+1)
      // console.log(emotion, "in effect")'
      //burning issue ****************************************************************************************
      //the dependency should be emotion, but it works on the dummy state i created -> count
      //only having dependency as emotion causes bugs when selecting differet currentStates back and forth
  },[emotion, count])

  const handleQuote = () => {
    //error when emotion is not defined ir when currentstate is empty throws error, have to fix
    // if(Object.keys(emotionData[currentState]) !== undefined){
      console.log('hQ currentstate ' + currentState)
      // console.log(emotionData)
      //only render quote when the currentState is set and the quoteData has been fetched from DB
      if(currentState && quoteData != null){
        //answerStates are states of mind which will help currentState
      const size =  Object.keys(emotionData[currentState]).length;
      const randomNumber = Math.floor( Math.random() * size )
      console.log(size);
      console.log(randomNumber);
      const resultArray = quoteData.filter((obj) => obj.emotion === emotionData[currentState][randomNumber])
      const RandomNumber = Math.floor( Math.random() * resultArray.length )
      const resultQuote = resultArray.length > 0 ?  resultArray[RandomNumber]?.quote : '';
      const resultAuthor = resultArray.length > 0 ?  resultArray[RandomNumber]?.author : '';
      // console.log(resultQuote)
      // console.log(resultAuthor)
      setStateQuote(resultQuote)
      setStateAuthor(resultAuthor)
      dispatch(setQuote({stateQuote: resultQuote, stateAuthor: resultAuthor}))
    }
  }
  const handleClick = () => {
    // handleEmotion()
    console.log('---------------------------------------')
    document.getElementById('active')?.removeAttribute('id');
    setActive(props.name);
    console.log('hC props.name ' + props.name)
    setEmotion(props.name);
    setCount((prev)=> prev+1);
  }
  
  return (
    // <Link to="/default">
      <div className='emotioncircle' onClick={handleClick} id={active === props.name ? 'active':''}> 
            { props.name }
      </div>
    // </Link> 
  )
}

export default EmotionCircle