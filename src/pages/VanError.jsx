import React from "react";
import { Link, useAsyncError } from "react-router-dom";

export default function VanError() {
  const error = useAsyncError();

  return (
    <div className="notFound">
      <h2>{error.message}</h2>
      <img
        src="/assets/images/vanDefaultImage.png"
        alt="Shows van"
        style={{ marginBottom: "8vw", marginTop: "5vw" }}
      />
      <Link to="/vans" className="notFound-home">
        Return to Vans
      </Link>
    </div>
  );
}
