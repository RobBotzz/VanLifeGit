import React from "react";
import { Link } from "react-router-dom";

export default function HostVanIcon(props) {
  return (
    <Link to={props.id}>
      <div className="hostVanIcon">
        <div className="hostVanIcon-info">
          <img
            src={props.img || "/assets/images/vanDefaultImage.png"}
            alt="Shows van"
          />
          <div className="hostVanIcon-info-text">
            <h3>{props.name}</h3>
            <p>${props.price}/day</p>
          </div>
        </div>
        <div className="hostVanIcon-edit">
          <Link to={`${props.id}/edit`}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path d="m16.428 1.963l5.61 5.61L7.61 22.001H2v-5.61L16.427 1.962Zm0 2.828l-2.782 2.782l2.781 2.782l2.782-2.782l-2.782-2.782Zm-1.415 6.978l-2.782-2.782L4 17.22V20h2.782l8.231-8.232Zm7.212 10.232h-9.543v-2h9.543v2Z" />
            </svg>
          </Link>
          <Link to={`${props.id}/delete`}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path d="M5 20a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8h2V6h-4V4a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2v2H3v2h2zM9 4h6v2H9zM8 8h9v12H7V8z" />
              <path d="M9 10h2v8H9zm4 0h2v8h-2z" />
            </svg>
          </Link>
        </div>
      </div>
    </Link>
  );
}
