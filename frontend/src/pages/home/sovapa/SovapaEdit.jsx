import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const SovapaEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullname: "",
    poster: "",
    dept_name_1: "",
    dept_title_1: "",
    dept_name_2: "",
    dept_title_2: "",
    dept_name_3: "",
    dept_title_3: "",
    dept_name_4: "",
    dept_title_4: "",
    dept_name_5: "",
    dept_title_5: "",
    dept_name_6: "",
    dept_title_6: "",
    status: "active",
  });
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    fetchSovapa();
  }, []);

  const fetchSovapa = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/sovapa`);
      const single = res.data.find((item) => item.id === parseInt(id));
      if (single) setFormData(single);
    } catch (err) {
      console.error("Error fetching Sovapa:", err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setFormData((prev) => ({
        ...prev,
        poster: file.name,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedForm = new FormData();
      updatedForm.append("fullname", formData.fullname);
      updatedForm.append("status", formData.status);
      if (selectedFile) updatedForm.append("poster", selectedFile);

      for (let i = 1; i <= 6; i++) {
        updatedForm.append(`dept_name_${i}`, formData[`dept_name_${i}`]);
        updatedForm.append(`dept_title_${i}`, formData[`dept_title_${i}`]);
      }

      await axios.put(`http://localhost:5000/api/sovapa/${id}`, updatedForm);
      alert("Sovapa updated successfully!");
      navigate("/home/sovapa/view"); // Redirect after update
    } catch (error) {
      console.error("Update failed:", error);
      alert("Failed to update Sovapa.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br py-10 px-6">
      <div className="max-w-8xl mx-auto bg-white p-8 rounded-2xl shadow-lg">
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-bold text-blue-700 mb-2">Edit Sovapa</h1>
          <p className="text-gray-500">Update Sovapa details below</p>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Full Name</label>
            <input
              type="text"
              name="fullname"
              value={formData.fullname}
              onChange={handleChange}
              required
              className="mt-1 w-full border border-gray-300 px-4 py-2 rounded-md focus:ring-2 focus:ring-blue-300"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Poster</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="mt-1 w-full text-gray-700 border border-gray-300 px-4 py-2 rounded-md file:bg-blue-600 file:text-white file:border-none file:px-4 file:py-2 file:rounded-md file:cursor-pointer hover:file:bg-blue-700"
            />
            {formData.poster && (
              <p className="text-sm text-gray-400 mt-1">
                Current: <strong>{formData.poster}</strong>
              </p>
            )}
          </div>

          {Array.from({ length: 6 }, (_, i) => (
            <div key={i} className="md:col-span-1">
              <label className="block text-sm font-medium text-gray-700">Department Name {i + 1}</label>
              <input
                type="text"
                name={`dept_name_${i + 1}`}
                value={formData[`dept_name_${i + 1}`]}
                onChange={handleChange}
                className="mt-1 w-full border border-gray-300 px-4 py-2 rounded-md focus:ring-2 focus:ring-blue-300 mb-4"
              />

              <label className="block text-sm font-medium text-gray-700">Department Title {i + 1}</label>
              <input
                type="text"
                name={`dept_title_${i + 1}`}
                value={formData[`dept_title_${i + 1}`]}
                onChange={handleChange}
                className="mt-1 w-full border border-gray-300 px-4 py-2 rounded-md focus:ring-2 focus:ring-blue-300"
              />
            </div>
          ))}

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
              Update Sovapa
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SovapaEdit;
