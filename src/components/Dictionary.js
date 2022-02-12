import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";

function Dictionary({ lookUp, defineOn, setLookUp, closeDictionary, soundOn, bookId }) {
  const [wordsArray, setWordsArray] = useState([]);
  const [fontSize, setFontSize] = useState(0);
  const [definition, setDefinition] = useState("");
  const [term, setTerm] = useState("");
  const [word, setWord] = useState("");
  const [def, setDef] = useState("")

  const speak = (word) => {
    let utterance = new SpeechSynthesisUtterance(word);
    synth.speak(utterance);
  };


  useEffect(() => {
    setDefinition("");
    console.log("TEXTGRABBED", lookUp);
    let clickedWord = lookUp;
    const splitWords = clickedWord.split(" ");
    let result = splitWords.filter((n) => n !== "");

    if (result.length > 1) {
      result = result[0];
      console.log("fetch first word", result);
      fetchDef(result);
      setWord(result.toLowerCase());
      soundOn ? speak(result) : console.log(result);
    } else {
      console.log("CLICKWORD TO STRING", clickedWord);
      const punctuation = [",", ".", "?", ";", "/", " ", "—", "_"];

      // clickedWord.map((letter) => {
      //   if (punctuation.includes(letter)) {
      //     return letter;
      //   } else {
      //     return null;
      //   }
      // }

      // let newWord = clickedWord.replace(letter, "")

      fetchDef(clickedWord.toLowerCase());
      soundOn ? speak(clickedWord) :  console.log(clickedWord);
    }

    // console.log("NEW WORD", newWord)
 
  }, [lookUp]);

  var synth = window.speechSynthesis;
  const clickSpeak = (word) => {
    let utterance = new SpeechSynthesisUtterance(word);
    synth.speak(utterance);
    console.log("UTTER", utterance);
  };

  const handleSpeakClick = () => {
    speak(definition);
  };
  const handleSpeakCancel = () => {
    synth.cancel();
  };

  const handleDefine = (e) => {
   
    setDefinition("");
    console.log("clicked", e.target.textContent);
    const clickedWord = e.target.textContent.toLowerCase();
    console.log("clicked word", clickedWord);

    const punctuation = [",", ".", "?", ";", "/", "—"];

    [...clickedWord].map((letter) => {
      if (punctuation.includes(letter)) {
        console.log(letter);
        const newWord = clickedWord.replace(letter, "");
        console.log("REPLACE", newWord);
        fetchDef(newWord.toLowerCase());
        speak(newWord);
      } else {
        console.log("fine");
      }
    });
    speak(clickedWord);
  };

  const fetchDef = (word) => {
    setTerm(word)
    fetch(
      `https://www.dictionaryapi.com/api/v3/references/collegiate/json/${word}?key=b033b3b4-4766-4db1-8f40-6af316839bf5`
    )
      .then((res) => {
        if (res.ok) { 
          res.json().then((data) => {
        console.log("DIC DEF", data[0]);
        // setDefinition(data);

      
        if (typeof data[0] === 'string') {
              setDefinition("Definition not found!")
        } else if (data[0] === undefined) {
            setDefinition("Definition not found!")
          } else if
           (data[0].shortdef[0]) {
          setDefinition((data[0].shortdef[0]))
            } else {
          setDefinition((data[0].meta.stems[0]))
            }
            if (typeof data[0] !== 'string' && data[0]) {
          createFlashcard(word, data[0].shortdef[0]);
        } else {
          console.log("FC NOT MADE, no word", word);
        }
      })
    }
  });
  };

  const createFlashcard = (word, def) => {
    const cardObject = {
      term: word,
      definition: def,
      book_id: bookId,
    };

    postFlashcard(cardObject);
  };

  const postFlashcard = (obj) => {
    console.log(obj);
    return fetch("/flashcards", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.token}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(obj),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return res
            .json()
            .then((errors) => console.log(errors))
            .then((errors) => Promise.reject(errors));
        }
      })
      .then((card) => console.log("FC CREATED", card));
  };
  return (
    <>
      {defineOn ? (
        <>
          <Container
            sx={{
              mt: "275px",
              width: "550px",
              borderRadius: 3,
              backgroundColor: "palette.secondary.light",
              opacity: [0.8, 1, 0.9],
              "&:hover": {
                backgroundColor: "palette.primary.light",
                opacity: [1, 1, 1],
              },
            }}
            style={{
              position: "fixed",
              left: "610px",
              background: "#222222",
              color: "#ffffe0",
              padding: "5px",
            }}
          >
            <Container
              sx={{
                m: .5,
              }}
            >
              <Button onClick={() => handleSpeakClick()}>Speak</Button>
              <Button onClick={() => handleSpeakCancel()}>Stop</Button>
              <Button onClick={() => closeDictionary()}>
                Close Dictionary
              </Button>
         
                <Container display="flex" alignItems="flex-start">
                
                    {/* <span key={word} onClick={(e) => handleDefine(e)}>
                      {word}{" "}
                    </span> */}

                    <Box sx={{ fontSize: 16, color: "light-yellow" }}>
                  <Typography variant="h6"> {term}</Typography>
                    
                      <Typography variant="h8"> <b>Definition: </b>    {definition}</Typography>
              
                    </Box>
           
                </Container>
            
            </Container>
          </Container>
        </>
      ) : (
        <></>
      )}{" "}
    </>
  );
}

export default Dictionary;
