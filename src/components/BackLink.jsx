import React from "react";

import { Link } from "react-router-dom";

export default function BackLink({ path, linkName, state }) {
  return (
    <Link
      to={`${path || ".."}${state ? `?${state}` : ""} `}
      className="backLink centered"
      relative="path"
    >
      &larr;
      <span className="backLink-text">{linkName}</span>
    </Link>
  );
}
