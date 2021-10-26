import React, { useState, useEffect } from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import { Redirect, Link } from "react-router-dom";

function SignUp({}) {
  const [showPassword, setShowPassword] = useState(false)
  const [errorMessage, setErrorMessage] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [created, setCreated] = useState(false);

  function createUser(event) {
    event.preventDefault();
    event.target.reset();

    let user = {
      username,
      password,
    };

    fetch("http://localhost:3000/api/v1/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ user }),
    })
      .then((r) => r.json())
      .then((response) => {
        if (response.status === "created") {
          setCreated(true);
          setErrorMessage("");
        }
      })
      .catch((response) =>
        setErrorMessage(
          "Uh-oh! It didn't work...Make sure your server is running!"
        )
      );
  }

  const handleClickShowPassword = () => {
  setShowPassword(!showPassword)
  };

  return (
    <>
      <Container>
        <>
          {created ? (
            <Redirect to="/login" />
          ) : (
            <div>
              <div>
                <p>{errorMessage}</p>
              </div>
              <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justify="center"
                display="flex"
                style={{ minHeight: "40vh" }}
                padding={5}
              >
                  <Paper variant="elevation" elevation={2} color="yellow" sx={{justifyContent: "center", 
                  minHeight: "30vh", padding: "30px"}}>
                  <form onSubmit={createUser}>
                    <Grid item>
                      {" "}
                        <Typography>Form</Typography>{" "}
                    </Grid>
                    <Grid container direction="column" padding={5} spacing={2}>
                      <Grid item>
                        <TextField
                          helperText="Please enter username"
                          margin="normal"
                          id="outlined-basic"
                          label="username"
                          variant="outlined"
                          onChange={(e) => setUsername(e.target.value)}
                        />
                      </Grid>
                      <Grid item>
                        <TextField
                          margin="normal"
                          helperText="Enter password"
                            id="outlined-password-input"
                            label="Password"
                          variant="outlined"
                            type="password"
                            autoComplete="current-password"
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </Grid>
                      <Button
                        variant="outlined"
                        size="large"
                        color="primary"
                        type="submit"
                      >
                        Submit
                      </Button>
                    </Grid>
                  </form>

                  <Link to="/login">
                    <Button>Log in</Button>
                  </Link>
                </Paper>
              </Grid>
            </div>
          )}
        </>
      </Container>
    </>
  );
}

export default SignUp;
