import React from "react";

import { Link } from "react-router-dom";

export default function Van(props) {
  const typeColor = {
    backgroundColor:
      props.type === "simple"
        ? "#E17654"
        : props.type === "rugged"
        ? "#115E59"
        : "#161616",
  };

  return (
    <Link to={`/vans/${props.id}`} className="van-link-wrapper">
      <div className="van">
        <img src={props.img} alt="Shows a van" />
        <div className="container">
          <h3>{props.name}</h3>
          <h3>${props.price}/day</h3>
        </div>
        <p style={typeColor} className="van-type">
          {props.type[0].toUpperCase() + props.type.substring(1)}
        </p>
      </div>
    </Link>
  );
}
