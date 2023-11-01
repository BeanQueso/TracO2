import React, { useEffect, useState } from "react";
import "chart.js";
import { Link } from "react-router-dom";

import { Doughnut, Pie } from "react-chartjs-2";
import { Chart } from "chart.js";
import {
  ArcElement,
  CategoryScale,
  DoughnutController,
  Legend,
  Title,
  Tooltip,
} from "chart.js";
import "./Home.css";
import Header from "./Header"

Chart.register(
  DoughnutController,
  ArcElement,
  CategoryScale,
  Legend,
  Title,
  Tooltip
);

function Home() {
  const [totalEmissions, setTotalEmissions] = useState(0);
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [{ data: [], backgroundColor: [] }],
  });

  const chart = () => {
    let emissionsType = [];
    let emissionsValue = [];
    let emissionsColors = [];
    let total = 0;

    const colors = {
      shipping: "#FF6633",
      flight: "#FFB399",
      vehicle: "#FF33FF",
      electricity: "#FFFF99",
      "fuel combustion": "#00B3E6",
    };

    fetch("https://git.heroku.com/traco2.git/get-today-emissions")
      .then((response) => response.json())
      .then((data) => {
        data.forEach((entry) => {
          if (!emissionsType.includes(entry.type)) {
            emissionsType.push(entry.type);
            console.log(emissionsType);
            emissionsValue.push(entry.carbon_lb);
            emissionsColors.push(colors[entry.type]);
          } else {
            const index = emissionsType.indexOf(entry.type);
            emissionsValue[index] += entry.carbon_lb;
          }
          total += entry.carbon_lb;
          console.log(total);
        });

        setTotalEmissions(total.toFixed(2));
        console.log(totalEmissions+"asdf")

        setChartData({
          labels: emissionsType,
          datasets: [
            {
              data: emissionsValue,
              backgroundColor: emissionsColors,
            },
          ],
        });
      })
      .catch((err) => console.log(err));
  };

  

  useEffect(() => {
    chart();
  }, []);

  const insideTextPlugin = {
    id: "insideText",
    afterDraw: (chart) => {
      const ctx = chart.ctx;
      ctx.save();
      const chartCenter = {
        x: (chart.chartArea.left + chart.chartArea.right) / 2,
        y: (chart.chartArea.top + chart.chartArea.bottom) / 2,
      };
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.font = "bold 20px Arial"; // Adjust size as needed
ctx.fillStyle = "#00A36C";  // Adjust color as needed


      // Compute total emissions from chart data
      const totalEmissionsFromData = chart.data.datasets[0].data.reduce((acc, value) => acc + value, 0).toFixed(2);
      
      ctx.fillText(`${totalEmissionsFromData}\nlbs`, chartCenter.x, chartCenter.y);
      ctx.restore();
    },
};


  return (
    
    <div className="home-container">
      <section className="welcome-section">
        <h1 id="welcome-message">
          <b>
            Welcome to TraCO<sup>2</sup>
          </b>
        </h1>
        <p>
          Your go-to application for tracking CO<sub>2</sub> emissions.
        </p>
        <h2 style={{color:"#00A36C"}}>Today's emissions</h2>
      </section>
      <Doughnut
        data={chartData}
        options={{
          cutoutPercentage: 90,
          plugins: {
            insideText: {}, // This enables our custom plugin
          },
        }}
        plugins={[insideTextPlugin]} // Pass the plugin here
      />
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

      {/*<section className="about-us-section">
        <h2>About Us</h2>
        <p>
          At TraCO<sup>2</sup>, we're dedicated to helping individuals and
          organizations track and understand their carbon footprint. Our mission
          is to provide easy-to-use tools that empower everyone to make
          environmentally conscious decisions. By bringing awareness to carbon
          emissions, we hope to inspire change and contribute to a greener
          future.
        </p>
      </section>*/}
    </div>
  );
}

export default Home;
