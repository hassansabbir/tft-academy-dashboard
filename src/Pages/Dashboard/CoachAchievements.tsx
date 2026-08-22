import { useState, useEffect } from "react";
import { FiPlus, FiStar } from "react-icons/fi";
import { BiTrophy } from "react-icons/bi";
import { FaStar, FaMedal } from "react-icons/fa";
import { MdEmojiEvents } from "react-icons/md";
import { BsPinMap } from "react-icons/bs";
import { jwtDecode } from "jwt-decode";
import { message } from "antd";

interface JwtPayload {
  role?: string;
}

interface AchievementItem {
  id: number;
  iconType: "trophy" | "star" | "ribbon" | "medal" | "pin";
  title: string;
  playerInitials: string;
  playerName: string;
  playerAvatarBg: string;
  eventSubtitle: string;
  date: string;
}

const mockMetricsData = [
  { id: 1, label: "Total Awards", value: "24", color: "text-[#FBBF24]" },
  { id: 2, label: "POM Awards", value: "8", color: "text-[#3B82F6]" },
  { id: 3, label: "Tournament", value: "3", color: "text-[#A855F7]" },
  { id: 4, label: "Academy Awards", value: "5", color: "text-[#10B981]" },
  { id: 5, label: "Team Awards", value: "4", color: "text-[#06B6D4]" },
  { id: 6, label: "Milestones", value: "4", color: "text-[#F59E0B]" },
];

const mockTrophiesData: AchievementItem[] = [
  {
    id: 1,
    iconType: "trophy",
    title: "Player of the Match",
    playerInitials: "JM",
    playerName: "James Mitchell",
    playerAvatarBg: "bg-[#2563EB]",
    eventSubtitle: "vs Riverside FC",
    date: "Jan 18, 2025",
  },
  {
    id: 2,
    iconType: "star",
    title: "Player of the Week",
    playerInitials: "KR",
    playerName: "Kai Robertson",
    playerAvatarBg: "bg-[#D97706]",
    eventSubtitle: "Week 15 Training",
    date: "Jan 14, 2025",
  },
  {
    id: 3,
    iconType: "ribbon",
    title: "Academy Award",
    playerInitials: "LW",
    playerName: "Leon Williams",
    playerAvatarBg: "bg-[#7C3AED]",
    eventSubtitle: "Best Attitude Q4 2024",
    date: "Jan 05, 2025",
  },
  {
    id: 4,
    iconType: "medal",
    title: "Tournament Award",
    playerInitials: "EJ",
    playerName: "Ethan Jordan",
    playerAvatarBg: "bg-[#9333EA]",
    eventSubtitle: "City Cup Final",
    date: "Dec 22, 2024",
  },
  {
    id: 5,
    iconType: "pin",
    title: "Milestone",
    playerInitials: "NP",
    playerName: "Noah Patel",
    playerAvatarBg: "bg-[#0891B2]",
    eventSubtitle: "50 Academy Appearances",
    date: "Dec 15, 2024",
  },
  {
    id: 6,
    iconType: "medal",
    title: "Team Award",
    playerInitials: "TB",
    playerName: "Tyler Brooks",
    playerAvatarBg: "bg-[#059669]",
    eventSubtitle: "Defensive Player—Month",
    date: "Dec 10, 2024",
  },
];

