import React from "react";
import { useOutletContext } from "react-router";

export default function HostVansDetailPrice() {
  const { vanData } = useOutletContext();

  return (
    <div className="hostVanDetailPrice">
      <h4>
        <b>${vanData.price}</b>/day
      </h4>
    </div>
  );
}
