import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";

// Load environment variables
dotenv.config();

// Connect to the database
connectDB();

const app = express();

// Middleware
app.use(express.json());

// ✅ Enhanced CORS configuration
app.use(cors({ 
  origin: "*", 
  methods: ["GET", "POST", "PUT", "DELETE"], 
  allowedHeaders: ["Content-Type", "Authorization"]
}));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/payments", paymentRoutes);

// ✅ Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal Server Error" });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
