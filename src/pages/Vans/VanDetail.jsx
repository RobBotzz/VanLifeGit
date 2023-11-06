import React from "react";
import { useLocation, useLoaderData } from "react-router-dom";

import VanType from "../../components/Vans/VanType.jsx";
import BackLink from "../../components/BackLink.jsx";

import { getVans } from "../../api.js";

export function loader({ params }) {
  return getVans(params.id);
}

export default function VanDetail() {
  const location = useLocation();
  const vanData = useLoaderData();

  //Determine text that backLink displays based on selected filter of previous page
  const prevParams = new URLSearchParams(location.state);
  const backLinkText = `Back to ${prevParams.get("type") || "all"} vans`;

  return (
    <div className="vanDetail">
      <BackLink linkName={backLinkText} state={location.state} />

      <img src={vanData.imageUrl} alt="Shows selected van in big" />
      <VanType type={vanData.type} size="normal" />
      <h2>{vanData.name}</h2>
      <h3>${vanData.price}/day</h3>
      <p>{vanData.description}</p>
      <button>Rent this van</button>
    </div>
  );
}
