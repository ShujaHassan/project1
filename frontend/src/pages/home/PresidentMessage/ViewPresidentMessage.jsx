const ViewPresidentMessage = () => {
  const messages = [
    {
      id: 1,
      heading: "Message from the President",
      image: "https://via.placeholder.com/100",
      title: "Mr. Ali Khan",
      position: "President, Arts Council",
      description: "We are committed to promoting arts and culture...",
      bottom_title: "Art is Life",
      initiative: "Sovapa",
      season: "Spring 2025",
      status: "active",
    },
    {
      id: 2,
      heading: "A New Beginning",
      image: "https://via.placeholder.com/100",
      title: "Ms. Fatima Noor",
      position: "Vice President",
      description: "Innovation and passion drive our cultural mission.",
      bottom_title: "Creative Pakistan",
      initiative: "Youth Program",
      season: "Winter 2024",
      status: "inactive",
    },
  ];

  const handleEdit = (id) => {
    alert(`Edit President Message ${id}`);
    // Route to edit
  };

  const handleDelete = (id) => {
    alert(`Delete President Message ${id}`);
    // Handle delete logic
  };

  return (
    <div className="min-h-screen bg-gradient-to-br py-10 px-4">
      <div className="max-w-48xl mx-auto bg-white p-8 rounded-2xl shadow-lg">
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold text-blue-700 mb-2">President Messages</h1>
          <p className="text-gray-500">All messages from leadership</p>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 uppercase">ID</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 uppercase">Heading</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 uppercase">Image</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 uppercase">Title</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 uppercase">Position</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 uppercase">Bottom Title</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 uppercase">Initiative</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 uppercase">Season</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 uppercase">Status</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {messages.map((msg) => (
                <tr key={msg.id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 text-sm">{msg.id}</td>
                  <td className="px-4 py-2 text-sm">{msg.heading}</td>
                  <td className="px-4 py-2 text-sm">
                    <img src={msg.image} alt="President" className="w-16 h-16 object-cover rounded-full" />
                  </td>
                  <td className="px-4 py-2 text-sm">{msg.title}</td>
                  <td className="px-4 py-2 text-sm">{msg.position}</td>
                  <td className="px-4 py-2 text-sm">{msg.bottom_title}</td>
                  <td className="px-4 py-2 text-sm">{msg.initiative}</td>
                  <td className="px-4 py-2 text-sm">{msg.season}</td>
                  <td className="px-4 py-2 text-sm">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        msg.status === "active"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {msg.status}
                    </span>
                  </td>
                  <td className="px-4 py-2 text-sm space-x-2">
                    <button
                      onClick={() => handleEdit(msg.id)}
                      className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(msg.id)}
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

export default ViewPresidentMessage;
