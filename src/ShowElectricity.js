import logo from "./logo.svg";
import "./App.css";
import React, { useState } from "react";
import Header from "./Header.js";
import axios from "axios";
import MyDoughnut from "./MyDoughnut"


function ShowElectricity() {
  const [emissions, setEmissions] = useState({});
  const [electricityUnit, setElectricityUnit] = useState("");
  const [electricityValue, setElectricityValue] = useState(0);
  const [country, setCountry] = useState("US");
  const [state, setState] = useState("");

  const countries = [
    { name: "United States of America", code: "US" },
    { name: "Canada", code: "CA" },
    { name: "Austria", code: "AT" },
    { name: "Belgium", code: "BE" },
    { name: "Bulgaria", code: "BG" },
    { name: "Croatia", code: "HR" },
    { name: "Cyprus", code: "CY" },
    { name: "Czechia", code: "CZ" },
    { name: "Denmark", code: "DK" },
    { name: "EU-27", code: "EU-27" },
    { name: "EU27+1", code: "EU-27+1" },
    { name: "Estonia", code: "EE" },
    { name: "Finland", code: "FI" },
    { name: "France", code: "FR" },
    { name: "Germany", code: "DE" },
    { name: "Greece", code: "GR" },
    { name: "Hungary", code: "GU" },
    { name: "Ireland", code: "IE" },
    { name: "Italy", code: "IT" },
    { name: "Latvia", code: "LV" },
    { name: "Lithuania", code: "LT" },
    { name: "Luxembourg", code: "LU" },
    { name: "Malta", code: "MT" },
    { name: "Netherlands", code: "NL" },
    { name: "Poland", code: "PL" },
    { name: "Portugal", code: "PT" },
    { name: "Romania", code: "RO" },
    { name: "Slovakia", code: "SK" },
    { name: "Slovenia", code: "SI" },
    { name: "Spain", code: "ES" },
    { name: "Sweden", code: "SE" },
    { name: "United Kingdom", code: "GB" },
  ];

  const USStates = [
    { name: "Alabama", code: "AL" },
    { name: "Alaska", code: "AK" },
    { name: "Arizona", code: "AZ" },
    { name: "Arkansas", code: "AR" },
    { name: "California", code: "CA" },
    { name: "Colorado", code: "CO" },
    { name: "Connecticut", code: "CT" },
    { name: "Delaware", code: "DE" },
    { name: "Florida", code: "FL" },
    { name: "Georgia", code: "GA" },
    { name: "Hawaii", code: "HI" },
    { name: "Idaho", code: "ID" },
    { name: "Illinois", code: "IL" },
    { name: "Indiana", code: "IN" },
    { name: "Iowa", code: "IA" },
    { name: "Kansas", code: "KS" },
    { name: "Kentucky", code: "KY" },
    { name: "Louisiana", code: "LA" },
    { name: "Maine", code: "ME" },
    { name: "Maryland", code: "MD" },
    { name: "Massachusetts", code: "MA" },
    { name: "Michigan", code: "MI" },
    { name: "Minnesota", code: "MN" },
    { name: "Mississippi", code: "MS" },
    { name: "Missouri", code: "MO" },
    { name: "Montana", code: "MT" },
    { name: "Nebraska", code: "NE" },
    { name: "Nevada", code: "NV" },
    { name: "New Hampshire", code: "NH" },
    { name: "New Jersey", code: "NJ" },
    { name: "New Mexico", code: "NM" },
    { name: "New York", code: "NY" },
    { name: "North Carolina", code: "NC" },
    { name: "North Dakota", code: "ND" },
    { name: "Ohio", code: "OH" },
    { name: "Oklahoma", code: "OK" },
    { name: "Oregon", code: "OR" },
    { name: "Pennsylvania", code: "PA" },
    { name: "Rhode Island", code: "RI" },
    { name: "South Carolina", code: "SC" },
    { name: "South Dakota", code: "SD" },
    { name: "Tennessee", code: "TN" },
    { name: "Texas", code: "TX" },
    { name: "Utah", code: "UT" },
    { name: "Vermont", code: "VT" },
    { name: "Virginia", code: "VA" },
    { name: "Washington", code: "WA" },
    { name: "West Virginia", code: "WV" },
    { name: "Wisconsin", code: "WI" },
    { name: "Wyoming", code: "WY" },
];


  const resetStates = () => {
    setElectricityUnit("");
    setElectricityValue(0);
    setCountry("");
    setState("");
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch(
        `/api/fetch-electricity?attributes=${electricityUnit}&attributes=${electricityValue}&attributes=${country}&attributes=${state}`
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
      resetStates();
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
          <div className="doughnut-container">
      </div>
        </div>
        
      </header>
    </div>
  );
}

export default ShowElectricity;
