import { useState, useEffect } from "react";
import { FiPlus, FiStar } from "react-icons/fi";
import { BiTrophy } from "react-icons/bi";
import { FaStar, FaMedal } from "react-icons/fa";
import { MdEmojiEvents } from "react-icons/md";
import { BsPinMap } from "react-icons/bs";
import { jwtDecode } from "jwt-decode";
import { message, Spin } from "antd";
import {
  useGetCoachAchievementsQuery,
  useGetCoachAchievementsSummaryQuery,
  useCreateCoachAchievementMutation
} from "@/redux/apiSlices/dashboardSlice";
import { useGetMySquadsQuery } from "@/redux/apiSlices/squadSlice";
import { useGetPlayersBySquadQuery } from "@/redux/apiSlices/playerSlice";

interface JwtPayload {
  role?: string;
}

const Achievements = () => {
  const [isCoach, setIsCoach] = useState(false);

  // Fetch APIs
  const { data: achievementsResponse, isLoading: isLoadingAchievements, refetch: refetchAchievements } = useGetCoachAchievementsQuery(undefined);
  const { data: summaryResponse, isLoading: isLoadingSummary, refetch: refetchSummary } = useGetCoachAchievementsSummaryQuery(undefined);
  const [createAchievement, { isLoading: isCreating }] = useCreateCoachAchievementMutation();

  const achievements = achievementsResponse || [];
  const summary = summaryResponse || {};

  // Squad and Player API for Modal
  const { data: mySquads } = useGetMySquadsQuery(undefined);

  // Modal State
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedSquad, setSelectedSquad] = useState("");
  const [selectedPlayer, setSelectedPlayer] = useState("");
  const [awardType, setAwardType] = useState("Player of the Match");
  const [matchEvent, setMatchEvent] = useState("");
  const [description, setDescription] = useState("");
  const [awardDate, setAwardDate] = useState(new Date().toISOString().split('T')[0]);

  const { data: players } = useGetPlayersBySquadQuery(selectedSquad, { skip: !selectedSquad });

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

  // Default squad
  useEffect(() => {
    if (mySquads?.length > 0 && !selectedSquad) {
      setSelectedSquad(mySquads[0]._id);
    }
  }, [mySquads, selectedSquad]);

  // Default player
  useEffect(() => {
    if (players?.length > 0) {
      const currentPlayerExists = players.find((p: any) => p._id === selectedPlayer);
      if (!currentPlayerExists) {
        setSelectedPlayer(players[0]._id);
      }
    } else {
      setSelectedPlayer("");
    }
  }, [players, selectedSquad]);

  const handleOpenAddModal = () => {
    if (mySquads?.length > 0) setSelectedSquad(mySquads[0]._id);
    setAwardType("Player of the Match");
    setMatchEvent("");
    setDescription("");
    setAwardDate(new Date().toISOString().split('T')[0]);
    setIsAddModalOpen(true);
  };

  const handleAddAchievement = async () => {
    if (!selectedPlayer) {
      message.error("Please select a player.");
      return;
    }
    if (!matchEvent.trim()) {
      message.error("Please enter a match or event name.");
      return;
    }
    if (!description.trim()) {
      message.error("Please enter a description.");
      return;
    }
    if (!awardDate) {
      message.error("Please select a date.");
      return;
    }

    try {
      await createAchievement({
        playerId: selectedPlayer,
        awardType,
        matchEvent,
        description,
        date: awardDate
      }).unwrap();

      message.success("Achievement added successfully!");
      setIsAddModalOpen(false);
      refetchAchievements();
      refetchSummary();
    } catch (error: any) {
      message.error(error.data?.message || "Failed to create achievement.");
    }
  };

  const renderTrophyIcon = (type: string) => {
    switch (type) {
      case "Player of the Match":
        return <BiTrophy className="text-[#EAB308]" size={26} />;
      case "Player of the Week":
        return <FaStar className="text-[#EAB308]" size={24} />;
      case "Academy Award":
        return <MdEmojiEvents className="text-[#EAB308]" size={26} />;
      case "Tournament Award":
        return <FaMedal className="text-[#EAB308]" size={24} />;
      case "Team Award":
        return <FaMedal className="text-[#EAB308]" size={24} />;
      case "Milestone":
        return <BsPinMap className="text-[#EAB308]" size={22} />;
      default:
        return <BiTrophy className="text-[#EAB308]" size={26} />;
    }
  };

  const getAvatarBg = (type: string) => {
    switch (type) {
      case "Player of the Match": return "bg-[#2563EB]";
      case "Player of the Week": return "bg-[#D97706]";
      case "Academy Award": return "bg-[#7C3AED]";
      case "Tournament Award": return "bg-[#9333EA]";
      case "Milestone": return "bg-[#0891B2]";
      case "Team Award": return "bg-[#059669]";
      default: return "bg-[#2563EB]";
    }
  };

  const metricsData = [
    { id: 1, label: "Total Awards", value: summary.total || 0, color: "text-[#FBBF24]" },
    { id: 2, label: "POM Awards", value: summary.pomCount || 0, color: "text-[#3B82F6]" },
    { id: 3, label: "Tournament", value: summary.tournamentCount || 0, color: "text-[#A855F7]" },
    { id: 4, label: "Academy Awards", value: summary.academyCount || 0, color: "text-[#10B981]" },
    { id: 5, label: "Team Awards", value: summary.teamCount || 0, color: "text-[#06B6D4]" },
    { id: 6, label: "Milestones", value: summary.milestoneCount || 0, color: "text-[#F59E0B]" },
  ];

  const isLoading = isLoadingAchievements || isLoadingSummary;

  return (
    <div
      className={`flex flex-col h-full p-6 pb-12 overflow-y-auto relative ${isCoach ? "bg-[#050E21]" : "bg-[#050E21]"
        }`}
    >
      {isLoading && (
        <div className="absolute inset-0 bg-[#050E21]/60 z-50 flex items-center justify-center">
          <Spin size="large" />
        </div>
      )}

      {/* Header & Add Action Button */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div>
          <h1 className="text-[24px] font-bold text-white leading-tight">Achievements</h1>
          <p className="text-[14px] text-[#94A3B8] font-medium mt-1">
            Celebrate player milestones and awards
          </p>
        </div>

        <button
          onClick={handleOpenAddModal}
          className="bg-gradient-to-b from-[#1E4ED8] to-[#0F2B8D] hover:opacity-95 text-white font-bold px-6 py-2.5 rounded-full flex items-center gap-2 text-[14px] shadow-md transition-all cursor-pointer border border-blue-400/20"
        >
          <FiPlus size={18} />
          <span>Add Achievement</span>
        </button>
      </div>

      {/* Metrics Summary Row (6 Cards) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
        {metricsData.map((m) => (
          <div
            key={m.id}
            className="bg-[#0B1B38] border border-[#162E58] rounded-2xl p-4 flex flex-col items-center justify-center text-center shadow-sm hover:border-[#234580] transition-all"
          >
            <span className="text-[11px] font-bold text-[#94A3B8] tracking-wider uppercase mb-1">
              {m.label}
            </span>
            <span className={`text-[24px] font-extrabold ${m.color} leading-none mt-1`}>
              {m.value}
            </span>
          </div>
        ))}
      </div>

      {/* Trophy Cabinet Section */}
      <div className="flex flex-col">
        <h2 className="text-[18px] font-bold text-white mb-4">Trophy Cabinet</h2>

        {achievements.length === 0 && !isLoading && (
          <p className="text-[#94A3B8] text-[14px]">No achievements found.</p>
        )}

        {/* 3-Column Trophy Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {achievements.map((item: any) => (
            <div
              key={item._id}
              className="bg-[#0B1B38] border border-[#162E58] rounded-2xl p-5 flex items-center justify-between shadow-sm hover:border-[#234580] transition-all"
            >
              {/* Left Side: Trophy Icon & Player Info */}
              <div className="flex items-center gap-4 min-w-0">
                <div className="w-14 h-14 rounded-2xl bg-[#EAB308]/15 border border-[#EAB308]/30 flex items-center justify-center shrink-0 shadow-xs">
                  {renderTrophyIcon(item.awardType)}
                </div>

                <div className="flex flex-col min-w-0">
                  <h3 className="text-[15px] font-bold text-white leading-tight truncate">
                    {item.awardType}
                  </h3>

                  <div className="flex items-center gap-2 mt-1">
                    <div
                      className={`w-6 h-6 rounded-full ${getAvatarBg(item.awardType)} text-white font-bold text-[10px] flex items-center justify-center shrink-0`}
                    >
                      {item.playerInitials}
                    </div>
                    <span className="text-[13px] font-bold text-[#94A3B8] truncate">
                      {item.playerName}
                    </span>
                  </div>

                  <span className="text-[12px] font-medium text-[#64748B] mt-1 truncate" title={item.matchEvent}>
                    {item.matchEvent}
                  </span>
                </div>
              </div>

              {/* Right Side: Date & Awarded Badge */}
              <div className="flex flex-col items-end shrink-0 self-start mt-0.5 ml-2">
                <span className="text-[12px] font-medium text-[#64748B] whitespace-nowrap">
                  {item.formattedDate}
                </span>
                <span className="text-[#F59E0B] font-bold text-[11px] flex items-center gap-1 mt-1">
                  <FiStar size={11} className="fill-[#F59E0B]" />
                  <span>Awarded</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Achievement Custom Dark Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-4">
          <div className="bg-[#0B1B38] border border-[#162E58] text-white rounded-2xl w-full max-w-md p-6 shadow-2xl flex flex-col relative max-h-[90vh] overflow-y-auto custom-scrollbar">
            {/* Header */}
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-[20px] font-bold text-white leading-tight">
                Add Achievement
              </h2>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="text-[#64748B] hover:text-white text-xl font-bold cursor-pointer transition-colors"
              >
                ✕
              </button>
            </div>

            <div className="flex flex-col gap-4">
              {/* Squad Dropdown */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[13px] font-bold text-white">Squad</label>
                <div className="relative">
                  <select
                    value={selectedSquad}
                    onChange={(e) => setSelectedSquad(e.target.value)}
                    className="bg-[#07152F] border border-[#162E58] text-white text-[13px] rounded-xl px-4 py-3 w-full appearance-none focus:outline-none focus:border-[#3B82F6] cursor-pointer"
                  >
                    {mySquads?.map((squad: any) => (
                      <option key={squad._id} value={squad._id}>
                        {squad.name}
                      </option>
                    ))}
                  </select>
                  <span className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 text-[10px]">
                    ▼
                  </span>
                </div>
              </div>

              {/* Player Dropdown */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[13px] font-bold text-white">Player</label>
                <div className="relative">
                  <select
                    value={selectedPlayer}
                    onChange={(e) => setSelectedPlayer(e.target.value)}
                    className="bg-[#07152F] border border-[#162E58] text-white text-[13px] rounded-xl px-4 py-3 w-full appearance-none focus:outline-none focus:border-[#3B82F6] cursor-pointer"
                  >
                    {players?.map((p: any) => (
                      <option key={p._id} value={p._id}>
                        {p.fullName || `${p.firstName} ${p.lastName}`}
                      </option>
                    ))}
                    {(!players || players.length === 0) && (
                      <option value="" disabled>No players</option>
                    )}
                  </select>
                  <span className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 text-[10px]">
                    ▼
                  </span>
                </div>
              </div>

              {/* Award Type Dropdown */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[13px] font-bold text-white">Award Type</label>
                <div className="relative">
                  <select
                    value={awardType}
                    onChange={(e) => setAwardType(e.target.value)}
                    className="bg-[#07152F] border border-[#162E58] text-white text-[13px] rounded-xl px-4 py-3 w-full appearance-none focus:outline-none focus:border-[#3B82F6] cursor-pointer"
                  >
                    <option value="Player of the Match">Player of the Match</option>
                    <option value="Player of the Week">Player of the Week</option>
                    <option value="Academy Award">Academy Award</option>
                    <option value="Tournament Award">Tournament Award</option>
                    <option value="Milestone">Milestone</option>
                    <option value="Team Award">Team Award</option>
                  </select>
                  <span className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 text-[10px]">
                    ▼
                  </span>
                </div>
              </div>

              {/* Match / Event */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[13px] font-bold text-white">Match / Event</label>
                <input
                  type="text"
                  value={matchEvent}
                  onChange={(e) => setMatchEvent(e.target.value)}
                  placeholder="Enter match or event name..."
                  className="bg-[#07152F] border border-[#162E58] text-white text-[13px] rounded-xl px-4 py-3 w-full placeholder-[#64748B] focus:outline-none focus:border-[#3B82F6] transition-colors"
                />
              </div>

              {/* Description */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[13px] font-bold text-white">Description</label>
                <input
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Enter description..."
                  className="bg-[#07152F] border border-[#162E58] text-white text-[13px] rounded-xl px-4 py-3 w-full placeholder-[#64748B] focus:outline-none focus:border-[#3B82F6] transition-colors"
                />
              </div>

              {/* Date Input */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[13px] font-bold text-white">Date</label>
                <input
                  type="date"
                  value={awardDate}
                  onChange={(e) => setAwardDate(e.target.value)}
                  className="bg-[#07152F] border border-[#162E58] text-white text-[13px] rounded-xl px-4 py-3 w-full focus:outline-none focus:border-[#3B82F6] cursor-pointer"
                />
              </div>

              {/* Bottom Action Buttons */}
              <div className="flex items-center gap-3 mt-3">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="w-1/2 border border-[#162E58] hover:border-gray-500 text-[#94A3B8] hover:text-white font-bold py-3 rounded-full text-[13px] transition-all cursor-pointer text-center"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleAddAchievement}
                  disabled={isCreating}
                  className="w-1/2 bg-gradient-to-b from-[#1E4ED8] to-[#0F2B8D] hover:opacity-95 disabled:opacity-50 text-white font-bold py-3 rounded-full text-[13px] shadow-md transition-all cursor-pointer flex justify-center items-center gap-2"
                >
                  {isCreating ? <Spin size="small" /> : "Add Achievement"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Achievements;
