import { useState } from "react";
import axios from "axios"; // <-- Import axios

const AboutAdd = () => {
  const [formData, setFormData] = useState({
    heading: "",
    description: "",
    tab_1_heading: "",
    tab_2_heading: "",
    tab_3_heading: "",
    tab_4_heading: "",
    tab_1_title: "",
    tab_2_title: "",
    tab_3_title: "",
    tab_4_title: "",
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:5000/api/about", formData);
      alert("About added successfully!");

      setFormData({
        heading: "",
        description: "",
        tab_1_heading: "",
        tab_2_heading: "",
        tab_3_heading: "",
        tab_4_heading: "",
        tab_1_title: "",
        tab_2_title: "",
        tab_3_title: "",
        tab_4_title: "",
        initiative: "",
        season: "",
        status: "active",
      });
    } catch (error) {
      console.error("Error submitting About:", error);
      alert("Failed to add About. Please check your server.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br py-10 px-8">
      <div className="max-w-7xl mx-auto bg-white p-8 rounded-2xl shadow-lg">
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-bold text-blue-700 mb-2">Add About</h1>
          <p className="text-gray-500">Fill in the about section details below</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <div>
            <label className="block text-sm font-medium text-gray-700">Heading</label>
            <input
              type="text"
              name="heading"
              value={formData.heading}
              onChange={handleChange}
              required
              className="mt-1 w-full border border-gray-300 px-4 py-2 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Initiative</label>
            <select
              name="initiative"
              value={formData.initiative}
              onChange={handleChange}
              className="mt-1 w-full border border-gray-300 px-4 py-2 rounded-md"
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
              placeholder="e.g. Spring 2025"
              className="mt-1 w-full border border-gray-300 px-4 py-2 rounded-md"
            />
          </div>


          
          {[1, 2, 3, 4].map((num) => (
            <div key={`tab_heading_${num}`}>
              <label className="block text-sm font-medium text-gray-700">{`Tab ${num} Heading`}</label>
              <input
                type="text"
                name={`tab_${num}_heading`}
                value={formData[`tab_${num}_heading`]}
                onChange={handleChange}
                className="mt-1 w-full border border-gray-300 px-4 py-2 rounded-md"
              />
            </div>
          ))}

          {[1, 2, 3, 4].map((num) => (
            <div key={`tab_title_${num}`}>
              <label className="block text-sm font-medium text-gray-700">{`Tab ${num} Title`}</label>
              <input
                type="text"
                name={`tab_${num}_title`}
                value={formData[`tab_${num}_title`]}
                onChange={handleChange}
                className="mt-1 w-full border border-gray-300 px-4 py-2 rounded-md"
              />
            </div>
          ))}

          <div>
            <label className="block text-sm font-medium text-gray-700">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="mt-1 w-full border border-gray-300 px-4 py-2 rounded-md"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
          
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              required
              className="mt-1 w-full border border-gray-300 px-4 py-2 rounded-md"
            />
          </div>

          

          <div className="md:col-span-2 text-right">
            <button
              type="submit"
              className="bg-blue-600 text-white px-8 py-2 rounded-md hover:bg-blue-700 shadow"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AboutAdd;
