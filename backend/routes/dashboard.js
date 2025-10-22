import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  const data = {
    totalEarning: 15000,
    totalViews: 2300,
    totalSales: 120,

    chartData: {
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
      datasets: [
        {
          label: "Earnings ($)",
          data: [2000, 2500, 3000, 2800, 3500, 4200],
          backgroundColor: "rgba(75,192,192,0.4)",
          borderColor: "rgba(75,192,192,1)",
          borderWidth: 1,
        },
      ],
    },
  };

  res.json(data);
});

export default router;
