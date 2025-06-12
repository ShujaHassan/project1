import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SessionAdd() {
  const navigate = useNavigate();
  const [session, setSession] = useState({
    name: "",
    oneLiner: "",
    poster: "",
    status: "active",
    initiative: "",
    season: "",
  });

  const handleChange = (e) => {
    setSession({ ...session, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const sessions = JSON.parse(localStorage.getItem("sessions") || "[]");
    const id = Date.now();
    localStorage.setItem("sessions", JSON.stringify([...sessions, { id, ...session }]));
    navigate("/session/view");
  };

  return (
    <div className="p-6 bg-white shadow-md rounded max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">➕ Add New Session</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
        <input name="name" value={session.name} onChange={handleChange} placeholder="Session Name" className="input" />
        <input name="oneLiner" value={session.oneLiner} onChange={handleChange} placeholder="One Liner" className="input" />
        <input name="poster" value={session.poster} onChange={handleChange} placeholder="Poster Link" className="input" />
        <select name="status" value={session.status} onChange={handleChange} className="input">
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
        <input name="initiative" value={session.initiative} onChange={handleChange} placeholder="Initiative" className="input" />
        <input name="season" value={session.season} onChange={handleChange} placeholder="Season" className="input" />
        <button className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700">Save Session</button>
      </form>
    </div>
  );
}
