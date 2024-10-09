// src/App.jsx
import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./components/Login";
import Quiz from "./components/Quiz";
import Result from "./components/Result";

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("user"));
    if (savedUser) setUser(savedUser);
  }, []);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={user ? <Navigate to="/quiz" /> : <Login setUser={setUser} />}
        />
        <Route path="/quiz" element={user ? <Quiz /> : <Navigate to="/" />} />
        <Route
          path="/result"
          element={user ? <Result /> : <Navigate to="/" />}
        />
      </Routes>
    </Router>
  );
};

export default App;
