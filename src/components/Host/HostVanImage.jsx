import React from "react";

export default function HostVanImage({ index, setSelectedFiles, src, alt }) {
  function removeImage() {
    //Remove image from array by index
    setSelectedFiles((prevArray) =>
      prevArray.filter((value, arrIndex) => {
        return index !== arrIndex;
      })
    );
  }

  return (
    <div className="hostVanImage">
      <button type="button" onClick={removeImage}>
        X
      </button>
      <img src={src} alt={alt} />
    </div>
  );
}
