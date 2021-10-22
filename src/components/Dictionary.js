import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Speech from "react-speech";

// import { SayButton } from 'react-say';

function Dictionary({ lookUp, setLookUp, closeDictionary }) {


  const [wordsArray, setWordsArray ] = useState([])

  useEffect(() => {
    let lookUpWords = lookUp
    console.log("FIRST", lookUpWords)
    let newArray = []
    newArray.push(lookUpWords)
 

    setWordsArray(lookUpWords)
    
  }, [wordsArray]);

  console.log("These are the words ", wordsArray)

  var synth = window.speechSynthesis;

  const speak = (word) => {
    let utterance = new SpeechSynthesisUtterance(word);
    synth.speak(utterance);
  };
  const handleSpeakClick = () => {
    speak(lookUp);
  };

  const handleSpeakCancel = () => {
    synth.cancel()

  };


  return (
    <><div style={{position: "fixed", background: "white" }}>
    <h1>{lookUp}</h1>
      <Button onClick={() => handleSpeakClick()}>Speak</Button>
      <Button onClick={() => handleSpeakCancel()}>Cancel</Button>
      <Button onClick={() => closeDictionary()}>Close Dictionary</Button>
    </div>
    </>
  );
}

export default Dictionary;
