// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ShowElectricity from './ShowElectricity';
import ShowFlight from './ShowFlight';
import ShowVehicle from './ShowVehicle';
import ShowShipping from './ShowShipping';
import ShowFuelCombustion from './ShowFuelCombustion';
import Home from './Home';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/electricity" element={<ShowElectricity />} />
          <Route path="/flight" element={<ShowFlight />} />
          <Route path="/vehicle" element={<ShowVehicle/>}/>
          <Route path="/shipping" element={<ShowShipping/>}/>
          <Route path="/fuelcombustion" element={<ShowFuelCombustion/>}/>
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
