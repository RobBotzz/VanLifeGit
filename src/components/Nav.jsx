import React from "react";
import { NavLink } from "react-router-dom";

export default function Nav({ pathInfo, size }) {
  const links = pathInfo?.map(({ path, linkName, end }) => {
    return (
      <NavLink
        to={path}
        className={({ isActive }) =>
          (isActive ? `nav-link-active` : null) + ` nav-link nav-link-${size}`
        }
        end={end}
      >
        {linkName}
      </NavLink>
    );
  });

  return <div>{links}</div>;
}
