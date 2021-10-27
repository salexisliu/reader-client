import { useState, useEffect } from "react";


import Box from "@mui/material/Box";

import Typography from "@mui/material/Typography";

import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";

import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import TextField from '@mui/material/TextField';

import { Button, CardActionArea, CardActions } from '@mui/material';
import { useHistory } from "react-router-dom";
import Tooltip from '@mui/material/Tooltip';

import DeleteIcon from "@mui/icons-material/Delete";
import NoteIcon from '@mui/icons-material/Note';
import EditIcon from '@mui/icons-material/Edit';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';




export default function Homepage({ user}) {
  const history = useHistory();
  const [lastText, setLastText] = useState(false)
  const [showBook, setShowBook] = useState([])



  useEffect(() => {
    const today = new Date()
    console.log(today)
    const curHr = today.getHours()

    if (curHr < 12) {
      console.log('good morning')
    } else if (curHr < 18) {
      console.log('good afternoon')
    } else {
      console.log('good evening')
    }


    const saved = localStorage.getItem("bookId");
    const initialValue = JSON.parse(saved);
    setLastText(initialValue)
    return initialValue || false;
  }, []);

  useEffect(() => {
    fetchLastRead();
  }, [lastText]);

  const fetchLastRead = () => {
    fetch(`/books/${lastText}`, {
      headers: {
        Authorization: `Bearer ${localStorage.token}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json()
        }
        else {
          console.log("NOTHING")
        }})
      .then((data) => {
        setShowBook(data)
        console.log("showBook", data)
      }
      );
  };

console.log("lastText", lastText)

  function handleClick() {
    console.log(lastText)
    history.push(`/read/${lastText}`);
  }

  console.log("INIT", lastText)



  return (
<Container padding={5}>
      <Typography variant="h3"> Good Morning {user.username}!</Typography>
 

     {showBook ? <>
        <Typography variant="h4"> Jump Back in to  {showBook.title}</Typography>
        <Card onClick={handleClick} sx={{ minWidth: 200, minHeight: 250, padding: "5px" }}>

            <Typography gutterBottom sx={{ color: "#DEDEDE", wordSpacing: "1px", letterSpacing: "1px", lineHeight: 1.7, maxHeight: 100, fontSize: 12, fontWeight: 'medium' }} align="justify" variant="body2" color="text.secondary">
              {showBook.summary}
            </Typography>
        <CardActionArea onClick={handleClick}>
        
            <CardContent>

              <Typography gutterBottom variant="h6" component="div">
                <span>
                {showBook.title} 
                  <Button size="small" color="primary">
        
                  </Button></span>
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {showBook.author}
              </Typography>


            </CardContent>
          </CardActionArea>
          <CardActions disableSpacing>


          </CardActions>
        </Card> </> : <></>
   
        }
       

</Container>
  )
}



