import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import DashboardState from "@/components/ui/Home/DashboardState";
import MonthlyAttendance from "@/components/ui/Home/MonthlyAttendance";
import AgeDistribution from "@/components/ui/Home/AgeDistribution";
import CoachDashboard from "@/components/ui/Home/CoachDashboard";

interface JwtPayload {
  role?: string;
}

const Home = () => {
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

  if (isCoach) {
    return <CoachDashboard />;
  }

  return (
    <div className="h-full flex flex-col gap-6">
      <DashboardState />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 px-2 pb-6">
        <div className="lg:col-span-2">
          <MonthlyAttendance />
        </div>
        <div className="lg:col-span-1">
          <AgeDistribution />
        </div>
      </div>
    </div>
  );
};

export default Home;
