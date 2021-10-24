import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import { useHistory } from "react-router-dom";

function BookCard({book, deleteBook}) {
  let history = useHistory();

  function handleClick(id) {
    history.push(`/read/${id}`);
  }

  function handleNotesClick(id) {
    history.push(`/notes/${id}`);
  }

  return (
    <>
      <Grid
        item
        xs={3}>
        <Card sx={{ maxWidth: 200, minHeight: 370 }}>
          <CardActionArea onClick={() => handleClick(book.id)}>
          <CardMedia
            component="img"
            height="200"
              image="https://covers.openlibrary.org/b/id/9157544-L.jpg"
            alt="book cover"
          />
          <CardContent>
            <Typography gutterBottom variant="h6" component="div">
              {book.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {book.author}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary">
              <Button onClick={() => handleNotesClick(book.id)}>See Notes</Button>
          </Button>
            <Button onClick={() => deleteBook(book.id)}>Delete</Button>
        </CardActions>
      </Card>
      </Grid>
        
     
    </>
  );
}

export default BookCard;
