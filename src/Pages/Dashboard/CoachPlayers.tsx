import { useState, useEffect, useMemo } from "react";
import { FiSearch, FiChevronDown } from "react-icons/fi";
import { Link } from "react-router-dom";
import { Spin } from "antd";
import { useGetMySquadsQuery } from "@/redux/apiSlices/squadSlice";
import { useGetPlayersBySquadQuery } from "@/redux/apiSlices/playerSlice";
import { imageUrl } from "@/redux/api/baseApi";

const getInitials = (name: string) => {
  if (!name) return "??";
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .substring(0, 2)
    .toUpperCase();
};

const CoachPlayers = () => {
  const [search, setSearch] = useState("");
  const [selectedSquad, setSelectedSquad] = useState<string>("");

  // API Queries
  const { data: mySquads, isLoading: isLoadingSquads } = useGetMySquadsQuery(undefined);
  const { data: players, isLoading: isLoadingPlayers, isFetching } = useGetPlayersBySquadQuery(selectedSquad, { skip: !selectedSquad });

  // Set default squad when squads load
  useEffect(() => {
    if (mySquads?.length > 0 && !selectedSquad) {
      setSelectedSquad(mySquads[0]._id);
    }
  }, [mySquads, selectedSquad]);

  const getScoreColor = (score: number) => {
    if (score >= 8.0) return "text-[#10B981]"; // Green
    if (score >= 7.0) return "text-[#F59E0B]"; // Yellow/Orange
    return "text-[#9CA3AF]"; // Gray/Whiteish
  };

  const getAttendanceColor = (att: number) => {
    if (att >= 90) return "bg-[#10B981]";
    return "bg-[#F59E0B]";
  };

  const filteredPlayers = useMemo(() => {
    if (!players) return [];
    return players.filter((player: any) => {
      const term = search.toLowerCase();
      const name = player.fullName || `${player.firstName} ${player.lastName}`;
      const position = player.playingPosition || "";
      return name.toLowerCase().includes(term) || position.toLowerCase().includes(term);
    });
  }, [players, search]);

  const selectedSquadName = mySquads?.find((s: any) => s._id === selectedSquad)?.name || "Squad";
  const selectedAgeGroup = mySquads?.find((s: any) => s._id === selectedSquad)?.ageGroupId?.name?.split('_')[0] || "";
  const fullSquadLabel = selectedAgeGroup ? `${selectedAgeGroup} ${selectedSquadName}` : selectedSquadName;

  return (
    <div className="flex flex-col h-full bg-[#0B1221] p-6 text-white overflow-y-auto relative">
      {(isLoadingSquads) && (
        <div className="absolute inset-0 bg-[#0B1221]/80 z-50 flex items-center justify-center">
          <Spin size="large" />
        </div>
      )}

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
        
        <div className="relative w-full md:w-auto">
          <select
            value={selectedSquad}
            onChange={(e) => setSelectedSquad(e.target.value)}
            className="w-full bg-[#111C35] border border-gray-700/50 text-gray-300 text-sm font-medium px-4 py-2.5 pr-10 rounded-full appearance-none focus:outline-none focus:border-blue-500 cursor-pointer"
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
          <FiChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-[#111C35] rounded-2xl border border-gray-800/60 overflow-hidden relative min-h-[300px]">
        {(isLoadingPlayers || isFetching) && (
          <div className="absolute inset-0 bg-[#111C35]/60 z-10 flex items-center justify-center">
            <Spin />
          </div>
        )}

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
            {!isLoadingPlayers && !isFetching && filteredPlayers.length === 0 && (
              <tr>
                <td colSpan={6} className="py-8 text-center text-gray-500">
                  No players found in this squad.
                </td>
              </tr>
            )}

            {filteredPlayers.map((player: any) => {
              const name = player.fullName || `${player.firstName} ${player.lastName}`;
              const attString = player.attendanceRate || "0%";
              const attNumber = parseInt(attString.replace('%', ''), 10) || 0;
              const score = typeof player.overallScore === 'number' ? player.overallScore : parseFloat(player.overallScore) || 0;

              return (
                <tr
                  key={player._id}
                  className="border-b border-gray-800/60 hover:bg-gray-800/30 transition-colors group cursor-pointer"
                >
                  <td className="py-4 px-6">
                    <Link to={`/players/${player._id}`} className="flex items-center gap-3">
                      <div className="w-9 h-9 shrink-0">
                        {player.image ? (
                          <img src={player.image.startsWith('http') ? player.image : `${imageUrl}${player.image}`} alt={name} className="w-full h-full object-cover rounded-full" />
                        ) : (
                          <div className="w-full h-full rounded-full bg-[#1E4ED8] flex items-center justify-center text-white font-bold text-sm">
                            {getInitials(name)}
                          </div>
                        )}
                      </div>
                      <span className="text-sm font-bold text-gray-100 group-hover:text-blue-400 transition-colors">
                        {name}
                      </span>
                    </Link>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <span className="inline-block px-3 py-1 rounded-full bg-[#1A2C56] text-[#60A5FA] text-xs font-bold border border-blue-900/30">
                      {player.playingPosition || "N/A"}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <span className="text-sm text-gray-400 font-medium">{fullSquadLabel}</span>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <span className="text-sm text-gray-400 font-medium">{player.age || "-"}</span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center justify-center gap-3">
                      <div className="w-16 h-1.5 bg-gray-700 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${getAttendanceColor(attNumber)}`}
                          style={{ width: `${Math.min(attNumber, 100)}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-bold text-gray-200">{attString}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-center">
                    <span className={`text-sm font-bold ${getScoreColor(score)}`}>
                      {score.toFixed(1)}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CoachPlayers;
