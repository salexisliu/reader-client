import React, { useState, useEffect, useRef, useCallback } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import StoryLines from "./StoryLines.js";
import Button from "@mui/material/Button";
import Dictionary from "./Dictionary.js";
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import EditOffIcon from '@mui/icons-material/EditOff';

import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import SpellcheckIcon from '@mui/icons-material/Spellcheck';

function StoryContainer({ bookId, user }) {
  const [toolbar, setToolbar] = useState(false);

  //dicitonary
  const [dictionary, setDictionary] = useState(false);
  const [soundOn, setSoundOn] = useState(false);
  const [defineOn, setDefineOn] = useState(false);
  // notes
  const [notes, setNotes] = useState([]);
  const [noteChanged, setNoteChanged] = useState(false);

  //pagination
  const [pageNumber, setPageNumber] = useState(1);
  const [lines, setLines] = useState([]);
  const [hasMore, setHasMore] = useState(false);
  const [loading, setLoading] = useState(true);
  const observer = useRef();
  const [seeNoteButton, setSeeNoteButton] = useState(false);
  const [lookUp, setLookUp] = useState("");

  const addLookUp = (word) => {
    setLookUp(word);
  };

  const lastElementRef = useCallback(
    (node) => {
      // console.log("node", node);
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          //if the node observer is observing is on the page add 1 to pageNumber
          setPageNumber((prevPageNumber) => prevPageNumber + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  const turnSoundOn = () => {
    setSoundOn(!soundOn);
    console.log("SOUND", soundOn )
  }

  const turnDefineOn = () => {
    setDefineOn(!defineOn);
    console.log("SOUND", defineOn)
  }
  const fetchLines = () => {
    fetch(`http://localhost:3000/linebybook/${bookId}?page=${pageNumber}`, {
      headers: {
        Authorization: `Bearer ${localStorage.token}`,
        "Content-Type": "application/json",
        Acept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setLines(lines.concat(data));
        setHasMore(data.length > 0);
        setLoading(false);
        // console.log("LINES", lines);
      });
  };


  const highlightLine = (formData) => {
    console.log("formData", formData);
    fetch(`/lines/${formData.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.token}`,
        Accept: "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          //  return res.json().then((err) => setFormErrors(err));
          return res
            .json()

            .then((errors) => Promise.reject(errors));
        }
      })
      .then((line) => {
        console.log("PATCH", line);
      });
  };

  const deleteNote = (id) => {
    // setSeeNoteButton(!seeNoteButton)

    fetch(`http://localhost:4000/notes/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.token}`,
        Accept: "application/json",
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((errors) => Promise.reject(errors));
        }
      })
      .then((line) => {
        insertLine(line[0]); //return  whole line
        // setNoteChanged(!noteChanged);
      });
  };

  const addNote = (formData) => {
    console.log("ADD NOTE", formData);
    fetch(`/notes/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.token}`,
        Accept: "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          //  return res.json().then((err) => setFormErrors(err));
          return res
            .json()

            .then((errors) => Promise.reject(errors));
        }
      })
      .then((line) => {
        insertLine(line[0]); //return  whole line
        setNoteChanged(true);
      });
  };

  const insertLine = (line) => {
    console.log("Line with new note", line);

    const oldLine = lines.filter((l) => l.id === line.id);
    const index = lines.indexOf(oldLine[0]);
    lines.splice(index, 1, line);
    const newLines = lines; //splice removed the old line
    setLines(newLines);

    console.log("THIS IS THE LINE", line);
  };

  function getSelectionText(e) {
    e.preventDefault();
    let text = "";
    setDictionary(false);
    text = window.getSelection().toString();
    const newText = text;

    const punctuation = [",", ".", "?", ";", "/", " ", "—", "_"];

    if (newText.trim() === "" || punctuation.includes(newText.trim())) {
      setDictionary(false);
    } else {
      addLookUp(newText);
      setDictionary(true);
    }
  }

  function closeDictionary() {
    setDictionary(false);
  }

  useEffect(() => {
    localStorage.setItem("bookId", JSON.stringify(bookId))
    setLoading(true);
    fetchLines();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageNumber]);


  const showToolbar = () => {
    setToolbar(!toolbar);
  };

  useEffect(() => {
  }, []);
  return (
    <>
      <Box  sx={{
        width: 100,
        top: 80,
        height: 900,
        marginLeft: "200px"}} position="fixed">
        {toolbar ? <Button onClick={showToolbar}><ModeEditIcon sx={{ color: "#f7af9f" }}/></Button>: <Button onClick={showToolbar}> <EditOffIcon color="disabled" /></Button>  }

          {soundOn ? <Button onClick={turnSoundOn}><VolumeUpIcon sx={{color: "#f7af9f"}} /></Button> :
            <Button onClick={turnSoundOn}><VolumeOffIcon color="disabled" /></Button>}

        {defineOn ? <Button onClick={turnDefineOn}><SpellcheckIcon sx={{ color: "#f7af9f" }}/></Button> : <Button onClick={turnDefineOn}><SpellcheckIcon color="disabled" /></Button>}
    
          {dictionary ? (
            <Dictionary
              lookUp={lookUp}
              setLookUp={setLookUp}
              closeDictionary={closeDictionary}
              soundOn={soundOn}
              defineOn={defineOn}
              bookId={bookId}
              user = {user}
            />
          ) : (
            <> </>
          )}{" "}

     
        </Box>
      <Container>
      
        {lines
          .sort((a, b) => (a.id > b.id ? 1 : -1))
          .map((line, index) => {
            if (lines.length === index + 1) {
              return (
                <div ref={lastElementRef} style={{ display: "inline-flex" }}>
                  {noteChanged ? (
                    <div>
                      <StoryLines
                        key={line.id}
                        setNoteChanged={setNoteChanged}
                        lineObj={line}
                        highlightLine={highlightLine}
                        addNote={addNote}
                        notes={notes}
                        setNotes={setNotes}
                        showToolbar={showToolbar}
                        toolbar={toolbar}
                        deleteNote={deleteNote}
                        addLookUp={addLookUp}
                        getSelectionText={getSelectionText}
                        seeNoteButton = {seeNoteButton}
                        setSeeNoteButton = {setSeeNoteButton}
                      />
                    </div>
                  ) : (
                    <div>
                      <StoryLines
                        key={line.id}
                        setNoteChanged={setNoteChanged}
                        lineObj={line}
                        highlightLine={highlightLine}
                        addNote={addNote}
                        notes={notes}
                        setNotes={setNotes}
                        showToolbar={showToolbar}
                        toolbar={toolbar}
                        deleteNote={deleteNote}
                        addLookUp={addLookUp}
                        getSelectionText={getSelectionText}
                        seeNoteButton={seeNoteButton}
                        setSeeNoteButton={setSeeNoteButton}
                      />
                    </div>
                  )}
                </div>
              );
            } else {
              return noteChanged ? (
                <div>
                  <StoryLines
                    key={line.id}
                    setNoteChanged={setNoteChanged}
                    lineObj={line}
                    highlightLine={highlightLine}
                    addNote={addNote}
                    notes={notes}
                    setNotes={setNotes}
                    showToolbar={showToolbar}
                    toolbar={toolbar}
                    deleteNote={deleteNote}
                    addLookUp={addLookUp}
                    getSelectionText={getSelectionText}
                    seeNoteButton={seeNoteButton}
                    setSeeNoteButton={setSeeNoteButton}
                  />
                </div>
              ) : (
                <div>
                  <StoryLines
                    key={line.id}
                    noteChanged={noteChanged}
                    setNoteChanged={setNoteChanged}
                    lineObj={line}
                    highlightLine={highlightLine}
                    addNote={addNote}
                    notes={notes}
                    setNotes={setNotes}
                    showToolbar={showToolbar}
                    toolbar={toolbar}
                    deleteNote={deleteNote}
                    addLookUp={addLookUp}
                    getSelectionText={getSelectionText}
                    seeNoteButton={seeNoteButton}
                    setSeeNoteButton={setSeeNoteButton}
                />
                </div>
              );
            }
          })}

        <div>{loading && "Loading..."}</div>
      </Container>
    </>
  );
}

export default StoryContainer;