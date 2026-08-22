import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { Outlet } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

interface JwtPayload {
  role?: string;
}

import { Spin } from "antd";

const Main = () => {
  const [role, setRole] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("authToken") || sessionStorage.getItem("authToken");
    if (token) {
      try {
        const decoded = jwtDecode<JwtPayload>(token);
        setRole(decoded.role || null);
      } catch (e) {
        // invalid token
      }
    }
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen w-full bg-[#f8faff]">
        <Spin size="large" />
      </div>
    );
  }

  const isCoach = role === "CHOACH";

  return (
    <div className={`grid grid-cols-12 gap-4 pe-3 bg-mainBg text-mainText ${isCoach ? "theme-coach" : ""}`}>
      {/* side bar */}
      <div className="col-span-2 h-screen bg-sidebarBg w-full overflow-y-auto">
        <Sidebar role={role} />
      </div>

      {/* main container with header */}
      <div className="col-span-10 flex flex-col h-screen">
        <div className="h-[68px] w-full flex items-center">
          <Header />
        </div>

        <div className="h-[calc(100vh-85px)] rounded-t-3xl overflow-y-auto">
          <div className="h-full overflow-y-auto rounded-md">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
