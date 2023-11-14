import React from "react";
import { Outlet } from "react-router-dom";

import Header from "./Header.jsx";
import Footer from "./Footer.jsx";

export default function Layout({ currentUser }) {
  return (
    <div className="site-wrapper">
      <Header currentUser={currentUser} />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
