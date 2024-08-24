import './App.css'
import React, { useEffect, useState, useRef } from 'react';

function App() {
  const wordDivRef = useRef(null);
  const meaningDivRef = useRef(null);
  const partOfSpeechDivRef = useRef(null);
  const phoneticDivRef = useRef(null);
  const skeletonDivRef = useRef(null);
  const appRef = useRef(null);

  const [speech] = useState(new SpeechSynthesisUtterance());
  const [word, setWord] = useState('');

  useEffect(() => {
    getWord();
  }, []);

  const getWord = async () => {
    try {
      const response = await fetch(
        `https://random-word-api.herokuapp.com/word`
      );
      const result = await response.json();
      const word = result[0];
      getMeaning(word);
    } catch (error) {
      console.log(error);
    }
  };

  const getMeaning = async (query) => {
    try {
      const response = await fetch(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${query}`
      );
      const data = await response.json();

      if (data["title"] === "No Definitions Found") {
        getWord();
      } else {
        skeletonDivRef.current.style.display = "none";
        appRef.current.style.display = "grid";
        wordDivRef.current.textContent = query;
        speech.text = query;
        const phonetic = data[0]["phonetic"];
        phoneticDivRef.current.textContent = phonetic;
        const partOfSpeech = data[0]["meanings"][0]["partOfSpeech"];
        partOfSpeechDivRef.current.textContent = partOfSpeech;
        const definitions = data[0]["meanings"][0]["definitions"];
        meaningDivRef.current.textContent = definitions[0]["definition"];

        document.querySelector("#speak").addEventListener("click", () => {
          window.speechSynthesis.speak(speech);
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <nav>
        <h1 id="name">Random Word</h1>
      </nav>
      <div className="skeleton" ref={skeletonDivRef}>
        <div>
          <div className="round"></div>
          <h1></h1>
        </div>
        <p></p>
        <p className="long"></p>
      </div>
      <main id="app" className="non-skeleton" ref={appRef}>
        <section id="container">
          <div className="f-r a-l">
            <button id="speak">
              <svg width="25" height="25" viewBox="0 0 75 75">
                <path
                  d="M39.389,13.769 L22.235,28.606 L6,28.606 L6,47.699 L21.989,47.699 L39.389,62.75 L39.389,13.769z"
                  style={{ stroke: "#111", strokeWidth: 5, strokeLinejoin: "round", fill: "#111" }}
                />
                <path
                  d="M48,27.6a19.5,19.5 0 0 1 0,21.4M55.1,20.5a30,30 0 0 1 0,35.6M61.6,14a38.8,38.8 0 0 1 0,48.6"
                  style={{ fill: "none", stroke: "#111", strokeWidth: 5, strokeLinecap: "round" }}
                />
              </svg>
            </button>
            <h1 ref={wordDivRef}></h1>
          </div>
          <div>
            <p ref={phoneticDivRef}></p>
            <p ref={partOfSpeechDivRef}></p>
            <p ref={meaningDivRef}></p>
          </div>
        </section>
      </main>
    </>
  );
}

export default App;
