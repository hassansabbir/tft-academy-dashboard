import { FiChevronLeft, FiFileText, FiTarget } from "react-icons/fi";
import { FaTrophy, FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const attendanceData = [
  { name: "Attended", value: 87, color: "#2563EB" },
  { name: "Missed", value: 8, color: "#EF4444" },
  { name: "Late", value: 5, color: "#F59E0B" },
];

const CoachPlayerDetails = () => {
  const navigate = useNavigate();

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <FaStar
            key={star}
            size={12}
            className={star <= rating ? "text-[#F59E0B]" : "text-gray-600"}
          />
        ))}
      </div>
    );
  };

  const ProgressBar = ({ label, score, color }: { label: string; score: number; color: string }) => (
    <div className="flex items-center justify-between mb-4">
      <span className="text-sm text-gray-300 w-28">{label}</span>
      <div className="flex-1 mx-4 h-2 bg-gray-700 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full"
          style={{ width: `${(score / 10) * 100}%`, backgroundColor: color }}
        />
      </div>
      <span className="text-sm font-bold text-white w-8 text-right">{score}</span>
    </div>
  );

  return (
    <div className="flex flex-col min-h-full bg-[#0B1221] p-6 text-white overflow-y-auto">
      {/* Back button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors w-fit mb-6"
      >
        <FiChevronLeft size={20} />
        <span className="text-sm font-medium">Back to Players</span>
      </button>

      {/* Top Profile Card */}
      <div className="bg-[#111C35] rounded-2xl border border-gray-800/60 p-6 mb-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <div className="w-20 h-20 rounded-2xl bg-[#2563EB] flex items-center justify-center text-3xl font-bold text-white shadow-lg">
            JM
          </div>
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h1 className="text-2xl font-bold text-white">James Mitchell</h1>
              <span className="px-3 py-1 rounded-full bg-[#1A2C56] text-[#60A5FA] text-xs font-bold border border-blue-900/30">
                Advanced
              </span>
            </div>
            <p className="text-sm text-gray-400 font-medium mb-4">
              U16 Elite • #9 • ST • Age 15
            </p>
            <div className="flex items-center gap-6">
              <div>
                <p className="text-xs text-gray-500 font-medium uppercase mb-1">Overall Score</p>
                <p className="text-xl font-bold text-white">
                  8.2<span className="text-sm text-gray-500 font-medium">/10</span>
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-500 font-medium uppercase mb-1">Attendance</p>
                <p className="text-xl font-bold text-[#10B981]">94%</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 font-medium uppercase mb-1">Goals</p>
                <p className="text-xl font-bold text-[#F59E0B]">12</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 font-medium uppercase mb-1">Assists</p>
                <p className="text-xl font-bold text-[#60A5FA]">8</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 font-medium uppercase mb-1">POTM</p>
                <p className="text-xl font-bold text-[#60A5FA]">2</p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto">
          <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-transparent border border-gray-600 text-sm font-semibold hover:bg-gray-800 transition-colors">
            <FiFileText /> Add Note
          </button>
          <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-transparent border border-gray-600 text-sm font-semibold hover:bg-gray-800 transition-colors">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>
            Assess
          </button>
          <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-[#2563EB] text-white text-sm font-semibold hover:bg-blue-600 transition-colors">
            <FiTarget /> Set Target
          </button>
        </div>
      </div>

      {/* Grid Content */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Development Scores */}
        <div className="bg-[#111C35] rounded-2xl border border-gray-800/60 p-6 flex flex-col">
          <h2 className="text-lg font-bold text-white mb-6">Development Scores</h2>
          <div className="flex-1">
            <ProgressBar label="Technical" score={8.2} color="#2563EB" />
            <ProgressBar label="Physical" score={7.8} color="#10B981" />
            <ProgressBar label="Mentality" score={8.0} color="#F59E0B" />
            <ProgressBar label="Social" score={8.5} color="#A855F7" />
            <ProgressBar label="Psychological" score={7.5} color="#06B6D4" />
          </div>
        </div>

        {/* Football Skills */}
        <div className="bg-[#111C35] rounded-2xl border border-gray-800/60 p-6">
          <h2 className="text-lg font-bold text-white mb-6">Football Skills</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-300">Shooting</span>
              <div className="flex items-center gap-3">
                {renderStars(4)}
                <span className="text-sm font-bold text-[#60A5FA] w-6 text-right">4</span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-300">Passing</span>
              <div className="flex items-center gap-3">
                {renderStars(5)}
                <span className="text-sm font-bold text-[#60A5FA] w-6 text-right">4.5</span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-300">Dribbling</span>
              <div className="flex items-center gap-3">
                {renderStars(4)}
                <span className="text-sm font-bold text-[#60A5FA] w-6 text-right">4</span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-300">Football IQ</span>
              <div className="flex items-center gap-3">
                {renderStars(5)}
                <span className="text-sm font-bold text-[#60A5FA] w-6 text-right">4.5</span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-300">Speed</span>
              <div className="flex items-center gap-3">
                {renderStars(4)}
                <span className="text-sm font-bold text-[#60A5FA] w-6 text-right">3.5</span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-300">Communication</span>
              <div className="flex items-center gap-3">
                {renderStars(4)}
                <span className="text-sm font-bold text-[#60A5FA] w-6 text-right">4</span>
              </div>
            </div>
          </div>
        </div>

        {/* Attendance Analytics */}
        <div className="bg-[#111C35] rounded-2xl border border-gray-800/60 p-6">
          <h2 className="text-lg font-bold text-white mb-6">Attendance Analytics</h2>
          <div className="flex flex-col items-center">
            <div className="w-40 h-40 relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={attendanceData}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={75}
                    paddingAngle={2}
                    dataKey="value"
                    stroke="none"
                  >
                    {attendanceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none mt-1">
                <span className="text-2xl font-bold text-white">87%</span>
                <span className="text-[10px] text-gray-400 uppercase tracking-wider text-center leading-tight">
                  Attendance<br />Rate
                </span>
              </div>
            </div>
            
            <div className="w-full mt-6 space-y-3">
              {attendanceData.map((item) => (
                <div key={item.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-sm text-gray-300">{item.name}</span>
                  </div>
                  <span className="text-sm font-bold text-white">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Notes */}
        <div className="bg-[#111C35] rounded-2xl border border-gray-800/60 p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-bold text-white">Recent Notes</h2>
            <button className="text-sm font-medium text-[#60A5FA] hover:text-blue-400">View All</button>
          </div>
          <div className="bg-[#0B1221] rounded-xl p-4 border border-gray-800/60">
            <span className="inline-block px-3 py-1 rounded-full bg-[#064E3B] text-[#34D399] text-xs font-bold mb-3">
              Positive
            </span>
            <p className="text-sm text-gray-300 leading-relaxed mb-4">
              Excellent movement off the ball today. Showed great awareness in the final third and linked play effectively with...
            </p>
            <p className="text-xs text-gray-500 font-medium">Today 10:30</p>
          </div>
        </div>

        {/* Current Target */}
        <div className="bg-[#111C35] rounded-2xl border border-gray-800/60 p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-bold text-white">Current Target</h2>
            <button className="text-sm font-medium text-[#60A5FA] hover:text-blue-400">View All</button>
          </div>
          <div className="bg-[#0B1221] rounded-xl p-4 border border-gray-800/60">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-sm font-bold text-white leading-tight">Improve Left-Foot Finishing</h3>
              <span className="px-2.5 py-1 rounded-md bg-[#1E3A8A] text-[#60A5FA] text-xs font-bold whitespace-nowrap ml-2">
                In Progress
              </span>
            </div>
            <div className="mb-4">
              <div className="flex justify-between text-xs mb-2">
                <span className="text-gray-400 font-medium">Progress</span>
                <span className="text-[#60A5FA] font-bold">62%</span>
              </div>
              <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                <div className="h-full bg-[#2563EB] rounded-full" style={{ width: "62%" }}></div>
              </div>
            </div>
            <p className="text-xs text-gray-500 font-medium">Due: 28 Feb 2025</p>
          </div>
        </div>

        {/* Achievement */}
        <div className="bg-[#111C35] rounded-2xl border border-gray-800/60 p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-bold text-white">Achievement</h2>
            <button className="text-sm font-medium text-[#60A5FA] hover:text-blue-400">View All</button>
          </div>
          <div className="bg-[#0B1221] rounded-xl p-6 border border-gray-800/60 flex flex-col items-center justify-center text-center">
            <FaTrophy className="text-[#F59E0B] text-4xl mb-3" />
            <h3 className="text-sm font-bold text-white mb-1">Player of the Match</h3>
            <p className="text-xs text-gray-400 mb-1">vs Riverside FC</p>
            <p className="text-xs text-gray-500 font-medium">Jan 18, 2025</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoachPlayerDetails;
