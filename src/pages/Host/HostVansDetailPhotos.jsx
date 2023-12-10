import React from "react";
import { useOutletContext } from "react-router";

export default function HostVansDetailPhotos() {
  const { vanData } = useOutletContext();
  const images = vanData.imageUrls.map((url) => {
    return <img key={url} src={url} alt="Shows van" />;
  });
  const defaultImage = (
    <img src={"/assets/images/vanDefaultImage.png"} alt="Shows van" />
  );

  return (
    <div className="hostVansDetailPhotos">
      <div className="hostVansDetailPhotos-photos">
        {images || defaultImage}
      </div>
    </div>
  );
}
