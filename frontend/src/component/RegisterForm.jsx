import { useState } from "react"
import Acplogo from "../../public/logo.png"

export default function RegisterForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    if (password !== confirmPassword) {
      setError("Passwords do not match")
      return
    }

    setLoading(true)

    // Placeholder - backend integration later
    alert("Account created successfully!")

    setLoading(false)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md"
    >
        <div className="flex justify-center mb-6">
        <img src={Acplogo} alt="Logo" className="h-16 w-auto" />
    </div>
      <h2 className="text-2xl font-bold text-center mb-6">Register</h2>

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

      <div className="mb-4">
        <label className="block text-gray-700 mb-1">Confirm Password</label>
        <input
          type="password"
          className="w-full px-4 py-2 border rounded-md"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
      </div>

      {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-green-700 transition"
        disabled={loading}
      >
        {loading ? "Registering..." : "Register"}
      </button>
    </form>
  )
}
