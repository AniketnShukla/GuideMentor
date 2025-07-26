// File: src/hooks/useSpeechWordsWithMood.js
import { useEffect, useState, useRef } from 'react';
const supportedMoods = [
  "angry",
  "overwhelmed",
  "frustrated",
  "insecure",
  "lonely",
  "sad",
  "fear",
  "jealous",
  "lacking_motivation",
  "procrastinating",
  "gloomy"
];
const moodWords = {
  happy: ["happy","love","great","excited","fun","amazing","joy","yay","awesome","cool","enjoy","like","peaceful","calm"],
  sad: ["sad","tired","bored","hate","angry","upset","frustrated","annoyed","stress","anxious","cry","bad","depressed"],
  energetic: ["hype","excited","go","run","fast","jump","crazy","wild","move","dance"],
  calm: ["calm","peace","quiet","relax","slow","gentle","chill","soft","rest"]
};
const moodKeywords = {
  angry: [
    "angry","anger","mad","furious","rage","irritated","annoyed","resentful","enraged","pissed"
  ],
  overwhelmed: [
    "overwhelmed","overload","overburdened","swamped","drowning","stressed out","too much","can't handle"
  ],
  frustrated: [
    "frustrated","frustration","blocked","stuck","irritated","fed up","exasperated","discouraged"
  ],
  insecure: [
    "insecure","self-doubt","uncertain","unsure","inferior","unworthy","not good enough","doubt myself"
  ],
  lonely: [
    "lonely","alone","isolated","abandoned","left out","solitude","by myself","friendless"
  ],
  sad: [
    "sad","down","unhappy","depressed","gloomy","tearful","miserable","cry","heartbroken","blue"
  ],
  fear: [
    "fear","afraid","scared","terrified","anxious","anxiety","worry","panic","nervous","frightened"
  ],
  jealous: [
    "jealous","envy","envious","resentful","covet","green with envy","wish I had"
  ],
  lacking_motivation: [
    "unmotivated","lazy","procrastinate","uninspired","don't care","don't want to","not interested","no drive"
  ],
  procrastinating: [
    "procrastinate","delay","postpone","put off","later","stalling","avoiding","not now"
  ],
  gloomy: [
    "gloomy","dark","cloudy","dreary","bleak","hopeless","gray","overcast"
  ]
};

function guessMood(words) {
  // Only check the last 20 spoken words
  console.log('[Mentor] words:', words)

  const last20 = words.slice(-20);
  const scores = {};
  supportedMoods.forEach(mood => scores[mood] = 0);

  last20.forEach(w => {
    Object.entries(moodKeywords).forEach(([mood, keywords]) => {
      if (keywords.includes(w)) scores[mood]++;
    });
  });

  // Return mood with max score, or 'neutral' if all zero
  let maxMood = "neutral";
  let max = 0;
  Object.entries(scores).forEach(([mood, score]) => {
    if (score > max) { max = score; maxMood = mood; }
  });
  return max > 0 ? maxMood : "neutral";
}
console.log("[MentorHook] useSpeechWordsWithMood mounted");
export default function useSpeechWordsWithMood() {
  console.log("[MentorHook] useSpeechWordsWithMood mounted");
  const [words, setWords] = useState([]);
  const [history, setHistory] = useState([]);
  const [mood, setMood] = useState("neutral");
  const latestTranscriptRef = useRef('');
  const debounceTimer = useRef();

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('Speech recognition not supported in this browser.');
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-US";

    recognition.onresult = (event) => {
      let current = '';
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        const t = event.results[i][0].transcript;
        if (t.length > current.length) current = t;
      }
      if (current !== latestTranscriptRef.current) {
        latestTranscriptRef.current = current;
        const liveWords = current
          .toLowerCase()
          .split(/\W+/)
          .filter(Boolean);
        setWords(liveWords.slice(-7));
        setHistory(h => {
          const next = [...h, ...liveWords];
          const sliced = next.slice(-300);
          setMood(guessMood(sliced));
          return sliced;
        });
      }
      clearTimeout(debounceTimer.current);
      debounceTimer.current = setTimeout(() => setWords([]), 3000);
    };

    recognition.onend = () => {
      try { recognition.start(); } catch {}
    };

    recognition.start();

    return () => {
      recognition.onend = null;
      recognition.stop();
      clearTimeout(debounceTimer.current);
    };
  }, []);

  return { words, mood };
}
