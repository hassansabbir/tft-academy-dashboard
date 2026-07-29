import { useState, useEffect } from "react";
import { FiPlus } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

interface JwtPayload {
  role?: string;
}

interface CoachSquad {
  id: number;
  tag: string;
  tagBg: string;
  progressBg: string;
  name: string;
  coach: string;
  players: number;
  attendance: string;
  attendanceRate: number;
  isSelected?: boolean;
}

const coachSquadsData: CoachSquad[] = [
  {
    id: 1,
    tag: "U16",
    tagBg: "bg-[#1D4ED8]",
    progressBg: "bg-[#3B82F6]",
    name: "U16 Futsal Fridays",
    coach: "Coach: Ray Railton",
    players: 18,
    attendance: "92%",
    attendanceRate: 92,
    isSelected: true,
  },
  {
    id: 2,
    tag: "U14",
    tagBg: "bg-[#6B21A8]",
    progressBg: "bg-[#A855F7]",
    name: "U14 Youth Development",
    coach: "Coach: Ray Railton",
    players: 16,
    attendance: "88%",
    attendanceRate: 88,
  },
  {
    id: 3,
    tag: "U12",
    tagBg: "bg-[#047857]",
    progressBg: "bg-[#10B981]",
    name: "U12 Foundation",
    coach: "Coach: Ray Railton",
    players: 14,
    attendance: "85%",
    attendanceRate: 95,
  },
  {
    id: 4,
    tag: "U10",
    tagBg: "bg-[#0E7490]",
    progressBg: "bg-[#06B6D4]",
    name: "U10 Future Goalkeeper",
    coach: "Coach: Ray Railton",
    players: 18,
    attendance: "92%",
    attendanceRate: 92,
  },
  {
    id: 5,
    tag: "U08",
    tagBg: "bg-[#BE185D]",
    progressBg: "bg-[#EC4899]",
    name: "U14 TFP Girls Academy",
    coach: "Coach: Ray Railton",
    players: 16,
    attendance: "88%",
    attendanceRate: 88,
  },
  {
    id: 6,
    tag: "U06",
    tagBg: "bg-[#C2410C]",
    progressBg: "bg-[#F97316]",
    name: "U12 Mini Kickers",
    coach: "Coach: Ray Railton",
    players: 14,
    attendance: "85%",
    attendanceRate: 95,
  },
];

