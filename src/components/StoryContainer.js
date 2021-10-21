import React, { useState, useEffect, useRef, useCallback } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import StoryLines from "./StoryLines.js";
import Button from "@mui/material/Button";

function StoryContainer({ bookId }) {
  // console.log("USEPARAMS", bookId);

  const [toolbar, setToolbar] = useState(false);
  // const [book, setBook] = useState({ lines: {} });
//   const history = useHistory();


  // notes
  const [notes, setNotes] = useState([]);
  const [noteChanged, setNoteChanged] = useState(false)

  //pagination
  const [pageNumber, setPageNumber] = useState(1);
  const [lines, setLines] = useState([]);
  const [hasMore, setHasMore] = useState(false);
  const [loading, setLoading] = useState(true);
  const observer = useRef();

//id  of lines
  // console.log("OBSERVER", observer);

 

  const lastElementRef = useCallback(
    (node) => {
      // console.log("node", node);
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) { //if the node observer is observing is on the page add 1 to pageNumber
          setPageNumber((prevPageNumber) => prevPageNumber + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

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
        console.log("LINES", lines)
      });
  };

  // const fetchUpdatedLines = () => {
  //   fetch(`http://localhost:3000/linebybook/${bookId}?page=${1}`, {
  //     headers: {
  //       // Authorization: `Bearer ${localStorage.token}`,
  //       "Content-Type": "application/json",
  //       Acept: "application/json",
  //     },
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setLines(data);
  //     });
  // };


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
    fetch(`http://localhost:4000/notes/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.token}`,
        Accept: "application/json",
      },
    }).then((res) => {
      if (res.ok) {
      return res.json()
      } else {
        //  return res.json().then((err) => setFormErrors(err));
        return res
          .json()
          .then((errors) => Promise.reject(errors));
      }
    })
      .then((line) => {
        insertLine(line[0])  //return  whole line
        setNoteChanged(!noteChanged)
      })
    };
  
  // const updatedNotes = lines.filter((line) => line.note.id !== id);
  // setNotes(updatedNotes);
  // setNoteChanged(true);


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
        insertLine(line[0])  //return  whole line
        setNoteChanged(true)
      })
  };

  const insertLine = (line) => {
    console.log("Line with new note", line)

    const oldLine = lines.filter(l => l.id === line.id)
    const index = lines.indexOf(oldLine[0])
    lines.splice(index, 1, line)
    const newLines = lines //splice removed the old line
    setLines(newLines)

    console.log("THIS IS THE LINE", line)
   

  }

  // const insertLineBack = (line) => {
  //   const index = lines.findIndex(line => line.id === lines.id)
  //   console.log("LINEINDEX",index)
  // }

   // const insertBack = (line) => {

  //   const index = lines.findIndex(line => line.id === lines.id)
  //     const newLines = [...lines.slice(0, index), line, ...lines.slice(index + 1)]
  //     setLines(newLines)

  //   }


  useEffect(() => {
    setLoading(true);
    fetchLines();
  }, [pageNumber]);

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

                  {noteChanged ?  <div style={{ display: "inline-flex" }}>
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
                    />
                  </div> :
                  <div style={{ display: "inline-flex" }}>
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
                    />
                  </div>}
                </div>
              );
            } else {
              return (


                noteChanged ?  <div style={{ display: "inline-flex" }}>
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
                  />
                </div> :
                <div style={{ display: "inline-flex" }}>
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

  // const insertBack = (line) => {

  //   const index = lines.findIndex(line => line.id === lines.id)
  //     const newLines = [...lines.slice(0, index), line, ...lines.slice(index + 1)]
  //     setLines(newLines)

  //   }


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