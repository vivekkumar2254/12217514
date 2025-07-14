import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Stats from "./pages/Stats";
import Redirect from "./pages/Redirect";
import RegisterAuth from "./pages/RegisterAuth";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/stats" element={<Stats />} />
        <Route path="/:shortcode" element={<Redirect />} />
        <Route path="/register" element={<RegisterAuth />} />
      </Routes>
    </Router>
  );
}

export default App;
