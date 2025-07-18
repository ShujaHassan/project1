import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditVideo = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    link: "",
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
    fetchVideoById();
  }, []);

  const fetchVideoById = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/videos/${id}`);
      setFormData(res.data);
    } catch (error) {
      console.error("Error fetching video by ID:", error);
      alert("Failed to load video data.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/videos/${id}`, formData);
      alert("Video updated successfully!");
      navigate("/videos"); // Change route as per your route structure
    } catch (err) {
      console.error("Error updating video:", err);
      alert("Failed to update video.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br py-10 px-4">
      <div className="max-w-48xl mx-auto bg-white p-8 rounded-2xl shadow-lg">
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-bold text-blue-700 mb-2">Edit Video</h1>
          <p className="text-gray-500">Update video details below</p>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">YouTube Link</label>
            <input
              type="text"
              name="link"
              value={formData.link}
              onChange={handleChange}
              required
              className="mt-1 w-full border border-gray-300 px-4 py-2 rounded-md"
              placeholder="https://youtube.com/..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Initiative</label>
            <select
              name="initiative"
              value={formData.initiative}
              onChange={handleChange}
              required
              className="mt-1 w-full border border-gray-300 px-4 py-2 rounded-md"
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
              required
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
              Update Video
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditVideo;
