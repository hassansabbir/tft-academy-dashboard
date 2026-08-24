import { FiFileText, FiClock, FiShield, FiActivity, FiUsers, FiTarget, FiPlus } from "react-icons/fi";
import { BiCalendarCheck as BiCalendarCheckIcon } from "react-icons/bi";
import { Link } from "react-router-dom";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Spin } from "antd";
import {
  useCoachKpiCardsQuery,
  useCoachAttendanceTrendQuery,
  useCoachSquadDevelopmentQuery,
  useCoachGoalContributionsQuery,
} from "@/redux/apiSlices/dashboardSlice";

const CoachDashboard = () => {
  const { data: kpiData, isLoading: kpiLoading } = useCoachKpiCardsQuery(undefined);
  const { data: attendanceData, isLoading: attLoading } = useCoachAttendanceTrendQuery(undefined);
  const { data: squadDevData, isLoading: squadLoading } = useCoachSquadDevelopmentQuery(undefined);
  const { data: goalData, isLoading: goalLoading } = useCoachGoalContributionsQuery(undefined);

  const isLoading = kpiLoading || attLoading || squadLoading || goalLoading;

  // KPI Defaults
  const pendingNotes = kpiData?.pendingNotes || 0;
  const upcomingSessions = kpiData?.upcomingSessions || 0;
  const mySquadsCount = kpiData?.mySquadsCount || 0;
  const needAssessment = kpiData?.needAssessment || 0;
  const myPlayersCount = kpiData?.myPlayersCount || 0;
  const attendanceTodayRate = kpiData?.attendanceTodayRate || "0%";
  const attendanceTodayFraction = kpiData?.attendanceTodayFraction || "0 of 0 present";

  const attendanceTrend = attendanceData || [];
  const squadDevelopment = squadDevData || [];
  const goalContributions = goalData || [];

  return (
    <div className="flex flex-col gap-6 p-2 bg-[#050E21] min-h-full relative">
      {isLoading && (
        <div className="absolute inset-0 bg-[#050E21]/80 z-50 flex items-center justify-center">
          <Spin size="large" />
        </div>
      )}
      
      {/* Top Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-[26px] font-bold text-white leading-tight">Good morning, Jay Railton</h1>
          <p className="text-[14px] text-[#94A3B8] font-medium mt-1">
            Tuesday, 22 January 2025 · U16 Elite training in 4 hours
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-3">
          <Link to="/players/add" className="bg-gradient-to-b from-[#1E4ED8] to-[#0F2B8D] hover:opacity-95 text-white px-5 py-2.5 rounded-full text-[13px] font-bold flex items-center gap-2 border border-blue-400/20 transition-all shadow-md cursor-pointer">
            <FiPlus size={16} />
            <span>Add Player</span>
          </Link>
          <button className="bg-gradient-to-b from-[#1E4ED8] to-[#0F2B8D] hover:opacity-95 text-white px-5 py-2.5 rounded-full text-[13px] font-bold flex items-center gap-2 border border-blue-400/20 transition-all shadow-md cursor-pointer">
            <BiCalendarCheckIcon size={16} />
            <span>Take Attendance</span>
          </button>
          <button className="bg-gradient-to-b from-[#1E4ED8] to-[#0F2B8D] hover:opacity-95 text-white px-5 py-2.5 rounded-full text-[13px] font-bold flex items-center gap-2 border border-blue-400/20 transition-all shadow-md cursor-pointer">
            <FiFileText size={16} />
            <span>Add Session Note</span>
          </button>
          <button className="bg-gradient-to-b from-[#1E4ED8] to-[#0F2B8D] hover:opacity-95 text-white px-5 py-2.5 rounded-full text-[13px] font-bold flex items-center gap-2 border border-blue-400/20 transition-all shadow-md cursor-pointer">
            <FiActivity size={16} />
            <span>Update Assessment</span>
          </button>
          <button className="bg-gradient-to-b from-[#1E4ED8] to-[#0F2B8D] hover:opacity-95 text-white px-5 py-2.5 rounded-full text-[13px] font-bold flex items-center gap-2 border border-blue-400/20 transition-all shadow-md cursor-pointer">
            <FiTarget size={16} />
            <span>Create Target</span>
          </button>
        </div>
      </div>

      {/* Metrics Cards Grid (Row 1 & Row 2) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Pending Notes */}
        <div className="bg-[#0B1B38] border border-[#162E58] rounded-2xl p-6 flex flex-col justify-between shadow-sm relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-[#94A3B8] tracking-wider uppercase">
              PENDING NOTES
            </span>
            <div className="w-10 h-10 rounded-xl bg-[#F59E0B]/10 flex items-center justify-center text-[#F59E0B]">
              <FiFileText size={20} />
            </div>
          </div>
          <div className="mt-4">
            <span className="text-[32px] font-bold text-white leading-none">{pendingNotes}</span>
            <p className="text-[12px] text-[#94A3B8] font-medium mt-1.5">Need writing</p>
          </div>
        </div>

        {/* Upcoming Sessions */}
        <div className="bg-[#0B1B38] border border-[#162E58] rounded-2xl p-6 flex flex-col justify-between shadow-sm relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-[#94A3B8] tracking-wider uppercase">
              UPCOMING SESSIONS
            </span>
            <div className="w-10 h-10 rounded-xl bg-[#06B6D4]/10 flex items-center justify-center text-[#06B6D4]">
              <FiClock size={20} />
            </div>
          </div>
          <div className="mt-4">
            <span className="text-[32px] font-bold text-white leading-none">{upcomingSessions}</span>
            <p className="text-[12px] text-[#94A3B8] font-medium mt-1.5">Today remaining</p>
          </div>
        </div>

        {/* My Squads */}
        <div className="bg-[#0B1B38] border border-[#162E58] rounded-2xl p-6 flex flex-col justify-between shadow-sm relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-[#94A3B8] tracking-wider uppercase">
              MY SQUADS
            </span>
            <div className="w-10 h-10 rounded-xl bg-[#3B82F6]/10 flex items-center justify-center text-[#3B82F6]">
              <FiShield size={20} />
            </div>
          </div>
          <div className="mt-4">
            <span className="text-[32px] font-bold text-white leading-none">{mySquadsCount}</span>
            <p className="text-[12px] text-[#94A3B8] font-medium mt-1.5">Active squads</p>
          </div>
        </div>

        {/* Need Assessment */}
        <div className="bg-[#0B1B38] border border-[#162E58] rounded-2xl p-6 flex flex-col justify-between shadow-sm relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-[#94A3B8] tracking-wider uppercase">
              NEED ASSESSMENT
            </span>
            <div className="w-10 h-10 rounded-xl bg-[#EAB308]/10 flex items-center justify-center text-[#EAB308]">
              <FiActivity size={20} />
            </div>
          </div>
          <div className="mt-4">
            <span className="text-[32px] font-bold text-white leading-none">{needAssessment}</span>
            <p className="text-[12px] text-[#94A3B8] font-medium mt-1.5">Overdue</p>
          </div>
        </div>

        {/* My Players */}
        <div className="bg-[#0B1B38] border border-[#162E58] rounded-2xl p-6 flex flex-col justify-between shadow-sm relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-[#94A3B8] tracking-wider uppercase">
              MY PLAYERS
            </span>
            <div className="w-10 h-10 rounded-xl bg-[#8B5CF6]/10 flex items-center justify-center text-[#8B5CF6]">
              <FiUsers size={20} />
            </div>
          </div>
          <div className="mt-4">
            <span className="text-[32px] font-bold text-white leading-none">{myPlayersCount}</span>
            <p className="text-[12px] text-[#94A3B8] font-medium mt-1.5">Total registered</p>
          </div>
        </div>

        {/* Attendance Today */}
        <div className="bg-[#0B1B38] border border-[#162E58] rounded-2xl p-6 flex flex-col justify-between shadow-sm relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-[#94A3B8] tracking-wider uppercase">
              ATTENDANCE TODAY
            </span>
            <div className="w-10 h-10 rounded-xl bg-[#10B981]/10 flex items-center justify-center text-[#10B981]">
              <BiCalendarCheckIcon size={22} />
            </div>
          </div>
          <div className="mt-4">
            <span className="text-[32px] font-bold text-white leading-none">{attendanceTodayRate}</span>
            <p className="text-[12px] text-[#94A3B8] font-medium mt-1.5">{attendanceTodayFraction}</p>
          </div>
        </div>
      </div>

      {/* Analytics Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Attendance Trend */}
        <div className="bg-[#0B1B38] border border-[#162E58] rounded-2xl p-6 flex flex-col">
          <h3 className="text-[16px] font-bold text-white">Attendance Trend</h3>
          <p className="text-[12px] text-[#94A3B8] font-medium mt-0.5 mb-4">
            Last 6 months - all squads
          </p>
          <div className="h-[200px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={attendanceTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="#162E58" vertical={false} />
                <XAxis dataKey="month" stroke="#64748B" tickLine={false} axisLine={false} fontSize={12} />
                <YAxis stroke="#64748B" tickLine={false} axisLine={false} fontSize={12} domain={[0, 100]} />
                <Tooltip
                  contentStyle={{ backgroundColor: "#07152F", borderColor: "#162E58", borderRadius: "8px", color: "#fff" }}
                />
                <Line
                  type="monotone"
                  dataKey="rate"
                  stroke="#3B82F6"
                  strokeWidth={3}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Squad Development */}
        <div className="bg-[#0B1B38] border border-[#162E58] rounded-2xl p-6 flex flex-col">
          <h3 className="text-[16px] font-bold text-white">Squad Development</h3>
          <p className="text-[12px] text-[#94A3B8] font-medium mt-0.5 mb-4">
            Average scores by area
          </p>
          <div className="h-[200px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={squadDevelopment}>
                <CartesianGrid strokeDasharray="3 3" stroke="#162E58" vertical={false} />
                <XAxis dataKey="month" stroke="#64748B" tickLine={false} axisLine={false} fontSize={12} />
                <YAxis stroke="#64748B" tickLine={false} axisLine={false} fontSize={12} domain={[0, 10]} />
                <Tooltip
                  contentStyle={{ backgroundColor: "#07152F", borderColor: "#162E58", borderRadius: "8px", color: "#fff" }}
                />
                <Line
                  type="monotone"
                  dataKey="score"
                  stroke="#10B981"
                  strokeWidth={3}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Goal Contributions */}
        <div className="bg-[#0B1B38] border border-[#162E58] rounded-2xl p-6 flex flex-col">
          <h3 className="text-[16px] font-bold text-white">Goal Contributions</h3>
          <p className="text-[12px] text-[#94A3B8] font-medium mt-0.5 mb-4">
            Goals & Assists this season
          </p>
          <div className="h-[200px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={goalContributions}>
                <CartesianGrid strokeDasharray="3 3" stroke="#162E58" vertical={false} />
                <XAxis dataKey="month" stroke="#64748B" tickLine={false} axisLine={false} fontSize={12} />
                <YAxis stroke="#64748B" tickLine={false} axisLine={false} fontSize={12} domain={[0, 'auto']} />
                <Tooltip
                  contentStyle={{ backgroundColor: "#07152F", borderColor: "#162E58", borderRadius: "8px", color: "#fff" }}
                />
                <Bar dataKey="goals" fill="#F59E0B" radius={[4, 4, 0, 0]} barSize={14} />
                <Bar dataKey="assists" fill="#10B981" radius={[4, 4, 0, 0]} barSize={14} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Today's Schedule Section */}
      <div className="bg-[#0B1B38] border border-[#162E58] rounded-2xl p-6 flex flex-col">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-[18px] font-bold text-white">Today's Schedule</h3>
          <span className="bg-[#132A52] text-[#60A5FA] px-3 py-1 rounded-full text-[12px] font-bold border border-[#1E3A66]">
            3 Sessions
          </span>
        </div>

        <div className="flex flex-col gap-3">
          {/* Session 1 */}
          <div className="bg-[#07152F] border border-[#162E58] rounded-xl p-4 flex items-center justify-between">
            <div className="flex items-center gap-5">
              <div className="flex flex-col pr-5 border-r border-[#162E58] shrink-0">
                <span className="text-[10px] font-bold text-[#64748B] tracking-wider uppercase">TIME</span>
                <span className="text-[14px] font-bold text-[#60A5FA]">09:00</span>
              </div>
              <div className="flex flex-col">
                <h4 className="text-[14px] font-bold text-white">U12 Foundation</h4>
                <p className="text-[12px] text-[#94A3B8] font-medium mt-0.5">Technical Training - Pitch A</p>
              </div>
            </div>
            <span className="bg-[#064E3B] text-[#34D399] px-4 py-1 rounded-full text-[12px] font-bold border border-[#059669]/30">
              Done
            </span>
          </div>

          {/* Session 2 */}
          <div className="bg-[#07152F] border border-[#162E58] rounded-xl p-4 flex items-center justify-between">
            <div className="flex items-center gap-5">
              <div className="flex flex-col pr-5 border-r border-[#162E58] shrink-0">
                <span className="text-[10px] font-bold text-[#64748B] tracking-wider uppercase">TIME</span>
                <span className="text-[14px] font-bold text-[#60A5FA]">14:00</span>
              </div>
              <div className="flex flex-col">
                <h4 className="text-[14px] font-bold text-white">U14 Development</h4>
                <p className="text-[12px] text-[#94A3B8] font-medium mt-0.5">Tactical Session - Pitch B</p>
              </div>
            </div>
            <span className="bg-[#1E3A8A] text-[#60A5FA] px-4 py-1 rounded-full text-[12px] font-bold border border-[#2563EB]/30">
              Upcoming
            </span>
          </div>

          {/* Session 3 */}
          <div className="bg-[#07152F] border border-[#162E58] rounded-xl p-4 flex items-center justify-between">
            <div className="flex items-center gap-5">
              <div className="flex flex-col pr-5 border-r border-[#162E58] shrink-0">
                <span className="text-[10px] font-bold text-[#64748B] tracking-wider uppercase">TIME</span>
                <span className="text-[14px] font-bold text-[#60A5FA]">16:00</span>
              </div>
              <div className="flex flex-col">
                <h4 className="text-[14px] font-bold text-white">U16 Elite</h4>
                <p className="text-[12px] text-[#94A3B8] font-medium mt-0.5">Match Preparation - Main Pitch</p>
              </div>
            </div>
            <span className="bg-[#1E3A8A] text-[#60A5FA] px-4 py-1 rounded-full text-[12px] font-bold border border-[#2563EB]/30">
              Upcoming
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoachDashboard;
