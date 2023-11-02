import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import Home from "../src/pages/Home.jsx";
import About from "./pages/About.jsx";
import Vans from "./pages/Vans.jsx";
import VanDetail from "./pages/VanDetail.jsx";

import "./server.js";

function Navbar() {
  return (
    <div className="menu">
      <Link to="/" className="menu-logo">
        #VANLIFE
      </Link>
      <div>
        <Link to="about" className="menu-link">
          About
        </Link>
        <Link to="vans" className="menu-link">
          Vans
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
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/vans" element={<Vans />} />
          <Route path="/vans/:id" element={<VanDetail />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
