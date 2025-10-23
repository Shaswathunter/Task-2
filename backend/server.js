import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.js";
import productRoutes from "./routes/products.js";
import dashboardRoutes from "./routes/dashboard.js";

dotenv.config();
connectDB();

const app = express();

// ✅ Use only one clean CORS configuration
app.use(
  cors({
    origin: [
      "http://localhost:3000", // for local frontend testing
      "https://task-2-omega-gray.vercel.app", // deployed frontend (NO trailing slash)
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

// ✅ Allow JSON data
app.use(express.json());

// ✅ Prefix routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/dashboard", dashboardRoutes);

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
