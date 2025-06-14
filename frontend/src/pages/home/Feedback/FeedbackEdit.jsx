import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const FeedbackEdit = () => {
  const { id } = useParams();

  // Dummy existing data for edit
  const existingFeedback = {
    id: 1,
    name: "Ali Khan",
    country: "Pakistan",
    img: "ali.jpg",
    text: "Amazing experience!",
    initiative: "Sovapa",
    season: "Spring 2025",
    status: "active",
  };

  const [formData, setFormData] = useState({
    name: "",
    country: "",
    img: "",
    text: "",
    initiative: "",
    season: "",
    status: "active",
  });

  const initiativeOptions = [
    "Sovapa",
    "Youth Program",
    "Cultural Exchange",
    "Music Academy",
    "Drama Workshop",
  ];

  useEffect(() => {
    setFormData(existingFeedback); // Simulate fetch
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData((prev) => ({ ...prev, img: file ? file.name : prev.img }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Updated Feedback:", formData);
    alert("Feedback updated successfully!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br py-10 px-6">
      <div className="max-w-48xl mx-auto bg-white p-8 rounded-2xl shadow-lg">
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-bold text-blue-700 mb-2">Edit Feedback</h1>
          <p className="text-gray-500">Update feedback details below</p>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="mt-1 w-full border border-gray-300 px-4 py-2 rounded-md focus:ring-2 focus:ring-blue-300"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Country</label>
            <input
              type="text"
              name="country"
              value={formData.country}
              onChange={handleChange}
              required
              className="mt-1 w-full border border-gray-300 px-4 py-2 rounded-md focus:ring-2 focus:ring-blue-300"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700">Feedback Text</label>
            <textarea
              name="text"
              value={formData.text}
              onChange={handleChange}
              rows={4}
              required
              className="mt-1 w-full border border-gray-300 px-4 py-2 rounded-md resize-none focus:ring-2 focus:ring-blue-300"
            ></textarea>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Initiative</label>
            <select
              name="initiative"
              value={formData.initiative}
              onChange={handleChange}
              required
              className="mt-1 w-full border border-gray-300 px-4 py-2 rounded-md focus:ring-2 focus:ring-blue-300"
            >
              <option value="">Select Initiative</option>
              {initiativeOptions.map((opt, idx) => (
                <option key={idx} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Season</label>
            <input
              type="text"
              name="season"
              value={formData.season}
              onChange={handleChange}
              required
              className="mt-1 w-full border border-gray-300 px-4 py-2 rounded-md focus:ring-2 focus:ring-blue-300"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Image</label>
            <input
              type="file"
              name="img"
              accept="image/*"
              onChange={handleImageChange}
              className="mt-1 w-full text-gray-700 border border-gray-300 px-4 py-2 rounded-md file:bg-blue-600 file:text-white file:border-none file:px-4 file:py-2 file:rounded-md file:cursor-pointer hover:file:bg-blue-700"
            />
            {formData.img && (
              <p className="text-sm mt-1 text-gray-500">Current: {formData.img}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="mt-1 w-full border border-gray-300 px-4 py-2 rounded-md focus:ring-2 focus:ring-blue-300"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          <div className="md:col-span-2 text-right">
            <button
              type="submit"
              className="bg-blue-600 text-white px-8 py-2 rounded-md hover:bg-blue-700 shadow"
            >
              Update Feedback
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FeedbackEdit;
