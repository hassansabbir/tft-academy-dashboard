import { useState } from "react";
import { FiTarget, FiActivity, FiCheckCircle, FiClock, FiMoreVertical } from "react-icons/fi";

const metricsData = [
  { id: 1, label: 'Total Targets', value: '5', icon: FiTarget, color: 'text-[#1239D4]', bg: 'bg-[#F0F4FF]' },
  { id: 2, label: 'In Progress', value: '3', icon: FiActivity, color: 'text-blue-500', bg: 'bg-blue-50' },
  { id: 3, label: 'Completed', value: '1', icon: FiCheckCircle, color: 'text-green-500', bg: 'bg-green-50' },
  { id: 4, label: 'Pending', value: '1', icon: FiClock, color: 'text-orange-500', bg: 'bg-orange-50' },
];

const targetsData = [
  { id: 1, target: 'Improve Shooting Accuracy', player: 'Marcus Okonkwo', coach: 'James Hargreaves', priority: 'High', dueDate: '15 Aug 2025', progress: 85, status: 'In Progress' },
  { id: 2, target: 'Enhance Passing Range', player: 'Luca Fernandez', coach: 'Sofia Martins', priority: 'Medium', dueDate: '30 Aug 2025', progress: 60, status: 'In Progress' },
  { id: 3, target: 'Speed & Agility Training', player: 'Ethan Nwosu', coach: 'David Okafor', priority: 'High', dueDate: '05 Sep 2025', progress: 40, status: 'In Progress' },
  { id: 4, target: 'Leadership on the Pitch', player: 'Daniel Petrov', coach: 'Marco Ricci', priority: 'Low', dueDate: '20 Sep 2025', progress: 100, status: 'Completed' },
  { id: 5, target: 'Positioning & Awareness', player: 'Kofi Asante', coach: 'James Hargreaves', priority: 'Medium', dueDate: '25 Aug 2025', progress: 25, status: 'Pending' },
];

const AdminDevTargets = () => {
  const [activeFilter, setActiveFilter] = useState('All');

  const renderPriority = (priority: string) => {
    switch (priority) {
      case 'High':
        return <span className="px-3 py-1 rounded-full text-[12px] font-bold bg-[#FEF2F2] text-[#EF4444] border border-[#FECACA]">High</span>;
      case 'Medium':
        return <span className="px-3 py-1 rounded-full text-[12px] font-bold bg-[#FFFBEB] text-[#F59E0B] border border-[#FDE68A]">Medium</span>;
      case 'Low':
        return <span className="px-3 py-1 rounded-full text-[12px] font-bold bg-[#ECFDF5] text-[#10B981] border border-[#A7F3D0]">Low</span>;
      default:
        return null;
    }
  };

  const renderStatus = (status: string) => {
    switch (status) {
      case 'In Progress':
        return <span className="px-3 py-1 rounded-full text-[12px] font-bold bg-[#EFF6FF] text-[#3B82F6] border border-[#BFDBFE]">In Progress</span>;
      case 'Completed':
        return <span className="px-3 py-1 rounded-full text-[12px] font-bold bg-[#ECFDF5] text-[#10B981] border border-[#A7F3D0]">Completed</span>;
      case 'Pending':
        return <span className="px-3 py-1 rounded-full text-[12px] font-bold bg-[#FFFBEB] text-[#F59E0B] border border-[#FDE68A]">Pending</span>;
      default:
        return null;
    }
  };

  const renderProgressBar = (progress: number, status: string) => {
    let colorClass = 'bg-[#F59E0B]'; // Default Orange
    if (status === 'Completed') {
      colorClass = 'bg-[#10B981]'; // Green
    } else if (progress >= 80) {
      colorClass = 'bg-[#1239D4]'; // Blue
    }

    return (
      <div className="flex items-center gap-3">
        <div className="flex-1 bg-gray-100 rounded-full h-[6px]">
          <div 
            className={`h-full rounded-full ${colorClass}`}
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <span className="text-[13px] font-bold text-gray-900 w-[30px]">{progress}%</span>
      </div>
    );
  };

  const filteredTargets = targetsData.filter((target) => {
    if (activeFilter === 'All') return true;
    return target.status === activeFilter;
  });

  return (
    <div className="flex flex-col h-full bg-[#f8faff] p-6 pb-12 overflow-y-auto">
      {/* Header */}
      <div className="flex flex-col mb-8">
        <h1 className="text-[24px] font-bold text-gray-900 leading-tight">Development Targets</h1>
        <p className="text-[14px] text-gray-500 font-medium mt-1">5 active targets across all players</p>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {metricsData.map((metric) => (
          <div key={metric.id} className="bg-white rounded-2xl p-7 shadow-sm border border-gray-100 flex flex-col hover:shadow-md transition-shadow">
            <div className={`w-10 h-10 rounded-full ${metric.bg} ${metric.color} flex items-center justify-center mb-5`}>
              <metric.icon size={20} strokeWidth={2.5} />
            </div>
            <span className="text-[32px] font-bold text-gray-900 leading-none mb-2">{metric.value}</span>
            <span className="text-[14px] font-bold text-gray-500">{metric.label}</span>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex gap-3 mb-8">
        {['All', 'In Progress', 'Completed', 'Pending'].map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`px-5 py-2 rounded-full text-[13px] font-bold transition-colors border ${
              activeFilter === filter 
                ? 'bg-[#1239D4] text-white border-[#1239D4]' 
                : 'bg-white text-gray-500 border-gray-200 hover:border-gray-300'
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Targets Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col overflow-hidden">
        <div className="p-6 flex items-center justify-between border-b border-gray-100">
          <h2 className="text-[16px] font-bold text-gray-900">Current Targets</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100">
                <th className="px-6 py-4 text-[12px] font-bold text-gray-400 uppercase tracking-wider">Target</th>
                <th className="px-6 py-4 text-[12px] font-bold text-gray-400 uppercase tracking-wider">Player</th>
                <th className="px-6 py-4 text-[12px] font-bold text-gray-400 uppercase tracking-wider">Priority</th>
                <th className="px-6 py-4 text-[12px] font-bold text-gray-400 uppercase tracking-wider">Progress</th>
                <th className="px-6 py-4 text-[12px] font-bold text-gray-400 uppercase tracking-wider">Due Date</th>
                <th className="px-6 py-4 text-[12px] font-bold text-gray-400 uppercase tracking-wider text-right">Status</th>
                <th className="px-6 py-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredTargets.map((row) => (
                <tr key={row.id} className="hover:bg-gray-50/30 transition-colors">
                  <td className="px-6 py-4">
                    <span className="text-[14px] font-bold text-gray-900">{row.target}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="text-[14px] font-bold text-gray-900">{row.player}</span>
                      <span className="text-[12px] font-medium text-gray-500">Coach: {row.coach}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {renderPriority(row.priority)}
                  </td>
                  <td className="px-6 py-4 w-[200px]">
                    {renderProgressBar(row.progress, row.status)}
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-[14px] font-medium text-gray-600">{row.dueDate}</span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    {renderStatus(row.status)}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-gray-400 hover:text-gray-600 transition-colors">
                      <FiMoreVertical size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDevTargets;