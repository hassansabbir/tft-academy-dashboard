import { useState } from "react";
import { FiPlus, FiEye, FiEdit2, FiTrash2, FiSearch, FiChevronDown } from "react-icons/fi";
import { FaStar } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { Pagination, Spin, Alert } from "antd";
import { useGetPlayersQuery } from "../../redux/apiSlices/playerSlice";

const FilterPill = ({ label }: { label: string }) => (
  <div className="flex items-center gap-2 bg-white px-5 py-2.5 rounded-full border border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors shadow-sm text-[13px] font-medium text-gray-700">
    {label}
    <FiChevronDown className="text-gray-400" size={16} />
  </div>
);

const Players = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const { data: apiResponse, isLoading, isError } = useGetPlayersQuery({ page, limit: 10 });
  const players = apiResponse?.data || [];
  const meta = apiResponse?.meta || { total: 0, limit: 10, page: 1 };

  return (
    <div className="flex flex-col h-full bg-[#f8faff] p-6 pb-12">
      {/* Header */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-[24px] font-bold text-gray-900 leading-tight">Players</h1>
          <p className="text-[14px] text-gray-500 font-medium mt-1">{meta.total} registered players • Season 2024/25</p>
        </div>
        <Link
          to="/players/add"
          className="bg-gradient-to-r from-[#081A4A] to-[#1239D4] hover:opacity-90 text-white px-6 py-2.5 rounded-full flex items-center gap-2 text-[15px] font-medium transition-opacity shadow-md"
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
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
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

      {/* Table & Content Area */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-x-auto flex-1 flex flex-col">
        {/* Loading / Error States */}
        {isLoading && (
          <div className="flex items-center justify-center py-20">
            <Spin size="large" />
          </div>
        )}

        {isError && (
          <div className="p-6">
            <Alert type="error" message="Failed to load players. Please try again." />
          </div>
        )}

        {!isLoading && !isError && (
          <>
            <table className="w-full text-left border-collapse min-w-[1000px]">
              <thead>
                <tr className="border-b border-gray-100 text-[11px] font-medium text-gray-400 tracking-wider uppercase bg-[#fdfdfd]">
                  <th className="py-4 px-6 font-medium">Player</th>
                  <th className="py-4 px-4 font-medium">ID</th>
                  <th className="py-4 px-4 font-medium">Age</th>
                  <th className="py-4 px-4 font-medium">Position</th>
                  <th className="py-4 px-4 font-medium">Squad</th>
                  <th className="py-4 px-4 font-medium">Coach</th>
                  <th className="py-4 px-4 font-medium">Att.</th>
                  <th className="py-4 px-4 font-medium">Score</th>
                  <th className="py-4 px-4 font-medium">G / A</th>
                  <th className="py-4 px-4 font-medium">Status</th>
                  <th className="py-4 px-6 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {players.length > 0 ? (
                  players.map((player: any) => (
                    <tr key={player._id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors group">
                      <td className="py-4 px-6">
                        <div className="flex flex-col">
                          <span className="text-[14px] font-medium text-gray-900 leading-tight">
                            {player.fullName || "Unknown Player"}
                          </span>
                          <span className="text-[12px] font-medium text-[#8B9CC8] leading-tight mt-0.5">
                            {player.nationality || "Unknown"}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="bg-gray-100/80 text-gray-500 font-medium text-[10px] px-2 py-1 rounded w-fit tracking-wider">
                          {player.playerId || "N/A"}
                        </div>
                      </td>
                      <td className="py-4 px-4 text-[14px] font-medium text-gray-900">{player.age || "N/A"}</td>
                      <td className="py-4 px-4 text-[14px] font-medium text-gray-800">{player.playingPosition || "N/A"}</td>
                      <td className="py-4 px-4 text-[14px] font-medium text-gray-800">{player.squadName || "Unassigned"}</td>
                      <td className="py-4 px-4">
                        <span className="text-[13px] font-medium text-gray-900 leading-tight">
                          {(player.coachName || "Unassigned").split(' ').map((n: string, i: number) => <span key={i} className="block">{n}</span>)}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-[14px] font-medium text-gray-900">{player.attendanceRate || "0%"}</td>
                      <td className="py-4 px-4 text-[14px] font-medium text-gray-900 flex items-center gap-1.5 mt-2">
                        <FaStar className="text-[#FBBF24]" size={14} />
                        {player.overallScore || "0"}
                      </td>
                      <td className="py-4 px-4 text-[14px] font-medium text-gray-900">{player.goalsAssists || "0 / 0"}</td>
                      <td className="py-4 px-4">
                        <div className={`px-3 py-1 rounded-full text-[11px] font-medium w-fit border capitalize ${player.status?.toLowerCase() === 'active'
                            ? 'bg-[#ECFDF5] text-[#10B981] border-[#A7F3D0]'
                            : 'bg-[#FEF2F2] text-[#EF4444] border-[#FECACA]'
                          }`}>
                          {player.status || "inactive"}
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2.5 transition-opacity">
                          <button 
                            onClick={() => navigate(`/players/${player._id}`)}
                            className="text-blue-500 hover:text-blue-700 transition-colors p-1 cursor-pointer"
                          >
                            <FiEye size={16} />
                          </button>
                          <button className="text-gray-400 hover:text-gray-600 transition-colors p-1 cursor-pointer">
                            <FiEdit2 size={16} />
                          </button>
                          <button className="text-red-400 hover:text-red-600 transition-colors p-1 cursor-pointer">
                            <FiTrash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={11} className="py-12 text-center text-gray-500 font-medium">
                      No players found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>

            {/* Pagination Component */}
            {meta.total > 0 && (
              <div className="flex items-center justify-between px-6 py-5 mt-auto border-t border-gray-100 bg-[#fdfdfd]">
                <span className="text-[13px] font-medium text-gray-500">
                  Showing {players.length} of {meta.total} players
                </span>
                <Pagination
                  current={page}
                  pageSize={meta.limit}
                  total={meta.total}
                  onChange={(newPage) => setPage(newPage)}
                  showSizeChanger={false}
                />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Players;
