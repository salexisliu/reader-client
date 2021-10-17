import { useState, useEffect } from "react";
import { BrowserRouter as Router } from 'react-router-dom'
import AuthenticatedApp from "./AuthenticatedApp.js";


function App() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    fetch("/lines")
      .then((r) => r.json())
      .then((data) => setCount(data.count));
  }, []);

  return (
    <Router>
     
        <AuthenticatedApp/>
  
    </Router>
  );
}

export default App;
