import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import useSpeechWordsWithMood from './../../hooks/useSpeechWordsWithMood'
import './../../Home.css'

const QuoteDisplay = ({ mentorOn, presetQuotes }) => {
  const author = useSelector((state) => state.quote.author)
  const quote = useSelector((state) => state.quote.quote)

  // Mentor logic
  const { words, mood } = useSpeechWordsWithMood();
  const [quoteObj, setQuoteObj] = useState(null);

  useEffect(() => {
    console.log('[Mentor] mentorOn:', mentorOn)
    console.log('[Mentor] mood:', mood)
    console.log('[Mentor] presetQuotes:', presetQuotes)

    if (!mentorOn) {
      console.log('[Mentor] Mentor is OFF')
      setQuoteObj(null)
      return
    }

    if (!presetQuotes || !mood || mood === 'neutral') {
      console.log('[Mentor] No quotes OR mood is missing/neutral')
      setQuoteObj(null)
      return
    }

    const filtered = presetQuotes.filter(q =>
      q.emotion && q.emotion.toLowerCase() === mood.toLowerCase()
    );
    console.log('[Mentor] Filtered quotes for mood:', mood, filtered)

    if (filtered.length > 0) {
      const randomIndex = Math.floor(Math.random() * filtered.length);
      console.log('[Mentor] Selected quote:', filtered[randomIndex])
      setQuoteObj(filtered[randomIndex]);
    } else {
      console.log('[Mentor] No quote found for this mood!')
      setQuoteObj(null);
    }
  }, [mentorOn, mood, presetQuotes]);

  // Always log what's being rendered
  console.log('[Mentor] Rendering:', mentorOn && quoteObj ? quoteObj : { quote, author })

  return (
    <div className='emotion-text' style={{ position: 'relative' }}>
      {/* Mentor words overlay (optional, only if mentorOn) */}
      {mentorOn && (
        <div style={{
          position: 'absolute',
          bottom: '-2.5em',
          left: 0,
          right: 0,
          textAlign: 'center',
          color: '#ffe19c',
          fontSize: 22,
          fontWeight: 'bold',
          pointerEvents: 'none',
          userSelect: 'none',
          textShadow: '0 2px 16px #000, 0 0px 1px #ffe19c',
        }}>
          {words.join(' ')}
        </div>
      )}
      {/* Show Mentor quote if enabled, else normal */}
      {mentorOn && quoteObj ? (
        <>
          <h3>“{quoteObj.quote}”</h3>
          <h4>- {quoteObj.author}</h4>
          <div style={{ color: '#ffe19c', marginTop: 8, fontSize: 16 }}>
            Mood: {mood && mood.charAt(0).toUpperCase() + mood.slice(1)}
          </div>
        </>
      ) : (
        <>
          <h3>{quote}</h3>
          <h4>{author}</h4>
        </>
      )}
    </div>
  )
}

export default QuoteDisplay
