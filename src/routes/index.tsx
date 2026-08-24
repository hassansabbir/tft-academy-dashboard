import { createBrowserRouter } from "react-router-dom";
import Auth from "../Layout/Auth/Auth";
import Main from "../Layout/Main/Main";
import Home from "../Pages/Dashboard/Home";
import Players from "../Pages/Dashboard/Players";
import PlayerDetails from "../Pages/Dashboard/PlayerDetails";
import CoachPlayers from "../Pages/Dashboard/CoachPlayers";
import CoachPlayerDetails from "../Pages/Dashboard/CoachPlayerDetails";
import Coaches from "../Pages/Dashboard/Coaches";
import AddCoach from "../Pages/Dashboard/AddCoach";
import Squads from "../Pages/Dashboard/Squads";
import CreateSquad from "../Pages/Dashboard/CreateSquad";
import SquadDetails from "../Pages/Dashboard/SquadDetails";
import CoachDetails from "../Pages/Dashboard/CoachDetails";
import Assessments from "../Pages/Dashboard/Assessments";
import AcademySettings from "../Pages/Dashboard/AcademySettings";
import CoachSettings from "../Pages/Dashboard/CoachSettings";
import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

import { Spin } from "antd";

interface JwtPayload {
  role?: string;
}



const SettingsRoute = () => {
  const [isCoach, setIsCoach] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("authToken") || sessionStorage.getItem("authToken");
    if (token) {
      try {
        const decoded = jwtDecode<JwtPayload>(token);
        setIsCoach(decoded.role === "CHOACH");
      } catch (e) {
        setIsCoach(false);
      }
    }
    setIsLoading(false);
  }, []);

  if (isLoading) return <div className="flex h-full items-center justify-center"><Spin size="large" /></div>;
  return isCoach ? <CoachSettings /> : <AcademySettings />;
};

const PlayersRoute = () => {
  const [isCoach, setIsCoach] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("authToken") || sessionStorage.getItem("authToken");
    if (token) {
      try {
        const decoded = jwtDecode<JwtPayload>(token);
        setIsCoach(decoded.role === "CHOACH");
      } catch (e) {
        setIsCoach(false);
      }
    }
    setIsLoading(false);
  }, []);

  if (isLoading) return <div className="flex h-full items-center justify-center"><Spin size="large" /></div>;
  return isCoach ? <CoachPlayers /> : <Players />;
};

const PlayerDetailsRoute = () => {
  const [isCoach, setIsCoach] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("authToken") || sessionStorage.getItem("authToken");
    if (token) {
      try {
        const decoded = jwtDecode<JwtPayload>(token);
        setIsCoach(decoded.role === "CHOACH");
      } catch (e) {
        setIsCoach(false);
      }
    }
    setIsLoading(false);
  }, []);

  if (isLoading) return <div className="flex h-full items-center justify-center"><Spin size="large" /></div>;
  return isCoach ? <CoachPlayerDetails /> : <PlayerDetails />;
};
import AddPlayer from "../Pages/Dashboard/AddPlayer/AddPlayer";
import ChangePassword from "../Pages/Auth/ChangePassword";
import Login from "../Pages/Auth/Login";
import ForgotPassword from "../Pages/Auth/ForgotPassword";
import VerifyOtp from "../Pages/Auth/VerifyOtp";
import ResetPassword from "../Pages/Auth/ResetPassword";
import NotFound from "../NotFound";
import Notifications from "../Pages/Dashboard/Notifications";
import UserProfile from "../Pages/Dashboard/AdminProfile/UserProfile";
import AboutUs from "../components/ui/Settings/AboutUs";
import OfferList from "../components/ui/Settings/OfferList";

