import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import AdminAssessments from "./AdminAssessments";
import CoachAssessments from "./CoachAssessments";

interface JwtPayload {
  role?: string;
}

const Assessments = () => {
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

  return isCoach ? <CoachAssessments /> : <AdminAssessments />;
};

export default Assessments;
