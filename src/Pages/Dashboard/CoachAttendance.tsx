import { useState, useEffect } from "react";
import { FiCalendar, FiSearch, FiCheckCircle, FiSend, FiRotateCcw } from "react-icons/fi";
import { jwtDecode } from "jwt-decode";
import { message, Spin, DatePicker } from "antd";
import dayjs from "dayjs";
import { useGetMySquadsQuery } from "@/redux/apiSlices/squadSlice";
import { useSubmitAttendanceMutation, useGetSquadAttendanceRegisterQuery } from "@/redux/apiSlices/dashboardSlice";
import { imageUrl } from "@/redux/api/baseApi";

interface JwtPayload {
  role?: string;
}

type AttendanceStatus = "P" | "L" | "A" | "I";

const getInitials = (name: string) => {
  if (!name) return "??";
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .substring(0, 2)
    .toUpperCase();
};

const mapStatusToCode = (status: string): AttendanceStatus => {
  switch (status?.toLowerCase()) {
    case 'present': return 'P';
    case 'late': return 'L';
    case 'absent': return 'A';
    case 'injured': return 'I';
    default: return 'P';
  }
};

const Attendance = () => {
  const [isCoach, setIsCoach] = useState(false);
  const [selectedDate, setSelectedDate] = useState(dayjs().format('DD MMM YYYY'));
  const [selectedSquad, setSelectedSquad] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [statusMap, setStatusMap] = useState<Record<string, AttendanceStatus>>({});

  const formattedDate = dayjs(selectedDate, "DD MMM YYYY").format("YYYY-MM-DD");

  // API Queries
  const { data: mySquads, isLoading: isLoadingSquads } = useGetMySquadsQuery(undefined);
  
  const { data: attendanceData, isLoading: isLoadingPlayers, isFetching } = useGetSquadAttendanceRegisterQuery(
    { squadId: selectedSquad, date: formattedDate }, 
    { skip: !selectedSquad || !formattedDate }
  );
  const players = attendanceData?.players || [];

  const [submitAttendance, { isLoading: isSubmitting }] = useSubmitAttendanceMutation();

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

  // Set default squad when squads load
  useEffect(() => {
    if (mySquads?.length > 0 && !selectedSquad) {
      setSelectedSquad(mySquads[0]._id);
    }
  }, [mySquads, selectedSquad]);

  // Initialize statusMap when players load from API
  useEffect(() => {
    if (players?.length > 0) {
      const initialMap: Record<string, AttendanceStatus> = {};
      players.forEach((p: any) => {
        initialMap[p._id] = mapStatusToCode(p.attendance || p.status || p.currentStatus);
      });
      setStatusMap(initialMap);
    } else {
      setStatusMap({});
    }
  }, [attendanceData, players]); // Depend on attendanceData and players so it re-initializes when data changes

  const handleSquadChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSquad(e.target.value);
    setStatusMap({});
    setSearchQuery("");
  };

  const handleStatusChange = (id: string, status: AttendanceStatus) => {
    setStatusMap((prev) => ({ ...prev, [id]: status }));
  };

  const handleMarkAllPresent = () => {
    if (!players) return;
    const updated: Record<string, AttendanceStatus> = {};
    players.forEach((p: any) => {
      updated[p._id] = "P";
    });
    setStatusMap(updated);
    message.success("All players marked as Present");
  };

  const handleSubmitRegister = async () => {
    if (!players || players.length === 0) {
      message.error("No players to submit attendance for.");
      return;
    }

    const records = players.map((p: any) => {
      const s = statusMap[p._id];
      let status = "Present";
      if (s === "L") status = "Late";
      if (s === "A") status = "Absent";
      if (s === "I") status = "Injured";
      return {
        playerId: p._id, // Notice: The API needs playerId: string inside records. p._id maps to the user id, which is correct based on original implementation. 
        status,
        remarks: ""
      };
    });

    try {
      await submitAttendance({ squadId: selectedSquad, date: formattedDate, records }).unwrap();
      setSubmitted(true);
      message.success("Attendance submitted successfully!");
    } catch (err) {
      message.error("Failed to submit attendance. Please try again.");
      console.error(err);
    }
  };

  // Filter roster by search
  const filteredRoster = (players || []).filter((player: any) => {
    const term = searchQuery.toLowerCase();
    const name = player.fullName || `${player.firstName} ${player.lastName}`;
    const details = player.playingPosition || "";
    return (
      name.toLowerCase().includes(term) ||
      details.toLowerCase().includes(term)
    );
  });

  // Calculate Summary Counts
  const presentCount = Object.values(statusMap).filter((s) => s === "P").length;
  const lateCount = Object.values(statusMap).filter((s) => s === "L").length;
  const absentCount = Object.values(statusMap).filter((s) => s === "A").length;
  const injuredCount = Object.values(statusMap).filter((s) => s === "I").length;

  const selectedSquadName = mySquads?.find((s: any) => s._id === selectedSquad)?.name || "Squad";
  const selectedAgeGroup = mySquads?.find((s: any) => s._id === selectedSquad)?.ageGroupId?.name?.split('_')[0] || "";

  return (
    <div
      className={`flex flex-col h-full p-6 pb-12 overflow-y-auto relative ${
        isCoach ? "bg-[#050E21]" : "bg-[#f8faff]" // Light theme applied for Admin, Dark for Coach
      }`}
    >
      {(isLoadingSquads) && (
        <div className="absolute inset-0 bg-[#050E21]/80 z-50 flex items-center justify-center">
          <Spin size="large" />
        </div>
      )}

      {!submitted ? (
        /* Register Taking View */
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex flex-col mb-6">
            <h1 className={`text-[24px] font-bold leading-tight ${isCoach ? 'text-white' : 'text-gray-900'}`}>Attendance</h1>
            <p className={`text-[14px] font-medium mt-1 ${isCoach ? 'text-[#94A3B8]' : 'text-gray-500'}`}>
              Take register for your squads
            </p>
          </div>

          {/* Controls Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            {/* Left Controls: Date, Squad, Search */}
            <div className="flex flex-wrap items-center gap-3">
              <style>{`
                /* Picker Input Styles */
                .dark-picker { background-color: #0B1B38 !important; border-color: #162E58 !important; }
                .dark-picker:hover, .dark-picker.ant-picker-focused { background-color: #0B1B38 !important; border-color: #3B82F6 !important; }
                .dark-picker .ant-picker-input > input { color: white !important; font-weight: bold; font-size: 13px; }
                .dark-picker .ant-picker-suffix { color: #60A5FA !important; }
                .dark-picker .ant-picker-clear { background: #0B1B38; color: white; }
                
                .light-picker .ant-picker-input > input { color: #111827 !important; font-weight: bold; font-size: 13px; }
                
                /* Popup Calendar Dark Theme Styles */
                .dark-calendar-popup .ant-picker-panel-container, .dark-calendar-popup .ant-picker-panel {
                  background-color: #0B1B38 !important;
                  border: 1px solid #162E58 !important;
                }
                .dark-calendar-popup .ant-picker-header {
                  color: white !important;
                  border-bottom: 1px solid #162E58 !important;
                }
                .dark-calendar-popup .ant-picker-header button { color: #94A3B8 !important; }
                .dark-calendar-popup .ant-picker-header button:hover { color: white !important; }
                .dark-calendar-popup .ant-picker-content th { color: #94A3B8 !important; }
                .dark-calendar-popup .ant-picker-cell { color: #64748B !important; }
                .dark-calendar-popup .ant-picker-cell-in-view { color: white !important; }
                .dark-calendar-popup .ant-picker-cell-in-view.ant-picker-cell-today .ant-picker-cell-inner::before {
                  border-color: #3B82F6 !important;
                }
                .dark-calendar-popup .ant-picker-cell:hover:not(.ant-picker-cell-selected) .ant-picker-cell-inner {
                  background-color: #162E58 !important;
                }
                .dark-calendar-popup .ant-picker-cell-selected .ant-picker-cell-inner {
                  background-color: #3B82F6 !important;
                  color: white !important;
                }
                .dark-calendar-popup .ant-picker-footer {
                  border-top: 1px solid #162E58 !important;
                  background-color: #0B1B38 !important;
                }
                .dark-calendar-popup .ant-picker-today-btn { color: #60A5FA !important; }
              `}</style>
              {/* Date Button */}
              <DatePicker 
                defaultValue={dayjs()} 
                format="DD MMM YYYY"
                allowClear={false}
                className={`${isCoach ? 'dark-picker' : 'bg-white border-gray-200 light-picker'} border px-4 py-2 rounded-xl shadow-xs cursor-pointer min-w-[140px]`}
                popupClassName={isCoach ? "dark-calendar-popup" : ""}
                suffixIcon={<FiCalendar className="text-[#60A5FA]" size={15} />}
                onChange={(date) => setSelectedDate(date ? date.format('DD MMM YYYY') : '')}
                style={{ height: '38px' }}
              />

              {/* Squad Selector Dropdown */}
              <div className="relative">
                <select
                  value={selectedSquad}
                  onChange={handleSquadChange}
                  className={`${isCoach ? 'bg-[#0B1B38] text-white border-[#162E58]' : 'bg-white text-gray-900 border-gray-200'} border px-4 py-2 pr-8 rounded-xl text-[13px] font-bold focus:outline-none focus:border-blue-500 appearance-none cursor-pointer shadow-xs max-w-[250px]`}
                >
                  {mySquads?.map((squad: any) => (
                    <option key={squad._id} value={squad._id}>
                      {squad.ageGroupId?.name?.split('_')[0]} {squad.name}
                    </option>
                  ))}
                  {(!mySquads || mySquads.length === 0) && (
                    <option value="">No squads available</option>
                  )}
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
                  className={`${isCoach ? 'bg-[#0B1B38] text-white border-[#162E58]' : 'bg-white text-gray-900 border-gray-200'} border pl-9 pr-4 py-2 rounded-full text-[13px] placeholder-[#64748B] focus:outline-none focus:border-[#3B82F6] w-[220px] shadow-xs`}
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
          <div className={`relative ${isCoach ? 'bg-[#0B1B38] border-[#162E58]' : 'bg-white border-gray-100'} border rounded-2xl p-4 flex flex-col gap-3 shadow-sm mb-8 min-h-[300px]`}>
            {(isLoadingPlayers || isFetching) && (
              <div className="absolute inset-0 bg-[#0B1B38]/60 z-10 flex items-center justify-center rounded-2xl">
                <Spin />
              </div>
            )}
            
            {!isLoadingPlayers && !isFetching && filteredRoster.length === 0 && (
              <div className={`flex items-center justify-center h-40 ${isCoach ? 'text-gray-400' : 'text-gray-500'}`}>
                No players found.
              </div>
            )}

            {filteredRoster.map((player: any) => {
              const currentStatus = statusMap[player._id];
              const name = player.fullName || `${player.firstName} ${player.lastName}`;

              return (
                <div
                  key={player._id}
                  className={`${isCoach ? 'bg-[#07152F] border-[#162E58] hover:border-[#234580]' : 'bg-gray-50 border-gray-200 hover:border-gray-300'} border rounded-xl p-4 flex items-center justify-between transition-all`}
                >
                  {/* Left Side: Avatar & Name */}
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 shrink-0">
                      {player.image ? (
                        <img src={player.image.startsWith('http') ? player.image : `${imageUrl}${player.image}`} alt={name} className="w-full h-full object-cover rounded-full" />
                      ) : (
                        <div className="w-full h-full rounded-full bg-[#1E4ED8] text-white font-bold text-[13px] flex items-center justify-center shadow-xs">
                          {getInitials(name)}
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col">
                      <h3 className={`text-[15px] font-bold leading-tight ${isCoach ? 'text-white' : 'text-gray-900'}`}>
                        {name}
                      </h3>
                      <span className={`text-[12px] font-medium mt-0.5 ${isCoach ? 'text-[#94A3B8]' : 'text-gray-500'}`}>
                        {player.playingPosition}
                      </span>
                    </div>
                  </div>

                  {/* Right Side: Season Pill & Status Buttons */}
                  <div className="flex items-center gap-4">
                    <span className="bg-[#064E3B]/60 text-[#34D399] border border-[#059669]/40 px-3 py-1 rounded-full text-[12px] font-bold">
                      {player.seasonAttendanceRate !== undefined ? `${player.seasonAttendanceRate}%` : "0%"} season
                    </span>

                    {/* Status Toggles */}
                    <div className="flex items-center gap-2">
                      {/* P (Present) */}
                      <button
                        onClick={() => handleStatusChange(player._id, "P")}
                        className={`w-9 h-9 rounded-full font-bold text-[13px] flex items-center justify-center transition-all cursor-pointer ${
                          currentStatus === "P"
                            ? "bg-[#059669] text-white border-2 border-[#10B981] shadow-sm"
                            : `${isCoach ? 'border-[#162E58] text-[#64748B] hover:border-gray-500 hover:text-white' : 'border-gray-200 text-gray-400 hover:border-gray-400 hover:text-gray-800'} border`
                        }`}
                        title="Present"
                      >
                        P
                      </button>

                      {/* L (Late) */}
                      <button
                        onClick={() => handleStatusChange(player._id, "L")}
                        className={`w-9 h-9 rounded-full font-bold text-[13px] flex items-center justify-center transition-all cursor-pointer ${
                          currentStatus === "L"
                            ? "bg-[#D97706] text-white border-2 border-[#F59E0B] shadow-sm"
                            : `${isCoach ? 'border-[#162E58] text-[#64748B] hover:border-gray-500 hover:text-white' : 'border-gray-200 text-gray-400 hover:border-gray-400 hover:text-gray-800'} border`
                        }`}
                        title="Late"
                      >
                        L
                      </button>

                      {/* A (Absent) */}
                      <button
                        onClick={() => handleStatusChange(player._id, "A")}
                        className={`w-9 h-9 rounded-full font-bold text-[13px] flex items-center justify-center transition-all cursor-pointer ${
                          currentStatus === "A"
                            ? "bg-[#DC2626] text-white border-2 border-[#EF4444] shadow-sm"
                            : `${isCoach ? 'border-[#162E58] text-[#64748B] hover:border-gray-500 hover:text-white' : 'border-gray-200 text-gray-400 hover:border-gray-400 hover:text-gray-800'} border`
                        }`}
                        title="Absent"
                      >
                        A
                      </button>

                      {/* I (Injured) */}
                      <button
                        onClick={() => handleStatusChange(player._id, "I")}
                        className={`w-9 h-9 rounded-full font-bold text-[13px] flex items-center justify-center transition-all cursor-pointer ${
                          currentStatus === "I"
                            ? "bg-[#EA580C] text-white border-2 border-[#F97316] shadow-sm"
                            : `${isCoach ? 'border-[#162E58] text-[#64748B] hover:border-gray-500 hover:text-white' : 'border-gray-200 text-gray-400 hover:border-gray-400 hover:text-gray-800'} border`
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
              disabled={players?.length === 0 || isSubmitting}
              className="bg-gradient-to-b from-[#1E4ED8] to-[#0F2B8D] disabled:opacity-50 hover:opacity-95 text-white font-bold px-7 py-3 rounded-full flex items-center gap-2 shadow-md transition-all cursor-pointer"
            >
              {isSubmitting ? <Spin size="small" /> : <FiSend size={16} />}
              <span>{isSubmitting ? 'Submitting...' : 'Submit Register'}</span>
            </button>
          </div>
        </div>
      ) : (
        /* Attendance Submitted View */
        <div className="flex flex-col items-center justify-center min-h-[70vh] text-center my-auto px-4">
          {/* Glowing Green Check Circle */}
          <div className="w-20 h-20 rounded-full bg-[#064E3B]/60 border border-[#10B981]/40 flex items-center justify-center mb-6 shadow-lg">
            <FiCheckCircle className="text-[#34D399]" size={48} />
          </div>

          <h2 className={`text-[28px] font-bold leading-tight mb-2 ${isCoach ? 'text-white' : 'text-gray-900'}`}>
            Attendance Submitted!
          </h2>

          <p className={`text-[14px] font-medium mb-3 ${isCoach ? 'text-[#94A3B8]' : 'text-gray-500'}`}>
            Register for <strong className={`${isCoach ? 'text-white' : 'text-gray-800'} font-bold`}>{selectedAgeGroup} {selectedSquadName}</strong> has been saved successfully.
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
          <div className={`${isCoach ? 'bg-[#0B1B38] border-[#162E58] text-[#94A3B8]' : 'bg-blue-50 border-blue-100 text-blue-700'} border px-6 py-2.5 rounded-full text-[13px] font-medium mb-8 shadow-xs`}>
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
