import React from "react";
import { useSearchParams } from "react-router-dom";

import Van from "../../components/Vans/Van.jsx";
import Loading from "../Loading.jsx";

export default function Vans() {
  const [vansData, setVansData] = React.useState(null);
  const [searchParams, setSearchParams] = useSearchParams();

  React.useEffect(() => {
    fetch("/api/vans")
      .then((response) => response.json())
      .then((data) => setVansData(data.vans));
  }, []);

  const typeFilter = searchParams.get("type");
  const filteredVansData = typeFilter
    ? vansData?.filter((van) => van.type.toLowerCase() === typeFilter)
    : vansData;

  const vans = filteredVansData?.map((van) => {
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

  function handleFilterChange(key, value) {
    setSearchParams((searchParams) => {
      if (value === null) {
        searchParams.delete(key);
      } else {
        searchParams.set(key, value);
      }
      return searchParams;
    });
  }

  return vansData ? (
    <div className="vans">
      <h2>Explore our van options</h2>
      <div className="filters">
        <p
          className={`filter simple ${typeFilter === "simple" && "selected"}`}
          onClick={() => handleFilterChange("type", "simple")}
        >
          Simple
        </p>
        <p
          className={`filter luxury ${typeFilter === "luxury" && "selected"}`}
          onClick={() => handleFilterChange("type", "luxury")}
        >
          Luxury
        </p>
        <p
          className={`filter rugged ${typeFilter === "rugged" && "selected"}`}
          onClick={() => handleFilterChange("type", "rugged")}
        >
          Rugged
        </p>
        {typeFilter && (
          <p
            className="clear-filter"
            onClick={() => handleFilterChange("type", null)}
          >
            Clear filters
          </p>
        )}
      </div>
      <div className="vans-container">{vans}</div>
    </div>
  ) : (
    <Loading />
  );
}
