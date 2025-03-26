import { useContext, useState } from "react";
import { StoreContext } from "../context/Store"; // ✅ Ensure correct import
import { useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import axios from "axios";

// ✅ Replace with your actual Stripe Public Key
const stripePromise = loadStripe("pk_test_51PXOXdC8MqGRVbwfzBaTVCgNzeK6DhIenh2VAvBK3I3PH67wYZfHZfNRuH64AR59QS0hSiaQ7yI3CbGfk1uXs3HM00GV3Yl6mV");

const Checkout = () => {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
};

const CheckoutForm = () => {
  const { state, dispatch } = useContext(StoreContext); // ✅ Ensure StoreContext is available
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleCheckout = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      setErrorMessage("Stripe is not ready. Please try again.");
      return;
    }

    setLoading(true);
    setErrorMessage("");

    try {
      // ✅ Request a Payment Intent from Backend
      const { data } = await axios.post("https://clothes-app-ifeq.onrender.com/api/payments/create-payment-intent", {
        amount: state.cart.reduce((sum, item) => sum + item.price, 0),
        currency: "usd",
      });

      const clientSecret = data.clientSecret;

      if (!clientSecret) {
        throw new Error("Failed to get payment client secret.");
      }

      // ✅ Confirm Payment with Stripe
      const { paymentIntent, error } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: { name: state.user?.name || "Guest" },
        },
      });

      if (error) {
        throw new Error(error.message);
      }

      if (paymentIntent.status === "succeeded") {
        alert("✅ Payment successful! Your order has been placed.");
        dispatch({ type: "CLEAR_CART" });
        navigate("/");
      } else {
        throw new Error("Payment failed. Please try again.");
      }
    } catch (error) {
      setErrorMessage(error.message || "Payment error. Please check your details and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="max-w-lg w-full bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Secure Checkout</h1>

        {errorMessage && <p className="text-red-500 text-center mb-4">{errorMessage}</p>}

        {state.cart.length === 0 ? (
          <p className="text-center text-gray-600">Your cart is empty.</p>
        ) : (
          <form onSubmit={handleCheckout} className="space-y-4">
            <CardElement className="border p-3 rounded-lg" />
            <p className="text-xl font-bold text-right">Total: ${state.cart.reduce((sum, item) => sum + item.price, 0).toFixed(2)}</p>

            <button
              type="submit"
              disabled={loading}
              className={`w-full ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"} 
                text-white font-semibold py-3 mt-4 rounded-lg transition duration-300`}
            >
              {loading ? "Processing..." : "Pay Now"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Checkout;
