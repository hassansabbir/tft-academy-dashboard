import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import AdminAttendance from "./AdminAttendance";
import CoachAttendance from "./CoachAttendance";

interface JwtPayload {
  role?: string;
}

const Attendance = () => {
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

  return isCoach ? <CoachAttendance /> : <AdminAttendance />;
};

export default Attendance;
