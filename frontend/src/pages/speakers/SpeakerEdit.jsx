import { useState, useEffect } from "react";

const SpeakerEdit = () => {
  const [formData, setFormData] = useState({
    name: "",
    season: "",
    initiative: "",
    role: "",
    facebook: "",
    instagram: "",
    youtube: "",
    description: "",
  });

  useEffect(() => {
    // Dummy existing data
    const existingData = {
      name: "Ali Raza",
      season: "Season 3",
      initiative: "Art Revival",
      role: "Speaker",
      facebook: "https://facebook.com/aliraza",
      instagram: "https://instagram.com/aliraza",
      youtube: "https://youtube.com/aliraza",
      description: "Ali Raza is a renowned speaker in performing arts.",
    };
    setFormData(existingData);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Updated Speaker:", formData);
    alert("Speaker updated successfully!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br py-10 px-10">
      <div className="max-w-48x0 mx-auto bg-white from-blue-50 to-blue-100 p-8 rounded-2xl shadow-lg">
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-bold text-blue-700 mb-2">Edit Speaker</h1>
          <p className="text-gray-500">Update speaker details</p>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 w-full border border-gray-300 px-4 py-2 rounded-md focus:ring-2 focus:ring-blue-300"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Season</label>
            <input
              type="text"
              name="season"
              value={formData.season}
              onChange={handleChange}
              className="mt-1 w-full border border-gray-300 px-4 py-2 rounded-md focus:ring-2 focus:ring-blue-300"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Initiative</label>
            <input
              type="text"
              name="initiative"
              value={formData.initiative}
              onChange={handleChange}
              className="mt-1 w-full border border-gray-300 px-4 py-2 rounded-md focus:ring-2 focus:ring-blue-300"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Role</label>
            <input
              type="text"
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="mt-1 w-full border border-gray-300 px-4 py-2 rounded-md focus:ring-2 focus:ring-blue-300"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Facebook Link</label>
            <input
              type="url"
              name="facebook"
              value={formData.facebook}
              onChange={handleChange}
              className="mt-1 w-full border border-gray-300 px-4 py-2 rounded-md focus:ring-2 focus:ring-blue-300"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Instagram Link</label>
            <input
              type="url"
              name="instagram"
              value={formData.instagram}
              onChange={handleChange}
              className="mt-1 w-full border border-gray-300 px-4 py-2 rounded-md focus:ring-2 focus:ring-blue-300"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">YouTube Link</label>
            <input
              type="url"
              name="youtube"
              value={formData.youtube}
              onChange={handleChange}
              className="mt-1 w-full border border-gray-300 px-4 py-2 rounded-md focus:ring-2 focus:ring-blue-300"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Speaker Image</label>
            <input
            type="file"
            name="image"
            accept="image/*"
            onChange={(e) => setFormData({ ...formData, image: e.target.files[0] })}
            className="mt-1 w-full border border-gray-300 px-4 py-2 rounded-md focus:ring-2 focus:ring-blue-300 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700"
            />
        </div>  

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              className="mt-1 w-full border border-gray-300 px-4 py-2 rounded-md focus:ring-2 focus:ring-blue-300"
            ></textarea>
          </div>

          <div className="md:col-span-2 text-right">
            <button
              type="submit"
              className="bg-blue-600 text-white px-8 py-2 rounded-md hover:bg-blue-700 shadow"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SpeakerEdit;
