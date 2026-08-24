import { FiUsers, FiActivity, FiShield, FiClipboard, FiTarget, FiCalendar, FiPlus, FiUserCheck } from "react-icons/fi";
import { BiCalendarCheck } from "react-icons/bi";
import { Link } from "react-router-dom";
import { useAdminKpiCardsQuery } from "../../../redux/apiSlices/dashboardSlice";

const DashboardState = () => {
  const { data: kpiData, isLoading } = useAdminKpiCardsQuery("");

  const statCards = [
    {
      title: "Total Players",
      value: isLoading ? "..." : (kpiData?.totalPlayers || "0"),
      icon: <FiUsers className="text-[#5B79F2] text-xl" />,
      iconBg: "bg-[#5B79F2]/10",
    },
    {
      title: "Active Players",
      value: isLoading ? "..." : (kpiData?.activePlayers || "0"),
      icon: <FiActivity className="text-[#36D189] text-xl" />,
      iconBg: "bg-[#36D189]/10",
    },
    {
      title: "Total Coaches",
      value: isLoading ? "..." : (kpiData?.totalCoaches || "0"),
      icon: <FiUserCheck className="text-[#5B79F2] text-xl" />,
      iconBg: "bg-[#5B79F2]/10",
    },
    {
      title: "Active Squads",
      value: isLoading ? "..." : (kpiData?.activeSquads || "0"),
      icon: <FiShield className="text-[#FFAD4D] text-xl" />,
      iconBg: "bg-[#FFAD4D]/10",
    },
    {
      title: "Today's Attendance",
      value: isLoading ? "..." : (kpiData?.todayAttendance || "0/0"),
      icon: <BiCalendarCheck className="text-[#36D189] text-xl" />,
      iconBg: "bg-[#36D189]/10",
    },
    {
      title: "Pending Assessments",
      value: isLoading ? "..." : (kpiData?.pendingAssessments || "0"),
      icon: <FiClipboard className="text-[#FFAD4D] text-xl" />,
      iconBg: "bg-[#FFAD4D]/10",
    },
    {
      title: "Completed Targets",
      value: isLoading ? "..." : (kpiData?.completedTargets || "0"),
      icon: <FiTarget className="text-[#7B61FF] text-xl" />,
      iconBg: "bg-[#7B61FF]/10",
    },
    {
      title: "Upcoming Training",
      value: isLoading ? "..." : (kpiData?.upcomingTraining || "0"),
      icon: <FiCalendar className="text-[#7B61FF] text-xl" />,
      iconBg: "bg-[#7B61FF]/10",
    },
  ];

  return (
    <div className="flex flex-col gap-6 p-2">
      {/* Header Section */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Academy Overview</h1>
          <p className="text-sm text-gray-500 font-medium mt-1">Friday, 25 July 2025 • Season 2024/25</p>
        </div>
        <Link to="/players/add" className="bg-[#183182] hover:bg-[#183182]/90 text-white px-5 py-2.5 rounded-full flex items-center gap-2 text-sm font-medium transition-colors">
          <FiPlus size={18} />
          Add Player
        </Link>
      </div>

      {/* Cards Grid Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {statCards.map((card, index) => (
          <div key={index} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col gap-4">
            <div className={`w-11 h-11 rounded-full flex items-center justify-center ${card.iconBg}`}>
              {card.icon}
            </div>
            <div>
              <h3 className="text-[28px] font-semibold text-gray-900 leading-none">{card.value}</h3>
              <p className="text-[13px] text-gray-500 font-medium mt-2">{card.title}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardState;