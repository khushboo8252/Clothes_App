import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { StoreContext } from "../context/Store";

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { dispatch } = useContext(StoreContext);

  useEffect(() => {
    axios.get(`https://backend-clothes-zmwd.onrender.com/api/products/${id}`).then((res) => setProduct(res.data));
  }, [id]);

  const addToCart = () => {
    dispatch({ type: "ADD_TO_CART", payload: product });
  };

  if (!product) return <p>Loading...</p>;

  return (
    <div className="container mx-auto p-4">
      <img src={product.image} alt={product.name} className="w-80 h-80 object-cover"/>
      <h1 className="text-2xl font-bold">{product.name}</h1>
      <p>{product.description}</p>
      <p className="text-gray-500">${product.price}</p>
      <button onClick={addToCart} className="bg-blue-600 text-white px-4 py-2 mt-2">Add to Cart</button>
    </div>
  );
};

export default ProductPage;
