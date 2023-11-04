import React from "react";
import { useOutletContext } from "react-router";

export default function HostVansDetailPhotos() {
  const { vanData } = useOutletContext();

  return (
    <div className="hostVanDetailPhotos">
      <img src={vanData.imageUrl} alt="Shows van" />
    </div>
  );
}
