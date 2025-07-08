import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SpeakerView = () => {
  const [speakers, setSpeakers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchSpeakers();
  }, []);

  const fetchSpeakers = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/speakers");
      setSpeakers(response.data);
    } catch (err) {
      console.error("Failed to fetch speakers:", err);
    }
  };

  const handleEdit = (id) => {
    navigate(`/edit-speaker/${id}`);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this speaker?")) {
      try {
        // ✅ Corrected endpoint
        await axios.delete(`http://localhost:5000/api/speakers/${id}`);
        alert("Speaker deleted successfully!");
        fetchSpeakers();
      } catch (err) {
        console.error("Error deleting speaker:", err);
        alert("Failed to delete speaker.");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br py-10 px-4">
      <div className="max-w-7xl mx-auto bg-white p-8 rounded-2xl shadow-lg">
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold text-blue-700 mb-2">All Speakers</h1>
          <p className="text-gray-500">List of all session speakers</p>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 uppercase">ID</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 uppercase">Image</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 uppercase">Name</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 uppercase">Season</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 uppercase">Initiative</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 uppercase">Role</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 uppercase">Facebook</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 uppercase">Instagram</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 uppercase">YouTube</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 uppercase">Description</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {speakers.map((spk) => (
                <tr key={spk.id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 text-sm text-gray-800">{spk.id}</td>
                  <td className="px-4 py-2 text-sm text-gray-800">
                    <img
                      src={`http://localhost:5000/uploads/speakers/${spk.image}`}
                      alt={spk.name}
                      className="w-16 h-16 object-cover rounded-md"
                    />
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-800">{spk.name}</td>
                  <td className="px-4 py-2 text-sm text-gray-800">{spk.season}</td>
                  <td className="px-4 py-2 text-sm text-gray-800">{spk.initiative}</td>
                  <td className="px-4 py-2 text-sm text-gray-800">{spk.role}</td>
                  <td className="px-4 py-2 text-sm text-blue-600 underline">
                    <a href={spk.facebook_link} target="_blank" rel="noreferrer">Facebook</a>
                  </td>
                  <td className="px-4 py-2 text-sm text-pink-600 underline">
                    <a href={spk.instagram_link} target="_blank" rel="noreferrer">Instagram</a>
                  </td>
                  <td className="px-4 py-2 text-sm text-red-600 underline">
                    <a href={spk.youtube_link} target="_blank" rel="noreferrer">YouTube</a>
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-600">{spk.description}</td>
                  <td className="px-4 py-2 text-sm text-gray-600 space-x-2">
                    <button
                      onClick={() => handleEdit(spk.id)}
                      className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(spk.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SpeakerView;
