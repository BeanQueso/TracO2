import logo from "./logo.svg";
import "./App.css";
import React, { useState } from "react";
import Header from "./Header.js";
import axios from "axios";


function ShowFuelCombustion() {
  const [emissions, setEmissions] = useState({});
  const [fuelSourceType, setFuelSourceType] = useState("");
  const [fuelSourceUnit, setFuelSourceUnit] = useState("");
  const [fuelSourceValue, setFuelSourceValue] = useState(0);
  const [fuelSourceTypeDict, setFuelSourceTypeDict] = useState({
    bit: ["short_ton", "btu"],
    dfo: ["gallon", "btu"],
    jf: ["gallon", "btu"],
    ker: ["gallon", "btu"],
    lig: ["short_ton", "btu"],
    msw: ["short_ton", "btu"],
    ng: ["thousand_cubic_feet", "btu"],
    pc: ["gallon", "btu"],
    pg: ["gallon", "btu"],
    rfo: ["gallon", "btu"],
    sub: ["short_ton", "btu"],
    tdf: ["short_ton", "btu"],
    wo: ["barrel", "btu"],
  });

  const resetStates=()=>{
    setFuelSourceType("");
    setFuelSourceUnit("");
    setFuelSourceValue(0);
  }

  const handleSubmit = async () => {
    try {
      const response = await fetch(
        `/api/fetch-fuel-combustion?attributes=${fuelSourceType}&attributes=${fuelSourceUnit}&attributes=${fuelSourceValue}`
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
      alert("Server encountered an error. Please try again.");
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
        <div className="dropdown">
          <label>Fuel Source Type:</label>
          <select
            value={fuelSourceType}
            onChange={(e) => setFuelSourceType(e.target.value)}
          >
            <option value="" disabled>
              Select a fuel source type
            </option>
            <option value="bit">Bituminous Coal</option>
            <option value="dfo">
              Home Heating and Diesel Fuel (Distillate)
            </option>
            <option value="jf">Jet Fuel</option>
            <option value="ker">Kerosene</option>
            <option value="lig">Lignite Coal</option>
            <option value="msw">Municipal Solid Waste</option>
            <option value="ng">Natural Gas</option>
            <option value="pc">Petroleum Coke</option>
            <option value="pg">Propane Gas</option>
            <option value="rfo">Residual Fuel Oil</option>
            <option value="sub">Subbituminous Coal</option>
            <option value="tdf">Tire-Derived Fuel</option>
            <option value="wo">Waste Oil</option>
          </select>
        </div>
        <div className="dropdown">
          <label>Fuel Source Unit:</label>
          <select
            value={fuelSourceUnit}
            onChange={(e) => setFuelSourceUnit(e.target.value)}
          >
            <option value="" disabled>
              Select a fuel source unit
            </option>
            {fuelSourceType &&
              fuelSourceTypeDict[fuelSourceType].map((unit) => (
                <option key={unit} value={unit}>
                  {unit}
                </option>
              ))}
          </select>
        </div>
        <div>
          <label>Fuel Source Value:</label>
          <input
            value={fuelSourceValue}
            type="number"
            onChange={(e) => setFuelSourceValue(e.target.value)}
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

export default ShowFuelCombustion;
