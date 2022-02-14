import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { CardActionArea, CardActions } from '@mui/material';
import { useHistory } from "react-router-dom";
import Tooltip from '@mui/material/Tooltip';
import IconButton from "@mui/material/IconButton";
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

        </CardActions>
      </Card>
      </Grid>

    </>
  );
}

export default BookCard;
