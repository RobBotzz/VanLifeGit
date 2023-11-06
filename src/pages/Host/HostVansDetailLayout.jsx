import React from "react";
import { Outlet, useLoaderData } from "react-router-dom";
import { getHostVans } from "../../api.js";
import { requireAuth } from "../../utils.js";

import VanType from "../../components/Vans/VanType.jsx";
import Nav from "../../components/Nav.jsx";
import BackLink from "../../components/BackLink.jsx";

export async function loader({ params }) {
  await requireAuth();
  return getHostVans(params.id);
}

export default function HostVanDetailLayout() {
  const vanData = useLoaderData();

  return (
    <div className="hostVansDetail">
      <BackLink linkName="Back to all vans" />
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
    </div>
  );
}
