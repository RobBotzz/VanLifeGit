import React, { Suspense } from "react";
import { useSearchParams, useLoaderData, defer, Await } from "react-router-dom";

import Van from "../../components/Vans/Van.jsx";
import Loading from "../../components/Loading.jsx";

import { getVans } from "../../api.js";

export function loader() {
  return defer({ vans: getVans() });
}

export default function Vans() {
  const loaderData = useLoaderData();
  const [searchParams, setSearchParams] = useSearchParams();
  const typeFilter = searchParams.get("type");

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

  function renderVanElements(vansData) {
    const filteredVansData = typeFilter
      ? vansData?.filter((van) => van.type.toLowerCase() === typeFilter)
      : vansData;

    const vans = filteredVansData?.map((van) => {
      return (
        <Van
          key={van.id}
          searchParams={searchParams}
          id={van.id}
          img={van.imageUrl}
          name={van.name}
          price={van.price}
          type={van.type}
        />
      );
    });
    return (
      <>
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
      </>
    );
  }

  return (
    <div className="vans">
      <h2>Explore our van options</h2>
      <Suspense fallback={<Loading />}>
        <Await resolve={loaderData.vans}>{renderVanElements}</Await>
      </Suspense>
    </div>
  );
}
