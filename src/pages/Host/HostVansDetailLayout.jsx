import React from "react";
import { Link, Outlet, useParams } from "react-router-dom";

import VanType from "../../components/Vans/VanType.jsx";
import Loading from "../Loading.jsx";

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
      <Link to="/host/vans" className="vanDetail-link">
        Back to all vans
      </Link>
      <div className="hostVansDetail-card">
        <div className="hostVansDetail-card-header">
          <img src={vanData.imageUrl} alt="Shows Van" />
          <div className="hostVansDetail-card-header-text">
            <VanType type={vanData.type} />
            <h2>{vanData.name}</h2>
            <h3>{vanData.price}</h3>
          </div>
        </div>
        <div className="hostVansDetail-card-nav">
          <Link to={`/host/vans/${params.id}`}>Details</Link>
          <Link to={`/host/vans/${params.id}/pricing`}>Pricing</Link>
          <Link to={`/host/vans/${params.id}/photos`}>Photos</Link>
        </div>
        <Outlet />
      </div>
    </div>
  ) : (
    <Loading />
  );
}
