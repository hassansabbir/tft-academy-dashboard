import { useState } from "react";
import { FiChevronLeft, FiActivity, FiFileText, FiTarget, FiPlus, FiSend } from "react-icons/fi";
import { BiTrophy } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { Modal, message } from "antd";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const attendanceData = [
  { name: "Attended", value: 87, color: "#3B82F6" },
  { name: "Missed", value: 8, color: "#EF4444" },
  { name: "Late", value: 5, color: "#F59E0B" },
];

const PlayerDetails = () => {
  const navigate = useNavigate();

  // Development stats form state
  const [goals, setGoals] = useState("12");
  const [assists, setAssists] = useState("8");
  const [potm, setPotm] = useState("2");

  // Modals state
  const [modalType, setModalType] = useState<"assess" | "note" | "target" | "attendance" | "achievement" | null>(null);
  const [inputVal, setInputVal] = useState("");

  const handleSaveStats = () => {
    message.success("Player development stats updated!");
  };

  const handleModalSubmit = () => {
    if (modalType === "assess") message.success("New assessment added!");
    if (modalType === "note") message.success("New note added!");
    if (modalType === "target") message.success("New target set!");
    if (modalType === "attendance") message.success("Attendance status updated!");
    if (modalType === "achievement") message.success("Achievement added!");
    setModalType(null);
    setInputVal("");
  };

  // Helper for star rating
  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= Math.floor(rating)) {
        stars.push(<span key={i} className="text-[#F59E0B]">★</span>);
      } else if (i - rating === 0.5) {
        stars.push(<span key={i} className="text-[#F59E0B]">★</span>);
      } else {
        stars.push(<span key={i} className="text-gray-600">★</span>);
      }
    }
    return stars;
  };

  return (
    <div className="flex flex-col h-full bg-[#050E21] p-6 pb-12 overflow-y-auto">
      {/* Back Link */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-1.5 text-[13px] font-semibold text-[#94A3B8] hover:text-white mb-4 transition-colors cursor-pointer w-fit"
      >
        <FiChevronLeft size={16} />
        <span>"U16 Futsal Fridays" Details</span>
      </button>

      {/* Top Banner Card */}
      <div className="bg-[#0B1B38] border border-[#162E58] rounded-2xl p-6 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-6 shadow-sm">
        {/* Left Side: Avatar & Details */}
        <div className="flex items-center gap-5">
          <div className="w-20 h-20 rounded-2xl bg-[#2563EB] text-white font-bold text-[28px] flex items-center justify-center shrink-0 shadow-md">
            JM
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-3">
              <h1 className="text-[24px] font-bold text-white leading-tight">
                James Mitchell
              </h1>
              <span className="bg-[#1E3A8A] text-[#60A5FA] px-3 py-1 rounded-full text-[12px] font-bold border border-[#2563EB]/40">
                Advanced
              </span>
            </div>

            <p className="text-[13px] font-medium text-[#94A3B8] mt-1">
              U16 Elite · #9 · ST · Age 15
            </p>

            <div className="flex items-center gap-6 mt-3 text-[13px]">
              <div>
                <span className="text-[#94A3B8] font-medium mr-1.5">Overall Score</span>
                <span className="text-white font-bold text-[15px]">8.2</span>
                <span className="text-[#64748B] text-[12px]"> /10</span>
              </div>
              <div>
                <span className="text-[#94A3B8] font-medium mr-1.5">Attendance</span>
                <span className="text-[#10B981] font-bold text-[15px]">94%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Set Other Development Form Box */}
        <div className="bg-[#07152F] border border-[#162E58] rounded-2xl p-4 flex flex-col gap-2 shrink-0 self-stretch lg:self-auto">
          <span className="text-[13px] font-bold text-white">Set Other Development</span>

          <div className="flex items-center gap-3">
            <div className="flex flex-col gap-1">
              <span className="text-[10px] font-bold text-[#64748B] uppercase">Goals</span>
              <input
                type="text"
                value={goals}
                onChange={(e) => setGoals(e.target.value)}
                className="w-16 bg-[#0B1B38] border border-[#162E58] text-white font-bold text-[14px] px-3 py-1.5 rounded-lg text-center focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="flex flex-col gap-1">
              <span className="text-[10px] font-bold text-[#64748B] uppercase">Assists</span>
              <input
                type="text"
                value={assists}
                onChange={(e) => setAssists(e.target.value)}
                className="w-16 bg-[#0B1B38] border border-[#162E58] text-white font-bold text-[14px] px-3 py-1.5 rounded-lg text-center focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="flex flex-col gap-1">
              <span className="text-[10px] font-bold text-[#64748B] uppercase">POTM</span>
              <input
                type="text"
                value={potm}
                onChange={(e) => setPotm(e.target.value)}
                className="w-16 bg-[#0B1B38] border border-[#162E58] text-white font-bold text-[14px] px-3 py-1.5 rounded-lg text-center focus:outline-none focus:border-blue-500"
              />
            </div>

            <button
              onClick={handleSaveStats}
              className="bg-gradient-to-b from-[#1E4ED8] to-[#0F2B8D] hover:opacity-95 text-white font-bold text-[12px] px-4 py-2.5 rounded-xl border border-blue-400/20 shadow-xs cursor-pointer self-end transition-all"
            >
              Save All
            </button>
          </div>
        </div>
      </div>

      {/* Main Grid Section (3 Columns) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Column 1: Development Scores & Football Skills */}
        <div className="bg-[#0B1B38] border border-[#162E58] rounded-2xl p-6 flex flex-col shadow-sm">
          {/* Header */}
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-[16px] font-bold text-white">Development Scores</h3>
            <button
              onClick={() => setModalType("assess")}
              className="bg-[#132A52] hover:bg-[#1C3A70] text-white text-[12px] font-bold px-3 py-1.5 rounded-full border border-[#234580] flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <FiActivity size={13} />
              <span>Add New Assess</span>
            </button>
          </div>

          {/* Development Score Bars */}
          <div className="flex flex-col gap-4">
            {/* Technical */}
            <div className="flex items-center justify-between gap-3">
              <span className="text-[13px] font-medium text-[#94A3B8] w-28 shrink-0">Technical</span>
              <div className="flex-1 bg-[#162E58] h-2 rounded-full overflow-hidden">
                <div className="h-full bg-[#3B82F6] rounded-full" style={{ width: "82%" }} />
              </div>
              <span className="text-[13px] font-bold text-white w-8 text-right">8.2</span>
            </div>

            {/* Physical */}
            <div className="flex items-center justify-between gap-3">
              <span className="text-[13px] font-medium text-[#94A3B8] w-28 shrink-0">Physical</span>
              <div className="flex-1 bg-[#162E58] h-2 rounded-full overflow-hidden">
                <div className="h-full bg-[#10B981] rounded-full" style={{ width: "78%" }} />
              </div>
              <span className="text-[13px] font-bold text-white w-8 text-right">7.8</span>
            </div>

            {/* Mentality */}
            <div className="flex items-center justify-between gap-3">
              <span className="text-[13px] font-medium text-[#94A3B8] w-28 shrink-0">Mentality</span>
              <div className="flex-1 bg-[#162E58] h-2 rounded-full overflow-hidden">
                <div className="h-full bg-[#F59E0B] rounded-full" style={{ width: "80%" }} />
              </div>
              <span className="text-[13px] font-bold text-white w-8 text-right">8</span>
            </div>

            {/* Social */}
            <div className="flex items-center justify-between gap-3">
              <span className="text-[13px] font-medium text-[#94A3B8] w-28 shrink-0">Social</span>
              <div className="flex-1 bg-[#162E58] h-2 rounded-full overflow-hidden">
                <div className="h-full bg-[#A855F7] rounded-full" style={{ width: "85%" }} />
              </div>
              <span className="text-[13px] font-bold text-white w-8 text-right">8.5</span>
            </div>

            {/* Psychological */}
            <div className="flex items-center justify-between gap-3">
              <span className="text-[13px] font-medium text-[#94A3B8] w-28 shrink-0">Psychological</span>
              <div className="flex-1 bg-[#162E58] h-2 rounded-full overflow-hidden">
                <div className="h-full bg-[#06B6D4] rounded-full" style={{ width: "75%" }} />
              </div>
              <span className="text-[13px] font-bold text-white w-8 text-right">7.5</span>
            </div>
          </div>

          {/* Football Skills Section */}
          <div className="mt-6 pt-6 border-t border-[#162E58] flex flex-col">
            <h4 className="text-[16px] font-bold text-white mb-4">Football Skills</h4>

            <div className="flex flex-col gap-3.5">
              <div className="flex items-center justify-between">
                <span className="text-[13px] font-medium text-[#94A3B8]">Shooting</span>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1 text-[13px]">{renderStars(4)}</div>
                  <span className="text-[13px] font-bold text-[#60A5FA] w-6 text-right">4</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-[13px] font-medium text-[#94A3B8]">Passing</span>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1 text-[13px]">{renderStars(4.5)}</div>
                  <span className="text-[13px] font-bold text-[#60A5FA] w-6 text-right">4.5</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-[13px] font-medium text-[#94A3B8]">Dribbling</span>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1 text-[13px]">{renderStars(4)}</div>
                  <span className="text-[13px] font-bold text-[#60A5FA] w-6 text-right">4</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-[13px] font-medium text-[#94A3B8]">Football IQ</span>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1 text-[13px]">{renderStars(4.5)}</div>
                  <span className="text-[13px] font-bold text-[#60A5FA] w-6 text-right">4.5</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-[13px] font-medium text-[#94A3B8]">Speed</span>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1 text-[13px]">{renderStars(3.5)}</div>
                  <span className="text-[13px] font-bold text-[#60A5FA] w-6 text-right">3.5</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-[13px] font-medium text-[#94A3B8]">Communication</span>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1 text-[13px]">{renderStars(4)}</div>
                  <span className="text-[13px] font-bold text-[#60A5FA] w-6 text-right">4</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Column 2: Recent Notes & Current Target */}
        <div className="flex flex-col gap-6">
          {/* Card 1: Recent Notes */}
          <div className="bg-[#0B1B38] border border-[#162E58] rounded-2xl p-6 flex flex-col shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <h3 className="text-[16px] font-bold text-white">Recent Notes</h3>
                <span className="text-[12px] font-bold text-[#60A5FA] hover:underline cursor-pointer">
                  View All
                </span>
              </div>

              <button
                onClick={() => setModalType("note")}
                className="bg-[#132A52] hover:bg-[#1C3A70] text-white text-[12px] font-bold px-3 py-1.5 rounded-full border border-[#234580] flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <FiFileText size={13} />
                <span>Add New Note</span>
              </button>
            </div>

            <div className="bg-[#07152F] border border-[#162E58] rounded-xl p-4 flex flex-col mt-1">
              <span className="bg-[#064E3B] text-[#34D399] px-3 py-0.5 rounded-full text-[11px] font-bold w-fit mb-2 border border-[#059669]/30">
                Positive
              </span>
              <p className="text-[13px] font-medium text-[#94A3B8] leading-snug">
                Excellent movement off the ball today. Showed great awareness in the final third and linked play effectively with teammates.
              </p>
              <span className="text-[11px] font-medium text-[#64748B] mt-2.5">
                Today 10:30
              </span>
            </div>
          </div>

          {/* Card 2: Current Target */}
          <div className="bg-[#0B1B38] border border-[#162E58] rounded-2xl p-6 flex flex-col shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <h3 className="text-[16px] font-bold text-white">Current Target</h3>
                <span className="text-[12px] font-bold text-[#60A5FA] hover:underline cursor-pointer">
                  View All
                </span>
              </div>

              <button
                onClick={() => setModalType("target")}
                className="bg-[#1239D4] hover:bg-blue-700 text-white text-[12px] font-bold px-3.5 py-1.5 rounded-full border border-blue-400/20 flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
              >
                <FiTarget size={13} />
                <span>Set New Target</span>
              </button>
            </div>

            <div className="bg-[#07152F] border border-[#162E58] rounded-xl p-4 flex flex-col mt-1">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-[14px] font-bold text-white">
                  Improve Left-Foot Finishing
                </h4>
                <span className="bg-[#1E3A8A] text-[#60A5FA] px-2.5 py-0.5 rounded-full text-[11px] font-bold border border-[#2563EB]/30">
                  In Progress
                </span>
              </div>

              <div className="flex items-center justify-between text-[12px] mt-1">
                <span className="text-[#94A3B8] font-medium">Progress</span>
                <span className="text-[#60A5FA] font-bold">62%</span>
              </div>

              <div className="w-full bg-[#162E58] h-1.5 rounded-full overflow-hidden mt-1.5 mb-3">
                <div
                  className="h-full bg-gradient-to-r from-[#1D4ED8] to-[#3B82F6] rounded-full"
                  style={{ width: "62%" }}
                />
              </div>

              <span className="text-[12px] font-medium text-[#64748B]">
                Due: 28 Feb 2025
              </span>
            </div>
          </div>
        </div>

        {/* Column 3: Attendance Analytics & Achievement */}
        <div className="flex flex-col gap-6">
          {/* Card 1: Attendance Analytics */}
          <div className="bg-[#0B1B38] border border-[#162E58] rounded-2xl p-6 flex flex-col shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[16px] font-bold text-white">Attendance Analytics</h3>

              <button
                onClick={() => setModalType("attendance")}
                className="bg-[#132A52] hover:bg-[#1C3A70] text-white text-[12px] font-bold px-3 py-1.5 rounded-full border border-[#234580] flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <FiSend size={13} />
                <span>Set Attendance Status</span>
              </button>
            </div>

            <div className="flex items-center justify-between gap-4 mt-2">
              {/* Donut Chart */}
              <div className="w-32 h-32 relative flex items-center justify-center shrink-0">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={attendanceData}
                      cx="50%"
                      cy="50%"
                      innerRadius={38}
                      outerRadius={55}
                      paddingAngle={3}
                      dataKey="value"
                    >
                      {attendanceData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute flex flex-col items-center justify-center text-center">
                  <span className="text-[18px] font-bold text-white leading-none">87%</span>
                  <span className="text-[9px] text-[#94A3B8] font-medium mt-0.5 leading-none">
                    Attendance rate
                  </span>
                </div>
              </div>

              {/* Legend Breakdown */}
              <div className="flex flex-col gap-2.5 flex-1">
                <div className="flex items-center gap-2 text-[12px] font-bold text-gray-300">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#3B82F6] shrink-0" />
                  <span>Attended 87%</span>
                </div>
                <div className="flex items-center gap-2 text-[12px] font-bold text-gray-300">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#EF4444] shrink-0" />
                  <span>Missed 8%</span>
                </div>
                <div className="flex items-center gap-2 text-[12px] font-bold text-gray-300">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#F59E0B] shrink-0" />
                  <span>Late 5%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Achievement */}
          <div className="bg-[#0B1B38] border border-[#162E58] rounded-2xl p-6 flex flex-col shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <h3 className="text-[16px] font-bold text-white">Achievement</h3>
                <span className="text-[12px] font-bold text-[#60A5FA] hover:underline cursor-pointer">
                  View All
                </span>
              </div>

              <button
                onClick={() => setModalType("achievement")}
                className="bg-[#132A52] hover:bg-[#1C3A70] text-white text-[12px] font-bold px-3 py-1.5 rounded-full border border-[#234580] flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <FiPlus size={13} />
                <span>Add Achievement</span>
              </button>
            </div>

            <div className="flex flex-col items-center justify-center text-center py-3 mt-1">
              <div className="w-14 h-14 rounded-2xl bg-[#EAB308]/15 text-[#EAB308] flex items-center justify-center mb-3">
                <BiTrophy size={28} />
              </div>
              <h4 className="text-[16px] font-bold text-white leading-tight">
                Player of the Match
              </h4>
              <p className="text-[13px] font-medium text-[#94A3B8] mt-0.5">
                vs Riverside FC
              </p>
              <span className="text-[12px] font-medium text-[#64748B] mt-1">
                Jan 18, 2025
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Action Dialog Modal */}
      <Modal
        title={
          modalType === "assess"
            ? "Add New Assessment for James Mitchell"
            : modalType === "note"
            ? "Add New Session Note for James Mitchell"
            : modalType === "target"
            ? "Set New Target for James Mitchell"
            : modalType === "attendance"
            ? "Set Attendance Status"
            : "Add Achievement for James Mitchell"
        }
        open={!!modalType}
        onOk={handleModalSubmit}
        onCancel={() => setModalType(null)}
        okText="Submit"
        okButtonProps={{ className: "bg-[#1239D4]" }}
        centered
      >
        <div className="flex flex-col gap-3 py-3">
          <label className="text-[13px] font-bold text-gray-800">
            {modalType === "assess"
              ? "Select Area & Rating:"
              : modalType === "note"
              ? "Note Details:"
              : modalType === "target"
              ? "Target Title & Deadline:"
              : modalType === "attendance"
              ? "Select Status (Attended / Missed / Late):"
              : "Achievement Title & Description:"}
          </label>
          <textarea
            rows={4}
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder="Type details here..."
            className="w-full p-3 border border-gray-200 rounded-xl text-[14px] focus:outline-none focus:border-blue-500"
          />
        </div>
      </Modal>
    </div>
  );
};

export default PlayerDetails;
