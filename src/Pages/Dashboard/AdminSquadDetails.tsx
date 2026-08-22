import { useState } from "react";
import { FiChevronLeft, FiSearch, FiEye, FiFileText, FiActivity, FiTarget } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { Modal, message } from "antd";

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

const mockPlayersData: Player[] = [
  {
    id: 1,
    initials: "JM",
    name: "James Mitchell",
    position: "ST",
    age: 15,
    attendanceRate: 94,
    score: 8.2,
    avatarColor: "bg-[#1D4ED8]",
  },
  {
    id: 2,
    initials: "MV",
    name: "Marcus Vance",
    position: "CM",
    age: 15,
    attendanceRate: 91,
    score: 8.5,
    avatarColor: "bg-[#7C3AED]",
  },
  {
    id: 3,
    initials: "DP",
    name: "Daniel Petrov",
    position: "CB",
    age: 16,
    attendanceRate: 96,
    score: 8.8,
    avatarColor: "bg-[#059669]",
  },
  {
    id: 4,
    initials: "KA",
    name: "Kofi Asante",
    position: "RW",
    age: 15,
    attendanceRate: 89,
    score: 8.1,
    avatarColor: "bg-[#D97706]",
  },
  {
    id: 5,
    initials: "LF",
    name: "Luca Fernandez",
    position: "LB",
    age: 14,
    attendanceRate: 92,
    score: 7.9,
    avatarColor: "bg-[#DB2777]",
  },
  {
    id: 6,
    initials: "EN",
    name: "Ethan Nwosu",
    position: "CAM",
    age: 15,
    attendanceRate: 95,
    score: 8.7,
    avatarColor: "bg-[#2563EB]",
  },
  {
    id: 7,
    initials: "OW",
    name: "Oliver Wright",
    position: "GK",
    age: 16,
    attendanceRate: 90,
    score: 8.4,
    avatarColor: "bg-[#4F46E5]",
  },
  {
    id: 8,
    initials: "TT",
    name: "Tyler Brooks",
    position: "CDM",
    age: 15,
    attendanceRate: 88,
    score: 7.8,
    avatarColor: "bg-[#0891B2]",
  },
];

