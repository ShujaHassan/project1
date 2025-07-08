import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const SessionDataEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    season: "",
    initiative: "",
    description: "",
    youtube: "",
    images: [],
  });

  const [existingImages, setExistingImages] = useState([]);

  // Load data by ID
  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/session-data/${id}`)
      .then((res) => {
        const data = res.data;
        setFormData({
          name: data.name,
          season: data.season,
          initiative: data.initiative,
          description: data.description,
          youtube: data.youtube_link,
          images: [],
        });

        // Extract image paths
        const images = [];
        for (let i = 1; i <= 50; i++) {
          const key = `image_${i}`;
          if (data[key]) {
            images.push(data[key]);
          }
        }
        setExistingImages(images);
      })
      .catch((err) => {
        console.error("Error fetching session data:", err);
        alert("Failed to load data.");
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, images: Array.from(e.target.files) });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("name", formData.name);
    data.append("season", formData.season);
    data.append("initiative", formData.initiative);
    data.append("description", formData.description);
    data.append("youtube_link", formData.youtube);

    formData.images.forEach((file) => {
      data.append("images", file);
    });

    try {
      await axios.put(`http://localhost:5000/api/session-data/${id}`, data);
      alert("Session data updated successfully!");
      navigate("/sessiondata/view");
    } catch (error) {
      console.error("Error updating session data:", error);
      alert("Failed to update session data.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br py-10 px-4">
      <div className="max-w-48xl mx-auto bg-white p-8 rounded-2xl shadow-lg">
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-bold text-blue-700 mb-2">Edit Session Data</h1>
          <p className="text-gray-500">Update existing session data record</p>
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
              className="mt-1 w-full border px-4 py-2 rounded-md"
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
              className="mt-1 w-full border px-4 py-2 rounded-md"
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
              className="mt-1 w-full border px-4 py-2 rounded-md"
            >
              <option value="">Select Initiative</option>
              <option value="Initiative A">Initiative A</option>
              <option value="Initiative B">Initiative B</option>
              <option value="Initiative C">Initiative C</option>
            </select>
          </div>

          {/* YouTube Link */}
          <div>
            <label className="block text-sm font-medium text-gray-700">YouTube Link</label>
            <input
              type="url"
              name="youtube"
              value={formData.youtube}
              onChange={handleChange}
              className="mt-1 w-full border px-4 py-2 rounded-md"
              placeholder="https://youtube.com/..."
            />
          </div>

          {/* Description */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className="mt-1 w-full border px-4 py-2 rounded-md"
            />
          </div>

          {/* Image Upload */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700">Upload New Images (1-50)</label>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileChange}
              className="mt-1 w-full"
            />
          </div>

          {/* Existing Images */}
          {existingImages.length > 0 && (
            <div className="md:col-span-2 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-4">
              {existingImages.map((img, idx) => (
                <div key={idx} className="border rounded overflow-hidden">
                  <img
                    src={`http://localhost:5000/uploads/session-data/${img}`}
                    alt={`img-${idx}`}
                    className="w-full h-36 object-cover"
                  />
                </div>
              ))}
            </div>
          )}

          <div className="md:col-span-2 text-right mt-6">
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
