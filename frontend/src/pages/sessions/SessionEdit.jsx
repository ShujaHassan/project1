import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const SessionEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    one_liner: "",
    poster: "",
    status: "active",
    initiative: "",
    season: "",
  });

  const initiativeOptions = [
    "Sovapa",
    "Youth Program",
    "Cultural Exchange",
    "Music Academy",
    "Drama Workshop",
  ];

  useEffect(() => {
    axios.get(`http://localhost:5000/api/sessions/${id}`)
      .then((res) => setFormData(res.data))
      .catch((err) => console.error("Fetch error:", err));
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, poster: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedData = new FormData();
    updatedData.append("name", formData.name);
    updatedData.append("one_liner", formData.one_liner);
    updatedData.append("status", formData.status);
    updatedData.append("initiative", formData.initiative);
    updatedData.append("season", formData.season);
    if (formData.poster instanceof File) {
      updatedData.append("poster", formData.poster);
    }

    try {
      await axios.put(`http://localhost:5000/api/sessions/${id}`, updatedData);
      alert("Session updated successfully!");
      navigate("/sessions/view");
    } catch (error) {
      console.error("Update error:", error);
      alert("Error updating session.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br py-10 px-6">
      <div className="max-w-8xl mx-auto bg-white p-8 rounded-2xl shadow-lg">
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-bold text-blue-700 mb-2">Edit Session</h1>
          <p className="text-gray-500">Update session details below</p>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} required className="mt-1 w-full border border-gray-300 px-4 py-2 rounded-md focus:ring-2 focus:ring-blue-300" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">One Liner</label>
            <input type="text" name="one_liner" value={formData.one_liner} onChange={handleChange} required className="mt-1 w-full border border-gray-300 px-4 py-2 rounded-md focus:ring-2 focus:ring-blue-300" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Poster</label>
            <input type="file" accept="image/*" name="poster" onChange={handleFileChange} className="mt-1 w-full border border-gray-300 px-4 py-2 rounded-md" />
            {typeof formData.poster === "string" && (
              <img src={`http://localhost:5000/uploads/${formData.poster}`} alt="Current Poster" className="h-16 mt-2 rounded" />
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Status</label>
            <select name="status" value={formData.status} onChange={handleChange} className="mt-1 w-full border border-gray-300 px-4 py-2 rounded-md focus:ring-2 focus:ring-blue-300">
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Initiative</label>
            <select name="initiative" value={formData.initiative} onChange={handleChange} className="mt-1 w-full border border-gray-300 px-4 py-2 rounded-md focus:ring-2 focus:ring-blue-300">
              <option value="">Select Initiative</option>
              {initiativeOptions.map((opt, idx) => (
                <option key={idx} value={opt}>{opt}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Season</label>
            <input type="text" name="season" value={formData.season} onChange={handleChange} className="mt-1 w-full border border-gray-300 px-4 py-2 rounded-md focus:ring-2 focus:ring-blue-300" />
          </div>

          <div className="md:col-span-2 text-right">
            <button type="submit" className="bg-blue-600 text-white px-8 py-2 rounded-md hover:bg-blue-700 shadow">
              Update Session
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SessionEdit;
