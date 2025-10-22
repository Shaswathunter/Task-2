import React, { useState, useEffect, useContext } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import axios from "axios";
import { DarkModeContext } from "../context/DarkModeContext";

// Register ChartJS components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ChartComponent = () => {
  const { darkMode } = useContext(DarkModeContext); // Get dark mode state
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api/dashboard", {
          headers: { "x-auth-token": token },
        });

        const data = res.data;

        if (!data || !Array.isArray(data.labels) || !Array.isArray(data.datasets)) {
          throw new Error("Invalid chart data structure");
        }

        setChartData({
          labels: data.labels,
          datasets: data.datasets.map((ds) => ({
            ...ds,
            backgroundColor: darkMode ? "#4ade80" : "#3b82f6", // green in dark, blue in light
            borderColor: darkMode ? "#22c55e" : "#2563eb",
          })),
        });
      } catch (err) {
        console.error("Chart fetch error:", err);
        setError(err.response?.data?.msg || err.message || "Failed to load chart data");
      } finally {
        setLoading(false);
      }
    };

    fetchChartData();
  }, [darkMode]); // Re-fetch when dark mode changes (for colors)

  if (loading) return <p>Loading chart...</p>;
  if (error) return <p className="text-red-600">Error: {error}</p>;
  if (!chartData.labels.length || !chartData.datasets.length)
    return <p>No chart data available</p>;

  const options = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: darkMode ? "#fff" : "#000", // Legend text color
        },
      },
      title: {
        display: true,
        text: "Monthly Sales Overview",
        color: darkMode ? "#fff" : "#000", // Title color
      },
      tooltip: {
        titleColor: darkMode ? "#fff" : "#000",
        bodyColor: darkMode ? "#fff" : "#000",
      },
    },
    scales: {
      x: {
        ticks: { color: darkMode ? "#fff" : "#000" },
        grid: { color: darkMode ? "#444" : "#ccc" },
      },
      y: {
        ticks: { color: darkMode ? "#fff" : "#000" },
        grid: { color: darkMode ? "#444" : "#ccc" },
      },
    },
  };

  return (
    <div className={`w-full max-w-3xl mx-auto p-4 rounded shadow ${darkMode ? "bg-gray-800" : "bg-white"}`}>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default ChartComponent;
