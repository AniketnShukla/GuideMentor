import { useEffect, useState } from 'react'
import './Home.css'
import './Emotion-text.css'
import EmotionWheel from './components/EmotionSelector/EmotionWheel/EmotionWheel.jsx'
import axios from "axios";
import { useSelector, useDispatch } from 'react-redux'
import { reset } from './features/emotion/currentStateSlice.js'
import { setQuote } from './features/quote/quoteSlice.js'
import { setImage } from './features/bgImage/imageSlice.js'
import imageData from './data/Images.js'
import NavBar from './components/NavBar/NavBar.jsx'
import QuoteDisplay from './components/QuoteDisplay/QuoteDisplay.jsx'
import { setUserEmotions } from './features/emotions/emotionsSlice.js';
import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
import 'react-toastify/dist/ReactToastify.css';
import useFetch from './hooks/useFetch.jsx';

import { CiClock2, CiLock, CiCloud, CiCloudDrizzle } from "react-icons/ci";
import { GiTornado, GiAngryEyes, GiMonsterGrasp } from "react-icons/gi";
import { FaFire } from "react-icons/fa";
import { SlDislike, SlFire } from "react-icons/sl";
import { IoFootstepsOutline  } from "react-icons/io5";
import { PiMaskSadThin } from "react-icons/pi";

const Test = () => {

  const [presetEmotionsIconsObj, setPresetEnotionsIconsObj] = useState({
    "angry": <SlFire style={{ fontSize:'1.9rem'}} />,
"overwhelmed": <GiTornado style={{ fontSize:'1.9rem'}} />,
"frustrated": <GiAngryEyes style={{ fontSize:'1.9rem'}} />,
"insecure":<CiLock style={{ fontSize:'1.9rem'}} />,
"lonely": <IoFootstepsOutline  style={{ fontSize:'1.9rem'}} />,
"sad": <CiCloud style={{ fontSize:'1.9rem'}} />,
"fear": <GiMonsterGrasp style={{ fontSize:'1.9rem'}} />,
"jealous": <PiMaskSadThin style={{ fontSize:'1.9rem'}} />,
"lacking_motivation": <SlDislike style={{ fontSize:'1.9rem'}} />,
"procrastinating": <CiClock2 style={{ fontSize:'1.9rem'}} />,
"gloomy": <CiCloudDrizzle style={{ fontSize:'1.9rem'}} />
  })

  const [count, setCount] = useState(0);
  const [bgImage, setBgImage] = useState('');
  const [presetEmotions, setPresetEmotions] = useState(null);
  const [presetEmotionsLoading, setPresetEmotionsLoading] = useState(null);
  const [presetEmotionsError, setPresetEmotionsError] = useState(null);
  const [presetQuotes, setPresetQuotes] = useState(null);
  const [presetQuotesLoading, setPresetQuotesLoading] = useState(null);
  const [presetQuotesError, setPresetQuotesError] = useState(null);
  const [loading, setLoading] = useState(true);

  const currentUser = sessionStorage.getItem('username');

  const dispatch = useDispatch();

  const { userCred } = useSelector((state)=> state.auth);

  useEffect(()=>{

        const fetchData = async (url, setData, setLoading, setError) => {
            try {
                const response = await fetch(url);
                const data = await response.json();
                setData(data);
                setLoading(false);
            } catch (err) {
                setError(err);
                console.log(err);
            }
        };

        fetchData(`${import.meta.env.VITE_SERVER_URL}/preset/presetEmotions`, setPresetEmotions, setPresetEmotionsLoading, setPresetEmotionsError);
        fetchData(`${import.meta.env.VITE_SERVER_URL}/preset/presetQuotes`, setPresetQuotes, setPresetQuotesLoading, setPresetQuotesError);
  },[])

//   const currentState = useSelector((state) => {
//     return state.stateReducer.state
//   // console.log(state);
//   });

  const author = useSelector((state)=> state.quote.author)
  const quote = useSelector((state) => state.quote.quote)
  const freezeBackground = useSelector((state) => state.image.freezeBackground)
  const reduxImage = useSelector((state) => { return state.image.image; });

//   const emotions = useSelector((state) => {
//     return state.emotionReducer.emotions;
// });

  useEffect(()=>{
  let img;
  let randomNumber;
  if(!freezeBackground){
      if ( imageData[author] ) {
        randomNumber = Math.floor(Math.random()*imageData[author]?.length)
        img = (author)? imageData[author][randomNumber] : reduxImage;
      }
      else {  //for Unregistered Authors.
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

  return (
    <div className="App" id="App">
      <ToastContainer />
      {
        // (presetQuotesLoading || presetEmotionLoading ) ?
        (presetQuotes==null || presetEmotions==null ) ?
        
        (
            <h2 id='loading' >
              {console.log('lo ' + presetEmotionsLoading, presetQuotesLoading)}
              Loading . . . 
              </h2>
        ) 
            :
            (
              <>
              {/* {console.log("nononon", presetEmotionsLoading, presetQuotesLoading)}
              {console.log("data dat data dta sdt a", presetEmotions, presetQuotes)}
              {console.log("Type ofppgggggg", typeof presetEmotions.presetEmotions, typeof presetQuotes)} */}

                <EmotionWheel emotions={presetEmotions.presetEmotions} quotes={presetQuotes} presetEmotionsIconsObj={presetEmotionsIconsObj}/>
                <QuoteDisplay />
                </>
            )
          }
    </div>
  )
}

export default Test;
