import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import Home from "./pages/home.jsx";
import About from "./pages/about.jsx";

function Navbar() {
  return (
    <div className="menu">
      <Link to="home" className="menu-logo">
        #VANLIFE
      </Link>
      <div>
        <Link to="home" className="menu-link">
          Home
        </Link>
        <Link to="about" className="menu-link">
          About
        </Link>
      </div>
    </div>
  );
}

function Footer() {
  return (
    <div className="footer">
      <p>Ⓒ 2022 #VANLIFE</p>;
    </div>
  );
}

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
