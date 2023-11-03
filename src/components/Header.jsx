import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <div className="menu">
      <Link to="/" className="menu-logo">
        #VANLIFE
      </Link>
      <div>
        <Link to="/about" className="menu-link">
          About
        </Link>
        <Link to="/vans" className="menu-link">
          Vans
        </Link>
      </div>
    </div>
  );
}