const AdminSquadDetails = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [activeModal, setActiveModal] = useState<{
    type: "note" | "assess" | "target" | "view" | null;
    player: Player | null;
  }>({ type: null, player: null });

  const [modalInput, setModalInput] = useState("");

  const filteredPlayers = mockPlayersData.filter((player) => {
    const term = searchTerm.toLowerCase();
    return (
      player.name.toLowerCase().includes(term) ||
      player.position.toLowerCase().includes(term) ||
      player.age.toString().includes(term)
    );
  });

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

  return (
    <div className="flex flex-col h-full bg-[#f8faff] p-6 pb-12 overflow-y-auto">
      {/* Back Link */}
      <button
        onClick={() => navigate("/squads")}
        className="flex items-center gap-1.5 text-[13px] font-semibold text-gray-500 hover:text-gray-900 mb-4 transition-colors cursor-pointer w-fit"
      >
        <FiChevronLeft size={16} />
        <span>"U16 Futsal Fridays" Details</span>
      </button>

      {/* Top Header & Metrics Section */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-8">
        {/* Left Squad Meta Details */}
        <div className="flex flex-col">
          <div className="flex items-center gap-3">
            <h1 className="text-[26px] font-bold text-gray-900 leading-tight">
              U16 Futsal Fridays
            </h1>
            <div className="flex items-center gap-1.5 bg-white border border-gray-200 px-3 py-1 rounded-full shadow-sm">
              <span className="text-[10px] font-bold text-gray-400 uppercase">Age Group</span>
              <span className="text-[12px] font-bold text-gray-900">U10_15</span>
            </div>
          </div>

          <span className="text-[13px] font-medium text-gray-500 mt-1">
            Max Player: 25
          </span>

          <div className="flex flex-wrap items-center gap-6 mt-3 text-[13px]">
            <div className="flex items-center gap-1.5">
              <span className="text-gray-400 font-medium">Day</span>
              <span className="text-gray-900 font-bold">Tue / Thu / Sat</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-gray-400 font-medium">Time</span>
              <span className="text-[#10B981] font-bold">3PM -3:45 PM</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-gray-400 font-medium">Location</span>
              <span className="text-[#10B981] font-bold">
                Greenfield International School - Indoors
              </span>
            </div>
          </div>
        </div>

        {/* Right Summary Metric Cards */}
        <div className="flex items-center gap-4 shrink-0">
          <div className="bg-white border border-gray-100 rounded-2xl p-5 w-40 flex flex-col items-center justify-center text-center shadow-sm">
            <span className="text-[11px] font-bold text-gray-400 tracking-wider uppercase">
              PLAYERS
            </span>
            <span className="text-[28px] font-bold text-gray-900 leading-none mt-2">
              18
            </span>
          </div>

          <div className="bg-white border border-gray-100 rounded-2xl p-5 w-40 flex flex-col items-center justify-center text-center shadow-sm">
            <span className="text-[11px] font-bold text-gray-400 tracking-wider uppercase">
              ATTENDANCE
            </span>
            <span className="text-[28px] font-bold text-gray-900 leading-none mt-2">
              92%
            </span>
          </div>
        </div>
      </div>

      {/* Search Input Bar */}
      <div className="relative w-full mb-6">
        <FiSearch
          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          size={18}
        />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search players..."
          className="w-full pl-11 pr-5 py-3 rounded-full border border-gray-200 text-[14px] font-medium text-gray-900 placeholder-gray-400 bg-white focus:outline-none focus:border-blue-500 shadow-sm transition-colors"
        />
      </div>

      {/* Players List Table Card */}
      <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm flex flex-col">
        {/* Table Header Row */}
        <div className="grid grid-cols-8 gap-4 px-4 py-3 border-b border-gray-100 text-[11px] font-bold text-gray-400 tracking-wider uppercase mb-2">
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
                className="grid grid-cols-8 gap-4 items-center px-4 py-3.5 border-b border-gray-50 hover:bg-gray-50 rounded-xl transition-colors"
              >
                {/* Player Name & Avatar */}
                <div className="col-span-3 flex items-center gap-3">
                  <div
                    className={`w-9 h-9 rounded-full ${player.avatarColor} text-white font-bold text-[13px] flex items-center justify-center shrink-0 shadow-xs`}
                  >
                    {player.initials}
                  </div>
                  <span className="text-[14px] font-bold text-gray-900 truncate">
                    {player.name}
                  </span>
                </div>

                {/* Position Badge */}
                <div className="col-span-1 flex justify-center">
                  <span className="bg-blue-50 text-blue-600 border border-blue-200 font-bold px-3 py-1 rounded-full text-[11px]">
                    {player.position}
                  </span>
                </div>

                {/* Age */}
                <div className="col-span-1 text-center text-[14px] font-bold text-gray-600">
                  {player.age}
                </div>

                {/* Attendance Rate */}
                <div className="col-span-2 flex items-center gap-3">
                  <div className="w-24 bg-gray-100 h-1.5 rounded-full overflow-hidden shrink-0">
                    <div
                      className="h-full bg-[#10B981] rounded-full"
                      style={{ width: `${player.attendanceRate}%` }}
                    />
                  </div>
                  <span className="text-[12px] font-bold text-gray-900">
                    {player.attendanceRate}%
                  </span>
                </div>

                {/* Score */}
                <div className="col-span-1 text-center text-[14px] font-bold text-[#10B981]">
                  {player.score.toFixed(1)}
                </div>
              </div>
            ))
          ) : (
            <div className="py-12 text-center text-gray-500 text-[14px]">
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

export default AdminSquadDetails;
