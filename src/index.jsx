import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";

import { getAuth, onAuthStateChanged } from "firebase/auth";

import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";

import Vans, { loader as vansLoader } from "./pages/Vans/Vans.jsx";
import VanDetail, {
  loader as vanDetailLoader,
} from "./pages/Vans/VanDetail.jsx";

import HostLayout from "./pages/Host/HostLayout.jsx";
import Dashboard, {
  loader as dashboardLoader,
} from "./pages/Host/Dashboard.jsx";
import Reviews from "./pages/Host/Reviews.jsx";
import HostVans, { loader as hostVansLoader } from "./pages/Host/HostVans.jsx";
import HostVansAdd, {
  action as hostVansAddAction,
} from "./pages/Host/HostVansAdd.jsx";
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
import Login, {
  loader as loginLoader,
  action as loginAction,
} from "./pages/Login.jsx";
import Register, { action as registerAction } from "./pages/Register.jsx";
import Logout, {
  action as logoutAction,
  loader as logoutLoader,
} from "./pages/Logout.jsx";

import { requireAuth } from "./utils.js";

function App() {
  const auth = getAuth();

  const [currentUser, setCurrentUser] = React.useState(auth.currentUser);

  onAuthStateChanged(auth, (user) => {
    if (user) {
      setCurrentUser(user);
    } else {
      setCurrentUser(null);
    }
  });

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout currentUser={currentUser} />}>
        <Route index element={<Home />} />
        <Route path="home" element={<Home />} />

        <Route path="about" element={<About />} />

        <Route
          path="login"
          element={<Login />}
          loader={({ request }) => loginLoader({ request, currentUser })}
          action={loginAction}
        />

        <Route path="register" element={<Register />} action={registerAction} />

        <Route
          path="logout"
          element={<Logout />}
          loader={({ request }) => logoutLoader({ request, currentUser })}
          action={logoutAction}
        />

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
        <Route path="host" element={<HostLayout currentUser={currentUser} />}>
          <Route
            index
            element={<Dashboard />}
            loader={({ request }) => dashboardLoader({ request, currentUser })}
          />
          <Route
            path="reviews"
            element={<Reviews />}
            loader={async ({ request }) => await requireAuth(request)}
          />
          <Route
            path="vans"
            element={<HostVans />}
            loader={async ({ request }) =>
              await hostVansLoader({ request, currentUser })
            }
            errorElement={<Error />}
          />
          <Route
            path="vans/add"
            element={<HostVansAdd />}
            action={({ request }) =>
              hostVansAddAction({ request, currentUser })
            }
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
              loader={async ({ request }) => await requireAuth(request)}
            />
            <Route
              path="pricing"
              element={<HostVansDetailPrice />}
              loader={async ({ request }) => await requireAuth(request)}
            />
            <Route
              path="photos"
              element={<HostVansDetailPhotos />}
              loader={async ({ request }) => await requireAuth(request)}
            />
          </Route>
          <Route
            path="income"
            element={<Income />}
            loader={async ({ request }) => await requireAuth(request)}
          />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Route>
    )
  );

  return (
    <div className="app">
      <RouterProvider router={router} />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
