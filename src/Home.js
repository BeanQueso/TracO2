import React, { useEffect, useState } from "react";
import "chart.js";
import { Link } from "react-router-dom";
import MyDoughnut from "./MyDoughnut"

function Home() {
  return (
    
    <div className="home-container">
      <section className="welcome-section">
        <h1 id="welcome-message">
          <b>
            Welcome to TraCO<sup>2</sup>
          </b>
        </h1>
        <Link to="/history" className="nav-button">
          My History
        </Link>
        <p>
          Your go-to application for tracking CO<sub>2</sub> emissions.
        </p>
        <h2 style={{color:"#00A36C"}}>Today's emissions</h2>
      </section>
      <div>
      <MyDoughnut/>
      </div>
      
      <section className="navigation-section">
        <Link to="/electricity" className="nav-button">
          Electricity
        </Link>
        <Link to="/flight" className="nav-button">
          Flight
        </Link>
        <Link to="/vehicle" className="nav-button">
          Vehicle
        </Link>
        <Link to="/shipping" className="nav-button">
          Shipping
        </Link>
        <Link to="/fuelcombustion" className="nav-button">
          Fuel Combustion
        </Link>
      </section>

      
    </div>
  );
}

export default Home;
