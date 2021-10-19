import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

import BookCard from "./BookCard.js";
import BookContainerSearch from "./BookContainerSearch.js";

function BookContainer() {
  const [books, setBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState([]);
  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = () => {
    fetch("/books")
      .then((res) => res.json())
      .then((books) => setBooks(books));
  };

  const deleteBook = (id) => {
    fetch(`books/${id}`, {
      method: "DELETE",
    }).then((res) => {
      if (res.ok) {
        const updatedBooks = books.filter((book) => book.id !== id);
        setBooks(updatedBooks);
      }
    });
  };

  return (
    <>
      <Container>
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
            .map((book) => (
              <BookCard key={book.id} book={book} deleteBook={deleteBook} />
            ))}
        </Grid>
      </Container>
    </>
  );
}

export default BookContainer;
