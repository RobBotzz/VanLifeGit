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
import HostVansEdit, {
  loader as hostVansEditLoader,
  action as hostVansEditAction,
} from "./pages/Host/HostVansEdit.jsx";
import HostVansDelete, {
  loader as hostVansDeleteLoader,
  action as hostVansDeleteAction,
} from "./pages/Host/HostVansDelete.jsx";
import HostVansDetailLayout, {
  loader as hostVansDetailLayoutLoader,
} from "./pages/Host/HostVansDetailLayout.jsx";
import HostVansDetailDetail from "./pages/Host/HostVansDetailDetail.jsx";
import HostVansDetailPrice from "./pages/Host/HostVansDetailPrice.jsx";
import HostVansDetailPhotos from "./pages/Host/HostVansDetailPhotos.jsx";
import Income from "./pages/Host/Income.jsx";

import Layout from "./components/Layout.jsx";

import PageNotFound from "./pages/PageNotFound.jsx";
import VanError, { loader as vanErrorLoader } from "./pages/VanError.jsx";
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

  const [currentUser, setCurrentUser] = React.useState(undefined);

  onAuthStateChanged(auth, (user) => {
    setCurrentUser(user);
  });

  const requireAuthLoader = async ({ request }) =>
    await requireAuth(request, currentUser);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout currentUser={currentUser} />}>
        <Route errorElement={<Error />}>
          <Route index element={<Home />} />
          <Route path="home" element={<Home />} />

          <Route path="about" element={<About />} />

          <Route
            path="login"
            element={<Login />}
            loader={({ request }) => loginLoader({ request, currentUser })}
            action={loginAction}
          />

          <Route
            path="register"
            element={<Register />}
            action={registerAction}
          />

          <Route
            path="logout"
            element={<Logout />}
            loader={({ request }) => logoutLoader({ request, currentUser })}
            action={logoutAction}
          />

          <Route path="vans" element={<Vans />} loader={vansLoader} />
          <Route
            path="vans/:id"
            element={<VanDetail />}
            loader={vanDetailLoader}
          />
          <Route path="host" element={<HostLayout currentUser={currentUser} />}>
            <Route
              index
              element={<Dashboard />}
              loader={({ request }) =>
                dashboardLoader({ request, currentUser })
              }
            />
            <Route
              path="reviews"
              element={<Reviews />}
              loader={requireAuthLoader}
            />
            <Route
              path="vans"
              element={<HostVans />}
              loader={async ({ request }) =>
                await hostVansLoader({ request, currentUser })
              }
            />
            <Route
              path="vans/add"
              element={<HostVansAdd />}
              loader={requireAuthLoader}
              action={({ request }) =>
                hostVansAddAction({ request, currentUser })
              }
            />
            <Route
              path="vans/:id/edit"
              element={<HostVansEdit />}
              loader={async ({ params, request }) =>
                hostVansEditLoader({ params, request, currentUser })
              }
              action={hostVansEditAction}
            />
            <Route
              path="vans/:id/delete"
              element={<HostVansDelete />}
              loader={async ({ params, request }) =>
                hostVansDeleteLoader({ params, request, currentUser })
              }
              action={hostVansDeleteAction}
            />
            <Route
              path="vans/:id"
              element={<HostVansDetailLayout />}
              loader={async ({ params, request }) =>
                hostVansDetailLayoutLoader({ params, request, currentUser })
              }
            >
              <Route
                index
                element={<HostVansDetailDetail />}
                loader={requireAuthLoader}
              />
              <Route
                path="pricing"
                element={<HostVansDetailPrice />}
                loader={requireAuthLoader}
              />
              <Route
                path="photos"
                element={<HostVansDetailPhotos />}
                loader={requireAuthLoader}
              />
            </Route>
            <Route
              path="income"
              element={<Income />}
              loader={requireAuthLoader}
            />
          </Route>
          <Route path="*" element={<PageNotFound />} />
          <Route
            path="van-error"
            element={<VanError />}
            loader={vanErrorLoader}
          />
        </Route>
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
