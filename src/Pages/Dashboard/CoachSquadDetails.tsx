import { useState } from "react";
import { FiChevronLeft, FiSearch } from "react-icons/fi";
import { useNavigate, useParams } from "react-router-dom";
import { Modal, message, Spin } from "antd";
import { useGetSquadByIdQuery } from "@/redux/apiSlices/squadSlice";
import { useGetPlayersQuery } from "@/redux/apiSlices/playerSlice";
import moment from "moment";

interface Player {
  id: number;
  initials: string;
  name: string;
  position: string;
  age: number;
  attendanceRate: number;
  score: number;
  avatarColor: string;
}

const avatarColors = [
  "bg-[#1D4ED8]",
  "bg-[#7C3AED]",
  "bg-[#059669]",
  "bg-[#D97706]",
  "bg-[#DB2777]",
  "bg-[#2563EB]",
  "bg-[#4F46E5]",
  "bg-[#0891B2]",
];

const CoachSquadDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const { data: squad, isLoading: isSquadLoading } = useGetSquadByIdQuery(id as string, {
    skip: !id,
  });

  const { data: playersResponse, isLoading: isPlayersLoading } = useGetPlayersQuery({ squadId: id, limit: 100 }, {
    skip: !id,
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [activeModal, setActiveModal] = useState<{
    type: "note" | "assess" | "target" | "view" | null;
    player: Player | null;
  }>({ type: null, player: null });

  const [modalInput, setModalInput] = useState("");

  const playersList = playersResponse?.data || [];
  const dynamicPlayers: Player[] = playersList.map((p: any, index: number) => {
    const name = p.fullName || p.name || `${p.firstName || ''} ${p.lastName || ''}`.trim() || 'Unknown';
    const initials = (p.firstName && p.lastName)
      ? `${p.firstName[0]}${p.lastName[0]}`.toUpperCase()
      : name.substring(0, 2).toUpperCase();

    return {
      id: p._id || index,
      initials,
      name,
      position: p.playingPosition || p.position || 'N/A',
      age: p.age || p.ageGroup || 'N/A',
      attendanceRate: parseInt(String(p.attendanceRate || '0').replace(/\D/g, ''), 10) || 0,
      score: p.overallScore || p.score || 0,
      avatarColor: avatarColors[index % avatarColors.length]
    };
  });

  const filteredPlayers = dynamicPlayers.filter((player: Player) => {
    const term = searchTerm.toLowerCase();
    return (
      player.name.toLowerCase().includes(term) ||
      player.position.toLowerCase().includes(term) ||
      player.age.toString().includes(term)
    );
  });

  const averageAttendance = dynamicPlayers.length > 0
    ? Math.round(dynamicPlayers.reduce((sum, p) => sum + p.attendanceRate, 0) / dynamicPlayers.length)
    : 0;

  const handleActionSubmit = () => {
    if (!activeModal.player) return;
    if (activeModal.type === "note") {
      message.success(`Session note added for ${activeModal.player.name}`);
    } else if (activeModal.type === "assess") {
      message.success(`Assessment updated for ${activeModal.player.name}`);
    } else if (activeModal.type === "target") {
      message.success(`Target created for ${activeModal.player.name}`);
    }
    setActiveModal({ type: null, player: null });
    setModalInput("");
  };

  if (isSquadLoading || isPlayersLoading) {
    return <div className="flex items-center justify-center h-full"><Spin size="large" /></div>;
  }

  if (!squad) {
    return <div className="flex items-center justify-center h-full text-white">Squad not found</div>;
  }

  return (
    <div className="flex flex-col h-full bg-[#050E21] p-6 pb-12 overflow-y-auto">
      {/* Back Link */}
      <button
        onClick={() => navigate("/squads")}
        className="flex items-center gap-1.5 text-[13px] font-semibold text-[#94A3B8] hover:text-white mb-4 transition-colors cursor-pointer w-fit"
      >
        <FiChevronLeft size={16} />
        <span>"{squad?.name || "Squad"}" Details</span>
      </button>

      {/* Top Header & Metrics Section */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-8">
        {/* Left Squad Meta Details */}
        <div className="flex flex-col">
          <div className="flex items-center gap-3">
            <h1 className="text-[26px] font-bold text-white leading-tight">
              {squad?.name || "N/A"}
            </h1>
            <div className="flex items-center gap-1.5 bg-[#0B1B38] border border-[#162E58] px-3 py-1 rounded-full">
              <span className="text-[10px] font-bold text-[#64748B] uppercase">Age Group</span>
              <span className="text-[12px] font-bold text-white">{squad?.ageGroupId?.name || "N/A"}</span>
            </div>
          </div>

          <span className="text-[13px] font-medium text-[#94A3B8] mt-1">
            Max Player: {squad?.maxPlayers || 0}
          </span>

          <div className="flex flex-wrap items-center gap-6 mt-3 text-[13px]">
            <div className="flex items-center gap-1.5">
              <span className="text-[#64748B] font-medium">Day</span>
              <span className="text-white font-bold">{squad?.trainingDays?.join(" / ") || "N/A"}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-[#64748B] font-medium">Time</span>
              <span className="text-[#34D399] font-bold">
                {squad?.sessionStartTime ? moment(squad.sessionStartTime, 'HH:mm').format('h:mm A') : "N/A"} - {squad?.sessionEndTime ? moment(squad.sessionEndTime, 'HH:mm').format('h:mm A') : "N/A"}
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-[#64748B] font-medium">Location</span>
              <span className="text-[#34D399] font-bold">
                {squad?.trainingVenue || "N/A"}
              </span>
            </div>
          </div>
        </div>

        {/* Right Summary Metric Cards */}
        <div className="flex items-center gap-4 shrink-0">
          <div className="bg-[#0B1B38] border border-[#162E58] rounded-2xl p-5 w-40 flex flex-col items-center justify-center text-center shadow-sm">
            <span className="text-[11px] font-bold text-[#64748B] tracking-wider uppercase">
              PLAYERS
            </span>
            <span className="text-[28px] font-bold text-white leading-none mt-2">
              {dynamicPlayers.length}
            </span>
          </div>

          <div className="bg-[#0B1B38] border border-[#162E58] rounded-2xl p-5 w-40 flex flex-col items-center justify-center text-center shadow-sm">
            <span className="text-[11px] font-bold text-[#64748B] tracking-wider uppercase">
              ATTENDANCE
            </span>
            <span className="text-[28px] font-bold text-white leading-none mt-2">
              {averageAttendance}%
            </span>
          </div>
        </div>
      </div>

      {/* Search Input Bar */}
      <div className="relative w-full mb-6">
        <FiSearch
          className="absolute left-4 top-1/2 -translate-y-1/2 text-[#64748B]"
          size={18}
        />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search players..."
          className="w-full pl-11 pr-5 py-3 rounded-full border border-[#162E58] text-[14px] font-medium text-white placeholder-[#64748B] bg-[#0B1B38] focus:outline-none focus:border-[#3B82F6] shadow-sm transition-colors"
        />
      </div>

      {/* Players List Table Card */}
      <div className="bg-[#0B1B38] border border-[#162E58] rounded-2xl p-6 shadow-sm flex flex-col">
        {/* Table Header Row */}
        <div className="grid grid-cols-8 gap-4 px-4 py-3 border-b border-[#162E58] text-[11px] font-bold text-[#64748B] tracking-wider uppercase mb-2">
          <div className="col-span-3">PLAYER</div>
          <div className="col-span-1 text-center">POSITION</div>
          <div className="col-span-1 text-center">AGE</div>
          <div className="col-span-2">ATTENDANCE</div>
          <div className="col-span-1 text-center">SCORE</div>
        </div>

        {/* Player Item Rows */}
        <div className="flex flex-col gap-2">
          {filteredPlayers.length > 0 ? (
            filteredPlayers.map((player) => (
              <div
                key={player.id}
                className="grid grid-cols-8 gap-4 items-center px-4 py-3.5 border-b border-[#0B1B38] hover:bg-[#0B1B38] rounded-xl transition-colors"
              >
                {/* Player Name & Avatar */}
                <div className="col-span-3 flex items-center gap-3">
                  <div
                    className={`w-9 h-9 rounded-full ${player.avatarColor} text-white font-bold text-[13px] flex items-center justify-center shrink-0 shadow-xs`}
                  >
                    {player.initials}
                  </div>
                  <span className="text-[14px] font-bold text-white truncate">
                    {player.name}
                  </span>
                </div>

                {/* Position Badge */}
                <div className="col-span-1 flex justify-center">
                  <span className="bg-[#1E3A8A]/60 text-[#60A5FA] border border-[#2563EB]/40 font-bold px-3 py-1 rounded-full text-[11px]">
                    {player.position}
                  </span>
                </div>

                {/* Age */}
                <div className="col-span-1 text-center text-[14px] font-bold text-gray-300">
                  {player.age}
                </div>

                {/* Attendance Rate */}
                <div className="col-span-2 flex items-center gap-3">
                  <div className="w-24 bg-[#162E58] h-1.5 rounded-full overflow-hidden shrink-0">
                    <div
                      className="h-full bg-[#10B981] rounded-full"
                      style={{ width: `${player.attendanceRate}%` }}
                    />
                  </div>
                  <span className="text-[12px] font-bold text-white">
                    {player.attendanceRate}%
                  </span>
                </div>

                {/* Score */}
                <div className="col-span-1 text-center text-[14px] font-bold text-[#10B981]">
                  {typeof player.score === 'number' ? player.score.toFixed(1) : player.score}
                </div>
              </div>
            ))
          ) : (
            <div className="py-12 text-center text-[#94A3B8] text-[14px]">
              No players found matching "{searchTerm}".
            </div>
          )}
        </div>
      </div>

      {/* Action Modals */}
      <Modal
        title={
          activeModal.type === "view"
            ? `Player Details - ${activeModal.player?.name}`
            : activeModal.type === "note"
              ? `Add Session Note for ${activeModal.player?.name}`
              : activeModal.type === "assess"
                ? `Assess ${activeModal.player?.name}`
                : `Set Target for ${activeModal.player?.name}`
        }
        open={!!activeModal.type}
        onOk={handleActionSubmit}
        onCancel={() => setActiveModal({ type: null, player: null })}
        okText={activeModal.type === "view" ? "Close" : "Submit"}
        okButtonProps={{ className: "bg-[#1239D4]" }}
        centered
      >
        {activeModal.type === "view" && activeModal.player && (
          <div className="flex flex-col gap-3 py-3">
            <div className="flex items-center gap-3">
              <div
                className={`w-12 h-12 rounded-full ${activeModal.player.avatarColor} text-white font-bold text-[16px] flex items-center justify-center`}
              >
                {activeModal.player.initials}
              </div>
              <div className="flex flex-col">
                <h4 className="text-[16px] font-bold text-gray-900">
                  {activeModal.player.name}
                </h4>
                <span className="text-[13px] text-gray-500 font-medium">
                  Position: {activeModal.player.position} | Age: {activeModal.player.age}
                </span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-2 bg-gray-50 p-4 rounded-xl">
              <div>
                <span className="text-[12px] text-gray-400 font-bold block uppercase">
                  Attendance Rate
                </span>
                <span className="text-[18px] font-bold text-gray-900">
                  {activeModal.player.attendanceRate}%
                </span>
              </div>
              <div>
                <span className="text-[12px] text-gray-400 font-bold block uppercase">
                  Performance Score
                </span>
                <span className="text-[18px] font-bold text-[#10B981]">
                  {activeModal.player.score} / 10
                </span>
              </div>
            </div>
          </div>
        )}

        {activeModal.type !== "view" && activeModal.player && (
          <div className="flex flex-col gap-3 py-3">
            <label className="text-[13px] font-bold text-gray-800">
              {activeModal.type === "note"
                ? "Enter Observation / Feedback Note:"
                : activeModal.type === "assess"
                  ? "Enter Assessment Rating / Comments:"
                  : "Enter Development Target Goal:"}
            </label>
            <textarea
              rows={4}
              value={modalInput}
              onChange={(e) => setModalInput(e.target.value)}
              placeholder="Type your notes here..."
              className="w-full p-3 border border-gray-200 rounded-xl text-[14px] focus:outline-none focus:border-blue-500"
            />
          </div>
        )}
      </Modal>
    </div>
  );
};

export default CoachSquadDetails;
