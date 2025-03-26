import { useContext } from "react";
import { StoreContext } from "../context/Store";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  const { dispatch } = useContext(StoreContext);

  const addToCart = () => {
    dispatch({ type: "ADD_TO_CART", payload: product });
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-4 hover:shadow-xl transition">
      {/* Product Image */}
      <img src={product.image} alt={product.name} className="w-full h-48 object-cover rounded-md" />

      {/* Product Name & Price */}
      <h2 className="text-lg font-semibold mt-3">{product.name}</h2>
      <p className="text-gray-600">${product.price.toFixed(2)}</p>

      {/* Buttons */}
      <div className="mt-3 flex gap-2">
        <button
          onClick={addToCart}
          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition duration-300"
        >
          Add to Cart
        </button>
        <Link
          to={`/product/${product._id}`}
          className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 text-center rounded-lg transition duration-300"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
