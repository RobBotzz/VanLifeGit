import React from "react";
import { Outlet } from "react-router-dom";

import Nav from "../../components/Nav.jsx";

export default function HostLayout() {
  return (
    <div className="hostLayout">
      <Nav
        size="normal"
        pathInfo={[
          { path: "/host", linkName: "Host", end: true },
          { path: "/host/income", linkName: "Income", end: false },
          { path: "/host/vans", linkName: "Vans", end: false },
          { path: "/host/reviews", linkName: "Reviews", end: false },
        ]}
      />
      <Outlet />
    </div>
  );
}
