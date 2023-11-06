import React from "react";
import { NavLink } from "react-router-dom";

export default function Nav({ pathInfo, size }) {
  const links = pathInfo?.map(({ path, linkName, imgUrl, end }) => {
    return linkName ? (
      <NavLink
        key={linkName}
        to={path}
        className={({ isActive }) =>
          (isActive ? `active` : null) + ` nav-link nav-link-text ${size}`
        }
        end={end}
      >
        {linkName}
      </NavLink>
    ) : (
      <NavLink key={imgUrl} to={path} className={`nav-link ${size}`}>
        <img src={imgUrl} alt="" className="nav-link-img" />
      </NavLink>
    );
  });

  return <div className="nav">{links}</div>;
}
