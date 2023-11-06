import React from "react";
import { useLoaderData } from "react-router-dom";
import { getHostVans } from "../../api.js";

import HostVanIcon from "../../components/Host/HostVanIcon.jsx";

export function loader() {
  return getHostVans();
}

export default function HostVans() {
  const vansData = useLoaderData();

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

  return (
    <div className="hostVans">
      <h2>Your listed vans</h2>
      {vans}
    </div>
  );
}
