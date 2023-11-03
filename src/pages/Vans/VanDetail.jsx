import React from "react";
import { useParams, Link } from "react-router-dom";

import Loading from "../Loading.jsx";
import VanType from "../../components/Vans/VanType.jsx";

export default function VanDetail() {
  const params = useParams();

  const [vanData, setVanData] = React.useState(null);

  React.useEffect(() => {
    fetch(`/api/vans/${params.id}`)
      .then((response) => response.json())
      .then((data) => setVanData(data.vans));
  }, [params.id]);

  return vanData ? (
    <div className="vanDetail">
      <Link to="/vans" className="vanDetail-link">
        Back to all vans
      </Link>
      <img src={vanData.imageUrl} alt="Shows selected van in big" />
      <VanType type={vanData.type} />
      <h2>{vanData.name}</h2>
      <h3>${vanData.price}/day</h3>
      <p>{vanData.description}</p>
      <button>Rent this van</button>
    </div>
  ) : (
    <Loading />
  );
}
