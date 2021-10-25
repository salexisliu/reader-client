import React, { useState, useEffect, useRef } from "react";
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
import Typography from "@mui/material/Typography";

function StoryLines({
  setNoteChanged,
  noteChanged,
  lineObj,
  highlightLine,
  notes,
  addNote,
  showToolbar,
  setNotes,
  toolbar,
  deleteNote,
  addLookUp,
  getSelectionText
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
    setNoteChanged(false);
    addNote({
      line_id: lineObj.id,
      content: input,
    });
    setNote(true);
  };
  const checkIfHighlighted = () => {
    if (lineObj.highlighted == true) {
      setIsHighlighted(true);
    } else {
    }
  };

  const checkNote = () => {
    if (lineObj.notes.length === 0) {
    } else {
      setNote(!hasNote);
    }
  };

  const toggleNote = () => {
    setShowNote(!showNote);
  };

  useEffect(() => {
    // console.log("lineObj", lineObj)
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

   
  

  

  // console.log("input", input);
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
      <div style={{ display: "inline-flex" }}>
        {isHighlighted ? (
       
          <Typography display="block" style={{ color: "orange" , "text-indent": "2em" }} variant="h5"  gutterBottom onMouseUp={(e) => getSelectionText(e)} key={lineObj.id}>
          
            {lineObj.content}

          </Typography>
        ) : (
            <Typography display= "block" style={{ "text-indent": "2em"}} variant="h5" gutterBottom onMouseUp={(e) => getSelectionText(e)}  >
        
            {lineObj.content}
            </Typography>
        )}
  
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

      {noteChanged ? (
        <h5 style={{ color: "red" }}>
          {lineObj.notes.map((note) => (
            <NoteIndex deleteNote={deleteNote} note={note} />
          ))}
        </h5>
      ) : (
        <></>
      )}
      </div>
    </>
  );
}

export default StoryLines;
