import React from "react";
import { useOutletContext } from "react-router";

export default function HostVansDetailPrice() {
  const { vanData } = useOutletContext();

  return (
    <div className="hostVansDetailPrice">
      <h4 className="hostVansDetailPrice-price">
        ${vanData.price}
        <span>/day</span>
      </h4>
    </div>
  );
}
