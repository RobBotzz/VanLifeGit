import React from "react";
import { Outlet, useParams } from "react-router-dom";

import VanType from "../../components/Vans/VanType.jsx";
import Loading from "../Loading.jsx";
import Nav from "../../components/Nav.jsx";
import BackLink from "../../components/BackLink.jsx";

export default function HostVanDetailLayout() {
  const params = useParams();

  const [vanData, setVanData] = React.useState(null);

  React.useEffect(() => {
    fetch(`/api/vans/${params.id}`)
      .then((response) => response.json())
      .then((data) => setVanData(data.vans));
  }, [params.id]);

  return vanData ? (
    <div className="hostVansDetail">
      <BackLink linkName="Back to all vans" />
      <div className="hostVansDetail-card">
        <div className="hostVansDetail-card-header">
          <img src={vanData.imageUrl} alt="Shows Van" />
          <div className="hostVansDetail-card-header-text">
            <VanType type={vanData.type} size="small" />
            <h3>{vanData.name}</h3>
            <h4>
              $<b>{vanData.price}</b>/day
            </h4>
          </div>
        </div>
        {/* <div className="hostVansDetail-card-nav">
          <Link to={`/host/vans/${params.id}`}>Details</Link>
          <Link to={`/host/vans/${params.id}/pricing`}>Pricing</Link>
          <Link to={`/host/vans/${params.id}/photos`}>Photos</Link>
        </div> */}
        <Nav
          size="small"
          pathInfo={[
            {
              path: ".",
              linkName: "Details",
              end: true,
            },
            {
              path: "pricing",
              linkName: "Pricing",
              end: false,
            },
            {
              path: "photos",
              linkName: "Photos",
              end: false,
            },
          ]}
        />
        <Outlet context={{ vanData }} />
      </div>
    </div>
  ) : (
    <Loading />
  );
}
