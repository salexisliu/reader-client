import React, { useState, useEffect } from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import { Redirect, Link, useHistory } from "react-router-dom";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from "@mui/material/IconButton";
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import AccountCircle from '@mui/icons-material/AccountCircle';

function SignUp({ setUser, bg, signup, backgroundText}) {
  const [formErrors, setFormErrors] = useState([]);
  const history = useHistory()
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
      .then((res) => {
        if (res.ok) {
          res.json().then((user) => {
          // setCreated(true);
          setErrorMessage("");
            setUser(user)
            setCreated(true)
         
          console.log("working");
          });
        }
        else {
          res.json()
          .then(errors => {
            setFormErrors(errors.error);
            setErrorMessage(errors.error)
            console.log(errors.error)
          });
        }
      })
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
               
                <Typography sx={{ color: "#CECECE", wordSpacing: "2px", letterSpacing: "1px", lineHeight: 1.7, maxHeight: 100, fontSize: 20, fontWeight: 'medium' }}>
                  {
                    signup.map(b => b.summary)
                  }
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
                    minHeight: "30vh", padding: "30px", backgroundColor:"#D3D3D3", opacity: .8}}>
                    <Typography textAlign="center" variant="h2">reader</Typography>
                  <form onSubmit={createUser}>
                   
                    <Grid container direction="column" padding={5} spacing={2}>
                        <Grid item>
                          {" "}
                          <Typography>Sign Up</Typography>{" "}
                          {formErrors.length > 0 ? (
                            <p key={formErrors} style={{ color: "red" }}>
                              {formErrors.map(msg => (<li>{msg}</li>))}
                            </p>) : null}
                        </Grid>
                 
                        <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                          <Grid item padding={2}>
                            {errorMessage ? <TextField
                            error
                              margin="normal"
                              id="outlined-basic"
                           
                              variant="outlined"
                              InputProps={{
                                startAdornment: <InputAdornment position="end"><AccountCircle /></InputAdornment>,
                              }}
                              onChange={(e) => setUsername(e.target.value)}
                            /> : <TextField

                              margin="normal"
                              id="outlined-basic"
                          
                              variant="outlined"
                              InputProps={{
                                startAdornment: <InputAdornment position="end"><AccountCircle /></InputAdornment>,
                              }}
                              onChange={(e) => setUsername(e.target.value)}
                            /> }
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
