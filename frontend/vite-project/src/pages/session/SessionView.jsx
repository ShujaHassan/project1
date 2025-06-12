import { useEffect, useState } from "react";

export default function SessionView() {
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    const savedSessions = localStorage.getItem("sessions");
    try {
      const parsed = JSON.parse(savedSessions || "[]");
      setSessions(parsed);
    } catch (error) {
      console.error("JSON Parse Error:", error);
    }
  }, []);

  return (
    <div className="p-6 bg-white rounded-lg shadow-md max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-2">📋 All Sessions</h1>

      {sessions.length === 0 ? (
        <p className="text-gray-500 text-center">No sessions found. Please add some.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {sessions.map((s, i) => (
            <div key={i} className="border rounded-lg p-4 bg-gray-50 hover:bg-gray-100 transition">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-xl font-semibold text-blue-600">{s.name}</h2>
                <span className={`px-3 py-1 text-xs rounded-full ${s.status === 'active' ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'}`}>
                  {s.status}
                </span>
              </div>
              <p className="text-sm text-gray-700 italic mb-2">{s.oneLiner}</p>
              <div className="text-sm text-gray-600 space-y-1">
                <p><strong>Initiative:</strong> {s.initiative}</p>
                <p><strong>Season:</strong> {s.season}</p>
                <p><strong>Poster:</strong> {s.poster || "N/A"}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
