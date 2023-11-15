import React from "react";
import { Link } from "react-router-dom";

import Nav from "./Nav.jsx";

export default function Header({ currentUser }) {
  let navLinks = [
    { path: "host", linkName: "Host", end: false },
    { path: "about", linkName: "About", end: false },
    { path: "vans", linkName: "Vans", end: false },
  ];
  console.log("User: " + currentUser);
  navLinks.push(
    currentUser
      ? { path: "logout", imgUrl: "/assets/images/Logout.png" }
      : { path: "login", imgUrl: "/assets/images/Avatar.png" }
  );

  return (
    <header className="menu">
      <Link to="/" className="menu-logo">
        #VANLIFE
      </Link>
      <Nav size="large" pathInfo={navLinks} />
    </header>
  );
}
