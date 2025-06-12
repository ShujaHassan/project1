import { useState } from "react";
import {
  FaTachometerAlt,
  FaUsers,
  FaHome,
  FaUserPlus,
  FaEdit,
  FaEye,
  FaVideo,
  FaRegAddressCard,
  FaLightbulb,
  FaCommentDots,
  FaBuilding,
  FaHandshake,
  FaMicrophone,
  FaCalendarAlt,
  FaDatabase,
} from "react-icons/fa";

const Sidebar = () => {
  const [openMenus, setOpenMenus] = useState({});

  const toggleMenu = (menu) => {
    setOpenMenus((prev) => ({ ...prev, [menu]: !prev[menu] }));
  };

  return (
    <div className="w-64 min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white shadow-lg p-4">
      <div className="flex items-center justify-center mb-8">
        <h1 className="text-2xl font-bold text-white">🎭 ACPKHI Admin</h1>
      </div>

      {/* Dashboard */}
      <div className="mb-3">
        <a href="/dashboard" className="flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-700 transition">
          <FaTachometerAlt /> Dashboard
        </a>
      </div>

      {/* User */}
      <div className="mb-3">
        <button onClick={() => toggleMenu("user")} className="flex items-center gap-2 w-full px-3 py-2 rounded hover:bg-gray-700 transition">
          <FaUsers /> User
        </button>
        {openMenus.user && (
          <div className="ml-6 mt-1 space-y-1">
            <a href="/user/add" className="block hover:text-blue-400 flex items-center gap-2">
              <FaUserPlus /> Add
            </a>
            <a href="/user/edit" className="block hover:text-blue-400 flex items-center gap-2">
              <FaEdit /> Edit
            </a>
            <a href="/user/view" className="block hover:text-blue-400 flex items-center gap-2">
              <FaEye /> View
            </a>
          </div>
        )}
      </div>

      {/* Home Page */}
      <div className="mb-3">
        <button onClick={() => toggleMenu("home")}
          className="flex items-center gap-2 w-full px-3 py-2 rounded hover:bg-gray-700 transition">
          <FaHome /> Home
        </button>
        {openMenus.home && (
          <div className="ml-6 mt-1 space-y-1">
            <a href="/home/banner" className="block hover:text-blue-400">Banner</a>
            <a href="/home/about" className="block hover:text-blue-400">About</a>
            <a href="/home/video" className="block hover:text-blue-400 flex items-center gap-2"><FaVideo /> Video</a>
            <a href="/home/president-message" className="block hover:text-blue-400">President Message</a>
            <a href="/home/initiatives" className="block hover:text-blue-400 flex items-center gap-2"><FaLightbulb /> Initiatives</a>
            <a href="/home/sovapa" className="block hover:text-blue-400">Sovapa</a>
            <a href="/home/feedback" className="block hover:text-blue-400 flex items-center gap-2"><FaCommentDots /> Feedback</a>
            <a href="/home/facilities" className="block hover:text-blue-400 flex items-center gap-2"><FaBuilding /> Facilities</a>
            <a href="/home/sponsors" className="block hover:text-blue-400 flex items-center gap-2"><FaHandshake /> Sponsors</a>
          </div>
        )}
      </div>

      {/* Speaker */}
      <div className="mb-3">
        <button onClick={() => toggleMenu("speaker")} className="flex items-center gap-2 w-full px-3 py-2 rounded hover:bg-gray-700 transition">
          <FaMicrophone /> Speaker
        </button>
        {openMenus.speaker && (
          <div className="ml-6 mt-1 space-y-1">
            <a href="/speaker/add" className="block hover:text-blue-400 flex items-center gap-2"><FaUserPlus /> Add</a>
            <a href="/speaker/edit" className="block hover:text-blue-400 flex items-center gap-2"><FaEdit />  Edit</a>
            <a href="/speaker/view" className="block hover:text-blue-400 flex items-center gap-2"><FaEye /> View</a>
          </div>
        )}
      </div>

      {/* Sessions */}
      <div className="mb-3">
        <button onClick={() => toggleMenu("sessions")} className="flex items-center gap-2 w-full px-3 py-2 rounded hover:bg-gray-700 transition">
          <FaCalendarAlt /> Sessions
        </button>
        {openMenus.sessions && (
          <div className="ml-6 mt-1 space-y-1">
            <a href="/sessions/add" className="block hover:text-blue-400 flex items-center gap-2"><FaUserPlus />Add</a>
            <a href="/sessions/edit" className="block hover:text-blue-400 flex items-center gap-2"><FaEdit />  Edit</a>
            <a href="/sessions/view" className="block hover:text-blue-400 flex items-center gap-2"><FaEye /> View</a>
          </div>
        )}
      </div>

      {/* Session Data */}
      <div className="mb-3">
        <button onClick={() => toggleMenu("sessionData")} className="flex items-center gap-2 w-full px-3 py-2 rounded hover:bg-gray-700 transition">
          <FaDatabase /> Session Data
        </button>
        {openMenus.sessionData && (
          <div className="ml-6 mt-1 space-y-1">
            <a href="/session-data/add" className="block hover:text-blue-400 flex items-center gap-2"><FaUserPlus />Add</a>
            <a href="/session-data/edit" className="block hover:text-blue-400 flex items-center gap-2"><FaEdit />  Edit</a>
            <a href="/session-data/view" className="block hover:text-blue-400 flex items-center gap-2"><FaEye /> View</a>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
