import { useState } from "react";
import { FiSearch, FiFileText } from "react-icons/fi";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";

const playersData = [
  { id: 1, initials: 'MO', name: 'Marcus Okonkwo', squad: 'U14 Lions', score: 8.7 },
  { id: 2, initials: 'KA', name: 'Kofi Asante', squad: 'U14 Lions', score: 8.5 },
  { id: 3, initials: 'LF', name: 'Luca Fernandez', squad: 'U12 Eagles', score: 8.2 },
  { id: 4, initials: 'EN', name: 'Ethan Nwosu', squad: 'U16 Hawks', score: 7.9 },
  { id: 5, initials: 'AW', name: 'Aiden Walsh', squad: 'U10 Falcons', score: 6.8 },
  { id: 6, initials: 'DP', name: 'Daniel Petrov', squad: 'U18 Titans', score: 9.1 },
];

const historyData = [
  { id: 1, date: '24 Jul 2025', coach: 'James Hargreaves', score: 8.7 },
  { id: 2, date: '15 Jun 2025', coach: 'James Hargreaves', score: 8.3 },
  { id: 3, date: '01 May 2025', coach: 'James Hargreaves', score: 8.0 },
];

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
  const [selectedPlayerId, setSelectedPlayerId] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPlayers = playersData.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()));

  const groupedPlayers = filteredPlayers.reduce((acc, player) => {
    if (!acc[player.squad]) acc[player.squad] = [];
    acc[player.squad].push(player);
    return acc;
  }, {} as Record<string, typeof playersData>);

  const selectedPlayer = playersData.find(p => p.id === selectedPlayerId);

  return (
    <div className="flex flex-col h-full bg-[#f8faff] p-6 pb-12 overflow-y-auto">
      {/* Header */}
      <div className="flex flex-col mb-8">
        <h1 className="text-[24px] font-bold text-gray-900 leading-tight">Assessments</h1>
        <p className="text-[14px] text-gray-500 font-medium mt-1">Player skill evaluations and development tracking</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-8 items-start">
        
        {/* Left Column - Player List */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 flex flex-col h-[700px]">
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
            {Object.entries(groupedPlayers).map(([squadName, players]) => (
              <div key={squadName} className="flex flex-col">
                <span className="text-[12px] font-bold text-gray-400 uppercase tracking-wider mb-2 px-1">{squadName}</span>
                <div className="flex flex-col gap-2">
                  {players.map((player) => (
                    <div 
                      key={player.id} 
                      onClick={() => setSelectedPlayerId(player.id)}
                      className={`flex items-center justify-between p-3 rounded-xl cursor-pointer transition-colors border ${
                        selectedPlayerId === player.id 
                          ? 'border-[#1239D4] bg-blue-50' 
                          : 'border-transparent hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-9 h-9 rounded-full flex items-center justify-center text-[12px] font-bold shrink-0 ${
                          selectedPlayerId === player.id ? 'bg-[#1239D4] text-white' : 'bg-gray-100 text-gray-600'
                        }`}>
                          {player.initials}
                        </div>
                        <span className={`text-[14px] font-bold ${
                          selectedPlayerId === player.id ? 'text-[#1239D4]' : 'text-gray-900'
                        }`}>{player.name}</span>
                      </div>
                      <span className={`text-[13px] font-bold ${
                        selectedPlayerId === player.id ? 'text-[#1239D4]' : 'text-gray-500'
                      }`}>{player.score.toFixed(1)}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column - Assessment Details */}
        {selectedPlayer && (
          <div className="flex flex-col gap-6">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 flex items-center justify-between">
              <div className="flex items-center gap-5">
                <div className="w-16 h-16 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-[20px] font-bold">
                  {selectedPlayer.initials}
                </div>
                <div className="flex flex-col">
                  <h2 className="text-[20px] font-bold text-gray-900">{selectedPlayer.name}</h2>
                  <span className="text-[14px] font-medium text-gray-500">{selectedPlayer.squad}</span>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-[32px] font-bold text-gray-900 leading-none">{selectedPlayer.score.toFixed(1)}</span>
                <span className="text-[13px] font-bold text-gray-400">Current Rating</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-7 flex flex-col gap-6">
                <h3 className="text-[16px] font-bold text-gray-900 border-b border-gray-100 pb-4">Technical Skills</h3>
                <div className="flex flex-col gap-2">
                  <SkillRow label="Passing" value={4.5} />
                  <SkillRow label="Dribbling" value={4.0} />
                  <SkillRow label="Shooting" value={3.5} />
                  <SkillRow label="First Touch" value={4.0} />
                </div>
              </div>
              
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-7 flex flex-col gap-6">
                <h3 className="text-[16px] font-bold text-gray-900 border-b border-gray-100 pb-4">Physical Attributes</h3>
                <div className="flex flex-col gap-2">
                  <ProgressBar label="Speed" value={8.5} />
                  <ProgressBar label="Stamina" value={7.8} />
                  <ProgressBar label="Strength" value={8.0} />
                  <ProgressBar label="Agility" value={9.0} />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col overflow-hidden">
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
                    {historyData.map((row) => (
                      <tr key={row.id} className="hover:bg-gray-50/30 transition-colors">
                        <td className="px-6 py-4">
                          <span className="text-[14px] font-bold text-gray-900">{row.date}</span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-[14px] text-gray-600 font-medium">{row.coach}</span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <span className="text-[14px] font-bold text-gray-900">{row.score.toFixed(1)}</span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <button className="text-gray-400 hover:text-blue-600 transition-colors">
                            <FiFileText size={18} />
                          </button>
                        </td>
                      </tr>
                    ))}
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