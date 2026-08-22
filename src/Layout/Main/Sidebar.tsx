import { Menu } from "antd";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import logo from "../../assets/logo.png";
import { MdOutlineDashboard } from "react-icons/md";
import {
  FiUsers,
  FiShield,
  FiUserCheck,
  FiClipboard,
  FiTarget,
  FiFileText,
  FiSettings,
  FiUser,
  FiActivity,
} from "react-icons/fi";
import { BiCalendarCheck, BiTrophy } from "react-icons/bi";
import { IoIosLogOut } from "react-icons/io";

interface MenuItem {
  key: string;
  icon?: React.ReactNode;
  label: React.ReactNode;
  children?: MenuItem[];
}

interface SidebarProps {
  role?: string | null;
}

const Sidebar: React.FC<SidebarProps> = ({ role }) => {
  const location = useLocation();
  const path = location.pathname;
  const [selectedKey, setSelectedKey] = useState<string>("");
  const [openKeys, setOpenKeys] = useState<string[]>([]);
  const navigate = useNavigate();

  const handleLogout = (): void => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("token");
    localStorage.removeItem("Authorization");
    sessionStorage.removeItem("authToken");
    sessionStorage.removeItem("refreshToken");
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("Authorization");
    Cookies.remove("refreshToken");
    navigate("/auth/login");
  };

  const isCoach = role === "CHOACH";

  // Coach Menu Items (from design)
  const coachMenuItems: MenuItem[] = [
    { key: "/", icon: <MdOutlineDashboard size={24} />, label: <Link to="/">Dashboard</Link> },
    { key: "/squads", icon: <FiShield size={24} />, label: <Link to="/squads">Squads</Link> },
    { key: "/attendance", icon: <BiCalendarCheck size={24} />, label: <Link to="/attendance">Attendance</Link> },
    { key: "/players", icon: <FiUsers size={24} />, label: <Link to="/players">Players</Link> },
    { key: "/assessments", icon: <FiActivity size={24} />, label: <Link to="/assessments">Assessments</Link> },
    { key: "/targets", icon: <FiTarget size={24} />, label: <Link to="/targets">Targets</Link> },
    { key: "/session-notes", icon: <FiFileText size={24} />, label: <Link to="/session-notes">Session Notes</Link> },
    { key: "/achievements", icon: <BiTrophy size={24} />, label: <Link to="/achievements">Achievements</Link> },
    { key: "/settings", icon: <FiSettings size={24} />, label: <Link to="/settings">Settings</Link> },
    { key: "/logout", icon: <IoIosLogOut size={24} />, label: <p onClick={handleLogout}>Logout</p> },
  ];

  // Admin Menu Items (from design)
  const adminMenuItems: MenuItem[] = [
    { key: "/", icon: <MdOutlineDashboard size={24} />, label: <Link to="/">Dashboard</Link> },
    { key: "/players", icon: <FiUsers size={24} />, label: <Link to="/players">Players</Link> },
    { key: "/squads", icon: <FiShield size={24} />, label: <Link to="/squads">Squads</Link> },
    { key: "/coaches", icon: <FiUserCheck size={24} />, label: <Link to="/coaches">Coaches</Link> },
    { key: "/attendance", icon: <BiCalendarCheck size={24} />, label: <Link to="/attendance">Attendance</Link> },
    { key: "/assessments", icon: <FiClipboard size={24} />, label: <Link to="/assessments">Assessments</Link> },
    { key: "/dev-targets", icon: <FiTarget size={24} />, label: <Link to="/dev-targets">Dev Targets</Link> },
    { key: "/session-notes", icon: <FiFileText size={24} />, label: <Link to="/session-notes">Session Notes</Link> },
    { key: "/achievements", icon: <BiTrophy size={24} />, label: <Link to="/achievements">Achievements</Link> },
    { key: "/academy-settings", icon: <FiSettings size={24} />, label: <Link to="/academy-settings">Academy Settings</Link> },
    { key: "/profile", icon: <FiUser size={24} />, label: <Link to="/profile">Profile</Link> },
    { key: "/logout", icon: <IoIosLogOut size={24} />, label: <p onClick={handleLogout}>Logout</p> },
  ];

  const menuItems = isCoach ? coachMenuItems : adminMenuItems;

  useEffect(() => {
    const selectedItem = menuItems.find(
      (item) =>
        item.key === path || item.children?.some((sub) => sub.key === path)
    );

    if (selectedItem) {
      setSelectedKey(path);

      if (selectedItem.children) {
        setOpenKeys([selectedItem.key]);
      } else {
        const parentItem = menuItems.find((item) =>
          item.children?.some((sub) => sub.key === path)
        );
        if (parentItem) {
          setOpenKeys([parentItem.key]);
        }
      }
    }
  }, [path, menuItems]);

  const handleOpenChange = (keys: string[]): void => {
    setOpenKeys(keys);
  };

  return (
    <div className="mt-5 overflow-y-scroll">
      <div className="px-6 mb-6 mt-2">
        <Link
          to={"/"}
          className="flex items-center gap-3.5 py-4"
        >
          <img src={logo} alt="TFP Academy" className="w-[52px] h-[52px] rounded-full object-cover bg-white" />
          <div className="flex flex-col">
            <span className="text-white font-bold text-[18px] leading-tight tracking-wide">TFP Academy</span>
            <span className="text-gray-300 font-medium text-[13px] leading-tight mt-1">{isCoach ? "Coach Portal" : "Super Admin Dashboard"}</span>
          </div>
        </Link>
      </div>
      <Menu
        mode="inline"
        selectedKeys={[selectedKey]}
        openKeys={openKeys}
        onOpenChange={handleOpenChange}
        style={{ borderRightColor: "transparent", background: "transparent" }}
        items={menuItems}
      />
    </div>
  );
};

export default Sidebar;
