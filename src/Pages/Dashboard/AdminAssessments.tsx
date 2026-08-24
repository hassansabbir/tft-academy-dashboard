import { useState, useEffect } from "react";
import { FiSearch, FiFileText } from "react-icons/fi";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import { useAdminAssessmentPlayersQuery, useAdminPlayerAssessmentQuery, useAdminPlayerAssessmentHistoryQuery } from "@/redux/apiSlices/dashboardSlice";
import { Spin } from "antd";


const StarRatingReadOnly = ({ value }: { value: number }) => {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => {
        if (value >= star) return <FaStar key={star} className="text-[#FBBF24]" size={16} />;
        if (value >= star - 0.5) return <FaStarHalfAlt key={star} className="text-[#FBBF24]" size={16} />;
        return <FaStar key={star} className="text-[#E5E7EB]" size={16} />;
      })}
    </div>
  );
};

const ProgressBar = ({ label, value }: { label: string, value: number }) => {
  const percent = (value / 10) * 100;
  return (
    <div className="flex items-center justify-between gap-6 py-1.5">
      <span className="text-[13px] font-bold text-gray-500 w-[120px]">{label}</span>
      <div className="flex-1 bg-gray-100 rounded-full h-[6px]">
        <div 
          className="h-full rounded-full bg-[#1239D4]"
          style={{ width: `${percent}%` }}
        ></div>
      </div>
      <span className="text-[13px] font-bold text-gray-900 w-[30px] text-right">{value.toFixed(1)}</span>
    </div>
  );
};

const SkillRow = ({ label, value }: { label: string, value: number }) => {
  return (
    <div className="flex items-center justify-between gap-6 py-1.5">
      <span className="text-[13px] font-bold text-gray-500 w-[120px]">{label}</span>
      <div className="flex-1 flex justify-center">
        <StarRatingReadOnly value={value} />
      </div>
      <span className="text-[13px] font-bold text-gray-900 w-[30px] text-right">{value.toFixed(1)}</span>
    </div>
  );
};

