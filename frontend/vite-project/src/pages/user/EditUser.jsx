import { useState, useEffect } from "react";

const EditUser = () => {
  // Dummy pre-filled user data (would be fetched in real app)
  const [formData, setFormData] = useState({
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    username: "johndoe",
    password: "",
    role: "admin",
    status: "active",
    created_at: "2024-01-01",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("User Updated:", formData);
    alert("User updated successfully!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br py-10 px-4">
      <div className="max-w-48xl mx-auto bg-white p-8 rounded-2xl shadow-lg">
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold text-blue-700 mb-2">Edit User</h1>
          <p className="text-gray-500">Modify user information</p>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="mt-1 w-full border px-4 py-2 rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="mt-1 w-full border px-4 py-2 rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              className="mt-1 w-full border px-4 py-2 rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Password (optional)</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="mt-1 w-full border px-4 py-2 rounded-md"
              placeholder="Leave blank to keep current"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Role</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="mt-1 w-full border px-4 py-2 rounded-md"
            >
              <option value="admin">Admin</option>
              <option value="user">User</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="mt-1 w-full border px-4 py-2 rounded-md"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          <div className="md:col-span-2 text-right">
            <button
              type="submit"
              className="bg-blue-700 text-white px-8 py-2 rounded-md hover:bg-yellow-700 shadow"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditUser;
