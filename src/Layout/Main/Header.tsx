import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FiBell } from "react-icons/fi";
import { Badge } from "antd";
import { jwtDecode } from "jwt-decode";
import { useFetchAdminProfileQuery } from "../../redux/apiSlices/authSlice";

interface UserData {
  name?: string;
  role?: string;
  profileImg?: string;
}

interface AdminProfileResponse {
  data?: UserData;
}

interface JwtPayload {
  role?: string;
}

const Header = () => {
  const { data: userData } = useFetchAdminProfileQuery() as {
    data?: AdminProfileResponse;
    isLoading: boolean;
  };
  const location = useLocation();
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

  const getBreadcrumb = () => {
    if (location.pathname === "/") return "Dashboard";
    const path = location.pathname.substring(1);
    const formatted = path.split("-").join(" ");
    return formatted.charAt(0).toUpperCase() + formatted.slice(1);
  };

  const getInitials = (name?: string) => {
    if (!name) return "U";
    const parts = name.split(" ");
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  const roleName = isCoach ? "Jay Railton" : (userData?.data?.role || "Super Admin");
  const subtitleName = isCoach ? "Head Coach" : (userData?.data?.name || "TFP Academy");

  return (
    <div
      className={`w-full h-full flex items-center justify-between px-6 transition-colors border-b ${
        isCoach
          ? "bg-[#050E21] border-[#162E58] text-white"
          : "bg-white border-gray-100 text-gray-900"
      }`}
    >
      {/* Left side: Breadcrumb */}
      <div className="flex items-center gap-2 text-[15px] font-medium tracking-wide">
        <span className={isCoach ? "text-[#94A3B8]" : "text-gray-400"}>TFP</span>
        <span className={isCoach ? "text-[#64748B] mx-1" : "text-gray-300 mx-1"}>›</span>
        <span className={isCoach ? "text-white font-semibold" : "text-gray-900"}>{getBreadcrumb()}</span>
      </div>

      {/* Right side: Actions & Profile */}
      <div className="flex items-center gap-6">
        <Link to="/notification" className="relative flex items-center">
          <Badge dot offset={[-2, 4]} color="#3B82F6">
            <FiBell className={isCoach ? "text-[#94A3B8] hover:text-white transition-colors" : "text-gray-500 hover:text-gray-900 transition-colors"} size={20} />
          </Badge>
        </Link>

        <div className="flex items-center gap-3">
          {userData?.data?.profileImg ? (
            <img
              src={`${(import.meta as any).env.VITE_BASE_URL}${userData.data.profileImg}`}
              alt="profile"
              className="w-10 h-10 rounded-full object-cover border border-gray-200"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-[#F4B43B] flex items-center justify-center text-gray-900 font-bold text-sm tracking-wider shadow-xs">
              {isCoach ? "JR" : getInitials(roleName)}
            </div>
          )}
          <div className="flex flex-col">
            <span className={`text-[14px] font-semibold leading-tight ${isCoach ? "text-white" : "text-gray-900"}`}>
              {roleName}
            </span>
            <span className={`text-[12px] font-medium leading-tight mt-0.5 ${isCoach ? "text-[#94A3B8]" : "text-gray-500"}`}>
              {subtitleName}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
