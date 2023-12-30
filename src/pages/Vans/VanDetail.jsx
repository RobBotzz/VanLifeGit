import React, { Suspense } from "react";
import {
  useLocation,
  useLoaderData,
  defer,
  Await,
  useNavigate,
} from "react-router-dom";

import VanType from "../../components/Vans/VanType.jsx";
import BackLink from "../../components/BackLink.jsx";
import Loading from "../../components/Loading.jsx";

import { getVan } from "../../api.js";

export async function loader({ params }) {
  return defer({ van: getVan(params.id) });
}

export default function VanDetail() {
  const location = useLocation();
  const loaderData = useLoaderData();
  const navigate = useNavigate();

  //Determine text that backLink displays based on selected filter of previous page
  const prevParams = new URLSearchParams(location.state);
  const backLinkText = `Back to ${prevParams.get("type") || "all"} vans`;

  //Redirect user to van-error page if error is thrown in deferred request
  React.useEffect(() => {
    loaderData.van.then((res) => {
      if (res instanceof Error) {
        navigate(`/van-error?err=${res.message}`);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loaderData]);

  return (
    <div className="vanDetail">
      <BackLink linkName={backLinkText} state={location.state} />
      <Suspense fallback={<Loading />}>
        <Await resolve={loaderData.van}>
          {(vanData) => {
            const images = vanData.imageUrls.map((url) => {
              return <img key={url} src={url} alt="Shows selected van" />;
            });

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
          }}
        </Await>
      </Suspense>
    </div>
  );
}
