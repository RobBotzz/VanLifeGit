import React from "react";
import { Link } from "react-router-dom";

import Nav from "./Nav.jsx";

export default function Header() {
  return (
    <header className="menu">
      <Link to="/" className="menu-logo">
        #VANLIFE
      </Link>
      <Nav
        size="large"
        pathInfo={[
          { path: "host", linkName: "Host", end: false },
          { path: "about", linkName: "About", end: false },
          { path: "vans", linkName: "Vans", end: false },
          { path: "login", imgUrl: "/assets/images/Avatar.png" },
        ]}
      />
    </header>
  );
}
