import React from "react";
import { useOutletContext } from "react-router";

export default function HostVansDetailDetail() {
  const { vanData } = useOutletContext();

  return (
    <div className="hostVanDetailDetail">
      <h4 className="hostVanDetailDetail-info">
        <b>Name: </b>
        {vanData.name}
      </h4>
      <h4 className="hostVanDetailDetail-info">
        <b>Category: </b>
        {vanData.type}
      </h4>
      <h4 className="hostVanDetailDetail-info">
        <b>Description: </b>
        {vanData.description}
      </h4>
      <h4 className="hostVanDetailDetail-info">
        <b>Visibility: </b>Public
      </h4>
    </div>
  );
}
