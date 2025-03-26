import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://backend-clothes-zmwd.onrender.com/api/auth/register", {
        name,
        email,
        password,
        phone,
        address,
        createdAt: new Date().toISOString(),
      });
      setName("");
      setEmail("");
      setPassword("");
      setPhone("");
      setAddress("");

      navigate("/login");
    } catch (error) {
      alert("Registration failed");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Create an Account</h2>
        <form onSubmit={handleRegister} className="space-y-4">
          <input type="text" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} required className="w-full border border-gray-300 p-3 rounded-lg focus:ring focus:ring-blue-300"/>
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full border border-gray-300 p-3 rounded-lg focus:ring focus:ring-blue-300"/>
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required className="w-full border border-gray-300 p-3 rounded-lg focus:ring focus:ring-blue-300"/>
          <input type="text" placeholder="Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)} required className="w-full border border-gray-300 p-3 rounded-lg focus:ring focus:ring-blue-300"/>
          <input type="text" placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)} required className="w-full border border-gray-300 p-3 rounded-lg focus:ring focus:ring-blue-300"/>
          <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition duration-300">Register</button>
        </form>
        <p className="text-center text-gray-600 mt-4">Already have an account? <a href="/login" className="text-blue-500 hover:underline">Login</a></p>
      </div>
    </div>
  );
};

export default Register;
