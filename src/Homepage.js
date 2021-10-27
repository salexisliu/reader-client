import { useState, useEffect } from "react";

import Box from "@mui/material/Box";

import Typography from "@mui/material/Typography";

import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";

import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import TextField from "@mui/material/TextField";

import { Button, CardActionArea, CardActions } from "@mui/material";
import { useHistory } from "react-router-dom";
import Tooltip from "@mui/material/Tooltip";

import DeleteIcon from "@mui/icons-material/Delete";
import NoteIcon from "@mui/icons-material/Note";
import EditIcon from "@mui/icons-material/Edit";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

export default function Homepage({ user }) {
  const history = useHistory();
  const [lastText, setLastText] = useState(false);
  const [showBook, setShowBook] = useState([]);

  const today = new Date();
  console.log(today);
  const curHr = today.getHours();
  let greeting = "";
  if (curHr < 12) {
    greeting = "Good morning";
  } else if (curHr < 18) {
    greeting = "Good afternoon";
  } else {
    greeting = "good evening";
  }

  useEffect(() => {
    const saved = localStorage.getItem("bookId");
    const initialValue = JSON.parse(saved);
    setLastText(initialValue);
    return initialValue || false;
  }, []);

  useEffect(() => {
    fetchLastRead();
  }, [lastText]);

  const fetchLastRead = () => {
    fetch(`/books/${lastText}`, {
      headers: {
        Authorization: `Bearer ${localStorage.token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          console.log("NOTHING");
        }
      })
      .then((data) => {
        setShowBook(data);
        console.log("showBook", data);
      });
  };

  console.log("lastText", lastText);

  function handleClick() {
    console.log(lastText);
    history.push(`/read/${lastText}`);
  }

  console.log("INIT", lastText);

  function uploadTextRoute() {
    history.push(`/upload`)
  }

  return (
    <>
      <Grid 
        item xs={4}
        container
        spacing={0}
        direction="column"
        padding= "10px"
        justify="left"
        style={{ minHeight: "100vh" }}
      >
        <Typography className="homepage" variant="h3">
          {" "}
          {greeting}, {user.username}!
        </Typography>
        <Grid item xs={4}>
          <Button onClick={uploadTextRoute} size="large" color="secondary" style={{ maxwidth: "50px", top: "60px" }} variant="contained">Create a new text</Button>
</Grid>
</Grid>
        <Grid
        item xs={8}
        
          spacing={0}
          direction="column"
          alignItems="center"
          style={{ minHeight: "100vh" }}
        >
          {showBook ? (
            <>
              <Typography className="homepage" variant="h5">
                {" "}
                Jump back into <b> {showBook.title}</b>...
              </Typography>
              <Box
                sx={{
                  maxWidth: "600px",
                  padding: "10px",
                }}
              >
                <Card
                  onClick={handleClick}
                  sx={{ minWidth: 200, minHeight: 250, padding: "20px" }}
                >
                  <Typography
                    gutterBottom
                    sx={{
                      color: "#DEDEDE",
                      wordSpacing: "1px",
                      letterSpacing: "1px",
                      lineHeight: 1.7,
                      maxHeight: 100,
                      fontSize: 12,
                      fontWeight: "medium",
                    }}
                    align="justify"
                    variant="body2"
                    color="text.secondary"
                  >
                    {showBook.summary}
                  </Typography>

                  <CardActionArea onClick={handleClick}>
                    <CardContent>
                      <Typography gutterBottom variant="h6" component="div">
                        <span>
                          {showBook.title}
                          <Button size="small" color="primary"></Button>
                        </span>
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {showBook.author}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <CardActions disableSpacing></CardActions>
                </Card>
              </Box>
            </>
          ) : (
            <></>
          )}
        </Grid>
    
    </>
  );
}
