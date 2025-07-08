import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditFacilities = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    title: "",
    image: "",
    status: "active",
  });

  useEffect(() => {
    fetchFacilityById();
  }, []);

  const fetchFacilityById = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/facilities/${id}`);
      setFormData(res.data);
    } catch (err) {
      console.error("Failed to fetch facility:", err);
      alert("Error fetching facility data.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, image: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append("name", formData.name);
    form.append("title", formData.title);
    form.append("status", formData.status);
    if (formData.image instanceof File) {
      form.append("image", formData.image);
    }

    try {
      await axios.put(`http://localhost:5000/api/facilities/${id}`, form, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Facility updated successfully!");
      navigate("/home/facilities/view");
    } catch (err) {
      console.error("Update failed:", err);
      alert("Failed to update facility.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br py-10 px-6">
      <div className="max-w-48xl mx-auto bg-white p-8 rounded-2xl shadow-lg">
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-bold text-blue-700 mb-2">Edit Facility</h1>
          <p className="text-gray-500">Update facility details below</p>
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
            <label className="block text-sm font-medium text-gray-700">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
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
              className="mt-1 w-full border border-gray-300 px-4 py-2 rounded-md focus:ring-2 focus:ring-blue-300 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700 bg-white"
            />

            {formData.image && typeof formData.image === "string" && (
              <div className="mt-3">
                <img
                  src={`http://localhost:5000/uploads/facilities/${formData.image}`}
                  alt="Current"
                  className="h-24 rounded border"
                />
                <p className="text-sm text-gray-500 mt-1">Current Image</p>
              </div>
            )}

            {formData.image && typeof formData.image === "object" && (
              <p className="text-sm text-gray-500 mt-2">Selected file: {formData.image.name}</p>
            )}
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
              Update Facility
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditFacilities;
