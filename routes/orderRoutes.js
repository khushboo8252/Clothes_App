import express from "express";
import Order from "../models/Order.js";
import authMiddleware from "../config/authMiddleware.js";

const router = express.Router();

// Place an order
router.post("/", authMiddleware, async (req, res) => {
  const { items, totalPrice, paymentMethod, shippingAddress } = req.body;

  if (!items || items.length === 0) {
    return res.status(400).json({ message: "No items in the order." });
  }

  try {
    const newOrder = new Order({
      user: req.user.id, // Assuming user authentication is required
      items,
      totalPrice,
      paymentMethod,
      shippingAddress,
      status: "Pending",
      createdAt: Date.now(),
    });

    await newOrder.save();
    res.status(201).json({ message: "Order placed successfully", order: newOrder });
  } catch (error) {
    console.error("Order placement error:", error);
    res.status(500).json({ message: "Error placing order." });
  }
});

export default router;
