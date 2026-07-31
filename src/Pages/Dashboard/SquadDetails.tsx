import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import AdminSquadDetails from "./AdminSquadDetails";
import CoachSquadDetails from "./CoachSquadDetails";

interface JwtPayload {
  role?: string;
}

const SquadDetails = () => {
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

  return isCoach ? <CoachSquadDetails /> : <AdminSquadDetails />;
};

export default SquadDetails;
