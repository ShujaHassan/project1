import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ViewSponsors = () => {
  const [sponsors, setSponsors] = useState([]);
  const navigate = useNavigate(); // ✅ useNavigate added

  useEffect(() => {
    fetchSponsors();
  }, []);

  const fetchSponsors = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/sponsor");
      setSponsors(res.data);
    } catch (error) {
      console.error("Error fetching sponsors:", error);
    }
  };

  const handleEdit = (id) => {
    navigate(`/home/edit-sponsor/${id}`); // ✅ Navigate to edit page
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this sponsor?")) {
      try {
        await axios.delete(`http://localhost:5000/api/sponsor/${id}`);
        fetchSponsors();
        alert("Sponsor deleted successfully.");
      } catch (error) {
        console.error("Delete failed:", error);
        alert("Failed to delete sponsor.");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br py-10 px-4">
      <div className="max-w-48xl mx-auto bg-white p-8 rounded-2xl shadow-lg">
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold text-blue-700 mb-2">All Sponsors</h1>
          <p className="text-gray-500">List of all sponsors</p>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 uppercase">ID</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 uppercase">Name</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 uppercase">Image</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 uppercase">Initiative</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 uppercase">Season</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 uppercase">Status</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sponsors.map((sponsor) => (
                <tr key={sponsor.id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 text-sm text-gray-800">{sponsor.id}</td>
                  <td className="px-4 py-2 text-sm text-gray-800">{sponsor.name}</td>
                  <td className="px-4 py-2 text-sm text-gray-800">
                    <img
                      src={`http://localhost:5000/uploads/sponsors/${sponsor.image}`}
                      alt={sponsor.name}
                      className="w-12 h-12 object-contain rounded"
                    />
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-800">{sponsor.initiative}</td>
                  <td className="px-4 py-2 text-sm text-gray-800">{sponsor.season}</td>
                  <td className="px-4 py-2 text-sm">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        sponsor.status === "active"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {sponsor.status}
                    </span>
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-600 space-x-2">
                    <button
                      onClick={() => handleEdit(sponsor.id)} // ✅ working edit
                      className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(sponsor.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {sponsors.length === 0 && (
                <tr>
                  <td colSpan="7" className="text-center py-4 text-gray-500">
                    No sponsors found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ViewSponsors;
