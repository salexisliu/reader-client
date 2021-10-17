import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import StoryLines from "./StoryLines.js";
import IconButton from "@mui/material/IconButton";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import Button from "@mui/material/Button";
import { useHistory } from "react-router-dom";

function StoryContainer() {
  const history = useHistory();
  const [toolbar, setToolbar] = useState(false);
  const [lines, setLines] = useState([]);
  const [notes, setNotes] = useState([]);
  const [book, setBook] = useState({lines:{}});

  useEffect(() => {
    fetchBook();
  }, [notes]);

  const fetchBook = () => {
    fetch(`/books/${2}`)
      .then((res) => res.json())
      .then((data) => setBookandLines(data))
  };

  const setBookandLines = (data) => {
    setBook(data)
    setLines(data.lines)
  }


  // useEffect(() => {
  //   fetchLines();
  // }, [notes]);

  // const fetchLines = () => {
  //   fetch("/lines")
  //     .then((res) => res.json())
  //     .then((data) => console.log(data));
  // };

  const highlightLine = (formData) => {
    console.log("formData", formData);
    fetch(`/lines/${formData.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
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
        console.log(line);
      });
  };

  const addNote = (formData) => {
    console.log("formData", formData);
    fetch(`/notes/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
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
      .then((note) => {
        setNotes(note);
      });
  };

  // const insertBack = (line) => {

  //   const index = lines.findIndex(line => line.id === lines.id)
  //     const newLines = [...lines.slice(0, index), line, ...lines.slice(index + 1)]
  //     setLines(newLines)

  //   }

  const showToolbar = () => {
    setToolbar(!toolbar);
  };

  return (
    <>
      <Container>
        <Button onClick={showToolbar}> Show Toolbar</Button>

        <h2 style={{ padding: "10px" }}>{book.title}</h2>

        {lines
        .sort((a, b) => (a.id > b.id ? 1 : -1))
          .map((line) => (
            <>
              <div style={{ display: "inline-flex" }}>
                <StoryLines
                  lineObj={line}
                  highlightLine={highlightLine}
                  addNote={addNote}
                  notes={notes}
                  setNotes={setNotes}
                  showToolbar={showToolbar}
                  toolbar={toolbar}
                />
              </div>
            </>
          ))}
    
      </Container>
    </>
  );
}

export default StoryContainer;
