import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Login from "./Login";
import SignUp from "./SignUp";

function UnAuthenticatedApp({ setUser, loggedIn, setLoggedIn }) {
  return (
    <Switch>
      <Route exact path="/">
        <Login setUser={setUser} setLoggedIn={setLoggedIn} />
      </Route>
      <Route exact path="/signup">
        <SignUp setUser={setUser} />
      </Route>

      <Route exact path="/login">
        {loggedIn ? (
          <Redirect to="/" />
        ) : (
          <Login
            setUser={setUser}
            loggedIn={loggedIn}
            setLoggedIn={setLoggedIn}
          />
        )}
      </Route>
    </Switch>
  );
}

export default UnAuthenticatedApp;
