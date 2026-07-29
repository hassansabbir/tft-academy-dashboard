import { useState, useEffect } from "react";
import { FiCalendar, FiSearch, FiCheckCircle, FiSend, FiRotateCcw } from "react-icons/fi";
import { jwtDecode } from "jwt-decode";
import { message } from "antd";

interface JwtPayload {
  role?: string;
}

type AttendanceStatus = "P" | "L" | "A" | "I";

interface RosterPlayer {
  id: number;
  initials: string;
  name: string;
  details: string;
  seasonAttendance: string;
  avatarBg: string;
}

const rosterPlayersData: RosterPlayer[] = [
  {
    id: 1,
    initials: "JM",
    name: "James Mitchell",
    details: "ST · #9",
    seasonAttendance: "94% season",
    avatarBg: "bg-[#2563EB]",
  },
  {
    id: 2,
    initials: "LW",
    name: "Leon Williams",
    details: "CM · #8",
    seasonAttendance: "88% season",
    avatarBg: "bg-[#7C3AED]",
  },
  {
    id: 3,
    initials: "TB",
    name: "Tyler Brooks",
    details: "CB · #5",
    seasonAttendance: "92% season",
    avatarBg: "bg-[#059669]",
  },
  {
    id: 4,
    initials: "KR",
    name: "Kai Robertson",
    details: "GK · #1",
    seasonAttendance: "97% season",
    avatarBg: "bg-[#D97706]",
  },
  {
    id: 5,
    initials: "AC",
    name: "Aiden Clarke",
    details: "LW · #11",
    seasonAttendance: "85% season",
    avatarBg: "bg-[#DC2626]",
  },
  {
    id: 6,
    initials: "RF",
    name: "Ryan Fletcher",
    details: "CDM · #6",
    seasonAttendance: "91% season",
    avatarBg: "bg-[#DB2777]",
  },
];

