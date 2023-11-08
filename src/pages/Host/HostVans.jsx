import React, { Suspense } from "react";
import { useLoaderData, defer, Await } from "react-router-dom";
import { getHostVans } from "../../api.js";
import { requireAuth } from "../../utils.js";

import HostVanIcon from "../../components/Host/HostVanIcon.jsx";
import Loading from "../../components/Loading.jsx";

export async function loader({ request }) {
  await requireAuth(request);
  return defer({ vans: getHostVans() });
  //defer sth
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
      </Suspense>
    </div>
  );
}
