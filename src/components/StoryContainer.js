import React, { useState, useEffect, useRef, useCallback } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import StoryLines from "./StoryLines.js";

import Button from "@mui/material/Button";
import { useHistory } from "react-router-dom";

import { useParams } from "react-router-dom";

function StoryContainer({ bookId }) {
  console.log("USEPARAMS", bookId);

  const history = useHistory();
  const [toolbar, setToolbar] = useState(false);
  const [book, setBook] = useState({ lines: {} });

  // notes
  const [notes, setNotes] = useState([]);

  //pagination
  const [pageNumber, setPageNumber] = useState(1);
  const [lines, setLines] = useState([]);
  const [hasMore, setHasMore] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [updatedNote, setUpdatedNote] = useState(false);
  const observer = useRef();

  console.log("OBS", observer);

  const lastElementRef = useCallback(
    (node) => {
      console.log("node", node);
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPageNumber((prevPageNumber) => prevPageNumber + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  // useEffect(() => {
  //   setError(false);
  //   fetchBook();
  // }, [notes]);

  // const fetchBook = () => {
  //   fetch(`/books/${bookId}`, {
  //     headers: {
  //       Authorization: `Bearer ${localStorage.token}`,
  //       "Content-Type": "application/json",
  //       Accept: "application/json",
  //     },
  //   })
  //     .then((res) => res.json())
  //     .then((data) => setBook(data));
  // };

  const fetchLines = () => {
    fetch(`http://localhost:3000/linebybook/${bookId}?page=${pageNumber}`, {
      headers: {
        // Authorization: `Bearer ${localStorage.token}`,
        "Content-Type": "application/json",
        Acept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setLines(lines.concat(data));
        setHasMore(data.length > 0);
        setLoading(false);
      });
  };

  const fetchUpdatedLines = () => {
    fetch(`http://localhost:3000/linebybook/${bookId}?page=${1}`, {
      headers: {
        // Authorization: `Bearer ${localStorage.token}`,
        "Content-Type": "application/json",
        Acept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setLines(data);
      });
  };

  console.log("LINES", lines);

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
      .then((note) => {
        setNotes(note);
        setUpdatedNote(true);
        console.log("FETCHED UPDATE LINES", notes)
      })
      .then(formData.id) //fetch where formdata.id (line_id) is === and insert it
     
  };

  useEffect(() => {
    setLoading(true);
    fetchLines();
  }, [pageNumber]);
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
        <Box>
          {" "}
          <Button onClick={showToolbar}> Show Toolbar</Button>
        </Box>

        {lines
          .sort((a, b) => (a.id > b.id ? 1 : -1))
          .map((line, index) => {
            if (lines.length === index + 1) {
              return (
                <div ref={lastElementRef} style={{ display: "inline-flex" }}>
                  <StoryLines
                   key = {line.id}
                    lineObj={line}
                    highlightLine={highlightLine}
                    addNote={addNote}
                    notes={notes}
                    setNotes={setNotes}
                    showToolbar={showToolbar}
                    toolbar={toolbar}
                  />
                </div>
              );
            } else {
              return (
                <div style={{ display: "inline-flex" }}>
                  <StoryLines
                    key={line.id}
                    lineObj={line}
                    highlightLine={highlightLine}
                    addNote={addNote}
                    notes={notes}
                    setNotes={setNotes}
                    showToolbar={showToolbar}
                    toolbar={toolbar}
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
