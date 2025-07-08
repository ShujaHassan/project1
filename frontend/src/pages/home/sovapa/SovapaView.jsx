import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // ✅ Add this line

const ViewSovapa = () => {
  const [sovapas, setSovapas] = useState([]);
  const navigate = useNavigate(); // ✅ Hook to navigate

  useEffect(() => {
    fetchSovapas();
  }, []);

  const fetchSovapas = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/sovapa");
      setSovapas(res.data);
    } catch (error) {
      console.error("Error fetching Sovapa members:", error);
    }
  };

  const handleEdit = (id) => {
    navigate(`/home/sovapa/edit/${id}`); // ✅ Navigate to edit page
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this Sovapa?")) {
      try {
        await axios.delete(`http://localhost:5000/api/sovapa/${id}`);
        fetchSovapas(); // Refresh
        alert("Sovapa deleted successfully.");
      } catch (error) {
        console.error("Delete failed:", error);
        alert("Failed to delete Sovapa.");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br py-10 px-4">
      <div className="max-w-8xl mx-auto bg-white p-8 rounded-2xl shadow-lg">
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold text-blue-700 mb-2">All Sovapa</h1>
          <p className="text-gray-500">List of all Sovapa members</p>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 uppercase">ID</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 uppercase">Full Name</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 uppercase">Poster</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 uppercase">Departments</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 uppercase">Status</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sovapas.map((sovapa) => (
                <tr key={sovapa.id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 text-sm text-gray-800">{sovapa.id}</td>
                  <td className="px-4 py-2 text-sm text-gray-800">{sovapa.fullname}</td>
                  <td className="px-4 py-2 text-sm text-gray-800">
                    <img
                      src={`http://localhost:5000/uploads/sovapa/${sovapa.poster}`}
                      alt={sovapa.fullname}
                      className="w-20 h-20 object-cover rounded shadow"
                    />
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-800">
                    {[...Array(6)].map((_, i) => {
                      const dName = sovapa[`dept_name_${i + 1}`];
                      const dTitle = sovapa[`dept_title_${i + 1}`];
                      return dName || dTitle ? (
                        <div key={i}>
                          <span className="font-semibold">{dName}</span> - {dTitle}
                        </div>
                      ) : null;
                    })}
                  </td>
                  <td className="px-4 py-2 text-sm">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        sovapa.status === "active"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {sovapa.status}
                    </span>
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-600 space-x-2">
                    <button
                      onClick={() => handleEdit(sovapa.id)}
                      className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(sovapa.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {sovapas.length === 0 && (
                <tr>
                  <td colSpan="6" className="text-center py-4 text-gray-500">
                    No Sovapa records found.
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

export default ViewSovapa;
