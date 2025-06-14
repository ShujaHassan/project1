const ViewUser = () => {
  const users = [
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      username: "johndoe",
      role: "admin",
      status: "active",
      created_at: "2024-01-01",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      username: "janesmith",
      role: "user",
      status: "inactive",
      created_at: "2024-02-15",
    },
  ];

  const handleEdit = (id) => {
    alert(`Edit user ${id}`);
  };

  const handleDelete = (id) => {
    alert(`Delete user ${id}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br py-10 px-4">
      <div className="max-w-8xl mx-auto bg-white p-6 md:p-8 rounded-2xl shadow-lg">
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold text-blue-700 mb-2">All Users</h1>
          <p className="text-gray-500">List of all registered users</p>
        </div>

        <div className="overflow-x-auto w-full">
          <table className="min-w-[700px] w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 uppercase">ID</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 uppercase">Name</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 uppercase">Email</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 uppercase">Username</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 uppercase">Role</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 uppercase">Status</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 uppercase">Created At</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 text-sm text-gray-800">{user.id}</td>
                  <td className="px-4 py-2 text-sm text-gray-800">{user.name}</td>
                  <td className="px-4 py-2 text-sm text-gray-800">{user.email}</td>
                  <td className="px-4 py-2 text-sm text-gray-800">{user.username}</td>
                  <td className="px-4 py-2 text-sm text-gray-800 capitalize">{user.role}</td>
                  <td className="px-4 py-2 text-sm">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        user.status === "active"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {user.status}
                    </span>
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-600">{user.created_at}</td>
                  <td className="px-4 py-2 text-sm text-gray-600 space-x-2">
                    <button
                      onClick={() => handleEdit(user.id)}
                      className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(user.id)}
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

export default ViewUser;
