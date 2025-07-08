import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const BannerView = () => {
  const [banners, setBanners] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/banner");
        setBanners(res.data);
      } catch (err) {
        console.error("Error fetching banners:", err);
        alert("Failed to fetch banners");
      }
    };

    fetchBanners();
  }, []);

  const handleEdit = (id) => {
    navigate(`/home/banner/edit/${id}`);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this banner?")) {
      try {
        await axios.delete(`http://localhost:5000/api/banner/${id}`);
        setBanners((prev) => prev.filter((b) => b.id !== id));
        alert("Banner deleted successfully.");
      } catch (err) {
        console.error("Error deleting banner:", err);
        alert("Failed to delete banner.");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-50 py-10 px-4">
      <div className="max-w-8xl mx-auto bg-white p-6 rounded-2xl shadow-md">
        <div className="mb-6 text-center">
          <h1 className="text-2xl md:text-3xl font-bold text-blue-700 mb-2">All Banners</h1>
          <p className="text-gray-500">List of all banners</p>
        </div>

        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600 uppercase">ID</th>
                <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600 uppercase">Image</th>
                <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600 uppercase">Heading</th>
                <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600 uppercase">Description</th>
                <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600 uppercase">Initiative</th>
                <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600 uppercase">Season</th>
                <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600 uppercase">Status</th>
                <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {banners.map((banner) => (
                <tr key={banner.id}>
                  <td className="px-4 py-2 text-sm">{banner.id}</td>
                  <td className="px-4 py-2 text-sm">
                    <img
                      src={`http://localhost:5000/uploads/banner/${banner.img}`}
                      alt="Banner"
                      className="h-10 w-16 rounded object-cover"
                    />
                  </td>
                  <td className="px-4 py-2 text-sm">{banner.heading}</td>
                  <td className="px-4 py-2 text-sm">{banner.description}</td>
                  <td className="px-4 py-2 text-sm">{banner.initiative}</td>
                  <td className="px-4 py-2 text-sm">{banner.season}</td>
                  <td className="px-4 py-2 text-sm">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        banner.status === "active"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {banner.status}
                    </span>
                  </td>
                  <td className="px-4 py-2 text-sm space-x-2">
                    <button
                      onClick={() => handleEdit(banner.id)}
                      className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(banner.id)}
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

        {/* Mobile Card View */}
        <div className="md:hidden space-y-4">
          {banners.map((banner) => (
            <div key={banner.id} className="bg-gray-50 rounded-lg p-4 shadow-sm">
              <img
                src={`http://localhost:5000/uploads/banner/${banner.img}`}
                alt="Banner"
                className="w-full h-40 rounded object-cover mb-3"
              />
              <h2 className="text-lg font-semibold">{banner.heading}</h2>
              <p className="text-sm text-gray-600 mb-2">{banner.description}</p>
              <p><strong>Initiative:</strong> {banner.initiative}</p>
              <p><strong>Season:</strong> {banner.season}</p>
              <p>
                <strong>Status:</strong>{" "}
                <span
                  className={`text-sm font-semibold ${
                    banner.status === "active" ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {banner.status}
                </span>
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                <button
                  onClick={() => handleEdit(banner.id)}
                  className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(banner.id)}
                  className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BannerView;
