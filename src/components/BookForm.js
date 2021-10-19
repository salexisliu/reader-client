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
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [formErrors, setFormErrors] = useState([]);
  const [linesAttributes, setLinesAttributes] = useState([])

  // {
  //   "title": "Alice in Wonderland2",
  //     "summary": "a short story",
  //       "author": "Lewis Carroll",
  //         "user_id": 5,
  //           "lines_attributes": [
  //             {
  //               "content": "Alice was beginning to get very tired of sitting by her sister on the bank, and of having nothing to do: once or twice she had peeped into the book her sister was reading, but it had no pictures or conversations in it, “and what is the use of a book,” thought Alice “without pictures or conversations?"
  //             },
  //             {
  //               "content": "So she was considering in her own mind (as well as she could, for the hot day made her feel very sleepy and stupid), whether the pleasure of making a daisy-chain would be worth the trouble of getting up and picking the daisies, when suddenly a White Rabbit with pink eyes ran close by her."
  //             },
  //           }

  const handleSubmitText = (e) => {
    setFormErrors([]);
    e.preventDefault();
    console.log("TITLE", title, "AUTHOR", author)
  
    console.log("FULL TEXT", bookText);

    const splitText = bookText.split(/\n/);
    const result = splitText.filter((n) => n !== "");

    console.log("RESULT OF SPLIT", result);

    const obj = result.map(sentence => createSentenceObj(sentence))

    console.log("LINES ATTRIBUTES,", obj)

    createBook({
      title: title,
      author: author,
      user_id: 5,
      lines_attributes: obj
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
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
      .then((r) => (r.json()))
      .then((text) => {
        console.log("fnished", text);

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
          <h1>Form</h1>
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
            </>
          </form>
        </Box>
      </Container>
    </>
  );

}

export default BookForm;
