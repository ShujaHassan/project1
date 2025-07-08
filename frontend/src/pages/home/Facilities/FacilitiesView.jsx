import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ViewFacilities = () => {
  const [facilities, setFacilities] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchFacilities();
  }, []);

  const fetchFacilities = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/facilities");
      setFacilities(res.data);
    } catch (err) {
      console.error("Failed to fetch facilities:", err);
      alert("Error fetching facilities.");
    }
  };

  const handleEdit = (id) => {
    navigate(`/home/edit-facility/${id}`);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this facility?")) {
      try {
        await axios.delete(`http://localhost:5000/api/facilities/${id}`);
        fetchFacilities();
        alert("Facility deleted successfully!");
      } catch (err) {
        console.error("Delete error:", err);
        alert("Failed to delete facility.");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br py-10 px-4">
      <div className="max-w-48xl mx-auto bg-white p-8 rounded-2xl shadow-lg">
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold text-blue-700 mb-2">All Facilities</h1>
          <p className="text-gray-500">List of all campus facilities</p>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 uppercase">ID</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 uppercase">Name</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 uppercase">Title</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 uppercase">Image</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 uppercase">Status</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {facilities.map((facility) => (
                <tr key={facility.id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 text-sm text-gray-800">{facility.id}</td>
                  <td className="px-4 py-2 text-sm text-gray-800">{facility.name}</td>
                  <td className="px-4 py-2 text-sm text-gray-800">{facility.title}</td>
                  <td className="px-4 py-2 text-sm text-gray-800">
                    <img
                      src={`http://localhost:5000/uploads/facilities/${facility.image}`}
                      alt={facility.name}
                      className="w-14 h-14 object-contain rounded"
                    />
                  </td>
                  <td className="px-4 py-2 text-sm">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        facility.status === "active"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {facility.status}
                    </span>
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-600 space-x-2">
                    <button
                      onClick={() => handleEdit(facility.id)}
                      className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(facility.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {facilities.length === 0 && (
                <tr>
                  <td colSpan="6" className="text-center py-4 text-gray-500">
                    No facilities found.
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

export default ViewFacilities;
