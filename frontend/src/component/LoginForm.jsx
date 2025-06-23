import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Acplogo from "../../public/logo.png";

export default function LoginForm() {
  const [email, setEmail] = useState(""); // backend may 'username' bhi ho sakta
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await axios.post("http://localhost:5000/api/login", {
        username: email,
        password: password,
      });

      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        navigate("/dashboard");
      } else {
        setError("Login failed. Please check your credentials.");
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.error || "Login failed.");
    }

    setLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white px-4 shadow-lg rounded-2xl p-8 w-full max-w-md"
    >
      <div className="flex justify-center mb-6">
        <img src={Acplogo} alt="Logo" className="h-16 w-auto" />
      </div>
      <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

      <div className="mb-4">
        <label className="block text-gray-700 mb-1">Email / Username</label>
        <input
          type="text"
          className="w-full px-4 py-2 border rounded-md"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 mb-1">Password</label>
        <input
          type="password"
          className="w-full px-4 py-2 border rounded-md"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

      <button
        type="submit"
        className="w-full bg-[#766ACC] text-white py-2 rounded-md hover:bg-[#5f58ae] transition"
        disabled={loading}
      >
        {loading ? "Logging in..." : "Login"}
      </button>

      <div className="flex justify-between mt-4 text-sm">
        <Link to="/forgot-password" className="text-blue-500 hover:underline">
          Forgot Password?
        </Link>
        <Link to="/register" className="text-blue-500 hover:underline">
          Sign Up
        </Link>
      </div>
    </form>
  );
}
