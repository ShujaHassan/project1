import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const BannerEdit = () => {
  const { id } = useParams(); // In case you pass id via route

  // Dummy existing banner data
  const existingBanner = {
    id: 1,
    img: "banner1.jpg",
    heading: "Welcome to Arts Council",
    description: "Empowering culture and creativity",
    initiative: "Sovapa",
    season: "Summer 2025",
    status: "active",
  };

  const [formData, setFormData] = useState({
    img: "",
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

  useEffect(() => {
    // Simulate fetch
    setFormData(existingBanner);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Updated Banner:", formData);
    alert("Banner updated successfully!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-50 py-10 px-6">
      <div className="max-w-8xl mx-auto bg-white p-8 rounded-2xl shadow-lg">
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-bold text-blue-700 mb-2">Edit Banner</h1>
          <p className="text-gray-500">Update banner details below</p>
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
            <label className="block text-sm font-medium text-gray-700">Banner Image (file name or URL)</label>
            <input
              type="text"
              name="img"
              value={formData.img}
              onChange={handleChange}
              required
              className="mt-1 w-full border border-gray-300 px-4 py-2 rounded-md focus:ring-2 focus:ring-blue-300"
            />
          </div>

          <div className="md:col-span-2 text-right">
            <button
              type="submit"
              className="bg-blue-600 text-white px-8 py-2 rounded-md hover:bg-blue-700 shadow"
            >
              Update Banner
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BannerEdit;
