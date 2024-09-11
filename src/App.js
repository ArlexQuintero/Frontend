import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { Navbar } from "./components/Navbar";
import { About } from "./components/About";
import { Animals } from "./components/Animals";

function App() {
  return (
    <Router>
      <Navbar />

      <div className="container p-4">
        <Routes>
          <Route path="/about" element={<About />} />
          <Route path="/" element={<Animals />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
