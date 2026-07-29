import { FiPlus, FiEye, FiEdit2, FiTrash2, FiSearch, FiChevronDown } from "react-icons/fi";
import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";

const playersData = [
  {
    id: "TFP-0041",
    firstName: "Marcus",
    lastName: "Okonkwo",
    nationality: "Nigerian",
    initials: "MO",
    color: "bg-[#2563EB]",
    age: 14,
    position: "Striker",
    squad: "U14 Youth Development",
    coach: "James Hargreaves",
    attendance: "94%",
    score: 8.7,
    ga: "22 / 9",
    status: "Active"
  },
  {
    id: "TFP-0042",
    firstName: "Luca",
    lastName: "Fernandez",
    nationality: "Spanish",
    initials: "LF",
    color: "bg-[#2563EB]",
    age: 12,
    position: "Midfielder",
    squad: "U14 Youth Development",
    coach: "Sofia Martins",
    attendance: "88%",
    score: 8.2,
    ga: "14 / 16",
    status: "Active"
  },
  {
    id: "TFP-0043",
    firstName: "Ethan",
    lastName: "Nwosu",
    nationality: "British",
    initials: "EN",
    color: "bg-[#2563EB]",
    age: 16,
    position: "Defender",
    squad: "U14 Youth Development",
    coach: "David Okafor",
    attendance: "91%",
    score: 7.9,
    ga: "3 / 7",
    status: "Active"
  },
  {
    id: "TFP-0044",
    firstName: "Aiden",
    lastName: "Walsh",
    nationality: "Irish",
    initials: "AW",
    color: "bg-[#2563EB]",
    age: 10,
    position: "Goalkeeper",
    squad: "U14 Youth Development",
    coach: "Claire Dumont",
    attendance: "76%",
    score: 6.8,
    ga: "0 / 2",
    status: "Inactive"
  },
  {
    id: "TFP-0045",
    firstName: "Kofi",
    lastName: "Asante",
    nationality: "Ghanaian",
    initials: "KA",
    color: "bg-[#2563EB]",
    age: 14,
    position: "Winger",
    squad: "U14 Youth Development",
    coach: "James Hargreaves",
    attendance: "97%",
    score: 8.5,
    ga: "18 / 12",
    status: "Active"
  },
  {
    id: "TFP-0046",
    firstName: "Daniel",
    lastName: "Petrov",
    nationality: "Bulgarian",
    initials: "DP",
    color: "bg-[#2563EB]",
    age: 18,
    position: "Central Midfielder",
    squad: "U14 Youth Development",
    coach: "Marco Ricci",
    attendance: "89%",
    score: 9.1,
    ga: "11 / 19",
    status: "Active"
  }
];

const FilterPill = ({ label }: { label: string }) => (
  <div className="flex items-center gap-2 bg-white px-5 py-2.5 rounded-full border border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors shadow-sm text-[13px] font-medium text-gray-700">
    {label}
    <FiChevronDown className="text-gray-400" size={16} />
  </div>
);

