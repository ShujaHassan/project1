import { Routes, Route, useLocation } from "react-router-dom";
import LoginForm from "./component/LoginForm";
import RegisterForm from "./component/RegisterForm";
import ForgotPasswordForm from "./component/ForgotPasswordForm";
import DashboardLayout from "./component/DashboardLayout";
import DashboardHome from "./pages/DashboardHome";
import ProtectedRoute from "./component/ProtectedRoute"; // Add this import


// User Pages
import AddUser from "./pages/user/AddUser";
import EditUser from "./pages/user/EditUser";
import ViewUser from "./pages/user/ViewUser";

// Session Pages
import SessionView from "./pages/sessions/SessionView";
import SessionAdd from "./pages/sessions/SessionAdd";
import SessionEdit from "./pages/sessions/SessionEdit";

// Speaker Pages
import SpeakerAdd from "./pages/speakers/SpeakerAdd";
import SpeakerEdit from "./pages/speakers/SpeakerEdit";
import SpeakerView from "./pages/speakers/SpeakerView";

// Session Data Pages
import SessionDataAdd from "./pages/sessionData/SessionDataAdd"; 
import SessionDataView from "./pages/sessionData/SessionDataView";
import SessionDataEdit from "./pages/sessionData/SessionDataEdit";

// Banner
import AddBanner from "./pages/home/banner/AddBanner"; 
import EditBanner from "./pages/home/banner/EditBanner";
import ViewBanner from "./pages/home/banner/ViewBanner";

// About
import AboutAdd from "./pages/home/about/AboutAdd"; 
import AboutEdit from "./pages/home/about/AboutEdit";
import AboutView from "./pages/home/about/AboutView";

// Video
import VideoAdd from "./pages/home/video/AddVideo"; 
import VideoEdit from "./pages/home/video/EditVideo";
import VideoView from "./pages/home/video/ViewVideo";

// President Message
import AddPresidentMessage from "./pages/home/PresidentMessage/AddPresidentMessage"; 
import EditPresidentMessage from "./pages/home/PresidentMessage/EditPresidentMessage";
import ViewPresidentMessage from "./pages/home/PresidentMessage/ViewPresidentMessage";

// Initiatives
import AddInitiatives from "./pages/home/Initiatives/AddInitiatives"; 
import EditInitiatives from "./pages/home/Initiatives/EditInitiatives";
import ViewInitiatives from "./pages/home/Initiatives/ViewInitiatives";

// Sovapa
import SovapaAdd from "./pages/home/sovapa/SovapaAdd"; 
import SovapaEdit from "./pages/home/sovapa/SovapaEdit";
import SovapaView from "./pages/home/sovapa/SovapaView";

// Feedback
import FeedbackAdd from "./pages/home/Feedback/FeedbackAdd"; 
import FeedbackEdit from "./pages/home/Feedback/FeedbackEdit";
import FeedbackView from "./pages/home/Feedback/FeedbackView";

// Facilities
import FacilitiesAdd from "./pages/home/Facilities/FacilitiesAdd"; 
import FacilitiesEdit from "./pages/home/Facilities/FacilitiesEdit";
import FacilitiesView from "./pages/home/Facilities/FacilitiesView";

// Sponsors
import SponsorsAdd from "./pages/home/sponsors/AddSponsor"; 
import SponsorsEdit from "./pages/home/sponsors/EditSponsor";
import SponsorsView from "./pages/home/sponsors/ViewSponsors";

function AppWrapper() {
  const location = useLocation();
  const noLayoutRoutes = ["/", "/register", "/forgot-password"];
  const isAuthRoute = noLayoutRoutes.includes(location.pathname);

  return (
    <div className={isAuthRoute ? "min-h-screen flex items-center justify-center bg-[#766ACC]" : ""}>
      <Routes>
        {/* Auth Routes */}
        <Route path="/" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/forgot-password" element={<ForgotPasswordForm />} />

        {/* Protected Dashboard Routes */}
        <Route element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }>
          <Route path="/dashboard" element={<DashboardHome />} />

          {/* Users */}
          <Route path="/user/add" element={<AddUser />} />
          <Route path="/edit-user/:id" element={<EditUser />} />
          <Route path="/user/view" element={<ViewUser />} />

          {/* Sessions */}
          <Route path="/sessions/view" element={<SessionView />} />
          <Route path="/sessions/add" element={<SessionAdd />} />
          <Route path="/sessions/edit" element={<SessionEdit />} />

          {/* Speakers */}
          <Route path="/speakers/add" element={<SpeakerAdd />} />
          <Route path="/speakers/edit" element={<SpeakerEdit />} />
          <Route path="/speakers/view" element={<SpeakerView />} />

          {/* Session Data */}
          <Route path="/session-data/add" element={<SessionDataAdd />} />
          <Route path="/session-data/view" element={<SessionDataView />} />
          <Route path="/session-data/edit" element={<SessionDataEdit />} />

          {/* Banner */}
          <Route path="/home/banner/add" element={<AddBanner />} />
          <Route path="/home/banner/view" element={<ViewBanner />} />
          <Route path="/home/banner/edit" element={<EditBanner />} />

          {/* About */}
          <Route path="/home/about/add" element={<AboutAdd />} />
          <Route path="/home/about/view" element={<AboutView />} />
          <Route path="/home/about/edit" element={<AboutEdit />} />

          {/* Video */}
          <Route path="/home/video/add" element={<VideoAdd />} />
          <Route path="/home/video/view" element={<VideoView />} />
          <Route path="/home/video/edit" element={<VideoEdit />} />

          {/* President Message */}
          <Route path="/home/PresidentMessage/add" element={<AddPresidentMessage />} />
          <Route path="/home/PresidentMessage/view" element={<ViewPresidentMessage />} />
          <Route path="/home/PresidentMessage/edit" element={<EditPresidentMessage />} />

          {/* Initiatives */}
          <Route path="/home/Initiatives/add" element={<AddInitiatives />} />
          <Route path="/home/Initiatives/view" element={<ViewInitiatives />} />
          <Route path="/home/Initiatives/edit" element={<EditInitiatives />} />

          {/* Sovapa */}
          <Route path="/home/sovapa/add" element={<SovapaAdd />} />
          <Route path="/home/sovapa/view" element={<SovapaView />} />
          <Route path="/home/sovapa/edit" element={<SovapaEdit />} />

          {/* Feedback */}
          <Route path="/home/Feedback/add" element={<FeedbackAdd />} />
          <Route path="/home/Feedback/view" element={<FeedbackView />} />
          <Route path="/home/Feedback/edit" element={<FeedbackEdit />} />

          {/* Facilities */}
          <Route path="/home/Facilities/add" element={<FacilitiesAdd />} />
          <Route path="/home/Facilities/view" element={<FacilitiesView />} />
          <Route path="/home/Facilities/edit" element={<FacilitiesEdit />} />

          {/* Sponsors */}
          <Route path="/home/sponsors/add" element={<SponsorsAdd />} />
          <Route path="/home/sponsors/view" element={<SponsorsView />} />
          <Route path="/home/sponsors/edit" element={<SponsorsEdit />} />
        </Route>
      </Routes>
    </div>
  );
}

function App() {
  return <AppWrapper />;
}

export default App;
