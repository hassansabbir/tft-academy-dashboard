import { useState, useEffect } from "react";
import { FiPlus } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { Spin, Alert } from "antd";
import { useGetSquadsQuery } from "../../redux/apiSlices/squadSlice";

interface JwtPayload {
  role?: string;
}

const getBadgeColor = (tag: string) => {
  const t = tag.toUpperCase();
  if (t.includes("U14")) return "#1D4ED8"; // Blue
  if (t.includes("U12")) return "#22C55E"; // Green
  if (t.includes("U16")) return "#F59E0B"; // Yellow/Orange
  if (t.includes("U18")) return "#EF4444"; // Red
  if (t.includes("U10")) return "#FBBF24"; // Yellow
  if (t.includes("U8") || t.includes("U08")) return "#8B5CF6"; // Purple
  return "#3B82F6"; // Default Blue
};

const getAgeGroupLabel = (name: string) => {
  const match = name.match(/U\d+/i);
  return match ? match[0].toUpperCase() : "UXX";
};

const Squads = () => {
  const navigate = useNavigate();
  const [isCoach, setIsCoach] = useState(false);

  // Fetch squads from API
  const { data: apiResponse, isLoading, isError } = useGetSquadsQuery({});
  const squads = apiResponse?.data || [];
  const meta = apiResponse?.meta || { total: 0 };

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

  return (
    <div className={`flex flex-col h-full p-6 pb-12 overflow-y-auto ${isCoach ? 'bg-[#050E21]' : 'bg-[#f8faff]'}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex flex-col">
          <h1 className={`text-[28px] font-bold leading-tight ${isCoach ? 'text-white' : 'text-gray-900'}`}>
            Squads
          </h1>
          <p className={`text-[14px] font-medium mt-1 ${isCoach ? 'text-[#94A3B8]' : 'text-gray-500'}`}>
            {meta.total} active squads · Season 2024/25
          </p>
        </div>

        {!isCoach && (
          <button
            onClick={() => navigate("/squads/add")}
            className="bg-[#081A4A] hover:opacity-90 text-white px-6 py-2.5 rounded-full flex items-center gap-2 text-[15px] font-semibold transition-opacity shadow-md cursor-pointer"
          >
            <FiPlus size={18} strokeWidth={3} />
            <span>Create Squad</span>
          </button>
        )}
      </div>

      {isLoading && (
        <div className="flex items-center justify-center py-20">
          <Spin size="large" />
        </div>
      )}

      {isError && (
        <Alert type="error" message="Failed to load squads. Please try again later." />
      )}

      {/* Grid */}
      {!isLoading && !isError && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {squads.map((squad: any) => {
            const ageGroupLabel = getAgeGroupLabel(squad.ageGroup || "");
            const badgeColor = getBadgeColor(ageGroupLabel);
            const coachName = squad.coachName || "Unassigned";
            
            const currentPlayers = squad.playersCount || 0;
            const maxPlayers = squad.maxPlayers || 25;
            const attendanceRate = squad.attendanceRate || "0%";
            const schedule = squad.schedule || "Unscheduled";
            
            const capacityPercent = Math.min((currentPlayers / maxPlayers) * 100, 100);

            return (
              <div
                key={squad._id}
                className={`rounded-2xl p-6 flex flex-col justify-between transition-all shadow-sm border 
                  ${isCoach ? 'bg-[#0B1B38] border-[#162E58] hover:border-[#2b4c8c]' : 'bg-white border-gray-100 hover:shadow-md hover:border-gray-200'}
                `}
              >
                {/* Top Section: Badge, Title, Coach */}
                <div className="flex gap-4 mb-6">
                  {/* Badge */}
                  <div
                    className="w-12 h-12 rounded-xl flex shrink-0 items-center justify-center text-white font-bold text-[15px] shadow-sm"
                    style={{ backgroundColor: badgeColor }}
                  >
                    {ageGroupLabel}
                  </div>

                  <div className="flex flex-col justify-center">
                    <h3 className={`text-[18px] font-bold leading-tight ${isCoach ? 'text-white' : 'text-gray-900'}`}>
                      {ageGroupLabel} {squad.name}
                    </h3>
                    <span className={`text-[14px] font-medium mt-0.5 ${isCoach ? 'text-[#94A3B8]' : 'text-gray-500'}`}>
                      {coachName}
                    </span>
                  </div>
                </div>

                {/* Stats Grid */}
                <div className={`grid grid-cols-3 mb-6 rounded-xl p-4 ${isCoach ? 'bg-[#132A52]' : 'bg-gray-50/50'}`}>
                  {/* Players */}
                  <div className={`flex flex-col items-center justify-center border-r ${isCoach ? 'border-[#162E58]' : 'border-gray-100'}`}>
                    <span className={`text-[20px] font-bold leading-none ${isCoach ? 'text-white' : 'text-gray-900'}`}>
                      {currentPlayers}
                    </span>
                    <span className={`text-[12px] font-medium mt-1 ${isCoach ? 'text-[#94A3B8]' : 'text-gray-400'}`}>
                      Players
                    </span>
                  </div>
                  {/* Attendance */}
                  <div className={`flex flex-col items-center justify-center border-r ${isCoach ? 'border-[#162E58]' : 'border-gray-100'}`}>
                    <span className="text-[20px] font-bold text-[#22C55E] leading-none">
                      {attendanceRate}
                    </span>
                    <span className={`text-[12px] font-medium mt-1 ${isCoach ? 'text-[#94A3B8]' : 'text-gray-400'}`}>
                      Attendance
                    </span>
                  </div>
                  {/* Schedule */}
                  <div className="flex flex-col items-center justify-center text-center px-2">
                    <span className={`text-[13px] font-bold leading-tight ${isCoach ? 'text-white' : 'text-gray-900'}`}>
                      {schedule}
                    </span>
                    <span className={`text-[12px] font-medium mt-1 ${isCoach ? 'text-[#94A3B8]' : 'text-gray-400'}`}>
                      Schedule
                    </span>
                  </div>
                </div>

                {/* Squad Capacity */}
                <div className="flex flex-col mb-6">
                  <div className="flex items-center justify-between text-[13px] mb-2">
                    <span className={`font-medium ${isCoach ? 'text-[#94A3B8]' : 'text-gray-500'}`}>
                      Squad capacity
                    </span>
                    <span className={`font-bold ${isCoach ? 'text-white' : 'text-gray-900'}`}>
                      {currentPlayers}/{maxPlayers}
                    </span>
                  </div>

                  <div className={`w-full h-1.5 rounded-full overflow-hidden ${isCoach ? 'bg-white' : 'bg-gray-100'}`}>
                    <div
                      className="h-full rounded-full"
                      style={{ 
                        width: `${capacityPercent}%`,
                        backgroundColor: badgeColor 
                      }}
                    />
                  </div>
                </div>

                {/* Action Button */}
                <button
                  onClick={() => navigate(`/squads/${squad._id}`)}
                  className={`w-full font-bold text-[14px] py-3.5 rounded-full transition-all cursor-pointer text-center
                    ${isCoach ? 'bg-[#F8FAFC] hover:bg-white text-[#1D4ED8]' : 'bg-[#EBF1FF] hover:bg-[#e1e9fc] text-[#1D4ED8]'}
                  `}
                >
                  View Squad
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Squads;