const Attendance = () => {
  const [isCoach, setIsCoach] = useState(false);
  const [selectedDate] = useState("22 Jan 2025");
  const [selectedSquad, setSelectedSquad] = useState("U14 Youth Development");
  const [searchQuery, setSearchQuery] = useState("");
  const [submitted, setSubmitted] = useState(false);

  // Status mapping per player ID
  const [statusMap, setStatusMap] = useState<Record<number, AttendanceStatus>>({
    1: "P",
    2: "L",
    3: "A",
    4: "I",
    5: "P",
    6: "P",
  });

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

  const handleStatusChange = (id: number, status: AttendanceStatus) => {
    setStatusMap((prev) => ({ ...prev, [id]: status }));
  };

  const handleMarkAllPresent = () => {
    const updated: Record<number, AttendanceStatus> = {};
    rosterPlayersData.forEach((p) => {
      updated[p.id] = "P";
    });
    setStatusMap(updated);
    message.success("All players marked as Present");
  };

  const handleSubmitRegister = () => {
    setSubmitted(true);
  };

  // Filter roster by search
  const filteredRoster = rosterPlayersData.filter((player) => {
    const term = searchQuery.toLowerCase();
    return (
      player.name.toLowerCase().includes(term) ||
      player.details.toLowerCase().includes(term)
    );
  });

  // Calculate Summary Counts
  const presentCount = Object.values(statusMap).filter((s) => s === "P").length;
  const lateCount = Object.values(statusMap).filter((s) => s === "L").length;
  const absentCount = Object.values(statusMap).filter((s) => s === "A").length;
  const injuredCount = Object.values(statusMap).filter((s) => s === "I").length;

  return (
    <div
      className={`flex flex-col h-full p-6 pb-12 overflow-y-auto ${
        isCoach ? "bg-[#050E21]" : "bg-[#050E21]"
      }`}
    >
      {!submitted ? (
        /* Register Taking View (Image 1) */
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex flex-col mb-6">
            <h1 className="text-[24px] font-bold text-white leading-tight">Attendance</h1>
            <p className="text-[14px] text-[#94A3B8] font-medium mt-1">
              Take register for your squads
            </p>
          </div>

          {/* Controls Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            {/* Left Controls: Date, Squad, Search */}
            <div className="flex flex-wrap items-center gap-3">
              {/* Date Button */}
              <div className="bg-[#0B1B38] text-white border border-[#162E58] px-4 py-2 rounded-xl text-[13px] font-bold flex items-center gap-2 shadow-xs">
                <FiCalendar className="text-[#60A5FA]" size={15} />
                <span>{selectedDate}</span>
              </div>

              {/* Squad Selector Dropdown */}
              <div className="relative">
                <select
                  value={selectedSquad}
                  onChange={(e) => setSelectedSquad(e.target.value)}
                  className="bg-[#0B1B38] text-white border border-[#162E58] px-4 py-2 pr-8 rounded-xl text-[13px] font-bold focus:outline-none focus:border-blue-500 appearance-none cursor-pointer shadow-xs"
                >
                  <option value="U14 Youth Development">U14 Youth Development</option>
                  <option value="U16 Futsal Fridays">U16 Futsal Fridays</option>
                  <option value="U12 Foundation">U12 Foundation</option>
                </select>
                <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 text-[10px]">
                  ▼
                </span>
              </div>

              {/* Search Player */}
              <div className="relative">
                <FiSearch
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#64748B]"
                  size={15}
                />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search player..."
                  className="bg-[#0B1B38] text-white border border-[#162E58] pl-9 pr-4 py-2 rounded-full text-[13px] placeholder-[#64748B] focus:outline-none focus:border-[#3B82F6] w-[220px] shadow-xs"
                />
              </div>
            </div>

            {/* Right Action: Mark All Present */}
            <button
              onClick={handleMarkAllPresent}
              className="text-[#34D399] hover:bg-[#10B981]/20 border border-[#10B981]/40 bg-[#10B981]/10 px-4 py-2 rounded-full text-[13px] font-bold transition-all cursor-pointer"
            >
              Mark All Present
            </button>
          </div>

          {/* Live Summary Counter Badges */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <div className="bg-[#064E3B]/40 border border-[#059669]/50 text-[#34D399] px-4 py-1.5 rounded-full text-[13px] font-bold flex items-center gap-2">
              <span className="bg-[#059669] text-white w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-bold">
                {presentCount}
              </span>
              <span>Present</span>
            </div>

            <div className="bg-[#78350F]/40 border border-[#D97706]/50 text-[#FBBF24] px-4 py-1.5 rounded-full text-[13px] font-bold flex items-center gap-2">
              <span className="bg-[#D97706] text-white w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-bold">
                {lateCount}
              </span>
              <span>Late</span>
            </div>

            <div className="bg-[#7F1D1D]/40 border border-[#DC2626]/50 text-[#F87171] px-4 py-1.5 rounded-full text-[13px] font-bold flex items-center gap-2">
              <span className="bg-[#DC2626] text-white w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-bold">
                {absentCount}
              </span>
              <span>Absent</span>
            </div>

            <div className="bg-[#451A03]/40 border border-[#B45309]/50 text-[#F97316] px-4 py-1.5 rounded-full text-[13px] font-bold flex items-center gap-2">
              <span className="bg-[#B45309] text-white w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-bold">
                {injuredCount}
              </span>
              <span>Injured</span>
            </div>
          </div>

          {/* Roster List Container */}
          <div className="bg-[#0B1B38] border border-[#162E58] rounded-2xl p-4 flex flex-col gap-3 shadow-sm mb-8">
            {filteredRoster.map((player) => {
              const currentStatus = statusMap[player.id];

              return (
                <div
                  key={player.id}
                  className="bg-[#07152F] border border-[#162E58] rounded-xl p-4 flex items-center justify-between hover:border-[#234580] transition-all"
                >
                  {/* Left Side: Avatar & Name */}
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-10 h-10 rounded-full ${player.avatarBg} text-white font-bold text-[13px] flex items-center justify-center shrink-0 shadow-xs`}
                    >
                      {player.initials}
                    </div>
                    <div className="flex flex-col">
                      <h3 className="text-[15px] font-bold text-white leading-tight">
                        {player.name}
                      </h3>
                      <span className="text-[12px] text-[#94A3B8] font-medium mt-0.5">
                        {player.details}
                      </span>
                    </div>
                  </div>

                  {/* Right Side: Season Pill & Status Buttons */}
                  <div className="flex items-center gap-4">
                    <span className="bg-[#064E3B]/60 text-[#34D399] border border-[#059669]/40 px-3 py-1 rounded-full text-[12px] font-bold">
                      {player.seasonAttendance}
                    </span>

                    {/* Status Toggles */}
                    <div className="flex items-center gap-2">
                      {/* P (Present) */}
                      <button
                        onClick={() => handleStatusChange(player.id, "P")}
                        className={`w-9 h-9 rounded-full font-bold text-[13px] flex items-center justify-center transition-all cursor-pointer ${
                          currentStatus === "P"
                            ? "bg-[#059669] text-white border-2 border-[#10B981] shadow-sm"
                            : "border border-[#162E58] text-[#64748B] hover:border-gray-500 hover:text-white"
                        }`}
                        title="Present"
                      >
                        P
                      </button>

                      {/* L (Late) */}
                      <button
                        onClick={() => handleStatusChange(player.id, "L")}
                        className={`w-9 h-9 rounded-full font-bold text-[13px] flex items-center justify-center transition-all cursor-pointer ${
                          currentStatus === "L"
                            ? "bg-[#D97706] text-white border-2 border-[#F59E0B] shadow-sm"
                            : "border border-[#162E58] text-[#64748B] hover:border-gray-500 hover:text-white"
                        }`}
                        title="Late"
                      >
                        L
                      </button>

                      {/* A (Absent) */}
                      <button
                        onClick={() => handleStatusChange(player.id, "A")}
                        className={`w-9 h-9 rounded-full font-bold text-[13px] flex items-center justify-center transition-all cursor-pointer ${
                          currentStatus === "A"
                            ? "bg-[#DC2626] text-white border-2 border-[#EF4444] shadow-sm"
                            : "border border-[#162E58] text-[#64748B] hover:border-gray-500 hover:text-white"
                        }`}
                        title="Absent"
                      >
                        A
                      </button>

                      {/* I (Injured) */}
                      <button
                        onClick={() => handleStatusChange(player.id, "I")}
                        className={`w-9 h-9 rounded-full font-bold text-[13px] flex items-center justify-center transition-all cursor-pointer ${
                          currentStatus === "I"
                            ? "bg-[#EA580C] text-white border-2 border-[#F97316] shadow-sm"
                            : "border border-[#162E58] text-[#64748B] hover:border-gray-500 hover:text-white"
                        }`}
                        title="Injured"
                      >
                        I
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Footer Bar */}
          <div className="flex items-center justify-between mt-auto">
            <span className="text-[12px] font-medium text-[#34D399] flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#34D399] animate-pulse" />
              <span>Auto-save active · Last saved 2 min ago</span>
            </span>

            <button
              onClick={handleSubmitRegister}
              className="bg-gradient-to-b from-[#1E4ED8] to-[#0F2B8D] hover:opacity-95 text-white font-bold px-7 py-3 rounded-full flex items-center gap-2 shadow-md transition-all cursor-pointer"
            >
              <FiSend size={16} />
              <span>Submit Register</span>
            </button>
          </div>
        </div>
      ) : (
        /* Attendance Submitted View (Image 2) */
        <div className="flex flex-col items-center justify-center min-h-[70vh] text-center my-auto px-4">
          {/* Glowing Green Check Circle */}
          <div className="w-20 h-20 rounded-full bg-[#064E3B]/60 border border-[#10B981]/40 flex items-center justify-center mb-6 shadow-lg">
            <FiCheckCircle className="text-[#34D399]" size={48} />
          </div>

          <h2 className="text-[28px] font-bold text-white leading-tight mb-2">
            Attendance Submitted!
          </h2>

          <p className="text-[14px] text-[#94A3B8] font-medium mb-3">
            Register for <strong className="text-white font-bold">{selectedSquad}</strong> has been saved successfully.
          </p>

          {/* Summary Count Breakdown */}
          <div className="flex items-center gap-2 text-[14px] font-bold mb-6">
            <span className="text-[#34D399]">{presentCount} Present</span>
            <span className="text-[#64748B]">•</span>
            <span className="text-[#FBBF24]">{lateCount} Late</span>
            <span className="text-[#64748B]">•</span>
            <span className="text-[#F87171]">{absentCount} Absent</span>
            <span className="text-[#64748B]">•</span>
            <span className="text-[#F97316]">{injuredCount} Injured</span>
          </div>

          {/* Parent Notification Pill */}
          <div className="bg-[#0B1B38] border border-[#162E58] text-[#94A3B8] px-6 py-2.5 rounded-full text-[13px] font-medium mb-8 shadow-xs">
            📱 Parent notifications will be sent automatically within 2 minutes.
          </div>

          {/* Take Another Register Button */}
          <button
            onClick={() => setSubmitted(false)}
            className="bg-gradient-to-b from-[#1E4ED8] to-[#0F2B8D] hover:opacity-95 text-white font-bold px-7 py-3 rounded-full flex items-center gap-2.5 shadow-md transition-all cursor-pointer"
          >
            <FiRotateCcw size={16} />
            <span>Take Another Register</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default Attendance;
