import React from "react";

import { Link } from "react-router-dom";

import VanType from "./VanType.jsx";

export default function Van(props) {
  return (
    <Link
      to={props.id}
      className="van-link-wrapper"
      state={props.searchParams.toString()}
    >
      <div className="van">
        <img src={props.img} alt="Shows a van" />
        <div className="container">
          <h3>{props.name}</h3>
          <h3>${props.price}/day</h3>
        </div>
        <VanType type={props.type} size="normal" />
      </div>
    </Link>
  );
}
