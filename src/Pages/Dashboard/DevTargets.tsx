import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import AdminDevTargets from "./AdminDevTargets";
import CoachDevTargets from "./CoachDevTargets";

interface JwtPayload {
  role?: string;
}

const DevTargets = () => {
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

  return isCoach ? <CoachDevTargets /> : <AdminDevTargets />;
};

export default DevTargets;
