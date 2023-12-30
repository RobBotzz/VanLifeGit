import React from "react";
import { Outlet } from "react-router-dom";

import MobileOnlyDisclaimer from "../pages/MobileOnlyDisclaimer.jsx";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";

export default function Layout({ currentUser }) {
  return (
    <>
      <MobileOnlyDisclaimer />
      <div className="site-wrapper">
        <Header currentUser={currentUser} />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    </>
  );
}
