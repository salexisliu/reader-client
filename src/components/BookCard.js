import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import { useHistory } from "react-router-dom";
import Tooltip from '@mui/material/Tooltip';
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import NoteIcon from '@mui/icons-material/Note';
import EditIcon from '@mui/icons-material/Edit';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

function BookCard({book, deleteBook, updateBook}) {

  const [title, setTitle] = useState("")

  const [clickedUpdate, setClickedUpdate] = useState(false)
  let history = useHistory();

  function handleClick(id) {
    history.push(`/read/${id}`);
  }
  function handleEditClick(id) {
   console.log("ONCLICK", id);
  }

  function handleNotesClick(id) {
    history.push(`/notes/${id}`);
  }

  function handleUpdateClick(e, id) {
    e.stopPropagation();
    console.log("clicked")
    setClickedUpdate(!clickedUpdate)
  }


const handleUpdate = (e) => {

console.log(title)
  console.log(book.id)
console.log("2", book.author)

 updateBook({
    id: book.id,
   title: title,
 author: book.author
 })
setClickedUpdate(!clickedUpdate)
}  

  const clickedAction = () => {
    clickedUpdate ? handleEditClick(book.id) :  handleClick(book.id)
  
  }

  return (
    <>
      <Grid
        item
        xs={4}>
          
        <Card onClick={clickedAction} sx={{ minWidth: 200, maxHeight: 260, minHeight:260, padding: "5px"}}>
          <Tooltip title="Delete Text">

            <IconButton sx={{ float: 'right', color: "#333333", backgroundColor: 'transparent' }} onClick={(e) => deleteBook(book.id, e)}><HighlightOffIcon className={"buttonCSS"}/></IconButton>
          </Tooltip>
          <Typography gutterBottom sx={{ color: "#DEDEDE", wordSpacing: "1px", letterSpacing: "1px", lineHeight: 1.7, maxHeight: 100, fontSize: 12, fontWeight: 'medium' }} align="justify" variant="body2" color="text.secondary">
            {book.summary}
          </Typography>
         

        <CardActionArea onClick={clickedAction}> 
          {/* <CardMedia
            component="img"
            height="200"
            image="https://covers.openlibrary.org/b/id/9157544-L.jpg"
            alt="book cover"
          /> */}
            <CardContent>
            
              <Typography gutterBottom variant="h6" component="div">
             <span>
                  {clickedUpdate ? 
                    <form onSubmit={handleUpdate}><TextField
                    name="word"
                    variant="standard"
                      label={book.title}
                    value={title} //from name
                    onChange={(e) => setTitle(e.target.value)}
                    type="text"
                  /></form>
                  : <> {book.title} </> }
                  <Tooltip title="Edit Title">

                  <IconButton onClick={(e) => handleUpdateClick(e, book.id)}><EditIcon className={"buttonCSS"} sx={{ color: "#333333"}} fontSize="small"/></IconButton>
              </Tooltip>
               </span>
            </Typography>
              <Typography  variant="body2" color="text.secondary">
              {book.author}
            </Typography>
             
            
          </CardContent>
        </CardActionArea>
          <CardActions disableSpacing>

            {/* <Tooltip title="See Notes">
          <Button size="small" color="primary">
              <Button onClick={() => handleNotesClick(book.id)}><NoteIcon /></Button>
          </Button>
          </Tooltip> */}
         
       
          
       
        </CardActions>
      </Card>
      </Grid>
        
     
    </>
  );
}

export default BookCard;
