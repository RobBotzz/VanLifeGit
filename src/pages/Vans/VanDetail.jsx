import React, { Suspense } from "react";
import { useLocation, useLoaderData, defer, Await } from "react-router-dom";

import VanType from "../../components/Vans/VanType.jsx";
import BackLink from "../../components/BackLink.jsx";
import Loading from "../../components/Loading.jsx";

import { getVans } from "../../api.js";

export function loader({ params }) {
  return defer({ van: getVans(params.id) });
}

function renderVanDetails(vanData) {
  return (
    <>
      <img src={vanData.imageUrl} alt="Shows selected van in big" />
      <VanType type={vanData.type} size="normal" />
      <h2>{vanData.name}</h2>
      <h3>${vanData.price}/day</h3>
      <p>{vanData.description}</p>
      <button>Rent this van</button>
    </>
  );
}

export default function VanDetail() {
  const location = useLocation();
  const loaderData = useLoaderData();

  //Determine text that backLink displays based on selected filter of previous page
  const prevParams = new URLSearchParams(location.state);
  const backLinkText = `Back to ${prevParams.get("type") || "all"} vans`;

  return (
    <div className="vanDetail">
      <BackLink linkName={backLinkText} state={location.state} />
      <Suspense fallback={<Loading />}>
        <Await resolve={loaderData.van}>{renderVanDetails}</Await>
      </Suspense>
    </div>
  );
}
