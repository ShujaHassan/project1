import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function SessionEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [session, setSession] = useState(null);

  useEffect(() => {
    const sessions = JSON.parse(localStorage.getItem("sessions") || "[]");
    const found = sessions.find((s) => s.id === Number(id));
    if (found) setSession(found);
  }, [id]);

  const handleChange = (e) => {
    setSession({ ...session, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const sessions = JSON.parse(localStorage.getItem("sessions") || "[]");
    const updated = sessions.map((s) => (s.id === Number(id) ? session : s));
    localStorage.setItem("sessions", JSON.stringify(updated));
    navigate("/session/view");
  };

  if (!session) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-6 bg-white shadow-md rounded max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">✏️ Edit Session</h2>
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
        <button className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700">Update Session</button>
      </form>
    </div>
  );
}
