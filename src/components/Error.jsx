import React from "react";
import { useRouteError } from "react-router-dom";

export default function Error() {
  const error = useRouteError();
  console.log(error);
  return (
    <div className="error">
      <h1>{error.status}</h1>
      <h2>{error.message}</h2>
    </div>
  );
}
