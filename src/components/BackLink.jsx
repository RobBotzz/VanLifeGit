import React from "react";

import { Link } from "react-router-dom";

export default function BackLink({ path, toggleRoute, linkName, state }) {
  return (
    <Link
      to={`${path || ".."}${state ? `?${state}` : ""} `}
      className="backLink centered"
      relative={toggleRoute ? "route" : "path"}
    >
      &larr;
      <span className="backLink-text">{linkName}</span>
    </Link>
  );
}
