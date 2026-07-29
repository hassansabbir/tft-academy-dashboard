import { createBrowserRouter } from "react-router-dom";
import Auth from "../Layout/Auth/Auth";
import Main from "../Layout/Main/Main";
import Home from "../Pages/Dashboard/Home";
import Players from "../Pages/Dashboard/Players";
import PlayerDetails from "../Pages/Dashboard/PlayerDetails";
import Coaches from "../Pages/Dashboard/Coaches";
import AddCoach from "../Pages/Dashboard/AddCoach";
import Squads from "../Pages/Dashboard/Squads";
import CreateSquad from "../Pages/Dashboard/CreateSquad";
import SquadDetails from "../Pages/Dashboard/SquadDetails";
import Assessments from "../Pages/Dashboard/Assessments";
import AcademySettings from "../Pages/Dashboard/AcademySettings";
import CoachSettings from "../Pages/Dashboard/CoachSettings";
import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

interface JwtPayload {
  role?: string;
}

const SettingsRoute = () => {
  const [isCoach, setIsCoach] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("authToken") || sessionStorage.getItem("authToken");
    if (token) {
      try {
        const decoded = jwtDecode<JwtPayload>(token);
        setIsCoach(decoded.role === "COACH");
      } catch (e) {
        setIsCoach(false);
      }
    }
  }, []);

  return isCoach ? <CoachSettings /> : <AcademySettings />;
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
        element: <Players />,
      },
      {
        path: "/players/details",
        element: <PlayerDetails />,
      },
      {
        path: "/players/:id",
        element: <PlayerDetails />,
      },
      {
        path: "/coaches",
        element: <Coaches />,
      },
      {
        path: "/coaches/add",
        element: <AddCoach />,
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
        element: <CreateSquad />,
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
        element: <DevTargets />,
      },
      {
        path: "/targets",
        element: <DevTargets />,
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
        element: <SettingsRoute />,
      },
      {
        path: "/settings",
        element: <SettingsRoute />,
      },
      {
        path: "/players/add",
        element: <AddPlayer />,
      },
      {
        path: "/personal-information",
        element: <UserProfile />,
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
        element: <UserProfile />,
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
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
