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
import './Toast.css'
// import 'react-toastify/dist/ReactToastify.css';
import 'react-toastify/dist/ReactToastify.css';
import useFetch from './hooks/useFetch.jsx';
import { Canvas } from '@react-three/fiber'
import GoldenBlob from './components/GoldenBlob' // adjust import as needed

import { CiClock2, CiLock, CiCloud, CiCloudDrizzle } from "react-icons/ci";
import { GiTornado, GiAngryEyes, GiMonsterGrasp } from "react-icons/gi";
import { FaFire } from "react-icons/fa";
import { SlDislike, SlFire } from "react-icons/sl";
import { IoFootstepsOutline  } from "react-icons/io5";
import { PiMaskSadThin } from "react-icons/pi";
import MoodMentor from './components/MoodMentor'; // <-- Add this
import useAudioAnalyzer from './hooks/useAudioAnalyzer'
import Visualizer from './pages/Visualizer';
import useSpeechWordsWithMood from './hooks/useSpeechWordsWithMood';

const Test = () => {
  
  const { energy, spectrum } = useAudioAnalyzer();
  const [presetEmotionsIconsObj, setPresetEnotionsIconsObj] = useState({
    "angry": <SlFire style={{ fontSize:'1.9rem'}} />,
    "overwhelmed": <GiTornado style={{ fontSize:'1.9rem'}} />,
    "frustrated": <CiCloud style={{ fontSize:'1.9rem'}} />,
    "insecure":<CiLock style={{ fontSize:'1.9rem'}} />,
    "lonely": <IoFootstepsOutline  style={{ fontSize:'1.9rem'}} />,
    "sad":  <PiMaskSadThin style={{ fontSize:'1.9rem'}} />,
"fear": <GiMonsterGrasp style={{ fontSize:'1.9rem'}} />,
"jealous": <GiAngryEyes style={{ fontSize:'1.9rem'}} />,
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
  const mentorOn = useSelector(state => state.mentor.enabled);
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
// In your main screen (e.g. Home.jsx, Test.jsx, or even inside QuoteDisplay if you want)


function MiniBlob() {
  return (
    <div
      style={{
        position: 'fixed',
        bottom: 24,
        right: 28,
        width: 72,
        height: 72,
        zIndex: 99,
        pointerEvents: 'none', // so it doesn't block mouse events
        opacity: 0.92,
        filter: 'blur(0.2px) saturate(1.1)'
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 2.9], fov: 38 }}
        style={{ background: 'transparent' }}
        dpr={[1, 2]}
      >
        <ambientLight intensity={0.44} />
        <directionalLight position={[5, 5, 5]} intensity={0.8} />
        {/* <GoldenBlob energy={0.15} /> */}
      </Canvas>
    </div>
  )
}
const speech = useSpeechWordsWithMood();
return (
  <div className="App" id="App">
    <ToastContainer className='toaster-container'/>
    {
      (presetQuotes==null || presetEmotions==null ) ?
        (
          <h2 id='loading' >
            Loading . . . 
          </h2>
        ) 
      : (
        <>
          {/* MENTOR OVERLAY */}
          {/* <MoodMentor enabled={mentorOn} presetQuotes={presetQuotes} /> */}

          <EmotionWheel emotions={presetEmotions.presetEmotions} quotes={presetQuotes} presetEmotionsIconsObj={presetEmotionsIconsObj}/>
          {/* <QuoteDisplay /> */}
          {/* <MiniBlob />  */}
          <Visualizer
  energy={energy}
  spectrum={spectrum}
  mini={true}
  showShards={true} // or false if you want only the blob
  style={{
    width: 200,
    height: 200,
    bottom: 220,
    right: 28,
    zIndex: 110,
  }}
/>
{/* <QuoteDisplay mentorOn={mentorOn} presetQuotes={presetQuotes} /> */}
<QuoteDisplay
      mentorOn={mentorOn}
      presetQuotes={presetQuotes}
      words={speech.words}
      mood={speech.mood}
    />
        </>
      )
    }
  </div>
)

}

export default Test;
