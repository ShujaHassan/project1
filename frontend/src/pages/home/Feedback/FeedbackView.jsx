const ViewFeedback = () => {
  const feedbacks = [
    {
      id: 1,
      name: "Ali Khan",
      country: "Pakistan",
      img: "ali.jpg",
      text: "Amazing experience!",
      initiative: "Sovapa",
      season: "Spring 2025",
      status: "active",
    },
    {
      id: 2,
      name: "Sara Ahmed",
      country: "UAE",
      img: "sara.png",
      text: "Loved the performances!",
      initiative: "Drama Workshop",
      season: "Winter 2024",
      status: "inactive",
    },
  ];

  const handleEdit = (id) => {
    alert(`Edit feedback ${id}`);
  };

  const handleDelete = (id) => {
    alert(`Delete feedback ${id}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br py-10 px-4">
      <div className="max-w-48xl mx-auto bg-white p-8 rounded-2xl shadow-lg">
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold text-blue-700 mb-2">All Feedback</h1>
          <p className="text-gray-500">List of submitted feedbacks</p>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 uppercase">ID</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 uppercase">Name</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 uppercase">Country</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 uppercase">Image</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 uppercase">Feedback</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 uppercase">Initiative</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 uppercase">Season</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 uppercase">Status</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {feedbacks.map((fb) => (
                <tr key={fb.id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 text-sm text-gray-800">{fb.id}</td>
                  <td className="px-4 py-2 text-sm text-gray-800">{fb.name}</td>
                  <td className="px-4 py-2 text-sm text-gray-800">{fb.country}</td>
                  <td className="px-4 py-2 text-sm">
                    <img src={`/images/${fb.img}`} alt={fb.name} className="w-10 h-10 rounded-full" />
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-800">{fb.text}</td>
                  <td className="px-4 py-2 text-sm text-gray-800">{fb.initiative}</td>
                  <td className="px-4 py-2 text-sm text-gray-800">{fb.season}</td>
                  <td className="px-4 py-2 text-sm">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        fb.status === "active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                      }`}
                    >
                      {fb.status}
                    </span>
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-600 space-x-2">
                    <button
                      onClick={() => handleEdit(fb.id)}
                      className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(fb.id)}
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

export default ViewFeedback;
