import React, { Suspense } from "react";
import {
  Link,
  defer,
  Await,
  useLoaderData,
  useOutletContext,
} from "react-router-dom";
import { getHostVans } from "../../api.js";
import { requireAuth } from "../../utils.js";
import { BsStarFill } from "react-icons/bs";

import Van from "../../components/Vans/Van.jsx";
import Loading from "../../components/Loading.jsx";

export async function loader({ request, currentUser }) {
  //Show loading element while user is still initializing
  if (currentUser === undefined) return defer({ van: new Promise(() => {}) });

  await requireAuth(request, currentUser);
  return defer({
    vans: getHostVans(currentUser),
  });
}

export default function Dashboard() {
  const loaderData = useLoaderData();
  const userData = useOutletContext();

  return (
    <>
      <Suspense fallback={<Loading />}>
        <Await resolve={userData}>
          {(userData) => {
            return (
              <>
                <section className="host-dashboard-earnings">
                  <div className="info">
                    <h1>Welcome, {userData.first_name}!</h1>
                    <p>
                      Income last <span>30 days</span>
                    </p>
                    <h2>${userData.income}</h2>
                  </div>
                  <Link className="host-dashboard-link" to="income">
                    Details
                  </Link>
                </section>
                <section className="host-dashboard-reviews">
                  <h2>Review score</h2>
                  <BsStarFill className="star" />
                  <p>
                    <span>{userData.rating || "--"}</span>/5
                  </p>
                  <Link className="host-dashboard-link" to="reviews">
                    Details
                  </Link>
                </section>
              </>
            );
          }}
        </Await>
      </Suspense>

      <section className="host-dashboard-vans">
        <div className="top">
          <h2>Your listed vans</h2>
          <Link className="host-dashboard-link" to="vans">
            View all
          </Link>
        </div>
        <Suspense fallback={<Loading />}>
          <Await resolve={loaderData.vans}>
            {(vansData) => {
              const vans = vansData?.map((van) => {
                return (
                  <Van
                    key={van.id}
                    id={van.id}
                    subpage="vans/"
                    img={van.imageUrls[0]}
                    name={van.name}
                    price={van.price}
                    type={van.type}
                  />
                );
              });
              return <div className="vans-container">{vans}</div>;
            }}
          </Await>
        </Suspense>
      </section>
    </>
  );
}
