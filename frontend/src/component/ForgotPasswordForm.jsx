import { useState } from "react"
import Acplogo from "../../public/logo.png"

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setMessage("")
    setLoading(true)

    // Placeholder – integrate backend later
    setTimeout(() => {
      setMessage("Password reset link sent to your email.")
      setLoading(false)
    }, 1000)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md"
    >
        <div className="flex justify-center mb-6">
        <img src={Acplogo} alt="Logo" className="h-16 w-auto" />
    </div>
      <h2 className="text-2xl font-bold text-center mb-6">Forgot Password</h2>

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

      {message && <p className="text-green-600 text-sm mb-3">{message}</p>}

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-yellow-600 transition"
        disabled={loading}
      >
        {loading ? "Sending..." : "Send Reset Link"}
      </button>
    </form>
  )
}
