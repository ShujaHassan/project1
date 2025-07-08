import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ViewFeedback = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const fetchFeedbacks = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/feedback");
      setFeedbacks(res.data);
    } catch (error) {
      console.error("Error fetching feedbacks:", error);
      alert("Failed to load feedbacks");
    }
  };

  const handleEdit = (id) => {
    navigate(`/home/feedback/edit/${id}`);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this feedback?")) {
      try {
        await axios.delete(`http://localhost:5000/api/feedback/${id}`);
        alert("Feedback deleted successfully");
        fetchFeedbacks(); // Refresh list
      } catch (error) {
        console.error("Delete error:", error);
        alert("Failed to delete feedback");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br py-10 px-4">
      <div className="max-w-7xl mx-auto bg-white p-8 rounded-2xl shadow-lg">
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold text-blue-700 mb-2">All Feedback</h1>
          <p className="text-gray-500">List of submitted feedbacks</p>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                {["ID", "Name", "Country", "Image", "Feedback", "Initiative", "Season", "Status", "Actions"].map((th) => (
                  <th
                    key={th}
                    className="px-4 py-2 text-left text-xs font-medium text-gray-600 uppercase"
                  >
                    {th}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {feedbacks.map((fb) => (
                <tr key={fb.id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 text-sm">{fb.id}</td>
                  <td className="px-4 py-2 text-sm">{fb.name}</td>
                  <td className="px-4 py-2 text-sm">{fb.country}</td>
                  <td className="px-4 py-2 text-sm">
                    <img
                      src={`http://localhost:5000/uploads/feedback/${fb.img}`}
                      alt={fb.name}
                      className="w-10 h-10 rounded-full object-cover border"
                    />
                  </td>
                  <td className="px-4 py-2 text-sm">{fb.text}</td>
                  <td className="px-4 py-2 text-sm">{fb.initiative}</td>
                  <td className="px-4 py-2 text-sm">{fb.season}</td>
                  <td className="px-4 py-2 text-sm">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        fb.status === "active"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {fb.status}
                    </span>
                  </td>
                  <td className="px-4 py-2 text-sm space-x-2">
                    <button
                      onClick={() => handleEdit(fb.id)}
                      className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(fb.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {feedbacks.length === 0 && (
                <tr>
                  <td colSpan="9" className="text-center py-6 text-gray-400">
                    No feedbacks found.
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

export default ViewFeedback;
