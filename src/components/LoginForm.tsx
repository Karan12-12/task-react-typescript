import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { decryptData } from "../utils/crypto";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(
        `http://localhost:5000/students?email=${encodeURIComponent(email)}`
      );
      if (data.length === 0) {
        setError("Invalid email or password");
        return;
      }
      const user = data[0];
      const decrypted = decryptData(user.password);
      if (decrypted === password) {
        localStorage.setItem("student", JSON.stringify(user));
        navigate("/students");
      } else {
        setError("Invalid email or password");
      }
    } catch (err) {
      setError("Something went wrong, try again");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>

        {error && <div className="text-red-600 mb-3">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="block mb-1 font-medium">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              required
              className="w-full border rounded px-3 py-2"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              required
              className="w-full border rounded px-3 py-2"
            />
          </div>

          <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
            Login
          </button>
        </form>

        <div className="mt-4 text-sm text-center">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-600">
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
