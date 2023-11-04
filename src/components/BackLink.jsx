import React from "react";

import { Link } from "react-router-dom";

export default function BackLink({ path, linkName }) {
  return (
    <Link
      to={path ? path : ".."}
      relative="path"
      className="vanDetail-link centered"
    >
      <svg
        width="12"
        height="12"
        viewBox="0 0 14 10"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ marginRight: ".5vw" }}
      >
        <path
          d="M13.0225 6.65045C13.4038 6.65045 13.713 6.34131 13.713 5.95996C13.713 5.57861 13.4038 5.26947 13.0225 5.26947V6.65045ZM0.574546 5.47171C0.304893 5.74136 0.304893 6.17856 0.574546 6.44821L4.96881 10.8425C5.23846 11.1121 5.67566 11.1121 5.94531 10.8425C6.21496 10.5728 6.21496 10.1356 5.94531 9.86597L2.0393 5.95996L5.94531 2.05395C6.21496 1.7843 6.21496 1.3471 5.94531 1.07745C5.67566 0.807795 5.23846 0.807795 4.96881 1.07745L0.574546 5.47171ZM13.0225 5.26947L1.0628 5.26947V6.65045L13.0225 6.65045V5.26947Z"
          fill="#858585"
        />
      </svg>

      {linkName}
    </Link>
  );
}
