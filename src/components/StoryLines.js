import React, { useState, useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import NoteForm from "./NoteForm.js";
import TextField from "@mui/material/TextField";
function StoryLines({ lineObj, highlightLine, showToolbar, toolbar }) {
  const [isHighlighted, setIsHighlighted] = useState(false);
  const [hasNote, setNote] = useState(false);
  const [note, setShowNote] = useState(false);
  const [open, setOpen] = useState(false);
  console.log("open", open);
  const handleClickOpen = () => {
    setOpen(!open);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const checkIfHighlighted = () => {
    if (lineObj.highlighted == true) {
      setIsHighlighted(true);
    } else {
      console.log("no");
    }
  };

  const checkNote = () => {
    if (lineObj.note) {
      console.log(lineObj.note.content);
      setNote(true);
    } else {
      console.log("no");
    }
  };

  const showNote = () => {
    setShowNote(!note);
  };

  useEffect(() => {
    checkIfHighlighted();
    checkNote();
  }, []);

  function highlight() {
    setIsHighlighted((isHighlighted) => !isHighlighted);
    // showToolbar();
  }

  const handleClick = () => {
    highlight();
    highlightLine({ id: lineObj.id, highlighted: !isHighlighted });
  };

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
        <Dialog open={open} onClose={handleClose}>
          <DialogContent>
            <DialogTitle>Add a note</DialogTitle>
            <TextField
              id="outlined-multiline-static"
              label="note"
              multiline
              rows={4}
              defaultValue="write something"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleClose}>Add</Button>
          </DialogActions>
        </Dialog>
      ) : (
        <></>
      )}

      {isHighlighted ? (
        <h3 style={{ color: "violet" }}>
          {lineObj.id} {lineObj.content}
        </h3>
      ) : (
        <h3>
          {lineObj.id} {lineObj.content}
        </h3>
      )}
      {hasNote ? <Button onClick={showNote}>see note</Button> : <></>}
      {note ? <h5 style={{ color: "red" }}>{lineObj.note.content}</h5> : <></>}
    </>
  );
}

export default StoryLines;
