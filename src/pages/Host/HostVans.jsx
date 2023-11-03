import React from "react";

import HostVanIcon from "../../components/Host/HostVanIcon.jsx";

export default function HostVans() {
  const [vansData, setVansData] = React.useState(null);

  React.useEffect(() => {
    fetch("/api/vans")
      .then((response) => response.json())
      .then((data) => setVansData(data.vans));
  }, []);

  const vans = vansData?.map((van) => {
    return (
      <HostVanIcon
        key={van.id}
        id={van.id}
        img={van.imageUrl}
        name={van.name}
        price={van.price}
        type={van.type}
      />
    );
  });

  return (
    <div className="hostVans">
      <h2>Your listed vans</h2>
      {vans}
    </div>
  );
}
