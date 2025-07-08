import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditSponsor = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    image: "",
    initiative: "",
    season: "",
    status: "active",
  });

  useEffect(() => {
    fetchSponsorById();
  }, []);

  const fetchSponsorById = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/sponsor/${id}`);
      setFormData(res.data);
    } catch (err) {
      console.error("Failed to fetch sponsor:", err);
      alert("Error fetching sponsor data");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, image: file }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const form = new FormData();
      form.append("name", formData.name);
      form.append("initiative", formData.initiative);
      form.append("season", formData.season);
      form.append("status", formData.status);
      if (formData.image instanceof File) {
        form.append("image", formData.image);
      }

      await axios.put(`http://localhost:5000/api/sponsor/${id}`, form, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Sponsor updated successfully!");
      navigate("/home/sponsors/view");
    } catch (err) {
      console.error("Update error:", err);
      alert("Failed to update sponsor.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br py-10 px-8">
      <div className="max-w-7xl mx-auto bg-white p-8 rounded-2xl shadow-lg">
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
              className="mt-1 w-full border border-gray-300 px-4 py-2 rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Image</label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleFileChange}
              className="mt-1 w-full border border-gray-300 px-4 py-2 rounded-md"
            />
            {formData.image && typeof formData.image === "string" && (
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
              className="mt-1 w-full border border-gray-300 px-4 py-2 rounded-md"
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
              className="mt-1 w-full border border-gray-300 px-4 py-2 rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="mt-1 w-full border border-gray-300 px-4 py-2 rounded-md"
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
