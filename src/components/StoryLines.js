import React, { useState, useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import NoteIndex from "./NoteIndex.js";
import TextField from "@mui/material/TextField";

function StoryLines({
  lineObj,
  highlightLine,
  notes,
  addNote,
  showToolbar,
  setNotes,
  toolbar,
}) {
  const [hasNote, setNote] = useState(false);
  const [isHighlighted, setIsHighlighted] = useState(false);
  const [showNote, setShowNote] = useState(false);
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");



  const handleClickOpen = () => {
    setOpen(!open);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAddNote = () => {
    setOpen(false);
    addNote({
      line_id: lineObj.id,
      content: input,
    });
    setNote(true);
  };



  const deleteNote = (id) => {

    fetch(`http://localhost:4000/notes/${id}`, {
      method: "DELETE",
      headers:
      {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.token}`,
        Accept: 'application/json',
      },
    }).then((res) => {
      if (res.ok) {
        const updatedNotes = notes.filter((note) => note.id !== id);
        setNotes(updatedNotes);
        setNote(false);
      }
    });
  };

  const checkIfHighlighted = () => {
    if (lineObj.highlighted == true) {
      setIsHighlighted(true);
    } else {
      console.log("no");
    }
  };

  const checkNote = () => {
    if (lineObj.notes.length === 0) {
    } else {
      setNote(true);
    }
  };

  const toggleNote = () => {
    setShowNote(!showNote);
  };

  useEffect(() => {
    console.log("lineObj", lineObj)
    checkIfHighlighted();
    checkNote();
  }, []);

  function highlight() {
    setIsHighlighted((isHighlighted) => !isHighlighted);
    // showToolbar(); //toggles toolbar
  }

  const handleClick = () => {
    highlight();
    highlightLine({ id: lineObj.id, highlighted: !isHighlighted });
  };

  const handleChangeInput = (event) => {
    const values = event.target.value;
    setInput(values);
  };

  console.log("input", input);
  return (
    <>
      {toolbar ? (
        <>
          <IconButton onClick={handleClick} size="small">
            <BorderColorIcon />
          </IconButton>
          <IconButton variant="outlined" onClick={handleClickOpen} size="small">
            <NoteAddIcon />
          </IconButton>{" "}
        </>
      ) : (
        <></>
      )}

      {open ? (
        //note modal
        <Dialog open={open} onClose={handleClose}>
          <DialogContent>
            <DialogTitle>Add a note</DialogTitle>
            <TextField
              id="outlined-multiline-static"
              label="note"
              multiline
              rows={4}
              defaultValue="write something"
              value={input}
              onChange={(event) => handleChangeInput(event)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleAddNote}>Add</Button>
          </DialogActions>
        </Dialog>
      ) : (
        <></>
      )}
      <>
        {isHighlighted ? (
          <h4 style={{ color: "orange" }} key={ lineObj.id }>{lineObj.content} </h4>
        ) : (
          <h4>{lineObj.content}</h4>
        )}
      </>
      {hasNote ? <Button onClick={toggleNote}>see note</Button> : <></>}
      {showNote ? (
        <h5 style={{ color: "red" }}>
          {lineObj.notes.map((note) => (
            <NoteIndex deleteNote={deleteNote} note={note} />
          ))}
        </h5>
      ) : (
        <></>
      )}
    </>
  );
}

export default StoryLines;
