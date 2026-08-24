import { useState } from "react";
import { FiCheckCircle, FiXCircle, FiClock, FiMoreVertical } from "react-icons/fi";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { useAdminAttendanceOverviewQuery } from "@/redux/apiSlices/dashboardSlice";
import { Spin } from "antd";

const AdminAttendance = () => {
  const [timeFilter, setTimeFilter] = useState("Today");

  const filterMap: Record<string, string> = { "Today": "today", "This Week": "week", "Monthly": "month" };
  const { data: overview, isLoading } = useAdminAttendanceOverviewQuery(filterMap[timeFilter]);

  if (isLoading) {
    return <div className="flex items-center justify-center h-full bg-[#f8faff]"><Spin size="large" /></div>;
  }

  const kpis = overview?.kpiCards || { presentToday: 0, absentToday: 0, lateToday: 0 };
  const dynamicMetrics = [
    { id: 1, label: "Present Today", value: kpis.presentToday, icon: FiCheckCircle, color: "text-green-500", bg: "bg-green-50" },
    { id: 2, label: "Absent Today", value: kpis.absentToday, icon: FiXCircle, color: "text-red-500", bg: "bg-red-50" },
    { id: 3, label: "Late Arrivals", value: kpis.lateToday, icon: FiClock, color: "text-orange-500", bg: "bg-orange-50" },
  ];

  const dynamicTable = overview?.todaysAttendance || [];
  
  const dynamicChart = (overview?.attendanceTrend || []).map((item: any) => ({
    name: item.month,
    value: item.rate
  }));

  const colors = ["bg-[#2563EB]", "bg-[#10B981]", "bg-[#F59E0B]", "bg-[#EF4444]", "bg-[#8B5CF6]", "bg-[#EC4899]"];
  const dynamicBreakdown = (overview?.squadAttendanceRates || []).map((squad: any, i: number) => ({
    name: squad.squadName,
    value: parseInt(String(squad.ratePercentage).replace('%',''), 10) || 0,
    color: colors[i % colors.length]
  }));

  const formattedDate = overview?.date 
    ? new Date(overview.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
    : "";

  const renderStatus = (status: string) => {
    switch (status) {
      case "Present":
        return <span className="px-3 py-1 rounded-full text-[12px] font-bold bg-[#ECFDF5] text-[#10B981] border border-[#A7F3D0]">Present</span>;
      case "Late":
        return <span className="px-3 py-1 rounded-full text-[12px] font-bold bg-[#FFFBEB] text-[#F59E0B] border border-[#FDE68A]">Late</span>;
      case "Absent":
        return <span className="px-3 py-1 rounded-full text-[12px] font-bold bg-[#FEF2F2] text-[#EF4444] border border-[#FECACA]">Absent</span>;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#f8faff] p-6 pb-12 overflow-y-auto">
      {/* Header */}
      <div className="flex flex-col mb-8">
        <h1 className="text-[24px] font-bold text-gray-900 leading-tight">Attendance</h1>
        <p className="text-[14px] text-gray-500 font-medium mt-1">
          Track and manage daily attendance across all squads
        </p>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {dynamicMetrics.map((metric) => (
          <div
            key={metric.id}
            className="bg-white rounded-2xl p-7 shadow-sm border border-gray-100 flex flex-col hover:shadow-md transition-shadow"
          >
            <div
              className={`w-10 h-10 rounded-full ${metric.bg} ${metric.color} flex items-center justify-center mb-5`}
            >
              <metric.icon size={20} strokeWidth={2.5} />
            </div>
            <span className="text-[32px] font-bold text-gray-900 leading-none mb-2">
              {metric.value}
            </span>
            <span className="text-[14px] font-bold text-gray-500">{metric.label}</span>
          </div>
        ))}
      </div>

      {/* Time Filters */}
      <div className="flex gap-3 mb-8">
        {["Today", "This Week", "Monthly"].map((filter) => (
          <button
            key={filter}
            onClick={() => setTimeFilter(filter)}
            className={`px-5 py-2 rounded-full text-[13px] font-bold transition-colors border ${
              timeFilter === filter
                ? "bg-[#1239D4] text-white border-[#1239D4]"
                : "bg-white text-gray-500 border-gray-200 hover:border-gray-300"
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column - Today's Attendance Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col overflow-hidden">
          <div className="p-6 flex items-center justify-between border-b border-gray-100">
            <h2 className="text-[16px] font-bold text-gray-900">
              {timeFilter}'s Attendance {formattedDate && `- ${formattedDate}`}
            </h2>
            <span className="text-[13px] font-bold text-gray-400 cursor-pointer hover:text-gray-600 transition-colors">
              View All
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50/50 border-b border-gray-100">
                  <th className="px-6 py-4 text-[12px] font-bold text-gray-400 uppercase tracking-wider">
                    Player Name
                  </th>
                  <th className="px-6 py-4 text-[12px] font-bold text-gray-400 uppercase tracking-wider">
                    Squad
                  </th>
                  <th className="px-6 py-4 text-[12px] font-bold text-gray-400 uppercase tracking-wider text-right">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {dynamicTable.length > 0 ? dynamicTable.map((row: any, idx: number) => {
                  const pName = row.playerName || row.fullName || row.name || "Unknown";
                  const sName = row.squadName || row.squad || "Unknown";
                  const pStatus = row.status ? row.status.charAt(0).toUpperCase() + row.status.slice(1).toLowerCase() : "Unknown";
                  return (
                  <tr key={row._id || idx} className="hover:bg-gray-50/30 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-[11px] font-bold shrink-0">
                          {pName.substring(0, 2).toUpperCase()}
                        </div>
                        <span className="text-[14px] font-bold text-gray-900 whitespace-nowrap">
                          {pName}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-[14px] text-gray-600 font-medium whitespace-nowrap">
                        {sName}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">{renderStatus(pStatus)}</td>
                  </tr>
                )}) : (
                  <tr>
                    <td colSpan={3} className="px-6 py-10 text-center text-gray-500 font-medium">
                      No attendance records found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Column - Attendance Trends & Squad Breakdown */}
        <div className="flex flex-col gap-8">
          {/* Trend Chart */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-[16px] font-bold text-gray-900">Attendance Trends (2025)</h2>
              <button className="text-gray-400 hover:text-gray-600">
                <FiMoreVertical size={18} />
              </button>
            </div>
            <div className="h-[220px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={dynamicChart}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                  <XAxis
                    dataKey="name"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#9ca3af", fontSize: 12, fontWeight: 500 }}
                    dy={10}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#9ca3af", fontSize: 12, fontWeight: 500 }}
                    dx={-10}
                  />
                  <Tooltip
                    contentStyle={{ borderRadius: "12px", border: "none", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)" }}
                    itemStyle={{ color: "#111827", fontWeight: "bold" }}
                  />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#1239D4"
                    strokeWidth={3}
                    dot={{ r: 4, fill: "#1239D4", strokeWidth: 2, stroke: "#fff" }}
                    activeDot={{ r: 6, strokeWidth: 0 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Squad Breakdown */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col p-6">
            <h2 className="text-[16px] font-bold text-gray-900 mb-6">Squad Breakdown</h2>
            <div className="flex flex-col gap-5">
              {dynamicBreakdown.length > 0 ? dynamicBreakdown.map((squad: any, index: number) => (
                <div key={index} className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[14px] font-bold text-gray-700">{squad.name}</span>
                    <span className="text-[14px] font-bold text-gray-900">{squad.value}%</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                    <div
                      className={`h-full ${squad.color} rounded-full`}
                      style={{ width: `${squad.value}%` }}
                    ></div>
                  </div>
                </div>
              )) : (
                <div className="text-gray-500 font-medium text-center py-4">No data available</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminAttendance;