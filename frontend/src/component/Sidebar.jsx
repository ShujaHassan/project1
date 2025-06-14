import { useState, useEffect } from "react";
import {
  FaTachometerAlt,
  FaUsers, 
  FaHome, 
  FaUserPlus,
  FaEdit, 
  FaEye, 
  FaVideo, 
  FaLightbulb,
  FaCommentDots, 
  FaBuilding, 
  FaHandshake,
  FaMicrophone, 
  FaCalendarAlt, 
  FaDatabase,
  FaBars, 
  FaTimes, 
  FaChevronDown, 
  FaChevronRight,
  FaUniversity, 
  FaInfoCircle, 
  FaComments, 
  FaImage
} from "react-icons/fa";

const NavigationSystem = () => {
  const [openMenus, setOpenMenus] = useState({});
  const [isMobile, setIsMobile] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
      if (window.innerWidth >= 1024) setMobileNavOpen(false);
    };
    
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleMenu = (key, level) => {
    setOpenMenus(prev => {
      const newState = { ...prev };
      
      // Close all other main menus when opening a new one
      if (level === 0) {
        // Close all main menus except the current one
        Object.keys(newState).forEach(k => {
          const kLevel = k.split('/').length - 1;
          if (kLevel === 0 && k !== key) {
            newState[k] = false;
          }
        });
      } 
      // For submenus, close other submenus at the same level
      else {
        const parentPath = key.split('/').slice(0, level).join('/');
        Object.keys(newState).forEach(k => {
          if (k.startsWith(parentPath + '/')) {
            const kLevel = k.split('/').length - 1;
            if (kLevel === level && k !== key) {
              newState[k] = false;
            }
          }
        });
      }
      
      // Toggle the current menu
      newState[key] = !prev[key];
      
      return newState;
    });
  };

  const renderMenu = (items, parentKey = "", level = 0) => (
    <ul className={`space-y-1 ${level > 0 ? 'pl-4 border-l-2 border-gray-700' : ''}`}>
      {items.map((item) => {
        const key = parentKey ? `${parentKey}/${item.name}` : item.name;
        const isOpen = !!openMenus[key];

        return (
          <li key={key} className="rounded-lg overflow-hidden">
            {item.href ? (
              <a
                href={item.href}
                className="flex items-center gap-3 px-4 py-3 text-sm text-gray-200 hover:bg-indigo-600 hover:text-white rounded transition-colors"
                onClick={() => isMobile && setMobileNavOpen(false)}
              >
                <span className="text-indigo-400">{item.icon}</span>
                <span>{item.name}</span>
              </a>
            ) : (
              <>
                <button
                  onClick={() => toggleMenu(key, level)}
                  className={`w-full flex items-center justify-between px-4 py-3 text-sm rounded transition-colors ${
                    isOpen ? 'bg-gray-800 text-white' : 'text-gray-200 hover:bg-gray-700'
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <span className="text-indigo-400">{item.icon}</span>
                    <span>{item.name}</span>
                  </span>
                  {item.subItems && (
                    isOpen ? (
                      <FaChevronDown className="text-gray-400 text-xs" />
                    ) : (
                      <FaChevronRight className="text-gray-400 text-xs" />
                    )
                  )}
                </button>
                {item.subItems && (
                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    {renderMenu(item.subItems, key, level + 1)}
                  </div>
                )}
              </>
            )}
          </li>
        );
      })}
    </ul>
  );

  // Define navItems array
  const navItems = [
    { name: "Dashboard", icon: <FaTachometerAlt />, href: "/dashboard" },
    {
      name: "User", icon: <FaUsers />, subItems: [
        { name: "Add", icon: <FaUserPlus />, href: "/user/add" },
        { name: "Edit", icon: <FaEdit />, href: "/user/edit" },
        { name: "View", icon: <FaEye />, href: "/user/view" },
      ],
    },
    {
      name: "Home", icon: <FaHome />, subItems: [
        {
          name: "Banner", icon: <FaImage />, subItems: [
            { name: "Add", icon: <FaUserPlus />, href: "/home/banner/add" },
            { name: "Edit", icon: <FaEdit />, href: "/home/banner/edit" },
            { name: "View", icon: <FaEye />, href: "/home/banner/view" },
          ],
        },
        {
          name: "About", icon: <FaInfoCircle />, subItems: [
            { name: "Add", icon: <FaUserPlus />, href: "/home/about/add" },
            { name: "Edit", icon: <FaEdit />, href: "/home/about/edit" },
            { name: "View", icon: <FaEye />, href: "/home/about/view" },
          ],
        },
        {
          name: "Video", icon: <FaVideo />, subItems: [
            { name: "Add", icon: <FaUserPlus />, href: "/home/video/add" },
            { name: "Edit", icon: <FaEdit />, href: "/home/video/edit" },
            { name: "View", icon: <FaEye />, href: "/home/video/view" },
          ],
        },
        {
          name: "President Message", icon: <FaComments />, subItems: [
            { name: "Add", icon: <FaUserPlus />, href: "/home/PresidentMessage/add" },
            { name: "Edit", icon: <FaEdit />, href: "/home/PresidentMessage/edit" },
            { name: "View", icon: <FaEye />, href: "/home/PresidentMessage/view" },
          ],
        },
        {
          name: "Initiatives", icon: <FaLightbulb />, subItems: [
            { name: "Add", icon: <FaUserPlus />, href: "/home/Initiatives/add" },
            { name: "Edit", icon: <FaEdit />, href: "/home/Initiatives/edit" },
            { name: "View", icon: <FaEye />, href: "/home/Initiatives/view" },
          ],
        },
        {
          name: "Sovapa", icon: <FaUniversity />, subItems: [
            { name: "Add", icon: <FaUserPlus />, href: "/home/sovapa/add" },
            { name: "Edit", icon: <FaEdit />, href: "/home/sovapa/edit" },
            { name: "View", icon: <FaEye />, href: "/home/sovapa/view" },
          ],
        },
        {
          name: "Feedback", icon: <FaCommentDots />, subItems: [
            { name: "Add", icon: <FaUserPlus />, href: "/home/Feedback/add" },
            { name: "Edit", icon: <FaEdit />, href: "/home/Feedback/edit" },
            { name: "View", icon: <FaEye />, href: "/home/Feedback/view" },
          ],
        },
        {
          name: "Facilities", icon: <FaBuilding />, subItems: [
            { name: "Add", icon: <FaUserPlus />, href: "/home/facilities/add" },
            { name: "Edit", icon: <FaEdit />, href: "/home/facilities/edit" },
            { name: "View", icon: <FaEye />, href: "/home/facilities/view" },
          ],
        },
        {
          name: "Sponsors", icon: <FaHandshake />, subItems: [
            { name: "Add", icon: <FaUserPlus />, href: "/home/sponsors/add" },
            { name: "Edit", icon: <FaEdit />, href: "/home/sponsors/edit" },
            { name: "View", icon: <FaEye />, href: "/home/sponsors/view" },
          ],
        },
      ],
    },
    {
      name: "Speaker", icon: <FaMicrophone />, subItems: [
        { name: "Add", icon: <FaUserPlus />, href: "/speakers/add" },
        { name: "Edit", icon: <FaEdit />, href: "/speakers/edit" },
        { name: "View", icon: <FaEye />, href: "/speakers/view" },
      ],
    },
    {
      name: "Sessions", icon: <FaCalendarAlt />, subItems: [
        { name: "Add", icon: <FaUserPlus />, href: "/sessions/add" },
        { name: "Edit", icon: <FaEdit />, href: "/sessions/edit" },
        { name: "View", icon: <FaEye />, href: "/sessions/view" },
      ],
    },
    {
      name: "Session Data", icon: <FaDatabase />, subItems: [
        { name: "Add", icon: <FaUserPlus />, href: "/session-data/add" },
        { name: "Edit", icon: <FaEdit />, href: "/session-data/edit" },
        { name: "View", icon: <FaEye />, href: "/session-data/view" },
      ],
    },
  ];

  return (
    <>
      {/* Desktop Sidebar */}
      <div className={`hidden lg:flex flex-col w-64 min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white p-4`}>
        <div className="mb-8 pt-2">
          <h1 className="text-2xl font-bold flex items-center">
            <span className="bg-indigo-600 p-2 rounded-lg mr-2">🎭</span> 
            <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              ACPKHI Admin
            </span>
          </h1>
        </div>
        <nav className="flex-1 overflow-y-auto">
          {renderMenu(navItems)}
        </nav>
      </div>

      {/* Mobile Navigation */}
      <div className="lg:hidden">
        {/* Mobile Header Bar */}
        <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-gray-900 to-gray-800 text-white p-4 shadow-md flex justify-between items-center">
          <div className="flex items-center">
            <span className="bg-indigo-600 p-2 rounded-lg mr-2">🎭</span>
            <h1 className="text-xl font-bold">ACPKHI Admin</h1>
          </div>
          <button 
            onClick={() => setMobileNavOpen(!mobileNavOpen)}
            className="p-2 rounded-full bg-indigo-600 hover:bg-indigo-700 transition-colors"
          >
            {mobileNavOpen ? <FaTimes size={18} /> : <FaBars size={18} />}
          </button>
        </header>

        {/* Mobile Navigation Drawer */}
        <div className={`fixed top-16 left-0 right-0 bottom-0 z-40 bg-gray-800 text-white transition-transform duration-300 transform ${
          mobileNavOpen ? 'translate-x-0' : '-translate-x-full'
        }`}>
          <div className="p-4 h-full overflow-y-auto">
            {renderMenu(navItems)}
          </div>
        </div>

        {/* Overlay */}
        {mobileNavOpen && (
          <div 
            className="fixed inset-0 z-30 bg-black bg-opacity-50 backdrop-blur-sm"
            onClick={() => setMobileNavOpen(false)}
          />
        )}
      </div>
    </>
  );
};

export default NavigationSystem;