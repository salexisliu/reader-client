import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import BookCard from "./BookCard.js";
import BookContainerSearch from "./BookContainerSearch.js";
import { BookmarkSharp } from "@mui/icons-material";

function BookContainer(loggedIn) {
  const [books, setBooks] = useState([]);
  const [updated, setUpdated] = useState(false);
  const [searchQuery, setSearchQuery] = useState([]);
  useEffect(() => {
    fetchBooks();
  }, [updated]);

  const fetchBooks = () => {
    fetch("/books", {
      headers: {
        Authorization: `Bearer ${localStorage.token}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
      .then((res) => res.json())
      .then((books) => setBooks(books));
  };

  const deleteBook = (id) => {
    fetch(`books/${id}`, {
      method: "DELETE",
      headers: 
      {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.token}`,
        Accept: 'application/json',
      },
    }).then((res) => {
      if (res.ok) {
        const updatedBooks = books.filter((book) => book.id !== id);
        setBooks(updatedBooks);
      }
    });
  };

  const updateBook = (formData) => {
    fetch(`books/${formData.id}`, {
      method: "PATCH",
      headers:
      {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.token}`,
        Accept: 'application/json',
      },
      body: JSON.stringify(formData),
    })
       .then((r) => (r.json()))
      .then((text) => {
        console.log("replaced", text)
        setUpdated(!updated)

        //  setBookText(bookText.concat(text))
      });
    ;
  };

  const sortByTitle= () => {
    console.log(books)
 
   const newBooks = books.sort(function (a, b) {
      let titleA = a.title.toUpperCase(); // ignore upper and lowercase
      let titleB = b.title.toUpperCase(); // ignore upper and lowercase
      if (titleA < titleB) {
        return -1;
       
      }
      if (titleA > titleB) {
        return 1;
     
      }
    
    })
    setBooks([...newBooks])
  
  }

  const sortByAuthor = () => {
    console.log(books)

    const newBooks = books.sort(function (a, b) {
      let textA = a.author.toUpperCase(); // ignore upper and lowercase
      let textB = b.author.toUpperCase(); // ignore upper and lowercase
      if (textA < textB) {
        return -1;

      }
      if (textA > textB) {
        return 1;

      }

    })
    setBooks([...newBooks])

  }


  const sortByNewest = () => {
    console.log(books)

    const newBooks = books.sort(function (a, b) {
      let textA = new Date(a.created_at);
      let textB = new Date(b.created_at);
      // Compare the 2 dates
      if (textA > textB) return -1;
      if (textA < textB) return 1;
      return 0;
    })
    setBooks([...newBooks])

  }
  const sortByDateCreated = () => {
    console.log(books)

    const newBooks = books.sort(function (a, b) {
      let textA = new Date(a.created_at);
      let textB = new Date(b.created_at);
      // Compare the 2 dates
      if (textA < textB) return -1;
      if (textA > textB) return 1;
      return 0;
    })
    setBooks([...newBooks])

  }

  return (
    <>
      <Container>
        <Typography>Library</Typography>
        <Typography>{books.length} saved texts</Typography>
        <Button onClick={sortByTitle}> Title </Button>
        <Button onClick={sortByAuthor}> Author </Button>
        <Button onClick={sortByNewest}> Newest First </Button>
        <Button onClick={sortByDateCreated}> Date Created </Button>
        <BookContainerSearch
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
        <Grid
          container
          spacing={2}
          direction="row"
          justify="flex-start"
          alignItems="flex-start"
        >
          {books
            .filter((book) => {
              if (searchQuery == "") {
                return book;
              } else if (
                book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                book.author.toLowerCase().includes(searchQuery.toLowerCase())
              ) {
                return book;
              }
        
            })
            .map
            ((book) => (
              <BookCard key={book.id} book={book} updateBook={updateBook} deleteBook={deleteBook} />
            ))
            }
        </Grid>
      </Container>
    </>
  );
}

export default BookContainer;
