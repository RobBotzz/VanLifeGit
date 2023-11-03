import React from "react";
import { NavLink, Outlet } from "react-router-dom";

export default function HostLayout() {
  return (
    <div className="hostLayout">
      <div className="hostNav">
        <NavLink
          className={({ isActive }) =>
            isActive ? "hostNav-link-active hostNav-link" : "hostNav-link"
          }
          to="/host"
          end
        >
          Host
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive ? "hostNav-link-active hostNav-link" : "hostNav-link"
          }
          to="/host/income"
        >
          Income
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive ? "hostNav-link-active hostNav-link" : "hostNav-link"
          }
          to="/host/reviews"
        >
          Reviews
        </NavLink>
      </div>
      <Outlet />
    </div>
  );
}
