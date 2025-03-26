import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { StoreContext } from "../context/Store";

const Navbar = () => {
  const { state, dispatch } = useContext(StoreContext);
  const navigate = useNavigate(); // ✅ Use navigate for redirection

  const handleLogout = () => {
    localStorage.removeItem("user"); // Remove user data
    localStorage.removeItem("token"); // Remove token (if stored)
    dispatch({ type: "LOGOUT" }); // ✅ Dispatch logout action (clears state)
    navigate("/login"); // ✅ Redirect to login page
  };

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-indigo-700 shadow-md p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-extrabold text-white tracking-wide">
          Digital Store
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center space-x-6">
          {state.user && (
            <Link to="/" className="text-white text-lg font-medium hover:text-gray-200 transition duration-300">
              Home
            </Link>
          )}

          {state.user ? (
            <>
              <Link
                to="/profile"
                className="text-white text-lg font-medium hover:text-gray-200 transition duration-300"
              >
                Profile
              </Link>
              <Link
                to="/cart"
                className="text-white text-lg font-medium hover:text-gray-200 transition duration-300"
              >
                Cart <span className="bg-red-500 px-2 py-1 rounded-full text-sm">{state.cart.length}</span>
              </Link>
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-lg font-semibold transition duration-300"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-white text-lg font-medium hover:text-gray-200 transition duration-300"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-lg font-semibold transition duration-300"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
