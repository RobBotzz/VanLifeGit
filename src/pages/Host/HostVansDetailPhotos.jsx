import React from "react";
import { useOutletContext } from "react-router";

export default function HostVansDetailPhotos() {
  const { vanData } = useOutletContext();

  return (
    <div className="hostVansDetailPhotos">
      <div className="hostVansDetailPhotos-photos">
        <img src={vanData.imageUrl} alt="Shows van" />
      </div>
    </div>
  );
}
