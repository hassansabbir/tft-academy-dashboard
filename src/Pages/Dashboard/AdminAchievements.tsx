import { useState } from "react";
import { FiCalendar, FiMoreVertical } from "react-icons/fi";
import { BiTrophy } from "react-icons/bi";
import { FaStar, FaMedal } from "react-icons/fa";
import { MdEmojiEvents } from "react-icons/md";
import { BsBullseye } from "react-icons/bs";
import { GoGraph } from "react-icons/go";
import { useAdminAchievementsSummaryQuery, useAdminAchievementsQuery } from "@/redux/apiSlices/dashboardSlice";
import { Spin } from "antd";

const filters = ['All', 'Player of the Week', 'Player of the Match', 'Academy Award', 'Tournament Award', 'Milestone'];

const getAwardIconStyle = (type: string) => {
  switch (type.toUpperCase()) {
    case 'PLAYER OF THE WEEK': return { icon: FaStar, iconColor: 'text-yellow-400', iconBg: 'bg-yellow-50', categoryColor: 'text-yellow-500' };
    case 'PLAYER OF THE MATCH': return { icon: BiTrophy, iconColor: 'text-yellow-600', iconBg: 'bg-orange-50', categoryColor: 'text-blue-600' };
    case 'ACADEMY AWARD': return { icon: MdEmojiEvents, iconColor: 'text-red-400', iconBg: 'bg-red-50', categoryColor: 'text-purple-600' };
    case 'TOURNAMENT AWARD': return { icon: FaMedal, iconColor: 'text-yellow-500', iconBg: 'bg-green-50', categoryColor: 'text-green-500' };
    case 'MILESTONE': return { icon: BsBullseye, iconColor: 'text-red-500', iconBg: 'bg-orange-50', categoryColor: 'text-orange-500' };
    case 'TEAM AWARD': return { icon: BiTrophy, iconColor: 'text-blue-500', iconBg: 'bg-blue-50', categoryColor: 'text-blue-600' };
    default: return { icon: BiTrophy, iconColor: 'text-gray-500', iconBg: 'bg-gray-100', categoryColor: 'text-gray-600' };
  }
};

const AdminAchievements = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  
  const { data: summaryData, isLoading: isSummaryLoading } = useAdminAchievementsSummaryQuery(undefined);
  const { data: achievementsData, isLoading: isAchievementsLoading } = useAdminAchievementsQuery(activeFilter);

  const summary = summaryData || {};
  const metricsData = [
    { id: 1, label: 'Total Awarded', value: summary.total || 0, icon: BiTrophy, color: 'text-yellow-500', bg: 'bg-yellow-50', trend: '' },
    { id: 2, label: 'Player of the Week', value: summary.weeklyCount || 0, icon: FaStar, color: 'text-blue-500', bg: 'bg-blue-50' },
    { id: 3, label: 'Tournament Awards', value: summary.tournamentCount || 0, icon: FaMedal, color: 'text-green-500', bg: 'bg-green-50' },
    { id: 4, label: 'Milestones Reached', value: summary.milestoneCount || 0, icon: GoGraph, color: 'text-blue-400', bg: 'bg-blue-50' },
  ];

  const filteredAchievements = achievementsData || [];

  return (
    <div className="flex flex-col h-full bg-[#f8faff] p-6 pb-12 overflow-y-auto">
      {/* Header */}
      <div className="flex flex-col mb-8">
        <h1 className="text-[24px] font-bold text-gray-900 leading-tight">Achievements & Awards</h1>
        <p className="text-[14px] text-gray-500 font-medium mt-1">Celebrate player milestones and team successes</p>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 relative">
        {isSummaryLoading && (
          <div className="absolute inset-0 bg-[#f8faff]/60 flex items-center justify-center z-10">
            <Spin />
          </div>
        )}
        {metricsData.map((metric) => (
          <div key={metric.id} className="bg-white rounded-2xl p-7 shadow-sm border border-gray-100 flex flex-col hover:shadow-md transition-shadow relative overflow-hidden">
            {metric.trend && (
              <div className="absolute top-4 right-5 text-[12px] font-bold text-green-500 bg-green-50 px-2 py-1 rounded-full">
                {metric.trend}
              </div>
            )}
            <div className={`w-12 h-12 rounded-full ${metric.bg} ${metric.color} flex items-center justify-center mb-5`}>
              <metric.icon size={24} strokeWidth={2.5} />
            </div>
            <span className="text-[36px] font-bold text-gray-900 leading-none mb-2">{metric.value}</span>
            <span className="text-[14px] font-bold text-gray-500">{metric.label}</span>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8">
        <div className="flex items-center gap-3 overflow-x-auto py-2.5 px-1 min-h-[52px] custom-scrollbar w-full">
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
      </div>

      {/* Trophy Cabinet Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 relative min-h-[300px]">
        {isAchievementsLoading && (
          <div className="absolute inset-0 bg-[#f8faff]/60 flex items-center justify-center z-10">
            <Spin />
          </div>
        )}
        {filteredAchievements.length > 0 ? filteredAchievements.map((award: any) => {
          const style = getAwardIconStyle(award.awardType || '');
          const Icon = style.icon;
          
          return (
            <div key={award._id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col hover:-translate-y-1 hover:shadow-lg transition-all duration-300 relative group text-center items-center">
              <button className="absolute top-4 right-4 text-gray-300 hover:text-gray-600 transition-colors opacity-0 group-hover:opacity-100">
                <FiMoreVertical size={18} />
              </button>
              <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-5 ${style.iconBg} ${style.iconColor} shadow-inner`}>
                <Icon size={36} />
              </div>
              <span className={`text-[12px] font-bold uppercase tracking-wider mb-2 ${style.categoryColor}`}>
                {award.awardType}
              </span>
              <h3 className="text-[18px] font-bold text-gray-900 leading-tight mb-2">
                {award.playerName}
              </h3>
              <span className="text-[13px] font-medium text-gray-500 mb-4 bg-gray-50 px-3 py-1 rounded-full">
                {award.squadName}
              </span>
              <p className="text-[14px] text-gray-600 font-medium leading-relaxed mb-6 flex-1">
                {award.description || award.matchEvent}
              </p>
              <div className="w-full flex items-center justify-center gap-2 text-gray-400 pt-4 border-t border-gray-50">
                <FiCalendar size={14} />
                <span className="text-[13px] font-bold">{award.formattedDate || new Date(award.date).toLocaleDateString()}</span>
              </div>
            </div>
          );
        }) : (
          <div className="col-span-full flex flex-col items-center justify-center py-16 text-gray-500 bg-white rounded-2xl border border-gray-100">
            <BiTrophy size={48} className="text-gray-300 mb-4" />
            <p className="text-[16px] font-medium">No achievements found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminAchievements;
