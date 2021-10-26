import React, { useState, useEffect } from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Redirect, Link } from "react-router-dom";

function SignUp({}) {
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

  return (
    <>
      <Container  >
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
                style={{ minHeight: "50vh" }}
                padding={5}
              >
                  <Box bgcolor="gray" >
                  <h1>Form</h1>
                  <form onSubmit={createUser}>
                    <Grid padding={10} container spacing={3}>
                      <Grid item xs={12}>
                        <TextField
                          helperText="Please enter username"
                          margin="normal"
                          id="outlined-basic"
                          label="username"
                          variant="outlined"
                          onChange={(e) => setUsername(e.target.value)}
                        />
                      </Grid>
                      <TextField
                        margin="normal"
                        helperText="Enter password"
                        id="outlined-basic"
                        label="password"
                        variant="outlined"
                        onChange={(e) => setPassword(e.target.value)}
                      />

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
                </Box>
              </Grid>
            </div>
          )}
        </>
      </Container>
    </>
  );
}

export default SignUp;