const Players = () => {
  return (
    <div className="flex flex-col h-full bg-[#f8faff] p-6 pb-12">
      {/* Header */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-[24px] font-bold text-gray-900 leading-tight">Players</h1>
          <p className="text-[14px] text-gray-500 font-medium mt-1">6 registered players • Season 2024/25</p>
        </div>
        <Link 
          to="/players/add"
          className="bg-gradient-to-r from-[#081A4A] to-[#1239D4] hover:opacity-90 text-white px-6 py-2.5 rounded-full flex items-center gap-2 text-[15px] font-semibold transition-opacity shadow-md"
        >
          <FiPlus size={18} strokeWidth={3} />
          Add Player
        </Link>
      </div>

      {/* Filters */}
      <div className="flex items-center justify-between gap-4 mb-6">
        <div className="relative flex-1 max-w-[500px]">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
            <FiSearch className="text-gray-400" size={18} />
          </div>
          <input 
            type="text" 
            placeholder="Search players, squads..." 
            className="w-full pl-11 pr-4 py-2.5 bg-white border border-gray-200 rounded-full text-[14px] font-medium text-gray-700 focus:outline-none focus:border-blue-500 shadow-sm placeholder-gray-400"
          />
        </div>
        <div className="flex items-center gap-3">
          <FilterPill label="Position" />
          <FilterPill label="Age Group" />
          <FilterPill label="Squad" />
          <FilterPill label="Status" />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-x-auto flex-1 flex flex-col">
        <table className="w-full text-left border-collapse min-w-[1000px]">
          <thead>
            <tr className="border-b border-gray-100 text-[11px] font-bold text-gray-400 tracking-wider uppercase bg-[#fdfdfd]">
              <th className="py-4 px-6 font-bold">Player</th>
              <th className="py-4 px-4 font-bold">ID</th>
              <th className="py-4 px-4 font-bold">Age</th>
              <th className="py-4 px-4 font-bold">Position</th>
              <th className="py-4 px-4 font-bold">Squad</th>
              <th className="py-4 px-4 font-bold">Coach</th>
              <th className="py-4 px-4 font-bold">Att.</th>
              <th className="py-4 px-4 font-bold">Score</th>
              <th className="py-4 px-4 font-bold">G / A</th>
              <th className="py-4 px-4 font-bold">Status</th>
              <th className="py-4 px-6 font-bold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {playersData.map((player) => (
              <tr key={player.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors group">
                <td className="py-4 px-6">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full ${player.color} flex items-center justify-center text-white font-bold text-[14px] tracking-wide shrink-0`}>
                      {player.initials}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[14px] font-bold text-gray-900 leading-tight">
                        {player.firstName} {player.lastName}
                      </span>
                      <span className="text-[12px] font-medium text-[#8B9CC8] leading-tight mt-0.5">
                        {player.nationality}
                      </span>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <div className="bg-gray-100/80 text-gray-500 font-bold text-[10px] px-2 py-1 rounded w-fit tracking-wider">
                    {player.id}
                  </div>
                </td>
                <td className="py-4 px-4 text-[14px] font-bold text-gray-900">{player.age}</td>
                <td className="py-4 px-4 text-[14px] font-medium text-gray-800">{player.position}</td>
                <td className="py-4 px-4 text-[14px] font-medium text-gray-800">{player.squad}</td>
                <td className="py-4 px-4">
                  <span className="text-[13px] font-medium text-[#6277A6] leading-tight">
                    {player.coach.split(' ').map((n, i) => <span key={i} className={i === 0 ? "block" : "block"}>{n}</span>)}
                  </span>
                </td>
                <td className="py-4 px-4 text-[14px] font-bold text-gray-900">{player.attendance}</td>
                <td className="py-4 px-4 text-[14px] font-bold text-gray-900 flex items-center gap-1.5 mt-2">
                  <FaStar className="text-[#FBBF24]" size={14} />
                  {player.score}
                </td>
                <td className="py-4 px-4 text-[14px] font-bold text-gray-900">{player.ga}</td>
                <td className="py-4 px-4">
                  <div className={`px-3 py-1 rounded-full text-[11px] font-bold w-fit border ${
                    player.status === 'Active' 
                      ? 'bg-[#ECFDF5] text-[#10B981] border-[#A7F3D0]' 
                      : 'bg-[#FEF2F2] text-[#EF4444] border-[#FECACA]'
                  }`}>
                    {player.status}
                  </div>
                </td>
                <td className="py-4 px-6">
                  <div className="flex items-center gap-2.5 transition-opacity">
                    <button className="text-blue-500 hover:text-blue-700 transition-colors p-1">
                      <FiEye size={16} />
                    </button>
                    <button className="text-gray-400 hover:text-gray-600 transition-colors p-1">
                      <FiEdit2 size={16} />
                    </button>
                    <button className="text-red-400 hover:text-red-600 transition-colors p-1">
                      <FiTrash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Footer/Pagination */}
        <div className="flex items-center justify-between px-6 py-5 mt-auto border-t border-gray-100">
          <span className="text-[13px] font-medium text-gray-500">Showing 6 of 6 players</span>
          <div className="flex items-center gap-1.5">
            <button className="w-8 h-8 rounded-full bg-[#1D4ED8] text-white flex items-center justify-center text-[13px] font-medium shadow-sm">1</button>
            <button className="w-8 h-8 rounded-full bg-white text-gray-600 border border-gray-200 hover:bg-gray-50 flex items-center justify-center text-[13px] font-medium transition-colors">2</button>
            <button className="w-8 h-8 rounded-full bg-white text-gray-600 border border-gray-200 hover:bg-gray-50 flex items-center justify-center text-[13px] font-medium transition-colors">3</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Players;
