import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { Bar, Line } from "react-chartjs-2";
import { DarkModeContext } from "../context/DarkModeContext";

const Dashboard = () => {
  const role = localStorage.getItem("role");
  const { darkMode } = useContext(DarkModeContext);
  const [data, setData] = useState(null);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/api/dashboard`)
      .then((res) => setData(res.data))
      .catch((err) => console.error(err));
  }, []);
  if (role !== "Manager") return <Navigate to="/products" />;

  const cardBg = darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900";
  const cardTitle = darkMode ? "text-gray-300" : "text-gray-600";
  const chartBg = darkMode ? "#1f2937" : "#ffffff"; // for chart background

  return (
    <div
      className={`${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
      } p-8 min-h-screen`}
    >
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

      {data ? (
        <>
          <div className="grid grid-cols-3 gap-6 mb-8">
            <div className={`${cardBg} p-4 shadow rounded`}>
              <h2 className={`${cardTitle}`}>Total Earning</h2>
              <p className="text-2xl font-semibold">${data.totalEarning}</p>
            </div>
            <div className={`${cardBg} p-4 shadow rounded`}>
              <h2 className={`${cardTitle}`}>Total Views</h2>
              <p className="text-2xl font-semibold">{data.totalViews}</p>
            </div>
            <div className={`${cardBg} p-4 shadow rounded`}>
              <h2 className={`${cardTitle}`}>Total Sales</h2>
              <p className="text-2xl font-semibold">{data.totalSales}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className={`${cardBg} p-4 shadow rounded`}>
              <h2 className={`${cardTitle} mb-3`}>Monthly Earnings</h2>
              {data.chartData ? (
                <Bar
                  data={data.chartData}
                  options={{
                    responsive: true,
                    plugins: {
                      legend: { labels: { color: darkMode ? "#fff" : "#000" } },
                      title: {
                        display: true,
                        text: "Monthly Earnings",
                        color: darkMode ? "#fff" : "#000",
                      },
                    },
                    scales: {
                      x: { ticks: { color: darkMode ? "#fff" : "#000" } },
                      y: { ticks: { color: darkMode ? "#fff" : "#000" } },
                    },
                  }}
                />
              ) : (
                <p>Loading chart...</p>
              )}
            </div>

            <div className={`${cardBg} p-4 shadow rounded`}>
              <h2 className={`${cardTitle} mb-3`}>Sales Overview</h2>
              {data.chartData ? (
                <Line
                  data={data.chartData}
                  options={{
                    responsive: true,
                    plugins: {
                      legend: { labels: { color: darkMode ? "#fff" : "#000" } },
                      title: {
                        display: true,
                        text: "Sales Overview",
                        color: darkMode ? "#fff" : "#000",
                      },
                    },
                    scales: {
                      x: { ticks: { color: darkMode ? "#fff" : "#000" } },
                      y: { ticks: { color: darkMode ? "#fff" : "#000" } },
                    },
                  }}
                />
              ) : (
                <p>Loading chart...</p>
              )}
            </div>
          </div>
        </>
      ) : (
        <p>Loading dashboard data...</p>
      )}
    </div>
  );
};

export default Dashboard;
