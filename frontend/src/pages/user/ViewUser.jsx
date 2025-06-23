import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ViewUser = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchUsers = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/users");
      const data = await res.json();
      setUsers(data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching users:", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleEdit = (id) => {
    navigate(`/edit-user/${id}`); // ✅ Navigate to edit
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this user?");
    if (!confirmDelete) return;

    try {
      const res = await fetch(`http://localhost:5000/api/users/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();

      if (!res.ok) {
        alert(`Error: ${data.error}`);
        return;
      }

      alert("User deleted successfully!");
      fetchUsers(); // ✅ Refresh list
    } catch (err) {
      console.error("Delete error:", err);
      alert("Server error. Try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br py-10 px-4">
      <div className="max-w-8xl mx-auto bg-white p-6 md:p-8 rounded-2xl shadow-lg">
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold text-blue-700 mb-2">All Users</h1>
          <p className="text-gray-500">List of all registered users</p>
        </div>

        {loading ? (
          <p className="text-center text-gray-500">Loading users...</p>
        ) : (
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
                    <td className="px-4 py-2 text-sm text-gray-600">
                      {new Date(user.created_at).toLocaleDateString()}
                    </td>
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
        )}
      </div>
    </div>
  );
};

export default ViewUser;
