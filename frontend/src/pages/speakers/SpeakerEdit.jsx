import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const SpeakerEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    season: "",
    initiative: "",
    role: "",
    facebook_link: "",
    instagram_link: "",
    youtube_link: "",
    description: "",
    image: "", // 🔁 keep string initially to show existing image
  });

  const [selectedImage, setSelectedImage] = useState(null); // ✅ for new image preview

  useEffect(() => {
    const fetchSpeaker = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/speakers/${id}`);
        setFormData(res.data); // keep image string
      } catch (err) {
        console.error("Error fetching speaker:", err);
        alert("Failed to fetch speaker.");
      }
    };

    fetchSpeaker();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file); // for preview
    setFormData((prev) => ({ ...prev, image: file }));
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
      if (formData.image && typeof formData.image !== "string") {
        data.append("image", formData.image); // ✅ only if new image selected
      }

      await axios.put(`http://localhost:5000/api/speakers/${id}`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Speaker updated successfully!");
      navigate("/speakers/view");
    } catch (err) {
      console.error("Error updating speaker:", err);
      alert("Failed to update speaker.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br py-10 px-10">
      <div className="max-w-48x0 mx-auto bg-white from-blue-50 to-blue-100 p-8 rounded-2xl shadow-lg">
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-bold text-blue-700 mb-2">Edit Speaker</h1>
          <p className="text-gray-500">Update speaker details</p>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* All inputs same */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} className="mt-1 w-full border border-gray-300 px-4 py-2 rounded-md focus:ring-2 focus:ring-blue-300" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Season</label>
            <input type="text" name="season" value={formData.season} onChange={handleChange} className="mt-1 w-full border border-gray-300 px-4 py-2 rounded-md focus:ring-2 focus:ring-blue-300" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Initiative</label>
            <input type="text" name="initiative" value={formData.initiative} onChange={handleChange} className="mt-1 w-full border border-gray-300 px-4 py-2 rounded-md focus:ring-2 focus:ring-blue-300" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Role</label>
            <input type="text" name="role" value={formData.role} onChange={handleChange} className="mt-1 w-full border border-gray-300 px-4 py-2 rounded-md focus:ring-2 focus:ring-blue-300" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Facebook Link</label>
            <input type="url" name="facebook_link" value={formData.facebook_link} onChange={handleChange} className="mt-1 w-full border border-gray-300 px-4 py-2 rounded-md focus:ring-2 focus:ring-blue-300" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Instagram Link</label>
            <input type="url" name="instagram_link" value={formData.instagram_link} onChange={handleChange} className="mt-1 w-full border border-gray-300 px-4 py-2 rounded-md focus:ring-2 focus:ring-blue-300" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">YouTube Link</label>
            <input type="url" name="youtube_link" value={formData.youtube_link} onChange={handleChange} className="mt-1 w-full border border-gray-300 px-4 py-2 rounded-md focus:ring-2 focus:ring-blue-300" />
          </div>

          {/* 🔁 Image input and preview */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Speaker Image</label>
            <input type="file" name="image" accept="image/*" onChange={handleImageChange}
              className="mt-1 w-full border border-gray-300 px-4 py-2 rounded-md focus:ring-2 focus:ring-blue-300 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700"
            />

            {/* Preview Logic */}
            {selectedImage ? (
              <img src={URL.createObjectURL(selectedImage)} alt="Preview" className="mt-2 w-24 h-24 object-cover rounded-md" />
            ) : (
              formData.image && typeof formData.image === "string" && (
                <img src={`http://localhost:5000/uploads/speakers/${formData.image}`} alt="Current Speaker" className="mt-2 w-30 h-30 object-cover rounded-md" />
              )
            )}
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea name="description" value={formData.description} onChange={handleChange} rows="4" className="mt-1 w-full border border-gray-300 px-4 py-2 rounded-md focus:ring-2 focus:ring-blue-300"></textarea>
          </div>

          <div className="md:col-span-2 text-right">
            <button type="submit" className="bg-blue-600 text-white px-8 py-2 rounded-md hover:bg-blue-700 shadow">Update</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SpeakerEdit;
