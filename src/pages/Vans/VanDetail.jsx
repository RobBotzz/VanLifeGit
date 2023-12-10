import React, { Suspense } from "react";
import { useLocation, useLoaderData, defer, Await } from "react-router-dom";

import VanType from "../../components/Vans/VanType.jsx";
import BackLink from "../../components/BackLink.jsx";
import Loading from "../../components/Loading.jsx";

import { getVan } from "../../api.js";

export function loader({ params }) {
  return defer({ van: getVan(params.id) });
}

function renderVanDetails(vanData) {
  const images = vanData.imageUrls.map((url) => {
    return <img key={url} src={url} alt="Shows selected van" />;
  });
  console.log(images);
  console.log(images.length);

  return (
    <div className="vanDetail-content">
      {/*Show first image if image links exist*/}
      {images.length > 0 ? (
        images[0]
      ) : (
        <img
          className="vanDetail-content-headImage"
          src={"/assets/images/vanDefaultImage.png"}
          alt="Shows selected van in big"
        />
      )}
      <div className="vanDetail-content-images">{images}</div>
      <div className="vanDetail-content-nameRow">
        <h2>{vanData.name}</h2>
        <VanType type={vanData.type} size="normal" />
      </div>
      <h3>${vanData.price}/day</h3>
      <p>{vanData.description}</p>
      <button>Rent this van</button>
    </div>
  );
}

export default function VanDetail() {
  const location = useLocation();
  const loaderData = useLoaderData();

  //Determine text that backLink displays based on selected filter of previous page
  const prevParams = new URLSearchParams(location.state);
  const backLinkText = `Back to ${prevParams.get("type") || "all"} vans`;

  return (
    <div className="vanDetail">
      <BackLink linkName={backLinkText} state={location.state} />
      <Suspense fallback={<Loading />}>
        <Await resolve={loaderData.van}>{renderVanDetails}</Await>
      </Suspense>
    </div>
  );
}
