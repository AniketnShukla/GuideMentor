import { useEffect, useState } from 'react'
import './App.css'
import EmotionWheel from './components/EmotionSelector/EmotionWheel/EmotionWheel'
import axios from "axios";
import { useSelector, useDispatch } from 'react-redux'
import img2 from "/src/assets/UnregisteredAuthor/img2.jpg";
import { 
  reset 
} from './features/emotion/currentStateSlice'
import { setQuote } from './features/quote/quoteSlice'
import { setImage } from './features/bgImage/imageSlice'
import imageData from './data/Images.js'
import NavBar from './components/NavBar/NavBar'
import QuoteDisplay from './components/QuoteDisplay/QuoteDisplay'
import { setUserEmotions } from './features/emotions/emotionsSlice';

function App() {
  const dispatch = useDispatch()
  const [count, setCount] = useState(0)
  const currentState = useSelector((state) => {
    return state.stateReducer.state
  // console.log(state);
  });
  const author = useSelector((state)=> state.quoteReducer.author)
  const quote = useSelector((state) => state.quoteReducer.quote)
  const freezeBackground = useSelector((state) => state.imageReducer.freezeBackground)
  // const image = useSelector((state) => state.imageReducer.image)
  const [bgImage, setBgImage] = useState('')
  const currentUser = sessionStorage.getItem('username')
  const [localEmotions, setLocalEmotions] = useState([]);
  const [localUserData, setLocalUserData] = useState({});
  // console.log(state);
  const emotions = useSelector((state) => {
    return state.emotionReducer.emotions;
});
  const userData = useSelector((state) => {
    return state.emotionReducer.userData;
});
  useEffect(()=>{
    setLocalEmotions(emotions);
    setLocalUserData(userData);
  },[emotions, userData])
  useEffect(()=>{
  let img;
  let randomNumber;
  if(!freezeBackground){
      if(imageData[author]){
        randomNumber = Math.floor(Math.random()*imageData[author]?.length)
        // console.log(author)
        img = (author)? imageData[author][randomNumber] : img2;
      }
      else{
        randomNumber = Math.floor(Math.random()*imageData["UnregisteredAuthor"]?.length)
        img = (author)? imageData["UnregisteredAuthor"][randomNumber] : img2;
      }
      setBgImage(img)
      dispatch(setImage(img))
      const app = document.getElementById('App');
      app.style.backgroundImage = `url(${img})`;
    }
  },[quote])
  const resetAll = () => {
    dispatch(reset());
    dispatch(setQuote(''));
  }
  // const emotions = [...new Set(data.map(( object ) => object.emotion))];
  return (
    <div className="App" id="App">
      <NavBar />
      <EmotionWheel emotions={localEmotions} userData={localUserData}/>
      <QuoteDisplay />
    </div>
  )
}

export default App