const Achievements = () => {
  const [isCoach, setIsCoach] = useState(false);
  const [trophies, setTrophies] = useState<AchievementItem[]>(mockTrophiesData);

  // Modal State
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState("James Mitchell");
  const [awardType, setAwardType] = useState("Player of the Match");
  const [matchEvent, setMatchEvent] = useState("");
  const [description, setDescription] = useState("");
  const [awardDate, setAwardDate] = useState("2025-01-18");

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

  const handleAddAchievement = () => {
    const iconTypeMap: Record<string, AchievementItem["iconType"]> = {
      "Player of the Match": "trophy",
      "Player of the Week": "star",
      "Academy Award": "ribbon",
      "Tournament Award": "medal",
      Milestone: "pin",
      "Team Award": "medal",
    };

    const newObj: AchievementItem = {
      id: Date.now(),
      iconType: iconTypeMap[awardType] || "trophy",
      title: awardType,
      playerInitials: selectedPlayer
        .split(" ")
        .map((n) => n[0])
        .join(""),
      playerName: selectedPlayer,
      playerAvatarBg: "bg-[#2563EB]",
      eventSubtitle: matchEvent || "Academy Milestone",
      date: awardDate ? new Date(awardDate).toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" }) : "Jan 18, 2025",
    };

    setTrophies([newObj, ...trophies]);
    setIsAddModalOpen(false);
    setMatchEvent("");
    setDescription("");
    message.success("Achievement added successfully!");
  };

  const renderTrophyIcon = (type: AchievementItem["iconType"]) => {
    switch (type) {
      case "trophy":
        return <BiTrophy className="text-[#EAB308]" size={26} />;
      case "star":
        return <FaStar className="text-[#EAB308]" size={24} />;
      case "ribbon":
        return <MdEmojiEvents className="text-[#EAB308]" size={26} />;
      case "medal":
        return <FaMedal className="text-[#EAB308]" size={24} />;
      case "pin":
        return <BsPinMap className="text-[#EAB308]" size={22} />;
      default:
        return <BiTrophy className="text-[#EAB308]" size={26} />;
    }
  };

  return (
    <div
      className={`flex flex-col h-full p-6 pb-12 overflow-y-auto ${
        isCoach ? "bg-[#050E21]" : "bg-[#050E21]"
      }`}
    >
      {/* Header & Add Action Button */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div>
          <h1 className="text-[24px] font-bold text-white leading-tight">Achievements</h1>
          <p className="text-[14px] text-[#94A3B8] font-medium mt-1">
            Celebrate player milestones and awards
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="bg-gradient-to-b from-[#1E4ED8] to-[#0F2B8D] hover:opacity-95 text-white font-bold px-6 py-2.5 rounded-full flex items-center gap-2 text-[14px] shadow-md transition-all cursor-pointer border border-blue-400/20"
        >
          <FiPlus size={18} />
          <span>Add Achievement</span>
        </button>
      </div>

      {/* Metrics Summary Row (6 Cards) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
        {mockMetricsData.map((m) => (
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

        {/* 3-Column Trophy Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {trophies.map((item) => (
            <div
              key={item.id}
              className="bg-[#0B1B38] border border-[#162E58] rounded-2xl p-5 flex items-center justify-between shadow-sm hover:border-[#234580] transition-all"
            >
              {/* Left Side: Trophy Icon & Player Info */}
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-[#EAB308]/15 border border-[#EAB308]/30 flex items-center justify-center shrink-0 shadow-xs">
                  {renderTrophyIcon(item.iconType)}
                </div>

                <div className="flex flex-col">
                  <h3 className="text-[15px] font-bold text-white leading-tight">
                    {item.title}
                  </h3>

                  <div className="flex items-center gap-2 mt-1">
                    <div
                      className={`w-6 h-6 rounded-full ${item.playerAvatarBg} text-white font-bold text-[10px] flex items-center justify-center shrink-0`}
                    >
                      {item.playerInitials}
                    </div>
                    <span className="text-[13px] font-bold text-[#94A3B8] truncate">
                      {item.playerName}
                    </span>
                  </div>

                  <span className="text-[12px] font-medium text-[#64748B] mt-1">
                    {item.eventSubtitle}
                  </span>
                </div>
              </div>

              {/* Right Side: Date & Awarded Badge */}
              <div className="flex flex-col items-end shrink-0 self-start mt-0.5">
                <span className="text-[12px] font-medium text-[#64748B]">
                  {item.date}
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
              {/* Player Dropdown */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[13px] font-bold text-white">Player</label>
                <div className="relative">
                  <select
                    value={selectedPlayer}
                    onChange={(e) => setSelectedPlayer(e.target.value)}
                    className="bg-[#07152F] border border-[#162E58] text-white text-[13px] rounded-xl px-4 py-3 w-full appearance-none focus:outline-none focus:border-[#3B82F6] cursor-pointer"
                  >
                    <option value="James Mitchell">James Mitchell</option>
                    <option value="Kai Robertson">Kai Robertson</option>
                    <option value="Leon Williams">Leon Williams</option>
                    <option value="Ethan Jordan">Ethan Jordan</option>
                    <option value="Noah Patel">Noah Patel</option>
                    <option value="Tyler Brooks">Tyler Brooks</option>
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
                  className="w-1/2 bg-gradient-to-b from-[#1E4ED8] to-[#0F2B8D] hover:opacity-95 text-white font-bold py-3 rounded-full text-[13px] shadow-md transition-all cursor-pointer text-center"
                >
                  Add Achievement
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
