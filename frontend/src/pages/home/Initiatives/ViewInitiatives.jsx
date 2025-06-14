const ViewInitiatives = () => {
  const initiatives = [
    {
      id: 1,
      name: "Sovapa",
      logo: "sovapa.png",
      description: "Society of Visual and Performing Arts.",
      text: "Promotes youth in fine arts.",
      heading: "Empowering Art",
      status: "active",
    },
    {
      id: 2,
      name: "Drama Workshop",
      logo: "drama.png",
      description: "Weekly acting sessions for beginners.",
      text: "Encouraging theatre talents.",
      heading: "Stage is Yours",
      status: "inactive",
    },
  ];

  const handleEdit = (id) => {
    alert(`Edit initiative ${id}`);
    // Navigate or update route logic here
  };

  const handleDelete = (id) => {
    alert(`Delete initiative ${id}`);
    // Implement delete logic here
  };

  return (
    <div className="min-h-screen bg-gradient-to-br py-10 px-4">
      <div className="max-w-8xl mx-auto bg-white p-8 rounded-2xl shadow-lg">
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold text-blue-700 mb-2">All Initiatives</h1>
          <p className="text-gray-500">List of all initiatives</p>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 uppercase">ID</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 uppercase">Name</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 uppercase">Logo</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 uppercase">Heading</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 uppercase">Description</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 uppercase">Text</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 uppercase">Status</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {initiatives.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 text-sm text-gray-800">{item.id}</td>
                  <td className="px-4 py-2 text-sm text-gray-800">{item.name}</td>
                  <td className="px-4 py-2 text-sm text-gray-800">
                    <img src={item.logo} alt={item.name} className="w-12 h-12 object-contain" />
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-800">{item.heading}</td>
                  <td className="px-4 py-2 text-sm text-gray-800">{item.description}</td>
                  <td className="px-4 py-2 text-sm text-gray-800">{item.text}</td>
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

export default ViewInitiatives;
