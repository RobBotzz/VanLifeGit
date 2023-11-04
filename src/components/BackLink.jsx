import React from "react";

import { Link } from "react-router-dom";

export default function BackLink({ path, linkName }) {
  return (
    <Link to={path || "./.."} className="backLink centered">
      &larr;
      <span className="backLink-text">{linkName}</span>
    </Link>
  );
}
