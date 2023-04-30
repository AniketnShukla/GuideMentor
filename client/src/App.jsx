import { useEffect, useState } from 'react'
import './App.css'
import EmotionWheel from './components/EmotionWheel'
import { useSelector, useDispatch } from 'react-redux'
import { 
  reset 
} from './features/emotion/currentStateSlice'
import { setQuote } from './features/quote/quoteSlice'
import axios from "axios";
import imageData from './data/Images.js'

function App() {
  const [count, setCount] = useState(0)
  const currentState = useSelector((state) => {
    return state.stateReducer.state
  console.log(state);
  });
  const author = useSelector((state)=> state.quoteReducer.author)
  const quote = useSelector((state) => state.quoteReducer.quote)
  const [bgImage, setBgImage] = useState('')
  useEffect(()=>{
    // console.log(imageData[author]?.length, 'effefct andat iamgedata')
    const randomNumber = Math.floor(Math.random()*imageData[author]?.length)
    if(imageData[author] !== undefined){
      const img = (author)? imageData[author][randomNumber] : ""; 
      setBgImage(img)
      // console.log(img)
      const app = document.getElementById('App');
      app.style.backgroundImage = `url(${img})`;
    }
  },[author])
  const dispatch = useDispatch()
  const resetAll = () => {
    dispatch(reset());
    dispatch(setQuote(''));
  }
  // const emotions = [...new Set(data.map(( object ) => object.emotion))];
  return (
    <div className="App" id="App">
      <EmotionWheel />
      <div className='emotion-text'>
      <h3>{ quote }</h3>
      <h4>{ author }</h4>
      </div>
      {/* <div className='prompt-input'>
        <input type="text" placeholder='Enter message' />
        <button>Enter</button>
        <button onClick={()=> resetAll()}>Reset</button>
      </div> */}


    </div>
  )
}

export default App
