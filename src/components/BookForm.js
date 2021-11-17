import React, { useState, useEffect } from "react";

import Container from "@mui/material/Container";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

import Typography from "@mui/material/Typography"
import { Redirect, useHistory, Link } from "react-router-dom";

function BookForm({}) {
  const [bookText, setBookText] = useState("");
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [formErrors, setFormErrors] = useState([]);
  const [linesAttributes, setLinesAttributes] = useState([])
  const history = useHistory();
  const handleSubmitText = (e) => {
    setFormErrors([]);
    e.preventDefault();
    console.log("TITLE", title, "AUTHOR", author)
  
    console.log("FULL TEXT", bookText);


    const summaryText = bookText.substring(0, 400)
    console.log("SUMMARY", summaryText)

    const splitText = bookText.split(/\n/);
    const result = splitText.filter((n) => n !== "");

    console.log("RESULT OF SPLIT", result);

    const obj = result.map(sentence => createSentenceObj(sentence))

    console.log("LINES ATTRIBUTES,", obj)

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
        console.log("fnished", text);
        history.push("/books")
        //  setBookText(bookText.concat(text))
      });
  };

     // for (let i = 0; i < result.length; i++) {
    //     createBook({
    //       content: result[i],
    //       book_id: 7,
    //       position: i,
    //     })
    // }
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
