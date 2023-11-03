import React from "react";

import Van from "../../components/Vans/Van.jsx";
import Loading from "../Loading.jsx";

export default function Vans() {
  const [vansData, setVansData] = React.useState(null);

  React.useEffect(() => {
    fetch("/api/vans")
      .then((response) => response.json())
      .then((data) => setVansData(data.vans));
  }, []);

  const vans = vansData?.map((van) => {
    return (
      <Van
        key={van.id}
        id={van.id}
        img={van.imageUrl}
        name={van.name}
        price={van.price}
        type={van.type}
      />
    );
  });

  return vansData ? (
    <div className="vans">
      <h2>Explore our van options</h2>
      <div className="filters">
        <p className="filter">Simple</p>
        <p className="filter">Luxury</p>
        <p className="filter">Rugged</p>
        <p className="clear-filter">Clear filters</p>
      </div>
      <div className="vans-container">{vans}</div>
    </div>
  ) : (
    <Loading />
  );
}
