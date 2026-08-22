import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import AdminNotifications from "./AdminNotifications";
import CoachNotifications from "./CoachNotifications";

interface JwtPayload {
  role?: string;
}

const Notifications = () => {
  const [isCoach, setIsCoach] = useState(false);

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
  }, []);

  return isCoach ? <CoachNotifications /> : <AdminNotifications />;
};

export default Notifications;