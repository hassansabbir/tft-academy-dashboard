import { useState } from "react";
import { FiSearch, FiChevronDown } from "react-icons/fi";
import { Link } from "react-router-dom";

const playersData = [
  {
    id: "1",
    firstName: "James",
    lastName: "Mitchell",
    initials: "JM",
    color: "bg-[#2563EB]",
    position: "ST",
    squad: "U16 Futsal Fridays",
    age: 15,
    attendance: 94,
    score: 8.2,
  },
  {
    id: "2",
    firstName: "Leon",
    lastName: "Williams",
    initials: "LW",
    color: "bg-[#8B5CF6]",
    position: "CM",
    squad: "U16 Futsal Fridays",
    age: 16,
    attendance: 88,
    score: 7.8,
  },
  {
    id: "3",
    firstName: "Tyler",
    lastName: "Brooks",
    initials: "TB",
    color: "bg-[#10B981]",
    position: "CB",
    squad: "U16 Futsal Fridays",
    age: 15,
    attendance: 92,
    score: 7.2,
  },
  {
    id: "4",
    firstName: "Kai",
    lastName: "Robertson",
    initials: "KR",
    color: "bg-[#F59E0B]",
    position: "GK",
    squad: "U16 Futsal Fridays",
    age: 16,
    attendance: 97,
    score: 8.7,
  },
  {
    id: "5",
    firstName: "Aiden",
    lastName: "Clarke",
    initials: "AC",
    color: "bg-[#EF4444]",
    position: "LW",
    squad: "U16 Futsal Fridays",
    age: 15,
    attendance: 85,
    score: 6.9,
  },
  {
    id: "6",
    firstName: "Noah",
    lastName: "Patel",
    initials: "NP",
    color: "bg-[#06B6D4]",
    position: "RB",
    squad: "U14 Youth Development",
    age: 13,
    attendance: 90,
    score: 6.5,
  },
  {
    id: "7",
    firstName: "Ethan",
    lastName: "Jordan",
    initials: "EJ",
    color: "bg-[#D946EF]",
    position: "CAM",
    squad: "U14 Youth Development",
    age: 14,
    attendance: 88,
    score: 7.1,
  },
  {
    id: "8",
    firstName: "Marcus",
    lastName: "Owen",
    initials: "MO",
    color: "bg-[#14B8A6]",
    position: "LB",
    squad: "U12 Foundation",
    age: 11,
    attendance: 82,
    score: 5.8,
  },
  {
    id: "9",
    firstName: "Ryan",
    lastName: "Fletcher",
    initials: "RF",
    color: "bg-[#E11D48]",
    position: "CDM",
    squad: "U16 Futsal Fridays",
    age: 15,
    attendance: 91,
    score: 7.0,
  },
  {
    id: "10",
    firstName: "Oscar",
    lastName: "Hughes",
    initials: "OH",
    color: "bg-[#F97316]",
    position: "RW",
    squad: "U14 Youth Development",
    age: 14,
    attendance: 86,
    score: 6.3,
  },
];

const CoachPlayers = () => {
  const [search, setSearch] = useState("");

  const getScoreColor = (score: number) => {
    if (score >= 8.0) return "text-[#10B981]"; // Green
    if (score >= 7.0) return "text-[#F59E0B]"; // Yellow/Orange
    return "text-[#9CA3AF]"; // Gray/Whiteish for lower scores, but image shows white/gray
  };

  const getAttendanceColor = (att: number) => {
    if (att >= 90) return "bg-[#10B981]";
    return "bg-[#F59E0B]";
  };

  return (
    <div className="flex flex-col h-full bg-[#0B1221] p-6 text-white overflow-y-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-1">Players</h1>
        <p className="text-gray-400 text-sm">View and manage your player profiles</p>
      </div>

      {/* Top Bar */}
      <div className="flex flex-col md:flex-row justify-end items-center gap-4 mb-6">
        <div className="relative w-full md:w-72">
          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search players..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#111C35] text-white pl-11 pr-4 py-2.5 rounded-full border border-gray-700/50 focus:outline-none focus:border-blue-500 text-sm placeholder-gray-500"
          />
        </div>
        <div className="w-full md:w-auto bg-[#111C35] border border-gray-700/50 px-4 py-2.5 rounded-full flex items-center justify-between gap-3 cursor-pointer">
          <span className="text-sm font-medium text-gray-300">U14 Youth Development</span>
          <FiChevronDown className="text-gray-400" />
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-[#111C35] rounded-2xl border border-gray-800/60 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-800/60 text-xs font-semibold text-gray-400 uppercase tracking-wider">
              <th className="py-4 px-6">Player</th>
              <th className="py-4 px-4 text-center">Position</th>
              <th className="py-4 px-4 text-center">Squad</th>
              <th className="py-4 px-4 text-center">Age</th>
              <th className="py-4 px-4 text-center">Attendance</th>
              <th className="py-4 px-6 text-center">Score</th>
            </tr>
          </thead>
          <tbody>
            {playersData.map((player) => (
              <tr
                key={player.id}
                className="border-b border-gray-800/60 hover:bg-gray-800/30 transition-colors group cursor-pointer"
              >
                <td className="py-4 px-6">
                  <Link to={`/players/${player.id}`} className="flex items-center gap-3">
                    <div
                      className={`w-9 h-9 rounded-full ${player.color} flex items-center justify-center text-white font-bold text-sm`}
                    >
                      {player.initials}
                    </div>
                    <span className="text-sm font-bold text-gray-100 group-hover:text-blue-400 transition-colors">
                      {player.firstName} {player.lastName}
                    </span>
                  </Link>
                </td>
                <td className="py-4 px-4 text-center">
                  <span className="inline-block px-3 py-1 rounded-full bg-[#1A2C56] text-[#60A5FA] text-xs font-bold border border-blue-900/30">
                    {player.position}
                  </span>
                </td>
                <td className="py-4 px-4 text-center">
                  <span className="text-sm text-gray-400 font-medium">{player.squad}</span>
                </td>
                <td className="py-4 px-4 text-center">
                  <span className="text-sm text-gray-400 font-medium">{player.age}</span>
                </td>
                <td className="py-4 px-4">
                  <div className="flex items-center justify-center gap-3">
                    <div className="w-16 h-1.5 bg-gray-700 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${getAttendanceColor(player.attendance)}`}
                        style={{ width: `${player.attendance}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-bold text-gray-200">{player.attendance}%</span>
                  </div>
                </td>
                <td className="py-4 px-6 text-center">
                  <span className={`text-sm font-bold ${getScoreColor(player.score)}`}>
                    {player.score.toFixed(1)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CoachPlayers;
