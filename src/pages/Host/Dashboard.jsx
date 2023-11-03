import React from "react";
import { Outlet } from "react-router-dom";

export default function Dashboard() {
  return (
    <div className="dashboard">
      <h1>This is the Dashboard</h1>
      <Outlet />
    </div>
  );
}
