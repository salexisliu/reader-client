import React, { useState } from "react";

import Container from "@mui/material/Container";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

import Typography from "@mui/material/Typography"
import { useHistory } from "react-router-dom";

function BookForm() {
  const [bookText, setBookText] = useState("");
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  // const [formErrors, setFormErrors] = useState([]);
  const history = useHistory();
  const handleSubmitText = (e) => {
    // setFormErrors([]);
    e.preventDefault();

    const summaryText = bookText.substring(0, 400)
    const splitText = bookText.split(/\n/);
    const result = splitText.filter((n) => n !== "");
    const obj = result.map(sentence => createSentenceObj(sentence))

    createBook({
      title: title,
      author: author,
      lines_attributes: obj,
      summary: summaryText
    })

   }

  function createSentenceObj(sentence) {
    return {
      content: sentence
    }
  }

  const createBook = (formData) => {
    console.log("FORMDATA", formData)
      fetch("/books", {
        method: "POST",
        headers: {
            Authorization: `Bearer ${localStorage.token}`,
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
        body: JSON.stringify(formData),
      })
      .then((r) => (r.json()))
      .then((text) => {
        history.push("/books")
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
          <Typography>Upload </Typography>
          <form onSubmit={handleSubmitText}>
            <>
          <TextField
            helperText="Please enter title"
            margin="normal"
            id="outlined-basic"
            label="Title"
            variant="outlined"
            onChange={(e) => setTitle(e.target.value)}
          />

          <TextField
            margin="normal"
            helperText="Enter author"
            id="outlined-basic"
            label="Author"
            variant="outlined"
            onChange={(e) => setAuthor(e.target.value)}
          />

          
            <TextField
              fullWidth
              id="outlined-textarea"
              margin="normal"
              multiline
              rows={12}
              label="Enter text..."
              value={bookText} 
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
            </>
          </form>
        </Box>
      </Container>
    </>
  );

}

export default BookForm;
