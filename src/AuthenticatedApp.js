import { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import StoryContainer from "./components/StoryContainer";
import BookContainer from "./components/BookContainer";
import BookForm from "./components/BookForm";
import NavBar from "./NavBar";
import Box from "@mui/material/Box";

import Header from "./Header";

function AuthenticatedApp({ logOut, loggedIn }) {
  return (
    <BrowserRouter>
      <div className="App">
        <Header logOut={logOut} />
        <Box sx={{ p: 2, m: 2, display: "flex" }}>
          <nav>
            <span>
              <NavBar logOut={logOut} />
            </span>
          </nav>
          <Switch>
            <Route exact path="/read">
              <StoryContainer loggedIn={loggedIn} />
            </Route>

            <Route path="/books">
              <BookContainer loggedIn={loggedIn}/>
            </Route>

            <Route path="/upload">
              <BookForm />
            </Route>

            <Route
              exact
              path="/read/:id"
              render={({ match }) => {
                return <StoryContainer loggedIn={loggedIn} bookId={match.params.id} />;
              }}
            />

            <Route path="/">
              <h1>Homepage</h1>
            </Route>
          </Switch>
        </Box>
      </div>
    </BrowserRouter>
  );
}

export default AuthenticatedApp;
