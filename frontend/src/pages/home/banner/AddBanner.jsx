import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const BannerAdd = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    img: null, // for file
    heading: "",
    description: "",
    initiative: "",
    season: "",
    status: "active",
  });

  const initiativeOptions = [
    "Sovapa",
    "Youth Program",
    "Cultural Exchange",
    "Music Academy",
    "Drama Workshop",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      img: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();
      data.append("img", formData.img);
      data.append("heading", formData.heading);
      data.append("description", formData.description);
      data.append("initiative", formData.initiative);
      data.append("season", formData.season);
      data.append("status", formData.status);

      await axios.post("http://localhost:5000/api/banner", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Banner added successfully!");
      navigate("/home/banner/view"); // ✅ your route
    } catch (err) {
      console.error("Error adding banner:", err);
      alert("Failed to add banner");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-50 py-10 px-8">
      <div className="max-w-8xl mx-auto bg-white p-8 rounded-2xl shadow-lg">
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-bold text-blue-700 mb-2">Add Banner</h1>
          <p className="text-gray-500">Fill in the banner details below</p>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Heading</label>
            <input
              type="text"
              name="heading"
              value={formData.heading}
              onChange={handleChange}
              required
              className="mt-1 w-full border border-gray-300 px-4 py-2 rounded-md focus:ring-2 focus:ring-blue-300"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              className="mt-1 w-full border border-gray-300 px-4 py-2 rounded-md focus:ring-2 focus:ring-blue-300"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Initiative</label>
            <select
              name="initiative"
              value={formData.initiative}
              onChange={handleChange}
              required
              className="mt-1 w-full border border-gray-300 px-4 py-2 rounded-md focus:ring-2 focus:ring-blue-300"
            >
              <option value="">Select Initiative</option>
              {initiativeOptions.map((opt, idx) => (
                <option key={idx} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
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

          <div>
            <label className="block text-sm font-medium text-gray-700">Banner Image</label>
            <input
              type="file"
              name="img"
              accept="image/*"
              onChange={handleFileChange}
              required
              className="mt-1 w-full text-gray-700 border border-gray-300 px-4 py-2 rounded-md file:bg-blue-600 file:text-white file:border-none file:px-4 file:py-2 file:rounded-md file:cursor-pointer hover:file:bg-blue-700"
            />
          </div>

          <div className="md:col-span-2 text-right">
            <button
              type="submit"
              className="bg-blue-600 text-white px-8 py-2 rounded-md hover:bg-blue-700 shadow"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BannerAdd;