const Squads = () => {
  const navigate = useNavigate();
  const [isCoach, setIsCoach] = useState(false);
  const [selectedSquadId, setSelectedSquadId] = useState<number>(1);

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

  return (
    <div
      className={`flex flex-col h-full p-6 pb-12 overflow-y-auto ${
        isCoach ? "bg-[#050E21]" : "bg-[#f8faff]"
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex flex-col">
          <h1
            className={`text-[24px] font-bold leading-tight ${
              isCoach ? "text-white" : "text-gray-900"
            }`}
          >
            Squads
          </h1>
          <p
            className={`text-[14px] font-medium mt-1 ${
              isCoach ? "text-[#94A3B8]" : "text-gray-500"
            }`}
          >
            Manage your assigned squads and rosters
          </p>
        </div>

        {!isCoach && (
          <button
            onClick={() => navigate("/squads/add")}
            className="bg-gradient-to-r from-[#081A4A] to-[#1239D4] hover:opacity-90 text-white px-6 py-2.5 rounded-full flex items-center gap-2 text-[15px] font-semibold transition-opacity shadow-md cursor-pointer"
          >
            <FiPlus size={18} strokeWidth={3} />
            <span>Create Squad</span>
          </button>
        )}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {coachSquadsData.map((squad) => {
          const isSelected = selectedSquadId === squad.id;

          return (
            <div
              key={squad.id}
              onClick={() => setSelectedSquadId(squad.id)}
              className={`rounded-2xl p-6 flex flex-col justify-between transition-all cursor-pointer shadow-sm ${
                isCoach
                  ? isSelected
                    ? "bg-[#0B1B38] border-2 border-[#1239D4] shadow-md"
                    : "bg-[#0B1B38] border border-[#162E58] hover:border-[#234580]"
                  : "bg-white border border-gray-100 hover:border-gray-200 hover:shadow-md"
              }`}
            >
              {/* Top Tag Badge */}
              <div
                className={`w-11 h-11 rounded-xl ${squad.tagBg} flex items-center justify-center text-white font-bold text-[13px] shadow-xs mb-4`}
              >
                {squad.tag}
              </div>

              {/* Squad Name & Coach */}
              <div className="flex flex-col mb-4">
                <h3
                  className={`text-[16px] font-bold leading-tight ${
                    isCoach ? "text-white" : "text-gray-900"
                  }`}
                >
                  {squad.name}
                </h3>
                <span
                  className={`text-[13px] font-medium mt-1 ${
                    isCoach ? "text-[#94A3B8]" : "text-gray-500"
                  }`}
                >
                  {squad.coach}
                </span>
              </div>

              {/* Stats Box */}
              <div
                className={`rounded-xl p-4 grid grid-cols-2 gap-2 mb-4 border ${
                  isCoach
                    ? "bg-[#07152F] border-[#162E58]/80"
                    : "bg-[#F9FAFC] border-gray-100"
                }`}
              >
                <div className="flex flex-col">
                  <span
                    className={`text-[10px] font-bold tracking-wider uppercase ${
                      isCoach ? "text-[#64748B]" : "text-gray-400"
                    }`}
                  >
                    PLAYERS
                  </span>
                  <span
                    className={`text-[18px] font-bold mt-0.5 ${
                      isCoach ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {squad.players}
                  </span>
                </div>

                <div className="flex flex-col">
                  <span
                    className={`text-[10px] font-bold tracking-wider uppercase ${
                      isCoach ? "text-[#64748B]" : "text-gray-400"
                    }`}
                  >
                    ATTENDANCE
                  </span>
                  <span
                    className={`text-[18px] font-bold mt-0.5 ${
                      isCoach ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {squad.attendance}
                  </span>
                </div>
              </div>

              {/* Attendance Progress Bar */}
              <div className="flex flex-col mb-5">
                <div className="flex items-center justify-between text-[12px]">
                  <span
                    className={`font-medium ${
                      isCoach ? "text-[#94A3B8]" : "text-gray-500"
                    }`}
                  >
                    Attendance Rate
                  </span>
                  <span
                    className={`font-bold ${
                      isCoach ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {squad.attendanceRate}%
                  </span>
                </div>

                <div
                  className={`w-full h-1.5 rounded-full overflow-hidden mt-1.5 ${
                    isCoach ? "bg-[#162E58]" : "bg-gray-100"
                  }`}
                >
                  <div
                    className={`h-full rounded-full ${squad.progressBg}`}
                    style={{ width: `${squad.attendanceRate}%` }}
                  />
                </div>
              </div>

              {/* Action Button */}
              {isSelected ? (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/squads/${squad.id}`);
                  }}
                  className="w-full bg-gradient-to-b from-[#1E4ED8] to-[#0F2B8D] hover:opacity-95 text-white font-bold text-[13px] py-3 rounded-full transition-all shadow-md cursor-pointer text-center border border-blue-400/20"
                >
                  View Squad
                </button>
              ) : (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/squads/${squad.id}`);
                  }}
                  className={`w-full bg-transparent font-bold text-[13px] py-2.5 rounded-full transition-all cursor-pointer text-center border ${
                    isCoach
                      ? "border-[#162E58] text-[#94A3B8] hover:border-[#3B82F6] hover:text-white"
                      : "border-gray-200 text-gray-600 hover:border-blue-500 hover:text-blue-600"
                  }`}
                >
                  View Squad
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Squads;
