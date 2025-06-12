import { useState } from "react"
import { Link } from "react-router-dom"
import Acplogo from "../../public/logo.png"

export default function LoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    // Dummy login
    if (email === "test@example.com" && password === "123456") {
      alert("Login successful!")
    } else {
      setError("Invalid credentials")
    }

    setLoading(false)
  }

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
        <label className="block text-gray-700 mb-1">Email</label>
        <input
          type="email"
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

      {error && (
        <p className="text-red-500 text-sm mb-3">{error}</p>
      )}

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
        disabled={loading}
      >
        {loading ? "Logging in..." : "Login"}
      </button>

      {/* Links */}
      <div className="flex justify-between mt-4 text-sm">
        <Link to="/forgot-password" className="text-blue-500 hover:underline">
          Forgot Password?
        </Link>
        <Link to="/register" className="text-blue-500 hover:underline">
          Sign Up
        </Link>
      </div>
    </form>
  )
}
