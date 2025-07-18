import { useState } from "react";
import axios from "axios";

const SpeakerAdd = () => {
  const [formData, setFormData] = useState({
    name: "",
    season: "",
    initiative: "",
    role: "",
    facebook_link: "",
    instagram_link: "",
    youtube_link: "",
    description: "",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    setFormData((prev) => ({ ...prev, image: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("season", formData.season);
      data.append("initiative", formData.initiative);
      data.append("role", formData.role);
      data.append("facebook_link", formData.facebook_link);
      data.append("instagram_link", formData.instagram_link);
      data.append("youtube_link", formData.youtube_link);
      data.append("description", formData.description);
      if (formData.image) {
        data.append("image", formData.image);
      }

      // ✅ Fixed endpoint
      await axios.post("http://localhost:5000/api/speakers", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Speaker added successfully!");

      setFormData({
        name: "",
        season: "",
        initiative: "",
        role: "",
        facebook_link: "",
        instagram_link: "",
        youtube_link: "",
        description: "",
        image: null,
      });
    } catch (err) {
      console.error("Error adding speaker:", err.response?.data || err.message);
      alert("Failed to add speaker.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br py-10 px-10">
      <div className="max-w-48x0 mx-auto bg-white p-8 rounded-2xl shadow-lg">
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-bold text-blue-700 mb-2">Add Speaker</h1>
          <p className="text-gray-500">Add new speaker to the list</p>
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
              <option value="Sovapa">Sovapa</option>
              <option value="ArtFest">ArtFest</option>
              <option value="YouthForum">YouthForum</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Role</label>
            <input
              type="text"
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
              className="mt-1 w-full border border-gray-300 px-4 py-2 rounded-md focus:ring-2 focus:ring-blue-300"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Facebook Link</label>
            <input
              type="text"
              name="facebook_link"
              value={formData.facebook_link}
              onChange={handleChange}
              className="mt-1 w-full border border-gray-300 px-4 py-2 rounded-md focus:ring-2 focus:ring-blue-300"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Instagram Link</label>
            <input
              type="text"
              name="instagram_link"
              value={formData.instagram_link}
              onChange={handleChange}
              className="mt-1 w-full border border-gray-300 px-4 py-2 rounded-md focus:ring-2 focus:ring-blue-300"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">YouTube Link</label>
            <input
              type="text"
              name="youtube_link"
              value={formData.youtube_link}
              onChange={handleChange}
              className="mt-1 w-full border border-gray-300 px-4 py-2 rounded-md focus:ring-2 focus:ring-blue-300"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Speaker Image</label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleImageChange}
              className="mt-1 w-full border border-gray-300 px-4 py-2 rounded-md focus:ring-2 focus:ring-blue-300 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              className="mt-1 w-full border border-gray-300 px-4 py-2 rounded-md focus:ring-2 focus:ring-blue-300"
            ></textarea>
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

export default SpeakerAdd;