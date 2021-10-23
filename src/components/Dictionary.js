import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
// import { SayButton } from 'react-say';
import Card from "@mui/material/Card";
function Dictionary({ lookUp, setLookUp, closeDictionary }) {
  const [wordsArray, setWordsArray] = useState([]);
  const [fontSize, setFontSize] = useState(0);
  const [definition, setDefinition] = useState("");

  useEffect(() => {
    setDefinition("");
    let lookUpWords = lookUp;
    console.log("FIRST", lookUpWords);
    const splitWords = lookUpWords.split(" ");
    const result = splitWords.filter((n) => n !== "");
    setWordsArray(result);

    if (result.length < 7) {
      setFontSize(35);
    } else if (result.length < 20) {
      setFontSize(25);
    } else if (result.length < 100) {
      setFontSize(20);
    } else if (result.length < 120) {
      setFontSize(16);
    } else if (result.length < 130) {
      setFontSize(14);
    } else if (result.length < 300) {
      setFontSize(14);
    } else if (result.length >= 300) {
      alert("too much");
    }

    console.log("fontsize", fontSize);
  }, [lookUp]);

  console.log("These are the words ", wordsArray);

  var synth = window.speechSynthesis;

  const speak = (word) => {
    let utterance = new SpeechSynthesisUtterance(word);
    synth.speak(utterance);
  };
  const handleSpeakClick = () => {
    speak(lookUp);
  };
  const handleSpeakCancel = () => {
    synth.cancel();
  };

  const handleDefine = (e) => {
    setDefinition("");
    console.log("clicked", e.target.textContent);
    const clickedWord = e.target.textContent.toLowerCase();
    console.log("clicked word", clickedWord);

    const punctuation = [",", ".", "?", ";", "/"];

    [...clickedWord].map((letter) => {
      if (punctuation.includes(letter)) {
        console.log(letter);
        const newWord = clickedWord.replace(letter, '')
        console.log("REPLACE", newWord)
        fetchTranslations(newWord)
      } else {
        console.log("fine");
      }
    });

    fetchTranslations(clickedWord);
  };

  const fetchTranslations = (word) => {
    fetch(
      `https://www.dictionaryapi.com/api/v3/references/collegiate/json/${word}?key=b033b3b4-4766-4db1-8f40-6af316839bf5`
    )
      .then((res) => res.json())
      .then((data) => setDefinition(data[0].shortdef[0]));
  };

  return (
    <>
      <Container
        sx={{
          mt: "40px",
          width: "550px",

          backgroundColor: "palette.secondary.light",
          opacity: [0.8, 1, 0.9],
          "&:hover": {
            backgroundColor: "palette.primary.light",
            opacity: [1, 1, 1],
          },
        }}
        style={{
          position: "fixed",
          background: "#222222",
          color: "#ffffe0",
          padding: "10px",
        }}
      >
        <Container
          sx={{
            m: 2,
          }}
        >
          <Button onClick={() => handleSpeakClick()}>Speak</Button>
          <Button onClick={() => handleSpeakCancel()}>Cancel</Button>
          <Button onClick={() => closeDictionary()}>Close Dictionary</Button>
          <Box
            display="flex"
            sx={{
              m: 2,
            }}
          >
            <Container display="flex" alignItems="flex-start">
              <Box sx={{ fontSize: fontSize }}>
                {wordsArray.map((word) => (
                  <span onClick={(e) => handleDefine(e)}>{word} </span>
                ))}

                {definition ? (
                  <Box sx={{ fontSize: 20, color: "light-yellow" }}>
                    <b>Definition: </b>
                    {definition}
                  </Box>
                ) : (
                  <></>
                )}
              </Box>
            </Container>
          </Box>
        </Container>
      </Container>
    </>
  );
}

export default Dictionary;
