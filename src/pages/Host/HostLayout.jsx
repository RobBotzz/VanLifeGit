import React from "react";
import { Outlet } from "react-router-dom";

import HostNav from "../../components/Host/HostNav.jsx";

export default function HostLayout() {
  return (
    <div className="hostLayout">
      <HostNav />
      <Outlet />
    </div>
  );
}
