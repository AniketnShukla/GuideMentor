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

function MySpace() {
  const navigate = useNavigate();
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
  //userdata is userquotedata
        const getUserData = async() => {   
            axios.post(`${import.meta.env.VITE_SERVER_URL}/user/emotion`, {
                currentUser: currentUser
            })
            .then((response)=>{
                console.log(response.data?.quoteData);
                setLocalUserData(response.data?.quoteData)
                setLocalEmotions(response.data?.emotionData)
                // dispatch(setUserData(response.data))
                // dispatch(setUserEmotions(response.data))
            })
            .catch((e)=>{
                console.log(e);
            })
        }
        getUserData();
  },[])
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
      <NavBar />
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
                <EmotionWheel emotions={localEmotions} userData={localUserData}/>
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
