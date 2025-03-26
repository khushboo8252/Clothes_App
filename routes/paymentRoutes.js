import express from "express";
import Stripe from "stripe";
import dotenv from "dotenv";

dotenv.config();
const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY); // ✅ Load Stripe Secret Key

// ✅ Create a Payment Intent
router.post("/create-payment-intent", async (req, res) => {
  try {
    let { amount, currency } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({ error: "Invalid amount provided." });
    }

    // ✅ Convert amount to an integer (cents)
    amount = Math.round(amount * 100); // Example: 149.99 → 14999

    const paymentIntent = await stripe.paymentIntents.create({
      amount, // ✅ Now an integer
      currency: currency || "usd",
      payment_method_types: ["card"],
    });

    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error("Stripe Error:", error);
    res.status(500).json({ error: error.message });
  }
});

export default router;
