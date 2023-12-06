import logo from "./logo.svg";
import "./App.css";
import React, { useState } from "react";
import Header from "./Header.js";
import axios from "axios"


function ShowShipping() {
  const [emissions, setEmissions] = useState({});
  const [weightUnit, setWeightUnit] = useState("");
  const [weightValue, setWeightValue] = useState(0);
  const [distanceUnit, setDistanceUnit] = useState("");
  const [distanceValue, setDistanceValue] = useState(0);
  const [transportMethod, setTransportMethod] = useState("");

  const resetStates=()=>{
    setWeightUnit("");
    setWeightValue(0);
    setDistanceUnit("");
    setDistanceValue(0);
    setTransportMethod("");
  }

  const handleSubmit = async () => {
    try {
      const response = await fetch(
        `/api/fetch-shipping?attributes=${weightUnit}&attributes=${weightValue}&attributes=${distanceUnit}&attributes=${distanceValue}&attributes=${transportMethod}`
      );

      if (!response.ok) {
        throw new Error(`Request failed with status: ${response.status}`);
      }

      const contentType = response.headers.get("content-type");
      console.log("Content Type:", contentType);

      const responseData = await response.json(); 

      console.log("Response from the server:", responseData);

      if (responseData && responseData.carbon_g) {
        setEmissions(responseData);
        console.log(emissions);
      } else {
        throw new Error("Invalid data format received from the server");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
        alert('Server encountered an error. Please try again.')
        resetStates()
    }
  };

  const handleSubmitButton = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/append-data",
        emissions
      ); 
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
      <div className = "dropdown">
          <label>Weight Unit:</label>
          <select
            value={weightUnit}
            onChange={(e) => setWeightUnit(e.target.value)}
          >
            <option value="" disabled>
              Select a weight unit
            </option>
            <option value="kg">Kilograms</option>
            <option value="lb">Pounds</option>
          </select>
        </div>
        <div>
          <label>Weight Value:</label>
          <input
            value={weightValue}
            type="number"
            onChange={(e) => setWeightValue(e.target.value)}
          />
        </div>
        <div className = "dropdown">
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
        <div className = "dropdown">
          <label>Transport Method:</label>
          <select
            value={transportMethod}
            onChange={(e) => setTransportMethod(e.target.value)}
          >
            <option value="" disabled>
              Select a transport method
            </option>
            <option value="ship">Ship</option>
            <option value="train">Train</option>
            <option value="truck">Truck</option>
            <option value="plane">Plane</option>
          </select>
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

export default ShowShipping;
