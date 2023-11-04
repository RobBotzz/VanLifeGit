import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";

import Vans from "./pages/Vans/Vans.jsx";
import VanDetail from "./pages/Vans/VanDetail.jsx";

import HostLayout from "./pages/Host/HostLayout.jsx";
import Dashboard from "./pages/Host/Dashboard.jsx";
import Reviews from "./pages/Host/Reviews.jsx";
import HostVans from "./pages/Host/HostVans.jsx";
import HostVansDetailLayout from "./pages/Host/HostVansDetailLayout.jsx";
import HostVansDetailDetail from "./pages/Host/HostVansDetailDetail.jsx";
import HostVansDetailPrice from "./pages/Host/HostVansDetailPrice.jsx";
import HostVansDetailPhotos from "./pages/Host/HostVansDetailPhotos.jsx";
import Income from "./pages/Host/Income.jsx";

import Layout from "./components/Layout.jsx";

import NotFound from "./pages/NotFound.jsx";

import "./server.js";

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="home" element={<Home />} />

            <Route path="about" element={<About />} />

            <Route path="vans" element={<Vans />} />
            <Route path="vans/:id" element={<VanDetail />} />

            <Route path="host" element={<HostLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="reviews" element={<Reviews />} />
              <Route path="vans" element={<HostVans />} />
              <Route path="vans/:id" element={<HostVansDetailLayout />}>
                <Route index element={<HostVansDetailDetail />} />
                <Route path="pricing" element={<HostVansDetailPrice />} />
                <Route path="photos" element={<HostVansDetailPhotos />} />
              </Route>
              <Route path="income" element={<Income />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
