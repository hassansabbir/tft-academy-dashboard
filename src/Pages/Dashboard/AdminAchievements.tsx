import { useState } from "react";
import { FiCalendar, FiPlus, FiMoreVertical } from "react-icons/fi";
import { BiTrophy } from "react-icons/bi";
import { FaStar, FaMedal } from "react-icons/fa";
import { MdEmojiEvents } from "react-icons/md";
import { BsBullseye } from "react-icons/bs";
import { GoGraph } from "react-icons/go";

const metricsData = [
  { id: 1, label: 'Total Awarded', value: '48', icon: BiTrophy, color: 'text-yellow-500', bg: 'bg-yellow-50', trend: '+6' },
  { id: 2, label: 'Player of the Week', value: '7', icon: FaStar, color: 'text-blue-500', bg: 'bg-blue-50' },
  { id: 3, label: 'Tournament Awards', value: '12', icon: FaMedal, color: 'text-green-500', bg: 'bg-green-50' },
  { id: 4, label: 'Milestones Reached', value: '11', icon: GoGraph, color: 'text-blue-400', bg: 'bg-blue-50' },
];

const filters = ['All', 'Player of the Week', 'Player of the Match', 'Academy Award', 'Tournament Award', 'Milestone'];

const achievementsData = [
  { 
    id: 1, 
    category: 'PLAYER OF THE WEEK', 
    name: 'Daniel Petrov', 
    squad: 'U18 Titans', 
    description: 'Outstanding midfield display against U18 Rovers', 
    date: '21 Jul 2025',
    icon: FaStar,
    iconColor: 'text-yellow-400',
    iconBg: 'bg-yellow-50',
    categoryColor: 'text-yellow-500'
  },
  { 
    id: 2, 
    category: 'PLAYER OF THE MATCH', 
    name: 'Marcus Okonkwo', 
    squad: 'U14 Lions', 
    description: 'Hat-trick in the summer cup quarter-final', 
    date: '18 Jul 2025',
    icon: BiTrophy,
    iconColor: 'text-yellow-600',
    iconBg: 'bg-orange-50',
    categoryColor: 'text-blue-600'
  },
  { 
    id: 3, 
    category: 'ACADEMY AWARD', 
    name: 'Luca Fernandez', 
    squad: 'U12 Eagles', 
    description: 'Most Improved Player – Q2 2025', 
    date: '14 Jul 2025',
    icon: MdEmojiEvents,
    iconColor: 'text-red-400',
    iconBg: 'bg-red-50',
    categoryColor: 'text-purple-600'
  },
  { 
    id: 4, 
    category: 'TOURNAMENT AWARD', 
    name: 'Kofi Asante', 
    squad: 'U14 Lions', 
    description: 'Top Scorer – Regional Youth Cup 2025', 
    date: '10 Jul 2025',
    icon: FaMedal,
    iconColor: 'text-yellow-500',
    iconBg: 'bg-green-50',
    categoryColor: 'text-green-500'
  },
  { 
    id: 5, 
    category: 'MILESTONE', 
    name: 'Ethan Nwosu', 
    squad: 'U16 Hawks', 
    description: '100 appearances for TFP Academy', 
    date: '05 Jul 2025',
    icon: BsBullseye,
    iconColor: 'text-red-500',
    iconBg: 'bg-orange-50',
    categoryColor: 'text-orange-500'
  },
  { 
    id: 6, 
    category: 'TEAM AWARD', 
    name: 'U18 Titans', 
    squad: 'U18', 
    description: 'League Champions – Summer Season 2025', 
    date: '01 Jul 2025',
    icon: BiTrophy,
    iconColor: 'text-blue-500',
    iconBg: 'bg-blue-50',
    categoryColor: 'text-blue-600'
  },
];

const AdminAchievements = () => {
  const [activeFilter, setActiveFilter] = useState('All');

  const filteredAchievements = achievementsData.filter((achievement) => {
    if (activeFilter === 'All') return true;
    return achievement.category.toLowerCase() === activeFilter.toLowerCase();
  });

  return (
    <div className="flex flex-col h-full bg-[#f8faff] p-6 pb-12 overflow-y-auto">
      {/* Header */}
      <div className="flex flex-col mb-8">
        <h1 className="text-[24px] font-bold text-gray-900 leading-tight">Achievements & Awards</h1>
        <p className="text-[14px] text-gray-500 font-medium mt-1">Celebrate player milestones and team successes</p>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {metricsData.map((metric) => (
          <div key={metric.id} className="bg-white rounded-2xl p-7 shadow-sm border border-gray-100 flex flex-col hover:shadow-md transition-shadow relative overflow-hidden">
            <div className="absolute top-4 right-5 text-[12px] font-bold text-green-500 bg-green-50 px-2 py-1 rounded-full">
              {metric.trend}
            </div>
            <div className={`w-12 h-12 rounded-full ${metric.bg} ${metric.color} flex items-center justify-center mb-5`}>
              <metric.icon size={24} strokeWidth={2.5} />
            </div>
            <span className="text-[36px] font-bold text-gray-900 leading-none mb-2">{metric.value}</span>
            <span className="text-[14px] font-bold text-gray-500">{metric.label}</span>
          </div>
        ))}
      </div>

      {/* Filters & Action */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8">
        <div className="flex items-center gap-3 overflow-x-auto py-2.5 px-1 min-h-[52px] custom-scrollbar">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-5 py-2.5 rounded-full text-[13px] font-bold transition-colors border shrink-0 whitespace-nowrap inline-flex items-center justify-center cursor-pointer ${
                activeFilter === filter 
                  ? 'bg-[#1239D4] text-white border-[#1239D4]' 
                  : 'bg-white text-gray-500 border-gray-200 hover:border-gray-300'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
        <button className="shrink-0 bg-[#1239D4] text-white px-6 py-3 rounded-full text-[14px] font-bold hover:bg-blue-800 transition-colors shadow-sm shadow-blue-500/30 flex items-center gap-2">
          <FiPlus size={18} />
          New Award
        </button>
      </div>

      {/* Trophy Cabinet Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredAchievements.map((award) => (
          <div key={award.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col hover:-translate-y-1 hover:shadow-lg transition-all duration-300 relative group text-center items-center">
            <button className="absolute top-4 right-4 text-gray-300 hover:text-gray-600 transition-colors opacity-0 group-hover:opacity-100">
              <FiMoreVertical size={18} />
            </button>
            <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-5 ${award.iconBg} ${award.iconColor} shadow-inner`}>
              <award.icon size={36} />
            </div>
            <span className={`text-[12px] font-bold uppercase tracking-wider mb-2 ${award.categoryColor}`}>
              {award.category}
            </span>
            <h3 className="text-[18px] font-bold text-gray-900 leading-tight mb-2">
              {award.name}
            </h3>
            <span className="text-[13px] font-medium text-gray-500 mb-4 bg-gray-50 px-3 py-1 rounded-full">
              {award.squad}
            </span>
            <p className="text-[14px] text-gray-600 font-medium leading-relaxed mb-6 flex-1">
              {award.description}
            </p>
            <div className="w-full flex items-center justify-center gap-2 text-gray-400 pt-4 border-t border-gray-50">
              <FiCalendar size={14} />
              <span className="text-[13px] font-bold">{award.date}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminAchievements;
