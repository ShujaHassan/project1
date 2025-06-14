const SpeakerView = () => {
  const speakers = [
    {
      id: 1,
      name: "Ali Raza",
      season: "Season 3",
      initiative: "Art Revival",
      role: "Keynote Speaker",
      facebook: "https://facebook.com/aliraza",
      instagram: "https://instagram.com/aliraza",
      youtube: "https://youtube.com/aliraza",
      description: "Renowned figure in Pakistani art scene.",
    },
    {
      id: 2,
      name: "Fatima Khan",
      season: "Season 2",
      initiative: "Voice of Youth",
      role: "Panelist",
      facebook: "https://facebook.com/fatima",
      instagram: "https://instagram.com/fatima",
      youtube: "https://youtube.com/fatima",
      description: "Youth ambassador and motivational speaker.",
    },
  ];

  const handleEdit = (id) => {
    alert(`Edit speaker with ID ${id}`);
    // Navigate to edit page logic
  };

  const handleDelete = (id) => {
    alert(`Delete speaker with ID ${id}`);
    // Delete logic
  };

  return (
    <div className="min-h-screen bg-gradient-to-br py-10 px-4">
      <div className="max-w-48xl mx-auto bg-white p-8 rounded-2xl shadow-lg">
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold text-blue-700 mb-2">All Speakers</h1>
          <p className="text-gray-500">List of all session speakers</p>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 uppercase">ID</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 uppercase">Name</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 uppercase">Season</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 uppercase">Initiative</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 uppercase">Role</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 uppercase">Facebook</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 uppercase">Instagram</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 uppercase">YouTube</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 uppercase">Description</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {speakers.map((spk) => (
                <tr key={spk.id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 text-sm text-gray-800">{spk.id}</td>
                  <td className="px-4 py-2 text-sm text-gray-800">{spk.name}</td>
                  <td className="px-4 py-2 text-sm text-gray-800">{spk.season}</td>
                  <td className="px-4 py-2 text-sm text-gray-800">{spk.initiative}</td>
                  <td className="px-4 py-2 text-sm text-gray-800">{spk.role}</td>
                  <td className="px-4 py-2 text-sm text-blue-600 underline">
                    <a href={spk.facebook} target="_blank" rel="noreferrer">Facebook</a>
                  </td>
                  <td className="px-4 py-2 text-sm text-pink-600 underline">
                    <a href={spk.instagram} target="_blank" rel="noreferrer">Instagram</a>
                  </td>
                  <td className="px-4 py-2 text-sm text-red-600 underline">
                    <a href={spk.youtube} target="_blank" rel="noreferrer">YouTube</a>
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-600">{spk.description}</td>
                  <td className="px-4 py-2 text-sm text-gray-600 space-x-2">
                    <button
                      onClick={() => handleEdit(spk.id)}
                      className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(spk.id)}
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

export default SpeakerView;
