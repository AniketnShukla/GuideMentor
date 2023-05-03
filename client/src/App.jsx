import { useEffect, useState } from 'react'
import './App.css'
import EmotionWheel from './components/EmotionSelector/EmotionWheel/EmotionWheel'
import axios from "axios";
import { useSelector, useDispatch } from 'react-redux'
import { 
  reset 
} from './features/emotion/currentStateSlice'
import { setQuote } from './features/quote/quoteSlice'
import { setImage } from './features/bgImage/imageSlice'
import imageData from './data/Images.js'
import NavBar from './components/NavBar/NavBar'
import QuoteDisplay from './components/QuoteDisplay/QuoteDisplay'

function App() {
  const dispatch = useDispatch()
  const [count, setCount] = useState(0)
  const currentState = useSelector((state) => {
    return state.stateReducer.state
  console.log(state);
  });
  const author = useSelector((state)=> state.quoteReducer.author)
  const quote = useSelector((state) => state.quoteReducer.quote)
  const freezeBackground = useSelector((state) => state.imageReducer.freezeBackground)
  // const image = useSelector((state) => state.imageReducer.image)
  const [bgImage, setBgImage] = useState('')
  useEffect(()=>{
    // console.log(imageData[author]?.length, 'effefct andat iamgedata')
    // if(imageData[author] !== undefined){
    let img;
    let randomNumber;
    if(!freezeBackground){
      if(imageData[author]){
        randomNumber = Math.floor(Math.random()*imageData[author]?.length)
        console.log(author)
        img = (author)? imageData[author][randomNumber] : "/src/assets/Kratos/1.jpg"; 
      }
      else{
        randomNumber = Math.floor(Math.random()*imageData["Unregistered-author"]?.length)
        img = (author)? imageData["Unregistered-author"][randomNumber] : "/src/assets/Kratos/1.jpg"; 
      }
      setBgImage(img)
      dispatch(setImage(img))
      const app = document.getElementById('App');
      app.style.backgroundImage = `url(${img})`;
    }
  },[author])
  
  const resetAll = () => {
    dispatch(reset());
    dispatch(setQuote(''));
  }
  // const emotions = [...new Set(data.map(( object ) => object.emotion))];
  return (
    <div className="App" id="App">
      <NavBar />
      <EmotionWheel />
      <QuoteDisplay />
`
      {/* <div className='prompt-input'>
        <input type="text" placeholder='Enter message' />
        <button>Enter</button>
        <button onClick={()=> resetAll()}>Reset</button>
      </div> */}


    </div>
  )
}

export default App
