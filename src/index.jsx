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
import VanDetail, {
  loader as vanDetailLoader,
} from "./pages/Vans/VanDetail.jsx";

import HostLayout from "./pages/Host/HostLayout.jsx";
import Dashboard from "./pages/Host/Dashboard.jsx";
import Reviews from "./pages/Host/Reviews.jsx";
import HostVans, { loader as hostVansLoader } from "./pages/Host/HostVans.jsx";
import HostVansDetailLayout, {
  loader as hostVansDetailLayoutLoader,
} from "./pages/Host/HostVansDetailLayout.jsx";
import HostVansDetailDetail from "./pages/Host/HostVansDetailDetail.jsx";
import HostVansDetailPrice from "./pages/Host/HostVansDetailPrice.jsx";
import HostVansDetailPhotos from "./pages/Host/HostVansDetailPhotos.jsx";
import Income from "./pages/Host/Income.jsx";

import Layout from "./components/Layout.jsx";

import NotFound from "./pages/NotFound.jsx";
import Error from "./components/Error.jsx";
import Login from "./pages/Login.jsx";

import { requireAuth } from "./utils.js";
import "./server.js";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="home" element={<Home />} />

      <Route path="about" element={<About />} />

      <Route path="login" element={<Login />} />

      <Route
        path="vans"
        element={<Vans />}
        loader={vansLoader}
        errorElement={<Error />}
      />
      <Route
        path="vans/:id"
        element={<VanDetail />}
        loader={vanDetailLoader}
        errorElement={<Error />}
      />

      <Route path="host" element={<HostLayout />}>
        <Route
          index
          element={<Dashboard />}
          loader={async () => await requireAuth()}
        />
        <Route
          path="reviews"
          element={<Reviews />}
          loader={async () => await requireAuth()}
        />
        <Route
          path="vans"
          element={<HostVans />}
          loader={hostVansLoader}
          errorElement={<Error />}
        />
        <Route
          path="vans/:id"
          element={<HostVansDetailLayout />}
          loader={hostVansDetailLayoutLoader}
          errorElement={<Error />}
        >
          <Route
            index
            element={<HostVansDetailDetail />}
            loader={async () => await requireAuth()}
          />
          <Route
            path="pricing"
            element={<HostVansDetailPrice />}
            loader={async () => await requireAuth()}
          />
          <Route
            path="photos"
            element={<HostVansDetailPhotos />}
            loader={async () => await requireAuth()}
          />
        </Route>
        <Route
          path="income"
          element={<Income />}
          loader={async () => await requireAuth()}
        />
      </Route>

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
