import { useState, useEffect } from "react";

import AuthenticatedApp from "./AuthenticatedApp.js";
import SignUp from "./SignUp";
import Login from "./Login";
import UnAuthenticatedApp from "./UnAuthenticatedApp.js";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";

import AuthDemo from "./AuthDemo";

export default function App() {
  const [user, setUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);

  function setCurrentUser(currentUser) {
    setUser(currentUser);
    setLoggedIn(true);
  }

  function logOut() {
    setUser({});
    setLoggedIn(false);
    localStorage.token = "";
  }

  useEffect(() => {
    const token = localStorage.token;
    if (
      typeof token !== "undefined" &&
      token.length > 1 &&
      token !== "undefined"
    ) {
      fetch("http://localhost:3000/api/v1/autologin", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token }),
      })
        .then((r) => r.json())
        .then((user) => {
          setUser(user);
          setLoggedIn(true);
        });
    } else {
      console.log("No token found, try logging in!");
    }
  }, []);

  return (
    <Router>
      {loggedIn ? (
        <AuthenticatedApp loggedIn = {loggedIn} logOut={logOut} />
      ) : (
        <>
          <UnAuthenticatedApp
            setUser={setUser}
            loggedIn={loggedIn}
            setLoggedIn={setLoggedIn}
          />
        </>
      )}
    </Router>
  );
}

{
  /* <BrowserRouter>
        {loggedIn ? (
          <></>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <span>---||||---</span>
            <Link to="/signup">SignUp</Link>
          </>
        )}

        <Switch>
          <Route exact path="/">
            <p>homepage</p>
          </Route>

          <Route exact path="/login">
            {loggedIn ? (
              <Redirect to="/" />
            ) : (
              <Login setCurrentUser={setCurrentUser} />
            )}
          </Route>

          <Route exact path="/signup">
            {loggedIn ? <Redirect to="/" /> : <SignUp />}
          </Route>

          <Route exact path="/auth">
            <AuthDemo loggedIn={loggedIn} />
          </Route>
        </Switch>
      </BrowserRouter>
  
<Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            News
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
    </Box>  */
}