const AdminAssessments = () => {
  const { data: playersList, isLoading: isPlayersLoading } = useAdminAssessmentPlayersQuery(undefined);
  const [selectedPlayerId, setSelectedPlayerId] = useState<string | null>(null);

  useEffect(() => {
    if (playersList && playersList.length > 0 && !selectedPlayerId) {
      setSelectedPlayerId(playersList[0]._id);
    }
  }, [playersList, selectedPlayerId]);

  const { data: playerDetails, isLoading: isDetailsLoading } = useAdminPlayerAssessmentQuery(selectedPlayerId || "", {
    skip: !selectedPlayerId
  });

  const { data: playerHistory, isLoading: isHistoryLoading } = useAdminPlayerAssessmentHistoryQuery(selectedPlayerId || "", {
    skip: !selectedPlayerId
  });

  const [searchQuery, setSearchQuery] = useState("");

  const filteredPlayers = (playersList || []).filter((p: any) => 
    (p.fullName || "").toLowerCase().includes(searchQuery.toLowerCase())
  );

  const groupedPlayers = filteredPlayers.reduce((acc: Record<string, any[]>, player: any) => {
    const squad = player.squadName || "Unassigned";
    if (!acc[squad]) acc[squad] = [];
    acc[squad].push(player);
    return acc;
  }, {} as Record<string, any[]>);

  const selectedPlayerMeta = (playersList || []).find((p: any) => p._id === selectedPlayerId);

  const footballSkills = playerDetails?.footballSkills || { passing: 0, dribbling: 0, shooting: 0, footballIQ: 0, speed: 0, communication: 0 };
  const coreAreas = playerDetails?.coreAreas || { technical: 0, mentality: 0, physical: 0, psychological: 0, social: 0 };

  return (
    <div className="flex flex-col h-full bg-[#f8faff] p-6 pb-12 overflow-y-auto">
      {/* Header */}
      <div className="flex flex-col mb-8">
        <h1 className="text-[24px] font-bold text-gray-900 leading-tight">Assessments</h1>
        <p className="text-[14px] text-gray-500 font-medium mt-1">Player skill evaluations and development tracking</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-8 items-start">
        
        {/* Left Column - Player List */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 flex flex-col h-[700px] relative">
          {isPlayersLoading && (
            <div className="absolute inset-0 bg-white/60 flex items-center justify-center z-10 rounded-2xl">
              <Spin />
            </div>
          )}
          <div className="relative mb-5 shrink-0">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Search player..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-5 py-3 rounded-full border border-gray-200 text-[14px] font-medium text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 placeholder-gray-400 bg-[#F9FAFC]"
            />
          </div>

          <div className="flex flex-col gap-4 overflow-y-auto pr-2 custom-scrollbar">
            {(Object.entries(groupedPlayers) as [string, any[]][]).map(([squadName, players]) => (
              <div key={squadName} className="flex flex-col">
                <span className="text-[12px] font-bold text-gray-400 uppercase tracking-wider mb-2 px-1">{squadName}</span>
                <div className="flex flex-col gap-2">
                  {players.map((player: any) => (
                    <div 
                      key={player._id} 
                      onClick={() => setSelectedPlayerId(player._id)}
                      className={`flex items-center justify-between p-3 rounded-xl cursor-pointer transition-colors border ${
                        selectedPlayerId === player._id 
                          ? 'border-[#1239D4] bg-blue-50' 
                          : 'border-transparent hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-9 h-9 rounded-full flex items-center justify-center text-[12px] font-bold shrink-0 ${
                          selectedPlayerId === player._id ? 'bg-[#1239D4] text-white' : 'bg-gray-100 text-gray-600'
                        }`}>
                          {player.firstName?.[0] || ""}{player.lastName?.[0] || ""}
                        </div>
                        <span className={`text-[14px] font-bold ${
                          selectedPlayerId === player._id ? 'text-[#1239D4]' : 'text-gray-900'
                        }`}>{player.fullName}</span>
                      </div>
                      <span className={`text-[13px] font-bold ${
                        selectedPlayerId === player._id ? 'text-[#1239D4]' : 'text-gray-500'
                      }`}>{player.overallScore?.toFixed(1) || "0.0"}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column - Assessment Details */}
        {selectedPlayerMeta && (
          <div className="flex flex-col gap-6">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 flex items-center justify-between relative overflow-hidden">
              {isDetailsLoading && (
                <div className="absolute inset-0 bg-white/60 flex items-center justify-center z-10">
                  <Spin />
                </div>
              )}
              <div className="flex items-center gap-5">
                <div className="w-16 h-16 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-[20px] font-bold">
                  {selectedPlayerMeta.firstName?.[0] || ""}{selectedPlayerMeta.lastName?.[0] || ""}
                </div>
                <div className="flex flex-col">
                  <h2 className="text-[20px] font-bold text-gray-900">{selectedPlayerMeta.fullName}</h2>
                  <span className="text-[14px] font-medium text-gray-500">{selectedPlayerMeta.squadName}</span>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-[32px] font-bold text-gray-900 leading-none">{playerDetails?.overallScore?.toFixed(1) || selectedPlayerMeta.overallScore?.toFixed(1) || "0.0"}</span>
                <span className="text-[13px] font-bold text-gray-400">Current Rating</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
              {isDetailsLoading && (
                <div className="absolute inset-0 bg-white/60 flex items-center justify-center z-10 rounded-2xl">
                  <Spin />
                </div>
              )}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-7 flex flex-col gap-6">
                <h3 className="text-[16px] font-bold text-gray-900 border-b border-gray-100 pb-4">Football Skills</h3>
                <div className="flex flex-col gap-2">
                  <SkillRow label="Passing" value={footballSkills.passing || 0} />
                  <SkillRow label="Dribbling" value={footballSkills.dribbling || 0} />
                  <SkillRow label="Shooting" value={footballSkills.shooting || 0} />
                  <SkillRow label="Football IQ" value={footballSkills.footballIQ || 0} />
                  <SkillRow label="Speed" value={footballSkills.speed || 0} />
                  <SkillRow label="Communication" value={footballSkills.communication || 0} />
                </div>
              </div>
              
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-7 flex flex-col gap-6">
                <h3 className="text-[16px] font-bold text-gray-900 border-b border-gray-100 pb-4">Core Areas</h3>
                <div className="flex flex-col gap-2">
                  <ProgressBar label="Technical" value={coreAreas.technical || 0} />
                  <ProgressBar label="Mentality" value={coreAreas.mentality || 0} />
                  <ProgressBar label="Physical" value={coreAreas.physical || 0} />
                  <ProgressBar label="Psychological" value={coreAreas.psychological || 0} />
                  <ProgressBar label="Social" value={coreAreas.social || 0} />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col overflow-hidden relative">
              {isHistoryLoading && (
                <div className="absolute inset-0 bg-white/60 flex items-center justify-center z-10">
                  <Spin />
                </div>
              )}
              <div className="p-6 flex items-center justify-between border-b border-gray-100">
                <h3 className="text-[16px] font-bold text-gray-900">Assessment History</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-50/50 border-b border-gray-100">
                      <th className="px-6 py-4 text-[12px] font-bold text-gray-400 uppercase tracking-wider">Date</th>
                      <th className="px-6 py-4 text-[12px] font-bold text-gray-400 uppercase tracking-wider">Coach</th>
                      <th className="px-6 py-4 text-[12px] font-bold text-gray-400 uppercase tracking-wider text-right">Score</th>
                      <th className="px-6 py-4 text-[12px] font-bold text-gray-400 uppercase tracking-wider text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {playerHistory && playerHistory.length > 0 ? playerHistory.map((row: any, idx: number) => (
                      <tr key={row._id || idx} className="hover:bg-gray-50/30 transition-colors">
                        <td className="px-6 py-4">
                          <span className="text-[14px] font-bold text-gray-900">{row.formattedDate || row.date}</span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-[14px] text-gray-600 font-medium">{row.coachName || "Unknown"}</span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <span className="text-[14px] font-bold text-gray-900">{(row.overallScore || 0).toFixed(1)}</span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <button className="text-gray-400 hover:text-blue-600 transition-colors cursor-pointer" title={row.remarks || "View Assessment"}>
                            <FiFileText size={18} />
                          </button>
                        </td>
                      </tr>
                    )) : (
                      <tr>
                        <td colSpan={4} className="px-6 py-10 text-center text-gray-500 font-medium">
                          No assessment history found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminAssessments;