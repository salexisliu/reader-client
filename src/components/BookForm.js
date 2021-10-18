import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { ConstructionOutlined } from "@mui/icons-material";

function BookForm({}) {
  const [bookText, setBookText] = useState("");
  const [formErrors, setFormErrors] = useState([]);
 

  const handleSubmitText = (e) => {
    setFormErrors([]);
    // setBookText("")
    e.preventDefault();

    console.log("input", bookText);

    const splitText = bookText.split(/\n/);
    const result = splitText.filter((n) => n !== "");

    result.map((p) =>
      createLine({
        content: p,
        book_id: 7,
      })
    );
  };


  const createLine = (formData) => {
    fetch("/lines", {
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
            .then((errors) => setFormErrors(errors.title))
            .then((errors) => Promise.reject(errors));
        }
      })
      .then((text) => {
        console.log(text);
        //  setBookText(bookText.concat(text))
      });
  };

  return (
    <>
      <Container>
        <Box
          sx={{
            m: 1,
            width: "70ch",
          }}
        >
          <h1>Form</h1>

          <TextField
            helperText="Please enter title"
            margin="normal"
            id="outlined-basic"
            label="Outlined"
            variant="outlined"
          />

          <TextField
            margin="normal"
            helperText="Enter author"
            id="outlined-basic"
            label="Outlined"
            variant="outlined"
          />

          <form onSubmit={handleSubmitText}>
            <TextField
              fullWidth
              id="outlined-textarea"
              margin="normal"
              multiline
              rows={12}
              label="Enter a title..."
              value={bookText} //from name
              onChange={(e) => setBookText(e.target.value)}
            />
            <Button
              variant="outlined"
              size="large"
              color="primary"
              type="submit"
            >
              Submit
            </Button>
          </form>
        </Box>
      </Container>
    </>
  );
}

export default BookForm;
