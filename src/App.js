import { useState, useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AuthenticatedApp from "./AuthenticatedApp.js";

function App() {
  return (
    <Router>
      <AuthenticatedApp />
    </Router>
  );
}

export default App;
