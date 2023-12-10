import React from "react";
import { useOutletContext } from "react-router";

export default function HostVansDetailDetail() {
  const { vanData } = useOutletContext();

  return (
    <div className="hostVansDetailDetail">
      <h4 className="hostVansDetailDetail-info">
        <span>Name: </span>
        {vanData.name}
      </h4>
      <h4 className="hostVansDetailDetail-info">
        <span>Category: </span>
        {vanData.type[0].toUpperCase() + vanData.type.substring(1)}
      </h4>
      <h4 className="hostVansDetailDetail-info">
        <span>Description: </span>
        {vanData.description}
      </h4>
      <h4 className="hostVansDetailDetail-info">
        <span>Visibility: </span>
        {vanData.isPublic ? "Public" : "Private"}
      </h4>
    </div>
  );
}
