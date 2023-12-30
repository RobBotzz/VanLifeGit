import React from "react";
import { getUserData } from "../../api.js";
import { Outlet } from "react-router-dom";

import Nav from "../../components/Nav.jsx";

export default function HostLayout(currentUser) {
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
      <Outlet
        context={
          currentUser.currentUser
            ? getUserData(currentUser.currentUser.uid)
            : new Promise(() => {})
        }
      />
    </div>
  );
}
