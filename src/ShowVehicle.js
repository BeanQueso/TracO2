import logo from "./logo.svg";
import "./App.css";
import React, { useState } from "react";
import Header from "./Header.js";

import axios from "axios"

function ShowVehicle() {
  const [emissions, setEmissions] = useState({});
  const [distanceUnit, setDistanceUnit] = useState("");
  const [distanceValue, setDistanceValue] = useState(0);
  const [companyName, setCompanyName] = useState("");
  const [vehicleName, setVehicleName] = useState("");
  const [vehicleYear, setVehicleYear] = useState(0);

  const resetStates=()=>{
    setDistanceUnit("");
    setDistanceValue(0);
    setCompanyName("");
    setVehicleName("");
    setVehicleYear(0);
  }

  const handleSubmit = async () => {
    try {
      const response = await fetch(
        `/api/fetch-vehicle?attributes=${distanceUnit}&attributes=${distanceValue}&attributes=${companyName}&attributes=${vehicleName}&attributes=${vehicleYear}`
      );

      if (!response.ok) {
        throw new Error(`Request failed with status: ${response.status}`);
      }

      const contentType = response.headers.get("content-type");
      console.log("Content Type:", contentType);

      const responseData = await response.json(); // Parsing the response directly as JSON

      console.log("Response from the server:", responseData);

      if (responseData && responseData.carbon_g) {
        setEmissions(responseData);
        console.log(emissions);
      } else {
        throw new Error("Invalid data format received from the server");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      alert("Server encountered an error. Please try again.");
      resetStates()
    }
  };

  const handleSubmitButton = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/append-data",
        emissions
      ); // Adjust the URL based on your Flask server configuration
      console.log(response.data.message);
      alert("Data submitted successfully!")
    } catch (error) {
      console.error("Error appending data:", error);
      alert('Have you clicked on the "Calculate" button?');
    }
  };

  return (
    <div className="App">
      <Header />
      <header className="App-header">
        <div className="dropdown">
          <label>Distance Unit:</label>
          <select
            value={distanceUnit}
            onChange={(e) => setDistanceUnit(e.target.value)}
          >
            <option value="" disabled>
              Select a distance unit
            </option>
            <option value="km">Kilometers</option>
            <option value="mi">Miles</option>
          </select>
        </div>
        <div>
          <label>Distance Value:</label>
          <input
            value={distanceValue}
            type="number"
            onChange={(e) => setDistanceValue(e.target.value)}
          />
        </div>
        <div>
          <label>Make:</label>
          <input
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
          />
        </div>
        <div>
          <label>Vehicle model:</label>
          <input
            value={vehicleName}
            onChange={(e) => setVehicleName(e.target.value)}
          />
        </div>
        <div>
          <label>Vehicle year:</label>
          <input
            value={vehicleYear}
            type="number"
            onChange={(e) => setVehicleYear(e.target.value)}
          />
        </div>
        <button onClick={handleSubmit}>Calculate</button>
        <button onClick={handleSubmitButton}>Submit</button>
        <div>
          <table>
            <thead>
              <tr>
                <th id="message">
                  <u>Carbon Emissions</u>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{emissions.carbon_g} grams</td>
              </tr>
              <tr>
                <td>{emissions.carbon_lb} lb</td>
              </tr>
              <tr>
                <td>{emissions.carbon_kg} kg</td>
              </tr>
              <tr>
                <td>{emissions.carbon_mt} mt</td>
              </tr>
            </tbody>
          </table>
        </div>
      </header>
    </div>
  );
}

export default ShowVehicle;
