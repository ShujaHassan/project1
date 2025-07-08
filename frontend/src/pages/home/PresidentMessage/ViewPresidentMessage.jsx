import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ViewPresidentMessage = () => {
  const [messages, setMessages] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/president");
      setMessages(res.data);
    } catch (err) {
      console.error("Error fetching messages:", err);
      alert("Failed to load President messages.");
    }
  };

  const handleEdit = (id) => {
    navigate(`/home/edit-president/${id}`);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this message?")) {
      try {
        await axios.delete(`http://localhost:5000/api/president/${id}`);
        alert("President message deleted.");
        fetchMessages(); // Refresh list
      } catch (err) {
        console.error("Delete error:", err);
        alert("Failed to delete.");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br py-10 px-4">
      <div className="max-w-48xl mx-auto bg-white p-8 rounded-2xl shadow-lg">
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold text-blue-700 mb-2">President Messages</h1>
          <p className="text-gray-500">All messages from leadership</p>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 uppercase">ID</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 uppercase">Heading</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 uppercase">Image</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 uppercase">Title</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 uppercase">Position</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 uppercase">Bottom Title</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 uppercase">Initiative</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 uppercase">Season</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 uppercase">Status</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {messages.map((msg) => (
                <tr key={msg.id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 text-sm">{msg.id}</td>
                  <td className="px-4 py-2 text-sm">{msg.heading}</td>
                  <td className="px-4 py-2 text-sm">
                    <img
                      src={`http://localhost:5000/uploads/${msg.image}`}
                      alt="President"
                      className="w-16 h-16 object-cover rounded-full"
                    />
                  </td>
                  <td className="px-4 py-2 text-sm">{msg.title}</td>
                  <td className="px-4 py-2 text-sm">{msg.position}</td>
                  <td className="px-4 py-2 text-sm">{msg.bottom_title}</td>
                  <td className="px-4 py-2 text-sm">{msg.initiative}</td>
                  <td className="px-4 py-2 text-sm">{msg.season}</td>
                  <td className="px-4 py-2 text-sm">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        msg.status === "active"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {msg.status}
                    </span>
                  </td>
                  <td className="px-4 py-2 text-sm space-x-2">
                    <button
                      onClick={() => handleEdit(msg.id)}
                      className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(msg.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {messages.length === 0 && (
                <tr>
                  <td colSpan="10" className="text-center py-4 text-gray-500">
                    No messages found.
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

export default ViewPresidentMessage;
