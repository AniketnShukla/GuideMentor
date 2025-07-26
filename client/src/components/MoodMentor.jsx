import React, { useState, useEffect } from 'react';
import useSpeechWordsWithMood from '../hooks/useSpeechWordsWithMood';

export default function MoodMentor({ enabled, presetQuotes }) {
  const { words, mood } = useSpeechWordsWithMood();
  const [quoteObj, setQuoteObj] = useState(null);

  useEffect(() => {
    if (!presetQuotes || !mood || mood === 'neutral') {
      setQuoteObj(null);
      return;
    }
    // Find all quotes for this mood
    const filtered = presetQuotes.filter(q => 
      q.emotion && q.emotion.toLowerCase() === mood.toLowerCase()
    );
    if (filtered.length > 0) {
      const randomIndex = Math.floor(Math.random() * filtered.length);
      setQuoteObj(filtered[randomIndex]);
    } else {
      setQuoteObj(null); // fallback: no quote for this mood
    }
  }, [mood, presetQuotes]);

  if (!enabled) return null;

  return (
    <div>
      {/* Words overlay */}
      <div style={{
        position: 'absolute',
        bottom: 32,
        left: 0,
        right: 0,
        textAlign: 'center',
        color: '#ffe19c',
        fontSize: 28,
        fontWeight: 'bold',
        pointerEvents: 'none',
        userSelect: 'none',
        textShadow: '0 2px 16px #000, 0 0px 1px #ffe19c',
      }}>
        {words.join(' ')}
      </div>
      {/* Mood and Quote */}
      <div style={{
        position: 'absolute', top: 24, right: 32,
        fontSize: 22, color: '#fff', background: '#222b', borderRadius: 10, padding: '10px 26px',
        fontWeight: 700, maxWidth: 400
      }}>
        <div>
          <span style={{ color: '#ffe19c' }}>Mood:</span> {mood.charAt(0).toUpperCase() + mood.slice(1)}
        </div>
        {quoteObj && (
          <div style={{ marginTop: 10, fontWeight: 400, color: '#ffe' }}>
            “{quoteObj.quote}”<br />
            <span style={{ fontSize: 17, color: '#ffe19c' }}>- {quoteObj.author}</span>
          </div>
        )}
        {!quoteObj && (
          <div style={{ marginTop: 10, fontWeight: 400, color: '#888' }}>
            No quote for this mood yet.
          </div>
        )}
      </div>
    </div>
  );
}
