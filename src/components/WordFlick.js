"use client";
import { useState, useEffect } from "react";

const WordFlick = () => {
  const words = [
    "Hi, I like HTML5",
    "I also like CSS",
    "Lorem ipsum dolor sit amet",
    "Consectetur adipiscing elit",
    "Sed do eiusmod tempor incididunt",
  ];

  const [index, setIndex] = useState(0);
  const [offset, setOffset] = useState(0);
  const [forwards, setForwards] = useState(true);
  const [displayedWord, setDisplayedWord] = useState("");

  useEffect(() => {
    let skipCount = 0;
    const skipDelay = 15;
    const speed = 70;

    const interval = setInterval(() => {
      if (forwards) {
        if (offset >= words[index].length) {
          skipCount++;
          if (skipCount === skipDelay) {
            setForwards(false);
            skipCount = 0;
          }
        }
      } else {
        if (offset === 0) {
          setForwards(true);
          setIndex((prevIndex) => (prevIndex + 1) % words.length);
          setOffset(0);
        }
      }

      setDisplayedWord(words[index].substring(0, offset));

      if (skipCount === 0) {
        setOffset((prevOffset) => (forwards ? prevOffset + 1 : prevOffset - 1));
      }
    }, speed);

    return () => clearInterval(interval);
  }, [offset, forwards, index]); // Dependencies update the effect

  return (
    <div className="word-container">
      <h1 className="word">{displayedWord}</h1>
      <style jsx>{`
        .word-container {
          display: flex;
          height: 100vh;
          background-color: #333;
          justify-content: center;
          align-items: center;
        }
        .word {
          color: white;
          font: 700 normal 2.5em "Tahoma";
          text-shadow: 5px 2px #222324, 2px 4px #222324, 3px 5px #222324;
        }
      `}</style>
    </div>
  );
};

export default WordFlick;
