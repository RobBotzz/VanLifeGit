import React from "react";

export default function VanType(props) {
  const typeColor = {
    backgroundColor:
      props.type === "simple"
        ? "#E17654"
        : props.type === "rugged"
        ? "#115E59"
        : "#161616",
  };

  return (
    <p style={typeColor} className={`van-type-${props.size}`}>
      {props.type[0].toUpperCase() + props.type.substring(1)}
    </p>
  );
}
