import React from "react";
import { Outlet } from "react-router-dom";

import Nav from "../../components/Nav.jsx";

export default function HostLayout() {
  return (
    <div className="hostLayout">
      <Nav
        size="normal"
        pathInfo={[
          { path: ".", linkName: "Host", end: true },
          { path: "income", linkName: "Income", end: false },
          { path: "vans", linkName: "Vans", end: false },
          { path: "reviews", linkName: "Reviews", end: false },
        ]}
      />
      <Outlet />
    </div>
  );
}
