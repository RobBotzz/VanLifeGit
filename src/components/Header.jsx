import React from "react";
import { Link, NavLink } from "react-router-dom";

export default function Header() {
  return (
    <header className="menu">
      <Link to="/" className="menu-logo">
        #VANLIFE
      </Link>
      <div>
        <NavLink
          to="host"
          className={({ isActive }) =>
            isActive ? "menu-link menu-link-active" : "menu-link"
          }
        >
          Host
        </NavLink>
        <NavLink
          to="about"
          className={({ isActive }) =>
            isActive ? "menu-link menu-link-active" : "menu-link"
          }
        >
          About
        </NavLink>
        <NavLink
          to="vans"
          className={({ isActive }) =>
            isActive ? "menu-link menu-link-active" : "menu-link"
          }
        >
          Vans
        </NavLink>
      </div>
    </header>
  );
}
