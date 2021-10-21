import React, { useState, useEffect } from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Redirect, useHistory, Link } from "react-router-dom";


function Login({ setUser, loggedIn, setLoggedIn }) {
  const [formErrors, setFormErrors] = useState([]);
  const [username, setUsername] = useState([]);
  const [password, setPassword] = useState([]);
  const history = useHistory();

  function handleLogin(event) {
    event.preventDefault();
    event.target.reset();

    const user = { username, password };

    fetch("http://localhost:3000/api/v1/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user }),
    })
      .then((r) => r.json())
      .then((response) => {
        localStorage.token = response.jwt;
        setUser(response.user);
        setLoggedIn(true);
        history.push("/");
      });
  }


  return (
    <>
     
      <Container>
        {loggedIn ? (
          <Redirect to="/" />
        ) : (<>
            <Box sx={{
              p: 2, m: 2, display: "flex", flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center'
            }}>
            <h1>Form</h1>

            <form onSubmit={handleLogin}>
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
                helperText="Enter author"
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
                <Link to="/signup"><Button>Sign up</Button></Link>
            </form>
</Box>
</>
        )}
      </Container>
</>

  );
}

export default Login;
