import React from "react";

export default function HostVanIcon(props) {
  return (
    <div className="hostVanIcon">
      <img src={props.img} alt="Shows van" />
      <div className="hostVanIcon-text">
        <h3>{props.name}</h3>
        <p>${props.price}/day</p>
      </div>
    </div>
  );
}
