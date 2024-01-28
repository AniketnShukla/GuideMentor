import { useEffect, useState } from 'react'
import './Home.css'
import './Emotion-text.css'
import EmotionWheel from './components/EmotionSelector/EmotionWheel/EmotionWheel.jsx'
import axios from "axios";
import { useSelector, useDispatch } from 'react-redux'
import { 
  reset 
} from './features/emotion/currentStateSlice.js'
import { setQuote } from './features/quote/quoteSlice.js'
import { setImage } from './features/bgImage/imageSlice.js'
import imageData from './data/Images.js'
import NavBar from './components/NavBar/NavBar.jsx'
import QuoteDisplay from './components/QuoteDisplay/QuoteDisplay.jsx'
import { setUserEmotions } from './features/emotions/emotionsSlice.js';
import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
import 'react-toastify/dist/ReactToastify.css';

const Home = () => {

  const [count, setCount] = useState(0)
  const [bgImage, setBgImage] = useState('')
  const [localEmotions, setLocalEmotions] = useState([]);
  const [localUserData, setLocalUserData] = useState({});
  const [loading, setLoading] = useState(true);
  const currentUser = sessionStorage.getItem('username')
  console.log('state');

  const dispatch = useDispatch()

  const currentState = useSelector((state) => {
    return state.stateReducer.state
  // console.log(state);
  });

  const author = useSelector((state)=> state.quoteReducer.author)
  const quote = useSelector((state) => state.quoteReducer.quote)
  const freezeBackground = useSelector((state) => state.imageReducer.freezeBackground)
  const reduxImage = useSelector((state) => { return state.imageReducer.image; });
  // const image = useSelector((state) => state.imageReducer.image)

//   const emotions = useSelector((state) => {
//     return state.emotionReducer.emotions;
// });
//   const userData = useSelector((state) => {
//     return state.emotionReducer.userData;
// });

const getUser = async () => {
  try{
    const url = `${process.env.REACT_APP_API_URL}/auth/login/success`;
    const { data } = await axios.get(url, { withCredentials: true });
    setUser(data.user._json);
  }
  catch (err) {
    console.log(err);
    alert(err);
  }
}
useEffect(()=>{
  getUser();
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
      <ToastContainer />
      {
            (loading) ? 
            // make a loader
            (<h2 id='loading' >Loading . . . </h2>) 
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

export default Home;
