import { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import StoryContainer from "./components/StoryContainer"
import BookContainer from "./components/BookContainer"
import BookForm from "./components/BookForm"
import NavBar from "./NavBar"
import Box from '@mui/material/Box';



function AuthenticatedApp() {



  return (
    <BrowserRouter>
      <div className="App">
        <Box sx={{ p: 2, m: 2, display: 'flex' }}>

          <nav>
            <span>
              <NavBar />
            </span>
          </nav>

          <Switch>
            <Route exact path="/read">
              <StoryContainer />
            </Route>

            <Route path="/books">
              <BookContainer />
            </Route>

            <Route path="/upload">
              <BookForm />
            </Route>

            <Route exact path="/read/:id"
              render={({ match }) => { return <StoryContainer bookId={match.params.id} /> }} />

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
