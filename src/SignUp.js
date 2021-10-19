import React, { useState, useEffect } from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Redirect } from "react-router-dom";

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
      <Container>
        <>
          {created ? (
            <Redirect to="/login" />
          ) : (
            <div>
              <div className="please-log-in">
                <p>{errorMessage}</p>
              </div>

              <Box
                sx={{
                  m: 1,
                  width: "70ch",
                }}
              >
                <h1>Form</h1>
                <form onSubmit={createUser}>
                  <>
                    <TextField
                      helperText="Please enter username"
                      margin="normal"
                      id="outlined-basic"
                      label="username"
                      variant="outlined"
                      onChange={(e) => setUsername(e.target.value)}
                    />

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
                  </>
                </form>
              </Box>
            </div>
          )}
        </>
      </Container>
    </>
  );
}

export default SignUp;
