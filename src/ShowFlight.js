import logo from "./logo.svg";
import "./App.css";
import React, { useState } from "react";
import Header from "./Header.js"
import axios from "axios"

function ShowFlight() {
  const [emissions, setEmissions] = useState({});
  const [passengers, setPassengers] = useState(0);
  const [distanceUnit, setDistanceUnit] = useState("");
  const [roundTrip, setRoundTrip] = useState(false);
  const [departureAirport, setDepartureAirport] = useState("");
  const [destinationAirport, setDestinationAirport] = useState("");

  const resetStates=()=>{
    setPassengers(0);
    setDistanceUnit("");
    setRoundTrip(false);
    setDepartureAirport("");
    setDestinationAirport("");
  }

  const handleSubmit = async () => {
    try {
      const response = await fetch(
        `/api/fetch-flight?attributes=${passengers}&attributes=${distanceUnit}&roundTrip=${roundTrip}&departureAirport=${departureAirport}&destinationAirport=${destinationAirport}`
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
      <Header/>
      <header className="App-header">
        <div>
          <label>Passengers: </label>
          <input value={passengers} type="number" onChange={(e) => setPassengers(e.target.value)} />
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
          <label>Round Trip?</label>
          <input type="checkbox" checked={roundTrip} onChange={(e) => setRoundTrip(e.target.checked)} />
        </div>
        <div>
          <label>Departure Airport Code: </label>
          <input value={departureAirport} onChange={(e) => setDepartureAirport(e.target.value)} />
        </div>
        <div>
          <label>Destination Airport Code: </label>
          <input value={destinationAirport} onChange={(e) => setDestinationAirport(e.target.value)} />
        </div>
        <button onClick={handleSubmit}>Calculate</button>
        <button onClick={handleSubmitButton}>Submit</button>

        <div>
          <table>
            <thead>
              <tr>
                <th id="message"><u>Carbon Emissions</u></th>
              </tr>
            </thead>
            <tbody>
              <tr><td>{emissions.carbon_g} grams</td></tr>
              <tr><td>{emissions.carbon_lb} lb</td></tr>
              <tr><td>{emissions.carbon_kg} kg</td></tr>
              <tr><td>{emissions.carbon_mt} mt</td></tr>
            </tbody>
          </table>
        </div>
      </header>
    </div>
  );
}

export default ShowFlight;
