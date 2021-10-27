
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Redirect, useHistory, Link } from "react-router-dom";
import AuthenticatedApp from "./AuthenticatedApp";
import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from "@mui/material/IconButton";
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import AccountCircle from '@mui/icons-material/AccountCircle';

function Login({ setUser, loggedIn, setLoggedIn, bg}) {
  const [formErrors, setFormErrors] = useState([]);
  const [errorMessage, setErrorMessage] = useState(false);
  const [username, setUsername] = useState([]);
  const [password, setPassword] = useState([]);
  const history = useHistory();
  const [showPassword, setShowPassword] = useState(false)

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword)
  };

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
    }).then((res) => {
      if (res.ok) {
        res.json().then((response) => {
          localStorage.token = response.jwt;
          setUser(response.user);
          setLoggedIn(true);
          history.push("/");
        });
      } else {
        res.json().then((errors) => {
          setFormErrors(errors.message);
          setErrorMessage(true)
          console.log(errors);
        });
      }
    });
  }

  function shuffle(array) {
    let currentIndex = array.length, randomIndex;

    // While there remain elements to shuffle...
    while (currentIndex != 0) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }

    return array;
  }

console.log("BG", bg)

  // setFormErrors(errors.error)});

  return (
    <>
      <Container>
        {loggedIn ? (
          // <Redirect to="/" />
          <AuthenticatedApp/>
        ) : (
            <div>
              <Typography sx={{ color: "white", wordSpacing: "2px", letterSpacing: "2px", lineHeight: 1.7, maxHeight: 100, fontSize: 20, fontWeight: 'medium' }}>
            {shuffle(bg).map(b => b.summary)
               } 


             
               {/* THIS IS RERENDERING EVEY TIME USER TYPES -- SHUFFLE AND SET STATE BEFORE */}
              </Typography>
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

                <Paper variant="elevation" elevation={4} sx={{
                  position: "absolute",
                  marginTop: "-95px",
                  justifyContent: "center",
                  minHeight: "30vh", padding: "30px", backgroundColor: "white", opacity: .8
                }}>
                  <form onSubmit={handleLogin}>
               
                    <Grid container direction="column" padding={5} spacing={2}>
                      <Grid item>
                        {" "}
                        <Typography>Log In</Typography>{" "}
                        {formErrors.length > 0 ? (
                          <p key={formErrors} style={{ color: "red" }}>
                            {formErrors}
                          </p>) : null}
                      </Grid>
                      <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                        <Grid item padding={2}>
                          {errorMessage ? <TextField
                            error
                            margin="normal"
                            id="outlined-basic"
                            label="username"
                            variant="outlined"
                            InputProps={{
                              startAdornment: <InputAdornment position="end"><AccountCircle /></InputAdornment>,
                            }}
                            onChange={(e) => setUsername(e.target.value)}
                          /> : <TextField

                            margin="normal"
                            id="outlined-basic"
                            label="username"
                            variant="outlined"
                            InputProps={{
                              startAdornment: <InputAdornment position="end"><AccountCircle /></InputAdornment>,
                            }}
                            onChange={(e) => setUsername(e.target.value)}
                          />}
                        </Grid>
                        <Grid item padding={2}>
                          {errorMessage ?
                            <OutlinedInput
                              error
                              id="outlined-adornment-password"
                              margin="normal"
                              type={showPassword ? 'text' : 'password'}

                              value={password}
                              startAdornment={
                                <InputAdornment position="start">
                                  <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    // onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                  >
                                    {showPassword ? <Visibility /> : <VisibilityOff />}
                                  </IconButton>
                                </InputAdornment>
                              }

                              onChange={(e) => setPassword(e.target.value)}
                            />
                            :
                            <OutlinedInput

                              id="outlined-adornment-password"
                              margin="normal"
                              type={showPassword ? 'text' : 'password'}

                              value={password}
                              startAdornment={
                                <InputAdornment position="start">
                                  <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    // onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                  >
                                    {showPassword ? <Visibility /> : <VisibilityOff />}
                                  </IconButton>
                                </InputAdornment>
                              }

                              onChange={(e) => setPassword(e.target.value)}
                            />}

                        </Grid>

                      </FormControl>
                      <Button
                        variant="outlined"
                        size="medium"
                        color="primary"
                        type="submit"
                      >
                        Submit
                      </Button>
                    </Grid>
                  </form>

                  <Link to="/Signup">
                    <Button>Sign Up?</Button>
                  </Link>
                </Paper>
              </Grid>
            </div>



          // <>
          //   <Box
          //     sx={{
          //       p: 2,
          //       m: 2,
          //       display: "flex",
          //       flexDirection: "column",
          //       justifyContent: "center",
          //       alignItems: "center",
          //     }}
          //   >
          //     <h1>Log In</h1>
          //     {/* {formErrors.length > 0
          //         ?
          //         <p key={formErrors} style={{ color: "red" }}>
          //           {formErrors}
          //         </p>

          //         : null} */}
          //     {formErrors.length > 0 ? (
          //       <p key={formErrors} style={{ color: "red" }}>
          //         {formErrors}
          //       </p>
          //     ) : null}
          //     <form onSubmit={handleLogin}>
          //       <TextField
          //         helperText="Please enter username"
          //         margin="normal"
          //         id="outlined-basic"
          //         label="username"
          //         variant="outlined"
          //         onChange={(e) => setUsername(e.target.value)}
          //       />

          //       <TextField
          //         margin="normal"
          //         helperText="Enter author"
          //         id="outlined-basic"
          //         label="password"
          //         variant="outlined"
          //         onChange={(e) => setPassword(e.target.value)}
          //       />

          //       <Button
          //         variant="outlined"
          //         size="large"
          //         color="primary"
          //         type="submit"
          //       >
          //         Submit
          //       </Button>
          //       <Link to="/signup">
          //         <Button>Sign up</Button>
          //       </Link>
          //     </form>
          //   </Box>
          // </>
        )}
      </Container>
    </>
  );
}

export default Login;
