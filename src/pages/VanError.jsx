import React from "react";
import { Link, useLoaderData } from "react-router-dom";

export function loader({ request }) {
  return new URL(request.url).searchParams.get("err");
}

export default function VanError() {
  const errorMessage = useLoaderData();

  return (
    <div className="notFound">
      <h2>{errorMessage}</h2>
      <img
        src="/assets/images/vanDefaultImage.png"
        alt="Shows van"
        style={{ marginBottom: "8vw" }}
      />
      <Link to="/vans" className="notFound-home">
        Return to Vans
      </Link>
    </div>
  );
}
