import { useEffect, useState } from 'react'
import './MySpace.css'
import './Emotion-text.css'
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
import { useNavigate } from 'react-router-dom';
import { useFetchDataMutation } from './slices/usersApiSlice.js';

const MySpace = () => {

  const [count, setCount] = useState(0)
  const [bgImage, setBgImage] = useState('')
  const [localEmotions, setLocalEmotions] = useState([]);
  const [localUserData, setLocalUserData] = useState({});
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // const currentState = useSelector((state) => {
  //   return state.stateReducer.state
  // // console.log(state);
  // });
  
  const { userCred } = useSelector((state)=> state.auth);
  const author = useSelector((state)=> state.quote.author);
  const quote = useSelector((state) => state.quote.quote);
  const freezeBackground = useSelector((state) => state.image.freezeBackground)
  const { userData } = useSelector((state)=> state.userData);
  
  const currentUser = userCred.name;
  useEffect(()=>{
    if(userData !== null) {
      console.log(userData);
      setLocalUserData(userData.quoteData)
      setLocalEmotions(userData.emotionData)
    }
  },[userData])

  // const image = useSelector((state) => state.imageReducer.image)
//   const emotions = useSelector((state) => {
//     return state.emotionReducer.emotions;
// });
//   const userData = useSelector((state) => {
//     return state.emotionReducer.userData;
// });
  const reduxImage = useSelector((state) => {return state.image.image;});
  
  useEffect(()=>{
    if(localEmotions?.length > 0 && Object.keys(localUserData).length !== 0){
      console.log(localEmotions);
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
      const MySpace = document.getElementById('MySpace');
      MySpace.style.backgroundImage = `url(${img})`;
    }
  },[quote])
  const resetAll = () => {
    dispatch(reset());
    dispatch(setQuote(''));
  }
  // const emotions = [...new Set(data.map(( object ) => object.emotion))];
  return (
    <div className="MySpace" id="MySpace">
        {
            (loading) ? 
            // make a loader
            (<div id='loading' >
              {/* Should be Loading . . . , Will put Add Quotes for now */}
            <div className="add-quote-btn" onClick={()=>{
          // window.location.href = '/add'
           navigate('/add');
          }
          }>
            Add Quotes
            </div>
              </div>) 
            :
            (
                <>
                {console.log("Type of hashfhasfhahAHHAHAAH", typeof localEmotions, typeof localUserData)}
                {console.log(localEmotions )}
                {console.log( localUserData)}
                {/* for now requesting the user to limit emotions to either emojis, or less than 6 letters */}
                <EmotionWheel emotions={localEmotions} quotes={localUserData} presetEmotionsIconsObj={null}/>
                <QuoteDisplay />
                </>
            )
        }
      {/* <NavBar />
      <EmotionWheel emotions={localEmotions} userData={localUserData}/>
      <QuoteDisplay />
             */}
    </div>
  )
}

export default MySpace
