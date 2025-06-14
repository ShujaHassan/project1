
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const EditSponsor = () => {
  const { id } = useParams();

  // Dummy sponsor data
  const existingSponsor = {
    id: 1,
    name: "Arts Partner",
    image: "partner-logo.jpg",
    initiative: "Sovapa",
    season: "Spring 2025",
    status: "active",
  };

  const [formData, setFormData] = useState({
    name: "",
    image: "",
    initiative: "",
    season: "",
    status: "active",
  });

  useEffect(() => {
    setFormData(existingSponsor); // Simulate fetch
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      image: e.target.files[0]?.name || prev.image,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Updated Sponsor:", formData);
    alert("Sponsor updated successfully!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br py-10 px-6">
      <div className="max-w-48xl mx-auto bg-white p-8 rounded-2xl shadow-lg">
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-bold text-blue-700 mb-2">Edit Sponsor</h1>
          <p className="text-gray-500">Update sponsor details below</p>
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
              className="mt-1 w-full border border-gray-300 px-4 py-2 rounded-md focus:ring-2 focus:ring-blue-300"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Image</label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleFileChange}
              className="mt-1 w-full border border-gray-300 px-4 py-2 rounded-md file:bg-blue-600 file:text-white file:border-none file:px-4 file:py-2 file:rounded-md file:cursor-pointer hover:file:bg-blue-700"
            />
            {formData.image && (
              <p className="text-sm text-gray-500 mt-1">Current: {formData.image}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Initiative</label>
            <input
              type="text"
              name="initiative"
              value={formData.initiative}
              onChange={handleChange}
              placeholder="e.g. Sovapa"
              className="mt-1 w-full border border-gray-300 px-4 py-2 rounded-md focus:ring-2 focus:ring-blue-300"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Season</label>
            <input
              type="text"
              name="season"
              value={formData.season}
              onChange={handleChange}
              placeholder="e.g. Spring 2025"
              className="mt-1 w-full border border-gray-300 px-4 py-2 rounded-md focus:ring-2 focus:ring-blue-300"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="mt-1 w-full border border-gray-300 px-4 py-2 rounded-md focus:ring-2 focus:ring-blue-300"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          <div className="md:col-span-2 text-right">
            <button
              type="submit"
              className="bg-blue-600 text-white px-8 py-2 rounded-md hover:bg-blue-700 shadow"
            >
              Update Sponsor
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditSponsor;
