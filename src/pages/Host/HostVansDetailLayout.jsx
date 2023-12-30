import React, { Suspense } from "react";
import {
  Outlet,
  useLoaderData,
  defer,
  Await,
  Link,
  useNavigate,
  redirect,
} from "react-router-dom";
import {
  requireAuth,
  checkVanExistsAndPermission,
  getVanObjectWithImages,
} from "../../utils.js";

import VanType from "../../components/Vans/VanType.jsx";
import Nav from "../../components/Nav.jsx";
import BackLink from "../../components/BackLink.jsx";
import Loading from "../../components/Loading.jsx";

export async function loader({ params, request, currentUser }) {
  //Show loading element while user is still initializing
  if (currentUser === undefined) return defer({ van: new Promise(() => {}) });

  let vanSnapshot;
  try {
    await requireAuth(request, currentUser);
    vanSnapshot = await checkVanExistsAndPermission(params.id, currentUser);
  } catch (err) {
    throw redirect(`/van-error?err=${err.message}`);
  }

  return defer({ van: getVanObjectWithImages(vanSnapshot) });
}

export default function HostVanDetailLayout() {
  const loaderData = useLoaderData();
  const navigate = useNavigate();

  React.useEffect(() => {
    loaderData.van.then((res) => {
      if (res instanceof Error) {
        navigate(`/van-error?err=${res.message}`);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loaderData]);

  return (
    <div className="hostVansDetail">
      <BackLink
        linkName="Back to all vans"
        path="/host/vans"
        toggleRoute={true}
      />
      <Suspense fallback={<Loading />}>
        <Await resolve={loaderData.van}>
          {(vanData) => {
            return (
              <div className="hostVansDetail-card">
                <div className="hostVansDetail-card-header">
                  <img
                    src={
                      vanData.imageUrls[0] ||
                      "/assets/images/vanDefaultImage.png"
                    }
                    alt="Shows Van"
                  />
                  <div className="hostVansDetail-card-header-text">
                    <VanType type={vanData.type} size="small" />
                    <h3>{vanData.name}</h3>
                    <h4>
                      $<b>{vanData.price}</b>/day
                    </h4>
                  </div>
                </div>
                <div className="hostVansDetail-card-nav">
                  <Nav
                    size="small"
                    pathInfo={[
                      {
                        path: ".",
                        linkName: "Details",
                        end: true,
                      },
                      {
                        path: "pricing",
                        linkName: "Pricing",
                        end: false,
                      },
                      {
                        path: "photos",
                        linkName: "Photos",
                        end: false,
                      },
                    ]}
                  />
                  <div className="hostVansDetail-card-edit">
                    <Link to="edit">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                      >
                        <path d="m16.428 1.963l5.61 5.61L7.61 22.001H2v-5.61L16.427 1.962Zm0 2.828l-2.782 2.782l2.781 2.782l2.782-2.782l-2.782-2.782Zm-1.415 6.978l-2.782-2.782L4 17.22V20h2.782l8.231-8.232Zm7.212 10.232h-9.543v-2h9.543v2Z" />
                      </svg>
                    </Link>
                    <Link to="delete">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                      >
                        <path d="M5 20a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8h2V6h-4V4a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2v2H3v2h2zM9 4h6v2H9zM8 8h9v12H7V8z" />
                        <path d="M9 10h2v8H9zm4 0h2v8h-2z" />
                      </svg>
                    </Link>
                  </div>
                </div>
                <Outlet context={{ vanData }} />
              </div>
            );
          }}
        </Await>
      </Suspense>
    </div>
  );
}
