import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import AdminSessionNotes from "./AdminSessionNotes";
import CoachSessionNotes from "./CoachSessionNotes";

interface JwtPayload {
  role?: string;
}

const SessionNotes = () => {
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

  return isCoach ? <CoachSessionNotes /> : <AdminSessionNotes />;
};

export default SessionNotes;
