import { useState, useEffect } from "react";
import AuthenticatedApp from "./AuthenticatedApp.js";
import UnAuthenticatedApp from "./UnAuthenticatedApp.js";
import { BrowserRouter as Router } from "react-router-dom";

export default function App() {
  const [user, setUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const [authChecked, setAuthChecked] = useState(false)
  const [bg, setBG] = useState([])


  useEffect(() => {

    fetch("/getbookbg", {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
      .then((res) => res.json())
      .then((books) => {
        setBG(books)
      })
      ;
  }, [])

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
          setAuthChecked(true)
        });
    } else {
      console.log("No token found, try logging in!");
      setAuthChecked(true)
    }
  }, []);


  if (!authChecked) { return <div></div> }
  return (
    <div className = "bg">
      <div>

      {/* {loggedIn !== null && ( */}
        <Router>
          {loggedIn ? (
            
            <AuthenticatedApp bg = {bg} loggedIn={loggedIn} logOut={logOut} user={user} />
          ) : (
            <>
              <UnAuthenticatedApp 
                  bg={bg}
                setUser={setUser}
                loggedIn={loggedIn}
                setLoggedIn={setLoggedIn}
              />
            </>
          )}
        </Router>
     {/* )} */}
      </div>
    </div>
  );
}