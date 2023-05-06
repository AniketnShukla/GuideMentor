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
  const [loading, setLoading] = useState(true);
  console.log('state');

//   const emotions = useSelector((state) => {
//     return state.emotionReducer.emotions;
// });
//   const userData = useSelector((state) => {
//     return state.emotionReducer.userData;
// });
  const reduxImage = useSelector((state) => {
    return state.imageReducer.image;
});
useEffect(()=>{
  const getPresetData = async() => {   
    // getPresetQuotes
    Promise.all([
      axios.post(`${import.meta.env.VITE_SERVER_URL}/preset/presetEmotions`),
      axios.post(`${import.meta.env.VITE_SERVER_URL}/preset/presetQuotes`)
    ])
    .then((response)=>{
          console.log(response[0].data); 
          setLocalEmotions(response[0].data?.presetEmotions)
          // dispatch(setUserData(response.data))
          // dispatch(setUserEmotions(response.data))
          console.log(response[1].data);
          setLocalUserData(response[1].data)
        })
        .catch((e)=>{
          console.log(e);
          if (e.response) {
            //response status is an e code
            console.log(e.response.status);
          }
          else if (e.request) {
            //response not received though the request was sent
            console.log(e.request);
          }
          else {
            //an e occurred when setting up the request
            console.log(e.message);
          }
        })
      }
  getPresetData();
},[])
useEffect(()=>{
  if(localEmotions?.length > 0 && Object.keys(localUserData).length !== 0){
    console.log(localUserData);
      setLoading(false);
  }
},[localEmotions, localUserData])
  useEffect(()=>{
  let img;
  let randomNumber;
  if(!freezeBackground){
      if(imageData[author]){
        randomNumber = Math.floor(Math.random()*imageData[author]?.length)
        // console.log(author)
        img = (author)? imageData[author][randomNumber] : reduxImage;
      }
      //for Unregistered Authors.
      else{
        randomNumber = Math.floor(Math.random()*imageData["UnregisteredAuthor"]?.length)
        img = (author)? imageData["UnregisteredAuthor"][randomNumber] : reduxImage;
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
      {
            (loading) ? 
            // make a loader
            (<h2>Loading . . . </h2>) 
            :
            (
                <>
                <EmotionWheel emotions={localEmotions} userData={localUserData}/>
                <QuoteDisplay />
                </>
            )
          }
    </div>
  )
}

export default App
