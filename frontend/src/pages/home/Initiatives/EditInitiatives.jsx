import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const EditInitiatives = () => {
  const { id } = useParams();

  const [formData, setFormData] = useState({
    name: "",
    logo: "",
    description: "",
    text: "",
    heading: "",
    status: "active",
  });

  useEffect(() => {
    // Fetch initiative by ID from backend
    const fetchInitiative = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/initiatives/${id}`);
        setFormData(res.data);
      } catch (err) {
        console.error("Failed to fetch initiative", err);
      }
    };

    fetchInitiative();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/initiatives/${id}`, formData);
      alert("Initiative updated successfully!");
    } catch (err) {
      console.error("Update failed", err);
      alert("Failed to update initiative.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br py-10 px-6">
      <div className="max-w-8xl mx-auto bg-white p-8 rounded-2xl shadow-lg">
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-bold text-blue-700 mb-2">Edit Initiative</h1>
          <p className="text-gray-500">Update the details of this initiative</p>
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
            <label className="block text-sm font-medium text-gray-700">Logo (file name or URL)</label>
            <input
              type="text"
              name="logo"
              value={formData.logo}
              onChange={handleChange}
              className="mt-1 w-full border border-gray-300 px-4 py-2 rounded-md focus:ring-2 focus:ring-blue-300"
            />
            {formData.logo && (
              <img
                src={`http://localhost:5000/uploads/${formData.logo}`}
                alt="Logo Preview"
                className="mt-3 w-24 h-24 object-contain border rounded"
              />
            )}
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700">Heading</label>
            <input
              type="text"
              name="heading"
              value={formData.heading}
              onChange={handleChange}
              className="mt-1 w-full border border-gray-300 px-4 py-2 rounded-md focus:ring-2 focus:ring-blue-300"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="3"
              className="mt-1 w-full border border-gray-300 px-4 py-2 rounded-md focus:ring-2 focus:ring-blue-300"
            ></textarea>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700">Text</label>
            <textarea
              name="text"
              value={formData.text}
              onChange={handleChange}
              rows="3"
              className="mt-1 w-full border border-gray-300 px-4 py-2 rounded-md focus:ring-2 focus:ring-blue-300"
            ></textarea>
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
              Update Initiative
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditInitiatives;
