
import { BrowserRouter, Switch, Route } from "react-router-dom";
import StoryContainer from "./components/StoryContainer";
import BookContainer from "./components/BookContainer";
import BookForm from "./components/BookForm";
import NavBar from "./NavBar";
import Box from "@mui/material/Box";

import "./App.css";
import Header from "./Header";

import Homepage from "./Homepage";
import VocabularyPage from "./components/VocabularyPage";

function AuthenticatedApp({ logOut, loggedIn, user }) {
  return (


    <BrowserRouter>
      <div className="App">
        <Header logOut={logOut} />
        <Box sx={{ p: 2, m: 2, display: "flex" }}>
    
            <span>
              <NavBar logOut={logOut} />
            </span>

          <Switch>
            <Route exact path="/read">
              <StoryContainer loggedIn={loggedIn, user} />
            </Route>

            <Route path="/books">
              <BookContainer loggedIn={loggedIn}/>
            </Route>

            <Route path="/upload">
              <BookForm />
            </Route>

            <Route path="/flashcards">
              <VocabularyPage loggedIn={loggedIn}/>
            </Route>

            <Route
              exact
              path="/read/:id"
              render={({ match }) => {
                return <StoryContainer loggedIn={loggedIn} bookId={match.params.id} />;
              }}
            />

            <Route
              exact
              path="/flashcards/:id"
              render={({ match }) => {
                return <VocabularyPage loggedIn={loggedIn} bookId={match.params.id} />;
              }}
            />

            <Route exact path="/">
            <Homepage user={user}/>
              {/* <h1 className="greeting-text">Welcome back {user.username}!</h1> */}
            </Route>
          </Switch>
        </Box>
      </div>
    </BrowserRouter> 

  );
}

export default AuthenticatedApp;
