import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function SessionView() {
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("sessions") || "[]");
    setSessions(stored);
  }, []);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">📋 All Sessions</h2>
        <Link to="/session/add" className="bg-green-600 text-white px-4 py-2 rounded">+ Add Session</Link>
      </div>
      <div className="grid gap-4">
        {sessions.length === 0 ? (
          <p>No sessions found.</p>
        ) : (
          sessions.map((s) => (
            <div key={s.id} className="bg-white p-4 rounded shadow flex justify-between items-center">
              <div>
                <h3 className="font-bold text-lg">{s.name}</h3>
                <p className="text-sm text-gray-600">{s.oneLiner}</p>
              </div>
              <Link to={`/session/edit/${s.id}`} className="text-blue-600 underline">Edit</Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
