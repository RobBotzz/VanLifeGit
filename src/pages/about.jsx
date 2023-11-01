import React from "react";

export default function About() {
  return (
    <div className="about">
      <img src="./assets/images/CamperAtNight.png" alt="Camper at Night" />
      <div className="about-wrapper">
        <h1>Don’t squeeze in a sedan when you could relax in a van.</h1>
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
          <h2>Your destination is waiting.</h2>
          <h2>Your van is ready.</h2>
          <button>Explore our vans</button>
        </div>
      </div>
    </div>
  );
}
