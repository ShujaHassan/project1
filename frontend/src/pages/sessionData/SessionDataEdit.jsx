// src/pages/sessiondata/SessionDataEdit.jsx

import { useState } from "react";

const SessionDataEdit = () => {
  const [formData, setFormData] = useState({
    name: "Demo Session",
    season: "Season 1",
    initiative: "Initiative A",
    description: "This is a demo session data.",
    youtube: "https://youtube.com/demo",
    images: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData((prev) => ({
      ...prev,
      images: files,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Edited Session Data:", formData);
    alert("Session data updated successfully!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br py-10 px-4">
      <div className="max-w-48xl mx-auto bg-white p-8 rounded-2xl shadow-lg">
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-bold text-blue-700 mb-2">Edit Session Data</h1>
          <p className="text-gray-500">Update existing session data record</p>
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
            <label className="block text-sm font-medium text-gray-700">Season</label>
            <input
              type="text"
              name="season"
              value={formData.season}
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
              <option value="Initiative A">Initiative A</option>
              <option value="Initiative B">Initiative B</option>
              <option value="Initiative C">Initiative C</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">YouTube Link</label>
            <input
              type="url"
              name="youtube"
              value={formData.youtube}
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
              rows={4}
              className="mt-1 w-full border border-gray-300 px-4 py-2 rounded-md focus:ring-2 focus:ring-blue-300"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700">Upload Images (1-50)</label>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileChange}
              className="mt-1 w-full"
            />
          </div>

          <div className="md:col-span-2 text-right">
            <button
              type="submit"
              className="bg-blue-600 text-white px-8 py-2 rounded-md hover:bg-blue-700 shadow"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SessionDataEdit;
