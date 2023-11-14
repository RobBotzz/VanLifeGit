import React from "react";

import { logoutUser } from "../api.js";

import { Link } from "react-router-dom";

export default function About() {
  return (
    <div className="about">
      <img src="/assets/images/CamperAtNight.png" alt="Camper at Night" />
      <div className="about-wrapper">
        <h2>Don’t squeeze in a sedan when you could relax in a van.</h2>
        <p>
          Our mission is to enliven your road trip with the perfect travel van
          rental. Our vans are recertified before each trip to ensure your
          travel plans can go off without a hitch. (Hitch costs extra 😉)
        </p>
        <p>
          Our team is full of vanlife enthusiasts who know firsthand the magic
          of touring the world on 4 wheels.
        </p>
        <div className="about-explore">
          <h3>Your destination is waiting.</h3>
          <h3>Your van is ready.</h3>
          <Link to="/vans" className="explore-vans-btn">
            Explore our vans
          </Link>
        </div>
        <button onClick={() => logoutUser()}>LOGOUT</button>
      </div>
    </div>
  );
}
