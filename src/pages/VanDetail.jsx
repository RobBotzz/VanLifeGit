import React from "react";
import { useParams } from "react-router-dom";

export default function VanDetail() {
  const params = useParams();

  React.useEffect(() => {
    fetch(`/api/vans/${params.id}`)
      .then((response) => response.json())
      .then((data) => console.log(data));
  }, [params.id]);

  return <h1>Hello</h1>;
}
