import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

function NoteIndex({ note, handleDeleteNote, deleteNote }) {
  return (
    <>
      <Grid>
        <IconButton
          onClick={() => handleDeleteNote(note.id)}
          aria-label="delete"
          size="small"
        >
          <DeleteIcon fontSize="inherit" />
        </IconButton>

        {note.content}
      </Grid>
    </>
  );
}

export default NoteIndex;
