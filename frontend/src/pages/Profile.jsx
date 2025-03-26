import { useContext } from "react";
import { StoreContext } from "../context/Store";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { state, dispatch } = useContext(StoreContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/login");
  };

  if (!state.user) {
    return <p className="text-center text-xl mt-10">Please log in to view your profile.</p>;
  }

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg border border-gray-200">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">User Profile</h1>
      
      <div className="space-y-4">
        <p className="text-lg"><span className="font-semibold">Name:</span> {state.user.name}</p>
        <p className="text-lg"><span className="font-semibold">Email:</span> {state.user.email}</p>
        {state.user.phone && (
          <p className="text-lg"><span className="font-semibold">Phone:</span> {state.user.phone}</p>
        )}
        {state.user.address && (
          <p className="text-lg"><span className="font-semibold">Address:</span> {state.user.address}</p>
        )}
        {state.user.createdAt && (
          <p className="text-lg">
            <span className="font-semibold">Joined:</span> {new Date(state.user.createdAt).toLocaleDateString()}
          </p>
        )}
      </div>

      <button
        onClick={handleLogout}
        className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2 mt-6 rounded-lg transition duration-300"
      >
        Logout
      </button>
    </div>
  );
};

export default Profile;
