import { useState, useEffect } from "react";
import { FiChevronLeft, FiActivity, FiFileText, FiTarget, FiPlus, FiSend, FiUser, FiMapPin, FiHeart } from "react-icons/fi";
import { BiTrophy } from "react-icons/bi";
import { useNavigate, useParams } from "react-router-dom";
import { Modal, message, Spin, Alert } from "antd";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { useGetPlayerByIdQuery } from "../../redux/apiSlices/playerSlice";
import { imageUrl } from "../../redux/api/baseApi";



const PlayerDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const { data: apiResponse, isLoading, isError } = useGetPlayerByIdQuery(id || "", {
    skip: !id,
  });

  const player = apiResponse?.data;

  // Modals state
  const [modalType, setModalType] = useState<"assess" | "note" | "target" | "attendance" | "achievement" | null>(null);
  const [inputVal, setInputVal] = useState("");

  // Development stats form state (derived from API)
  const [goals, setGoals] = useState("0");
  const [assists, setAssists] = useState("0");
  const [potm, setPotm] = useState("0");

  useEffect(() => {
    if (player?.otherDevelopment) {
      setGoals(player.otherDevelopment.goals?.toString() || "0");
      setAssists(player.otherDevelopment.assists?.toString() || "0");
      setPotm(player.otherDevelopment.potm?.toString() || "0");
    }
  }, [player]);

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

  if (isLoading) {
    return (
      <div className="flex flex-col h-full bg-[#f8faff] p-6 pb-12 items-center justify-center">
        <Spin size="large" />
      </div>
    );
  }

  if (isError || !player) {
    return (
      <div className="flex flex-col h-full bg-[#f8faff] p-6 pb-12">
        <button onClick={() => navigate(-1)} className="flex items-center gap-1.5 text-[13px] font-semibold text-gray-500 hover:text-gray-900 mb-4 transition-colors cursor-pointer w-fit">
          <FiChevronLeft size={16} />
          <span>Back</span>
        </button>
        <Alert type="error" message="Failed to load player details. Please try again." />
      </div>
    );
  }

  const { assessment = {}, address = {}, medicalInfo = {}, parentId = {}, otherDevelopment = {} } = player;

  // Calculate Overall Score
  const assessValues = [
    assessment.technical || 0,
    assessment.mentality || 0,
    assessment.physicality || 0,
    assessment.psychological || 0,
    assessment.social || 0,
  ];
  const overallScore = (assessValues.reduce((a, b) => a + b, 0) / 5).toFixed(1);

  const getAvatarInitials = (first: string, last: string) => {
    return `${first?.charAt(0) || ""}${last?.charAt(0) || ""}`.toUpperCase() || "P";
  };

  // Dynamic Attendance (Fallback to 0 since API doesn't provide specific breakdown)
  const attRateStr = player.attendanceRate || "0";
  const attRate = parseInt(attRateStr.replace(/\D/g, ''), 10) || 0;
  
  const dynamicAttendanceData = [
    { name: "Attended", value: attRate, color: "#3B82F6" },
    { name: "Missed", value: attRate > 0 ? 100 - attRate : 100, color: "#EF4444" },
    { name: "Late", value: 0, color: "#F59E0B" },
  ];

  return (
    <div className="flex flex-col h-full bg-[#f8faff] p-6 pb-12 overflow-y-auto">
      {/* Back Link */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-1.5 text-[13px] font-semibold text-gray-500 hover:text-gray-900 mb-4 transition-colors cursor-pointer w-fit"
      >
        <FiChevronLeft size={16} />
        <span>Players List</span>
      </button>

      {/* Top Banner Card */}
      <div className="bg-white border border-gray-100 rounded-2xl p-6 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-6 shadow-sm">
        {/* Left Side: Avatar & Details */}
        <div className="flex items-center gap-5">
          {player.image ? (
            <img 
              src={player.image.startsWith("http") ? player.image : `${imageUrl}${player.image}`} 
              alt={player.firstName}
              className="w-20 h-20 rounded-2xl object-cover shrink-0 shadow-md"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none";
                const parent = (e.target as HTMLImageElement).parentElement;
                if (parent) {
                  const fallbackDiv = document.createElement("div");
                  fallbackDiv.className = "w-20 h-20 rounded-2xl bg-[#1239D4] text-white font-bold text-[28px] flex items-center justify-center shrink-0 shadow-md";
                  fallbackDiv.innerText = getAvatarInitials(player.firstName, player.lastName);
                  parent.appendChild(fallbackDiv);
                }
              }}
            />
          ) : (
            <div className="w-20 h-20 rounded-2xl bg-[#1239D4] text-white font-bold text-[28px] flex items-center justify-center shrink-0 shadow-md">
              {getAvatarInitials(player.firstName, player.lastName)}
            </div>
          )}

          <div className="flex flex-col">
            <div className="flex items-center gap-3">
              <h1 className="text-[24px] font-bold text-gray-900 leading-tight capitalize">
                {player.firstName} {player.lastName}
              </h1>
              <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-[12px] font-bold border border-blue-200 capitalize">
                {player.ageGroup || "N/A"}
              </span>
            </div>

            <p className="text-[13px] font-medium text-gray-500 mt-1 capitalize">
              {player.squadId?.name || "Unassigned"} · {player.playingPosition || "N/A"} · Age {player.age || "N/A"} · {player.nationality}
            </p>

            <div className="flex items-center gap-6 mt-3 text-[13px]">
              <div>
                <span className="text-gray-500 font-medium mr-1.5">Overall Score</span>
                <span className="text-gray-900 font-bold text-[15px]">{overallScore}</span>
                <span className="text-gray-400 text-[12px]"> /10</span>
              </div>
              <div>
                <span className="text-gray-500 font-medium mr-1.5">ID</span>
                <span className="text-[#10B981] font-bold text-[15px]">{player.playerId}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Set Other Development Form Box */}
        <div className="bg-gray-50 border border-gray-100 rounded-2xl p-4 flex flex-col gap-2 shrink-0 self-stretch lg:self-auto">
          <span className="text-[13px] font-bold text-gray-900">Other Development</span>

          <div className="flex items-center gap-3">
            <div className="flex flex-col gap-1">
              <span className="text-[10px] font-bold text-gray-400 uppercase">Goals</span>
              <input
                type="text"
                value={goals}
                onChange={(e) => setGoals(e.target.value)}
                className="w-16 bg-white border border-gray-200 text-gray-900 font-bold text-[14px] px-3 py-1.5 rounded-lg text-center focus:outline-none focus:border-blue-500 shadow-sm"
              />
            </div>

            <div className="flex flex-col gap-1">
              <span className="text-[10px] font-bold text-gray-400 uppercase">Assists</span>
              <input
                type="text"
                value={assists}
                onChange={(e) => setAssists(e.target.value)}
                className="w-16 bg-white border border-gray-200 text-gray-900 font-bold text-[14px] px-3 py-1.5 rounded-lg text-center focus:outline-none focus:border-blue-500 shadow-sm"
              />
            </div>

            <div className="flex flex-col gap-1">
              <span className="text-[10px] font-bold text-gray-400 uppercase">POTM</span>
              <input
                type="text"
                value={potm}
                onChange={(e) => setPotm(e.target.value)}
                className="w-16 bg-white border border-gray-200 text-gray-900 font-bold text-[14px] px-3 py-1.5 rounded-lg text-center focus:outline-none focus:border-blue-500 shadow-sm"
              />
            </div>

            <button
              onClick={handleSaveStats}
              className="bg-[#1239D4] hover:bg-blue-800 text-white font-bold text-[12px] px-4 py-2.5 rounded-xl shadow-sm cursor-pointer self-end transition-all"
            >
              Save All
            </button>
          </div>
        </div>
      </div>

      {/* Main Grid Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
        
        {/* Column 1: Development Scores */}
        <div className="flex flex-col gap-6 h-full">
          <div className="bg-white border border-gray-100 rounded-2xl p-6 flex flex-col shadow-sm flex-1">
            {/* Header */}
            <div className="flex items-center justify-between mb-5">
            <h3 className="text-[16px] font-bold text-gray-900">Development Scores</h3>
            <button
              onClick={() => setModalType("assess")}
              className="bg-white hover:bg-gray-50 text-gray-500 hover:text-gray-900 text-[12px] font-bold px-3 py-1.5 rounded-full border border-gray-200 flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <FiActivity size={13} />
              <span>Add New Assess</span>
            </button>
          </div>

          {/* Development Score Bars */}
          <div className="flex flex-col gap-4">
            {/* Technical */}
            <div className="flex items-center justify-between gap-3">
              <span className="text-[13px] font-medium text-gray-500 w-28 shrink-0">Technical</span>
              <div className="flex-1 bg-gray-100 h-2 rounded-full overflow-hidden">
                <div className="h-full bg-[#3B82F6] rounded-full" style={{ width: `${(assessment.technical || 0) * 10}%` }} />
              </div>
              <span className="text-[13px] font-bold text-gray-900 w-8 text-right">{assessment.technical || 0}</span>
            </div>

            {/* Physical */}
            <div className="flex items-center justify-between gap-3">
              <span className="text-[13px] font-medium text-gray-500 w-28 shrink-0">Physical</span>
              <div className="flex-1 bg-gray-100 h-2 rounded-full overflow-hidden">
                <div className="h-full bg-[#10B981] rounded-full" style={{ width: `${(assessment.physicality || 0) * 10}%` }} />
              </div>
              <span className="text-[13px] font-bold text-gray-900 w-8 text-right">{assessment.physicality || 0}</span>
            </div>

            {/* Mentality */}
            <div className="flex items-center justify-between gap-3">
              <span className="text-[13px] font-medium text-gray-500 w-28 shrink-0">Mentality</span>
              <div className="flex-1 bg-gray-100 h-2 rounded-full overflow-hidden">
                <div className="h-full bg-[#F59E0B] rounded-full" style={{ width: `${(assessment.mentality || 0) * 10}%` }} />
              </div>
              <span className="text-[13px] font-bold text-gray-900 w-8 text-right">{assessment.mentality || 0}</span>
            </div>

            {/* Social */}
            <div className="flex items-center justify-between gap-3">
              <span className="text-[13px] font-medium text-gray-500 w-28 shrink-0">Social</span>
              <div className="flex-1 bg-gray-100 h-2 rounded-full overflow-hidden">
                <div className="h-full bg-[#A855F7] rounded-full" style={{ width: `${(assessment.social || 0) * 10}%` }} />
              </div>
              <span className="text-[13px] font-bold text-gray-900 w-8 text-right">{assessment.social || 0}</span>
            </div>

            {/* Psychological */}
            <div className="flex items-center justify-between gap-3">
              <span className="text-[13px] font-medium text-gray-500 w-28 shrink-0">Psychological</span>
              <div className="flex-1 bg-gray-100 h-2 rounded-full overflow-hidden">
                <div className="h-full bg-[#06B6D4] rounded-full" style={{ width: `${(assessment.psychological || 0) * 10}%` }} />
              </div>
              <span className="text-[13px] font-bold text-gray-900 w-8 text-right">{assessment.psychological || 0}</span>
            </div>
          </div>
          
          {assessment.remarks && (
            <div className="mt-6 p-4 bg-blue-50/50 rounded-xl border border-blue-100">
               <span className="text-[12px] font-bold text-blue-600 block mb-1">Coach Remarks:</span>
               <p className="text-[13px] text-gray-600 font-medium leading-relaxed">{assessment.remarks}</p>
            </div>
          )}
        </div>
        </div>

        {/* Column 2: New Information Cards (Parent, Medical, Address) */}
        <div className="flex flex-col gap-6 h-full">
           {/* Parent Info */}
           <div className="bg-white border border-gray-100 rounded-2xl p-6 flex flex-col shadow-sm">
            <div className="flex items-center gap-2 mb-4 text-[#1239D4]">
              <FiUser size={18} />
              <h3 className="text-[16px] font-bold text-gray-900">Parent / Guardian</h3>
            </div>
            <div className="flex items-center gap-4 mb-4">
               {parentId.image ? (
                 <img src={parentId.image.startsWith("http") ? parentId.image : `${imageUrl}${parentId.image}`} alt="Parent" className="w-12 h-12 rounded-full object-cover" />
               ) : (
                 <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-400"><FiUser size={20} /></div>
               )}
               <div>
                  <h4 className="text-[14px] font-bold text-gray-900">{parentId.name || "N/A"}</h4>
                  <span className="text-[12px] text-gray-500">{player.relationshipToPlayer || "Parent"}</span>
               </div>
            </div>
            <div className="flex flex-col gap-2 text-[13px]">
               <div className="flex items-center justify-between border-b border-gray-50 pb-2">
                 <span className="text-gray-500 font-medium">Email</span>
                 <span className="text-gray-900 font-medium">{parentId.email || "N/A"}</span>
               </div>
               <div className="flex items-center justify-between border-b border-gray-50 pb-2 pt-1">
                 <span className="text-gray-500 font-medium">Alternative Phone</span>
                 <span className="text-gray-900 font-medium">{player.alternativePhone || "N/A"}</span>
               </div>
            </div>
           </div>

           {/* Address Info */}
           <div className="bg-white border border-gray-100 rounded-2xl p-6 flex flex-col shadow-sm flex-1">
            <div className="flex items-center gap-2 mb-4 text-[#10B981]">
              <FiMapPin size={18} />
              <h3 className="text-[16px] font-bold text-gray-900">Address Details</h3>
            </div>
            <div className="flex flex-col gap-2 text-[13px]">
               <div className="flex items-center justify-between border-b border-gray-50 pb-2">
                 <span className="text-gray-500 font-medium">Street</span>
                 <span className="text-gray-900 font-medium">{address.homeAddress || "N/A"}</span>
               </div>
               <div className="flex items-center justify-between border-b border-gray-50 pb-2 pt-1">
                 <span className="text-gray-500 font-medium">City</span>
                 <span className="text-gray-900 font-medium">{address.city || "N/A"}</span>
               </div>
               <div className="flex items-center justify-between pt-1">
                 <span className="text-gray-500 font-medium">Postcode</span>
                 <span className="text-gray-900 font-medium">{address.postcode || "N/A"}</span>
               </div>
            </div>
           </div>
        </div>

        {/* Column 3: Medical Info & Analytics */}
        <div className="flex flex-col gap-6 h-full">
           {/* Medical Info */}
           <div className="bg-white border border-gray-100 rounded-2xl p-6 flex flex-col shadow-sm">
            <div className="flex items-center gap-2 mb-4 text-[#EF4444]">
              <FiHeart size={18} />
              <h3 className="text-[16px] font-bold text-gray-900">Medical Info</h3>
            </div>
            <div className="flex flex-col gap-3 text-[13px]">
               <div className="flex items-center justify-between border-b border-gray-50 pb-2">
                 <span className="text-gray-500 font-medium">Blood Group</span>
                 <span className="bg-red-50 text-red-600 px-2 py-0.5 rounded font-bold">{medicalInfo.bloodGroup || "N/A"}</span>
               </div>
               <div className="flex items-center justify-between border-b border-gray-50 pb-2 pt-1">
                 <span className="text-gray-500 font-medium">Allergies</span>
                 <span className="text-gray-900 font-medium">
                    {medicalInfo.allergies?.length ? medicalInfo.allergies.join(", ") : "None"}
                 </span>
               </div>
               <div className="flex items-center justify-between border-b border-gray-50 pb-2 pt-1">
                 <span className="text-gray-500 font-medium">Conditions</span>
                 <span className="text-gray-900 font-medium">{medicalInfo.medicalConditions || "None"}</span>
               </div>
               <div className="flex items-center justify-between border-b border-gray-50 pb-2 pt-1">
                 <span className="text-gray-500 font-medium">Medications</span>
                 <span className="text-gray-900 font-medium">{medicalInfo.medications || "None"}</span>
               </div>
               <div className="flex flex-col pt-1">
                 <span className="text-gray-500 font-medium mb-1">Emergency Contact</span>
                 <span className="text-gray-900 font-bold">{medicalInfo.emergencyContactName || "N/A"} ({medicalInfo.emergencyPhone || "N/A"})</span>
               </div>
            </div>
           </div>

          {/* Attendance Analytics */}
          <div className="bg-white border border-gray-100 rounded-2xl p-6 flex flex-col shadow-sm flex-1">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[16px] font-bold text-gray-900">Attendance Analytics</h3>
            </div>

            <div className="flex items-center justify-between gap-4 mt-2">
              <div className="w-32 h-32 relative flex items-center justify-center shrink-0">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={dynamicAttendanceData}
                      cx="50%"
                      cy="50%"
                      innerRadius={38}
                      outerRadius={55}
                      paddingAngle={3}
                      dataKey="value"
                    >
                      {dynamicAttendanceData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute flex flex-col items-center justify-center text-center">
                  <span className="text-[18px] font-bold text-gray-900 leading-none">{attRate}%</span>
                  <span className="text-[9px] text-gray-500 font-medium mt-0.5 leading-none">
                    Attendance rate
                  </span>
                </div>
              </div>

              {/* Legend Breakdown */}
              <div className="flex flex-col gap-2.5 flex-1">
                <div className="flex items-center gap-2 text-[12px] font-bold text-gray-700">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#3B82F6] shrink-0" />
                  <span>Attended {attRate}%</span>
                </div>
                <div className="flex items-center gap-2 text-[12px] font-bold text-gray-700">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#EF4444] shrink-0" />
                  <span>Missed {attRate > 0 ? 100 - attRate : 100}%</span>
                </div>
                <div className="flex items-center gap-2 text-[12px] font-bold text-gray-700">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#F59E0B] shrink-0" />
                  <span>Late 0%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Dialog Modal */}
      <Modal
        title={
          modalType === "assess"
            ? `Add New Assessment for ${player.firstName}`
            : modalType === "note"
            ? `Add New Session Note for ${player.firstName}`
            : modalType === "target"
            ? `Set New Target for ${player.firstName}`
            : modalType === "attendance"
            ? "Set Attendance Status"
            : `Add Achievement for ${player.firstName}`
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
