import React, { useEffect, useState } from 'react';
import "./History.css"
import Header from "./Header"

function MyHistory() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/api/history')
      .then(response => response.json())
      .then(data => {
        setHistory(data);
      })
      .catch(error => {
        console.error('Error fetching data: ', error);
      });
  }, []);

  return (
    <div>
    <Header/>
      <h1>My History</h1>
      <table>
        <thead className="history-head">
            <tr>
                <th>carbon_g</th>
                <th>carbon_mt</th>
                <th>carbon_date</th>
                <th>carbon_lb</th>
                <th>carbon_kg</th>
                <th>type</th>


            </tr>
          <tr>
            {/* Generate table headers based on CSV keys */}
            {history[0] && Object.keys(history[0]).map((key) => (
              <td key={key}>{key}</td>
            ))}
          </tr>
        </thead>
        <tbody>
          {/* Generate table rows */}
          {history.map((row, index) => (
            <tr key={index}>
              {Object.values(row).map((val, i) => (
                <td key={i}>{val}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default MyHistory;
