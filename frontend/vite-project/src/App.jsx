import { Routes, Route, useLocation } from "react-router-dom";
import LoginForm from "./component/LoginForm";
import RegisterForm from "./component/RegisterForm";
import ForgotPasswordForm from "./component/ForgotPasswordForm";
import DashboardLayout from "./component/DashboardLayout";
import DashboardHome from "./pages/DashboardHome";
import AddUser from "./pages/user/AddUser";
import EditUser from "./pages/user/EditUser";
import ViewUser from "./pages/user/ViewUser"; // 🔓 uncomment this

function AppWrapper() {
  const location = useLocation();
  const noLayoutRoutes = ["/", "/register", "/forgot-password"];
  const isAuthRoute = noLayoutRoutes.includes(location.pathname);

  return (
    <div className={isAuthRoute ? "min-h-screen flex items-center justify-center bg-gray-100" : ""}>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/forgot-password" element={<ForgotPasswordForm />} />
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<DashboardHome />} />
          <Route path="/user/add" element={<AddUser />} />
          <Route path="/user/edit" element={<EditUser />} />
          <Route path="/user/view" element={<ViewUser />} />
        </Route>
      </Routes>
    </div>
  );
}

function App() {
  return <AppWrapper />;
}

export default App;
