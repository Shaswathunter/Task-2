import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import authRoutes from './routes/auth.js';
import productRoutes from './routes/products.js';
import dashboardRoutes from './routes/dashboard.js';

dotenv.config();
connectDB();

const app = express();

// Allow frontend on localhost:3000 to access backend
app.use(
  cors({
    origin: [ 
      `${process.env.FRONTEND_URL}`,
     "https://task-2-omega-gray.vercel.app"
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "https://task-2-omega-gray.vercel.app");
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});
// Routes with /api prefix
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use("/api/dashboard", dashboardRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
