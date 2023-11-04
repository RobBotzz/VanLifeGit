import React from "react";
import { useParams, useLocation } from "react-router-dom";

import Loading from "../Loading.jsx";
import VanType from "../../components/Vans/VanType.jsx";
import BackLink from "../../components/BackLink.jsx";

export default function VanDetail() {
  const params = useParams();
  const location = useLocation();

  const [vanData, setVanData] = React.useState(null);

  React.useEffect(() => {
    fetch(`/api/vans/${params.id}`)
      .then((response) => response.json())
      .then((data) => setVanData(data.vans));
  }, [params.id]);

  //Determine text that backLink displays based on selected filter of previous page
  const prevParams = new URLSearchParams(location.state);
  const backLinkText = `Back to ${prevParams.get("type") || "all"} vans`;

  return vanData ? (
    <div className="vanDetail">
      <BackLink linkName={backLinkText} state={location.state} />

      <img src={vanData.imageUrl} alt="Shows selected van in big" />
      <VanType type={vanData.type} size="normal" />
      <h2>{vanData.name}</h2>
      <h3>${vanData.price}/day</h3>
      <p>{vanData.description}</p>
      <button>Rent this van</button>
    </div>
  ) : (
    <Loading />
  );
}
