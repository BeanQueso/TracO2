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
import Header from "./Header";

Chart.register(
  DoughnutController,
  ArcElement,
  CategoryScale,
  Legend,
  Title,
  Tooltip
);

function MyDoughnut() {
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

    fetch("/get-today-emissions")
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
        console.log(totalEmissions + "asdf");

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
      ctx.font = "bold 20px Arial"; 
      ctx.fillStyle = "#00A36C"; 

      const totalEmissionsFromData = chart.data.datasets[0].data
        .reduce((acc, value) => acc + value, 0)
        .toFixed(2);

      ctx.fillText(
        `${totalEmissionsFromData}\nlbs`,
        chartCenter.x,
        chartCenter.y
      );
      ctx.restore();
    },
  };
  return(
    <div>
        <Doughnut
        data={chartData}

        options={{
          cutoutPercentage: 20,
          plugins: {
            insideText: {},
          },
        }}
        plugins={[insideTextPlugin]}
      />
    </div>
  )
}
export default MyDoughnut;
