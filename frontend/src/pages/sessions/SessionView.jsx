import React from "react";

const SessionView = () => {
  const sessions = [
    {
      id: 1,
      name: "Music Therapy",
      oneLiner: "Healing through sound",
      poster: "https://via.placeholder.com/80",
      status: "active",
      initiative: "Wellness",
      season: "Spring 2025",
    },
    {
      id: 2,
      name: "Art & Mind",
      oneLiner: "Creative exploration",
      poster: "https://via.placeholder.com/80",
      status: "inactive",
      initiative: "Mental Health",
      season: "Summer 2025",
    },
  ];

  const handleEdit = (id) => {
    alert(`Edit session ${id}`);
  };

  const handleDelete = (id) => {
    alert(`Delete session ${id}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-50 py-10 px-4">
      <div className="max-w-8xl mx-auto bg-white p-6 rounded-2xl shadow-md">
        <div className="mb-6 text-center">
          <h1 className="text-2xl md:text-3xl font-bold text-blue-700 mb-2">All Sessions</h1>
          <p className="text-gray-500">List of all sessions</p>
        </div>

        <div className="hidden md:block overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600 uppercase">ID</th>
                <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600 uppercase">Name</th>
                <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600 uppercase">One Liner</th>
                <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600 uppercase">Poster</th>
                <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600 uppercase">Status</th>
                <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600 uppercase">Initiative</th>
                <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600 uppercase">Season</th>
                <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sessions.map((session) => (
                <tr key={session.id}>
                  <td className="px-4 py-2 text-sm">{session.id}</td>
                  <td className="px-4 py-2 text-sm">{session.name}</td>
                  <td className="px-4 py-2 text-sm">{session.oneLiner}</td>
                  <td className="px-4 py-2 text-sm">
                    <img src={session.poster} alt="Poster" className="h-10 w-10 rounded" />
                  </td>
                  <td className="px-4 py-2 text-sm">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${session.status === "active" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                      {session.status}
                    </span>
                  </td>
                  <td className="px-4 py-2 text-sm">{session.initiative}</td>
                  <td className="px-4 py-2 text-sm">{session.season}</td>
                  <td className="px-4 py-2 text-sm space-x-2">
                    <button onClick={() => handleEdit(session.id)} className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">Edit</button>
                    <button onClick={() => handleDelete(session.id)} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Card View */}
        <div className="md:hidden space-y-4">
          {sessions.map((session) => (
            <div key={session.id} className="bg-gray-50 rounded-lg p-4 shadow-sm">
              <div className="flex items-center gap-4 mb-2">
                <img src={session.poster} alt="Poster" className="h-14 w-14 rounded object-cover" />
                <div>
                  <h2 className="font-semibold text-lg">{session.name}</h2>
                  <p className="text-sm text-gray-600">{session.oneLiner}</p>
                </div>
              </div>
              <p><strong>Initiative:</strong> {session.initiative}</p>
              <p><strong>Season:</strong> {session.season}</p>
              <p>
                <strong>Status:</strong>{" "}
                <span className={`text-sm font-semibold ${session.status === "active" ? "text-green-600" : "text-red-600"}`}>
                  {session.status}
                </span>
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                <button onClick={() => handleEdit(session.id)} className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600">
                  Edit
                </button>
                <button onClick={() => handleDelete(session.id)} className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SessionView;
