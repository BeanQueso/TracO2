import logo from "./logo.svg";
import "./App.css";
import React, { useState } from "react";
import Header from "./Header.js";
import axios from "axios";

function ShowElectricity() {
  const [emissions, setEmissions] = useState({});
  const [electricityUnit, setElectricityUnit] = useState("");
  const [electricityValue, setElectricityValue] = useState(0);
  const [country, setCountry] = useState("US");
  const [state, setState] = useState("");

  const HEROKU_API_URL = "https://traco2.herokuapp.com";

  const resetStates = () => {
    setElectricityUnit("");
    setElectricityValue(0);
    setCountry("");
    setState("");
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch(
        `${HEROKU_API_URL}/api/fetch-electricity?attributes=${electricityUnit}&attributes=${electricityValue}&attributes=${country}&attributes=${state}`
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
      alert('Server encountered an error. Please try again.')
      resetStates();
    }
  };

  const handleSubmitButton = async () => {
    try {
      const response = await axios.post(
        `${HEROKU_API_URL}/append-data`,
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
          <label>Electricity Unit:</label>
          <select
            value={electricityUnit}
            onChange={(e) => setElectricityUnit(e.target.value)}
          >
            <option value="" disabled>
              Select an electricity unit
            </option>
            <option value="kwh">KWH</option>
            <option value="mwh">MWH</option>
          </select>
        </div>
        <div>
          <label>Electricity Value:</label>
          <input
            value={electricityValue}
            type="number"
            onChange={(e) => setElectricityValue(e.target.value)}
          />
        </div>
        <div className="dropdown">
          <label>Country:</label>
          <select value={country} onChange={(e) => setCountry(e.target.value)}>
            {countries.map((country) => (
              <option key={country.code} value={country.code}>
                {country.name}
              </option>
            ))}
          </select>
        </div>
        <div>
    <label>State (Optional):</label>
    {country === "US" ? (
        <select value={state} onChange={(e) => setState(e.target.value)}>
            <option value="">Select a state</option>
            {USStates.filter(stateObj => stateObj && stateObj.name && stateObj.code)
                .map((stateObj) => {
                    return (
                        <option key={stateObj.code} value={stateObj.code}>
                            {stateObj.name}
                        </option>
                    );
                })}
        </select>
    ) : (
        <input value={state} onChange={(e) => setState(e.target.value)} />
    )}
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

export default ShowElectricity;
