import React, { Suspense } from "react";
import { Outlet, useLoaderData, defer, Await } from "react-router-dom";
import { getVan } from "../../api.js";
import { requireAuth } from "../../utils.js";

import VanType from "../../components/Vans/VanType.jsx";
import Nav from "../../components/Nav.jsx";
import BackLink from "../../components/BackLink.jsx";
import Loading from "../../components/Loading.jsx";

export async function loader({ params, request }) {
  await requireAuth(request);
  return defer({ van: getVan(params.id) });
}

function renderVanDetails(vanData) {
  return (
    <div className="hostVansDetail-card">
      <div className="hostVansDetail-card-header">
        <img src={vanData.imageUrl} alt="Shows Van" />
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
      </div>
      <Outlet context={{ vanData }} />
    </div>
  );
}

export default function HostVanDetailLayout() {
  const loaderData = useLoaderData();

  return (
    <div className="hostVansDetail">
      <BackLink linkName="Back to all vans" />
      <Suspense fallback={<Loading />}>
        <Await resolve={loaderData.van}>{renderVanDetails}</Await>
      </Suspense>
    </div>
  );
}
