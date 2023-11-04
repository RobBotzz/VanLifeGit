import React from "react";
import { Link } from "react-router-dom";

export default function HostVanIcon(props) {
  return (
    <Link to={props.id}>
      <div className="hostVanIcon">
        <img src={props.img} alt="Shows van" />
        <div className="hostVanIcon-text">
          <h3>{props.name}</h3>
          <p>${props.price}/day</p>
        </div>
      </div>
    </Link>
  );
}
