const ViewAbout = () => {
  const aboutData = [
    {
      id: 1,
      heading: "About Our Culture",
      description: "A glimpse into the cultural diversity of Pakistan.",
      tab_1_heading: "History",
      tab_1_title: "Rich heritage",
      tab_2_heading: "Mission",
      tab_2_title: "Promoting arts",
      tab_3_heading: "Vision",
      tab_3_title: "Global recognition",
      tab_4_heading: "Team",
      tab_4_title: "Creative minds",
      initiative: "Sovapa",
      season: "Spring 2025",
      status: "active",
    },
  ];

  const handleEdit = (id) => {
    alert(`Edit About ${id}`);
  };

  const handleDelete = (id) => {
    alert(`Delete About ${id}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br py-10 px-4">
      <div className="max-w-48xl mx-auto bg-white p-8 rounded-2xl shadow-lg">
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold text-blue-700 mb-2">About Sections</h1>
          <p className="text-gray-500">List of all about content</p>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 uppercase">ID</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 uppercase">Heading</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 uppercase">Description</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 uppercase">Initiative</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 uppercase">Season</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 uppercase">Status</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {aboutData.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 text-sm text-gray-800">{item.id}</td>
                  <td className="px-4 py-2 text-sm text-gray-800">{item.heading}</td>
                  <td className="px-4 py-2 text-sm text-gray-800 truncate max-w-xs">{item.description}</td>
                  <td className="px-4 py-2 text-sm text-gray-800">{item.initiative}</td>
                  <td className="px-4 py-2 text-sm text-gray-800">{item.season}</td>
                  <td className="px-4 py-2 text-sm">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        item.status === "active"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-600 space-x-2">
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

export default ViewAbout;