import PrivateRoute from "./PrivateRoute";
import ProtectedRoute from "./ProtectedRoute";
import Unauthorized from "../Unauthorized";
import Attendance from "@/Pages/Dashboard/Attendance";
import DevTargets from "@/Pages/Dashboard/DevTargets";
import SessionNotes from "@/Pages/Dashboard/SessionNotes";
import Achievements from "@/Pages/Dashboard/Achievements";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <PrivateRoute>
        <Main />
      </PrivateRoute>
    ),
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/players",
        element: <PlayersRoute />,
      },
      {
        path: "/players/details",
        element: <PlayerDetailsRoute />,
      },
      {
        path: "/players/add",
        element: <ProtectedRoute allowedRoles={["ADMIN", "SUPER_ADMIN", "CHOACH"]}><AddPlayer /></ProtectedRoute>,
      },
      {
        path: "/players/:id",
        element: <PlayerDetailsRoute />,
      },
      {
        path: "/coaches",
        element: <ProtectedRoute allowedRoles={["ADMIN", "SUPER_ADMIN"]}><Coaches /></ProtectedRoute>,
      },
      {
        path: "/coaches/add",
        element: <ProtectedRoute allowedRoles={["ADMIN", "SUPER_ADMIN"]}><AddCoach /></ProtectedRoute>,
      },
      {
        path: "/coaches/details",
        element: <ProtectedRoute allowedRoles={["ADMIN", "SUPER_ADMIN"]}><CoachDetails /></ProtectedRoute>,
      },
      {
        path: "/coaches/:id",
        element: <ProtectedRoute allowedRoles={["ADMIN", "SUPER_ADMIN"]}><CoachDetails /></ProtectedRoute>,
      },
      {
        path: "/squads",
        element: <Squads />,
      },
      {
        path: "/squads/details",
        element: <SquadDetails />,
      },
      {
        path: "/squads/:id",
        element: <SquadDetails />,
      },
      {
        path: "/squads/add",
        element: <ProtectedRoute allowedRoles={["ADMIN", "SUPER_ADMIN"]}><CreateSquad /></ProtectedRoute>,
      },
      {
        path: "/attendance",
        element: <Attendance />,
      },
      {
        path: "/assessments",
        element: <Assessments />,
      },
      {
        path: "/dev-targets",
        element: <ProtectedRoute allowedRoles={["ADMIN", "SUPER_ADMIN"]}><DevTargets /></ProtectedRoute>,
      },
      {
        path: "/targets",
        element: <ProtectedRoute allowedRoles={["CHOACH"]}><DevTargets /></ProtectedRoute>,
      },
      {
        path: "/session-notes",
        element: <SessionNotes />,
      },
      {
        path: "/achievements",
        element: <Achievements />,
      },
      {
        path: "/academy-settings",
        element: <ProtectedRoute allowedRoles={["ADMIN", "SUPER_ADMIN"]}><SettingsRoute /></ProtectedRoute>,
      },
      {
        path: "/settings",
        element: <ProtectedRoute allowedRoles={["CHOACH"]}><SettingsRoute /></ProtectedRoute>,
      },

      {
        path: "/personal-information",
        element: <ProtectedRoute allowedRoles={["ADMIN", "SUPER_ADMIN"]}><UserProfile /></ProtectedRoute>,
      },
      {
        path: "/change-password",
        element: <ChangePassword />,
      },
      {
        path: "about-us",
        element: <AboutUs />,
      },
      {
        path: "offer-list",
        element: <OfferList />,
      },
      // {
      //   path: "/edit-terms-and-conditions",
      //   element: <TermsAndCondition />,
      // },
      // {
      //   path: "/press",
      //   element: <Press />,
      // },

      {
        path: "/change-password",
        element: <ChangePassword />,
      },

      {
        path: "/profile",
        element: <ProtectedRoute allowedRoles={["ADMIN", "SUPER_ADMIN"]}><UserProfile /></ProtectedRoute>,
      },
      {
        path: "/notification",
        element: <Notifications />,
      },
    ],
  },
  {
    path: "/auth",
    element: <Auth />,
    children: [
      {
        path: "/auth",
        element: <Login />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "forgot-password",
        element: <ForgotPassword />,
      },
      {
        path: "verify-otp",
        element: <VerifyOtp />,
      },
      {
        path: "reset-password",
        element: <ResetPassword />,
      },
    ],
  },
  {
    path: "/unauthorized",
    element: <Unauthorized />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
