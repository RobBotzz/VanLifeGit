import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";

import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";

import Vans, { loader as vansLoader } from "./pages/Vans/Vans.jsx";
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
import Error from "./components/Error.jsx";
import Login from "./pages/Login.jsx";

import "./server.js";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="home" element={<Home />} />

      <Route path="about" element={<About />} />

      <Route
        path="vans"
        element={<Vans />}
        loader={vansLoader}
        errorElement={<Error />}
      />
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

      <Route path="login" element={<Login />} />

      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

function App() {
  return (
    <div className="app">
      <RouterProvider router={router} />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
