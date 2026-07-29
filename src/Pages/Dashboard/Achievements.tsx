import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import AdminAchievements from "./AdminAchievements";
import CoachAchievements from "./CoachAchievements";

interface JwtPayload {
  role?: string;
}

const Achievements = () => {
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

  return isCoach ? <CoachAchievements /> : <AdminAchievements />;
};

export default Achievements;
