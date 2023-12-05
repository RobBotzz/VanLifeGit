import React, { Suspense } from "react";
import { useLoaderData, defer, Await, Link } from "react-router-dom";
import { getHostVans } from "../../api.js";
import { requireAuth } from "../../utils.js";

import HostVanIcon from "../../components/Host/HostVanIcon.jsx";
import Loading from "../../components/Loading.jsx";

export async function loader({ request, currentUser }) {
  await requireAuth(request);
  return defer({ vans: getHostVans(currentUser) });
}

export default function HostVans() {
  const loaderData = useLoaderData();

  function renderVanElements(vansData) {
    const vans = vansData?.map((van) => {
      return (
        <HostVanIcon
          key={van.id}
          id={van.id}
          img={van.imageUrl}
          name={van.name}
          price={van.price}
        />
      );
    });
    return vans;
  }

  return (
    <div className="hostVans">
      <h2>Your listed vans</h2>
      <Suspense fallback={<Loading />}>
        <Await resolve={loaderData.vans}>{renderVanElements}</Await>
        <Link to="add">
          <div className="hostVanIcon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M9 12h3m3 0h-3m0 0V9m0 3v3m9-11.4v16.8a.6.6 0 0 1-.6.6H3.6a.6.6 0 0 1-.6-.6V3.6a.6.6 0 0 1 .6-.6h16.8a.6.6 0 0 1 .6.6Z"
              />
            </svg>
            <h3>Add a new van</h3>
          </div>
        </Link>
      </Suspense>
    </div>
  );
}
