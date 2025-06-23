import { useNavigate } from "react-router-dom";

export default function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token"); // token delete
    navigate("/"); // login page pe bhejo
  };

  return (
    <button
      onClick={handleLogout}
      className="text-red-600 px-4 py-2 rounded hover:bg-red-100"
    >
      Logout
    </button>
  );
}
