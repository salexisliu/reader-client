import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Login from "./Login";
import SignUp from "./SignUp";

function UnAuthenticatedApp({ setUser, bg, loggedIn, setLoggedIn }) {

  console.log("NOT LOGGED IN")

  function shuffle(array) {
    let currentIndex = array.length, randomIndex;

    // While there remain elements to shuffle...
    while (currentIndex !== 0) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }

    return array;
  }

  const splitbg = bg
  const backgroundText = shuffle(splitbg)
  const signup = [...backgroundText]
  const loginBGText = shuffle(splitbg).reverse()
  console.log(signup, loginBGText)

  return (

<>
   
    <Switch>
      <Route exact path="/">
          <Login setUser={setUser} bg={bg} loginBGText={loginBGText}  setLoggedIn={setLoggedIn} />
      </Route>
      <Route exact path="/signup">
          <SignUp setUser={setUser} backgroundText={backgroundText} signup= {signup} bg={bg}  />
      </Route>

      <Redirect to="/" />
    </Switch>
    </>
  );
}

export default UnAuthenticatedApp;
