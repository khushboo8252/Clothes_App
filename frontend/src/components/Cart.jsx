import { useContext } from "react";
import { StoreContext } from "../context/Store";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion"; // ✅ Animation

const Cart = () => {
  const { state, dispatch } = useContext(StoreContext);
  const navigate = useNavigate();

  const removeFromCart = (id) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: id });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="max-w-2xl w-full bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Shopping Cart</h1>

        {state.cart.length === 0 ? (
          <p className="text-center text-gray-600">Your cart is empty.</p>
        ) : (
          <AnimatePresence>
            {state.cart.map((item) => (
              <motion.div
                key={item._id}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                className="flex justify-between items-center border-b pb-2"
              >
                <div>
                  <p className="text-lg font-semibold">{item.name}</p>
                  <p className="text-gray-600">${item.price.toFixed(2)}</p>
                </div>
                <button 
                  onClick={() => removeFromCart(item._id)} 
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                >
                  Remove
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        )}

        {state.cart.length > 0 && (
          <div className="mt-6 text-right">
            <p className="text-xl font-bold">Total: ${state.cart.reduce((sum, item) => sum + item.price, 0).toFixed(2)}</p>
            <button
              onClick={() => navigate("/checkout")}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 mt-4 rounded-lg transition duration-300"
            >
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
