import React from "react";

const SessionDataView = () => {
  const sessionDataList = [
    {
      id: 1,
      name: "Demo Session",
      season: "Season 1",
      initiative: "Initiative A",
      description: "This is a demo description for the session.",
      youtube: "https://youtube.com/demo",
    },
    {
      id: 2,
      name: "Inspiration Talk",
      season: "Season 2",
      initiative: "Initiative B",
      description: "Talk on leadership and innovation.",
      youtube: "https://youtube.com/innovation",
    },
  ];

  const handleEdit = (id) => {
    alert(`Edit session data ${id}`);
  };

  const handleDelete = (id) => {
    alert(`Delete session data ${id}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br py-10 px-4">
      <div className="max-w-48xl mx-auto bg-white p-8 rounded-2xl shadow-lg">
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold text-blue-700 mb-2">All Session Data</h1>
          <p className="text-gray-500">List of all session data entries</p>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 uppercase">ID</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 uppercase">Name</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 uppercase">Season</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 uppercase">Initiative</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 uppercase">YouTube</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 uppercase">Description</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sessionDataList.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 text-sm text-gray-800">{item.id}</td>
                  <td className="px-4 py-2 text-sm text-gray-800">{item.name}</td>
                  <td className="px-4 py-2 text-sm text-gray-800">{item.season}</td>
                  <td className="px-4 py-2 text-sm text-gray-800">{item.initiative}</td>
                  <td className="px-4 py-2 text-sm text-blue-600 underline">
                    <a href={item.youtube} target="_blank" rel="noopener noreferrer">Link</a>
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-600">{item.description}</td>
                  <td className="px-4 py-2 text-sm space-x-2">
                    <button
                      onClick={() => handleEdit(item.id)}
                      className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SessionDataView;
