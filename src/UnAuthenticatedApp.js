import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Login from "./Login";
import SignUp from "./SignUp";

function UnAuthenticatedApp({ setUser, loggedIn, setLoggedIn }) {
  console.log("NOT LOGGED IN")
  return (
<>
   
    <Switch>
      <Route exact path="/">
        <Login setUser={setUser} setLoggedIn={setLoggedIn} />
      </Route>
      <Route exact path="/signup">
        <SignUp setUser={setUser} />
      </Route>

      <Redirect to="/" />
    </Switch>
    </>
  );
}

export default UnAuthenticatedApp;
