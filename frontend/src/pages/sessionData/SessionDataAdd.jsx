import { useState } from "react";
import axios from "axios";

const SessionDataAdd = () => {
  const [formData, setFormData] = useState({
    name: "",
    season: "",
    initiative: "",
    description: "",
    youtube_link: "", // ✅ field name updated
    images: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, images: Array.from(e.target.files) });
  };

  const isValidYouTubeLink = (url) => {
    return /^https?:\/\/(www\.)?(youtube\.com|youtu\.be)\//.test(url);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isValidYouTubeLink(formData.youtube_link)) {
      alert("Please enter a valid YouTube link.");
      return;
    }

    try {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("season", formData.season);
      data.append("initiative", formData.initiative);
      data.append("description", formData.description);
      data.append("youtube_link", formData.youtube_link); // ✅ updated

      formData.images.forEach((img) => {
        data.append("images", img);
      });

      const res = await axios.post("http://localhost:5000/api/session-data", data);
      alert("Session Data added successfully!");
      console.log("Success:", res.data);

      setFormData({
        name: "",
        season: "",
        initiative: "",
        description: "",
        youtube_link: "", // ✅ reset
        images: [],
      });

    } catch (err) {
      console.error("Error submitting session data:", err);
      alert("Failed to add session data.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br py-10 px-10">
      <div className="max-w-48xl mx-auto bg-white from-blue-50 to-blue-100 p-8 rounded-2xl shadow-lg">
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-bold text-blue-700 mb-2">Session Data Management</h1>
          <p className="text-gray-500">Add new session data</p>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Name */}
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

          {/* Season */}
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

          {/* Initiative */}
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
              <option value="initiative1">Initiative 1</option>
              <option value="initiative2">Initiative 2</option>
              <option value="initiative3">Initiative 3</option>
            </select>
          </div>

          {/* YouTube Link */}
          <div>
            <label className="block text-sm font-medium text-gray-700">YouTube Link</label>
            <input
              type="url"
              name="youtube_link" // ✅ correct field name
              value={formData.youtube_link}
              onChange={handleChange}
              required
              className="mt-1 w-full border border-gray-300 px-4 py-2 rounded-md focus:ring-2 focus:ring-blue-300"
            />
          </div>

          {/* Description */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows={4}
              className="mt-1 w-full border border-gray-300 px-4 py-2 rounded-md focus:ring-2 focus:ring-blue-300"
            />
          </div>

          {/* Images */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700">Images (1-50)</label>
            <input
              type="file"
              name="images"
              accept="image/*"
              multiple
              onChange={handleFileChange}
              className="mt-1 w-full border border-gray-300 px-4 py-2 rounded-md focus:ring-2 focus:ring-blue-300 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700"
            />
            {formData.images.length > 0 && (
              <p className="text-sm text-gray-500 mt-1">{formData.images.length} image(s) selected</p>
            )}
          </div>

          {/* Submit Button */}
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

export default SessionDataAdd;
