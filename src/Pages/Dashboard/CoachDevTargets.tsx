import { useState, useEffect } from "react";
import { FiPlus, FiCheckCircle } from "react-icons/fi";
import { jwtDecode } from "jwt-decode";
import { message } from "antd";

interface JwtPayload {
  role?: string;
}

interface TargetItem {
  id: number;
  title: string;
  playerInitials: string;
  playerName: string;
  playerAvatarBg: string;
  category: string;
  dueDate: string;
  progress: number;
  status: "In Progress" | "Completed";
}

const initialTargetsData: TargetItem[] = [
  // In Progress Targets
  {
    id: 1,
    title: "Improve Passing Accuracy to 85%",
    playerInitials: "JM",
    playerName: "James Mitchell",
    playerAvatarBg: "bg-[#2563EB]",
    category: "Technical",
    dueDate: "Due Jan 31",
    progress: 72,
    status: "In Progress",
  },
  {
    id: 2,
    title: "Improve Passing Accuracy to 85%",
    playerInitials: "JM",
    playerName: "James Mitchell",
    playerAvatarBg: "bg-[#2563EB]",
    category: "Technical",
    dueDate: "Due Jan 31",
    progress: 72,
    status: "In Progress",
  },
  {
    id: 3,
    title: "Complete 10 Heading Drills",
    playerInitials: "TB",
    playerName: "Tyler Brooks",
    playerAvatarBg: "bg-[#059669]",
    category: "Physical",
    dueDate: "Due Jan 28",
    progress: 60,
    status: "In Progress",
  },
  {
    id: 4,
    title: "Complete 10 Heading Drills",
    playerInitials: "TB",
    playerName: "Tyler Brooks",
    playerAvatarBg: "bg-[#059669]",
    category: "Physical",
    dueDate: "Due Jan 28",
    progress: 60,
    status: "In Progress",
  },
  {
    id: 5,
    title: "Score 5 Goals in Training",
    playerInitials: "AC",
    playerName: "Aiden Clarke",
    playerAvatarBg: "bg-[#DC2626]",
    category: "Technical",
    dueDate: "Due Feb 14",
    progress: 40,
    status: "In Progress",
  },
  {
    id: 6,
    title: "Score 5 Goals in Training",
    playerInitials: "AC",
    playerName: "Aiden Clarke",
    playerAvatarBg: "bg-[#DC2626]",
    category: "Technical",
    dueDate: "Due Feb 14",
    progress: 40,
    status: "In Progress",
  },

  // Completed Targets
  {
    id: 7,
    title: "Improve Communication Rating",
    playerInitials: "LW",
    playerName: "Leon Williams",
    playerAvatarBg: "bg-[#7C3AED]",
    category: "Social",
    dueDate: "Due Jan 15",
    progress: 100,
    status: "Completed",
  },
  {
    id: 8,
    title: "Improve Communication Rating",
    playerInitials: "LW",
    playerName: "Leon Williams",
    playerAvatarBg: "bg-[#7C3AED]",
    category: "Social",
    dueDate: "Due Jan 15",
    progress: 100,
    status: "Completed",
  },
  {
    id: 9,
    title: "First Team Training Sessions x3",
    playerInitials: "KR",
    playerName: "Kai Robertson",
    playerAvatarBg: "bg-[#D97706]",
    category: "Development",
    dueDate: "Due Jan 20",
    progress: 100,
    status: "Completed",
  },
  {
    id: 10,
    title: "First Team Training Sessions x3",
    playerInitials: "KR",
    playerName: "Kai Robertson",
    playerAvatarBg: "bg-[#D97706]",
    category: "Development",
    dueDate: "Due Jan 20",
    progress: 100,
    status: "Completed",
  },
];

const DevTargets = () => {
  const [isCoach, setIsCoach] = useState(false);
  const [targets, setTargets] = useState<TargetItem[]>(initialTargetsData);

  // Modals state
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newSuccessCriteria, setNewSuccessCriteria] = useState("");
  const [newPlayer, setNewPlayer] = useState("James Mitchell");
  const [newPriority, setNewPriority] = useState("High");
  const [newCategory, setNewCategory] = useState("Technical");
  const [newDueDate, setNewDueDate] = useState("2025-01-31");

  const [activeProgressTarget, setActiveProgressTarget] = useState<TargetItem | null>(null);
  const [progressInput, setProgressInput] = useState<number>(72);

  useEffect(() => {
    const token = localStorage.getItem("authToken") || sessionStorage.getItem("authToken");
    if (token) {
      try {
        const decoded = jwtDecode<JwtPayload>(token);
        setIsCoach(decoded.role === "COACH");
      } catch (e) {
        setIsCoach(false);
      }
    }
  }, []);

  const inProgressTargets = targets.filter((t) => t.status === "In Progress");
  const completedTargets = targets.filter((t) => t.status === "Completed");

  const handleCreateTarget = () => {
    if (!newTitle.trim()) return;
    const newTargetObj: TargetItem = {
      id: Date.now(),
      title: newTitle,
      playerInitials: newPlayer
        .split(" ")
        .map((n) => n[0])
        .join(""),
      playerName: newPlayer,
      playerAvatarBg: "bg-[#2563EB]",
      category: newCategory,
      dueDate: "Due Feb 28",
      progress: 0,
      status: "In Progress",
    };
    setTargets([newTargetObj, ...targets]);
    setIsCreateModalOpen(false);
    setNewTitle("");
    message.success("New target created successfully!");
  };

  const handleUpdateProgress = () => {
    if (!activeProgressTarget) return;
    setTargets((prev) =>
      prev.map((item) => {
        if (item.id === activeProgressTarget.id) {
          const isDone = progressInput >= 100;
          return {
            ...item,
            progress: progressInput,
            status: isDone ? "Completed" : "In Progress",
          };
        }
        return item;
      })
    );
    setActiveProgressTarget(null);
    message.success("Target progress updated!");
  };

  return (
    <div
      className={`flex flex-col h-full p-6 pb-12 overflow-y-auto ${
        isCoach ? "bg-[#050E21]" : "bg-[#050E21]"
      }`}
    >
      {/* Header & Create Action Button */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-[24px] font-bold text-white leading-tight">Targets</h1>
          <p className="text-[14px] text-[#94A3B8] font-medium mt-1">
            Track player development objectives
          </p>
        </div>

        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="bg-gradient-to-b from-[#1E4ED8] to-[#0F2B8D] hover:opacity-95 text-white font-bold px-6 py-2.5 rounded-full flex items-center gap-2 text-[14px] shadow-md transition-all cursor-pointer border border-blue-400/20"
        >
          <FiPlus size={18} />
          <span>Create Targets</span>
        </button>
      </div>

      {/* Main 2-Column Section (In Progress & Completed) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Column 1: In Progress Section (lg:col-span-7) */}
        <div className="lg:col-span-7 flex flex-col gap-5">
          {/* Section Header */}
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#3B82F6]" />
              <h2 className="text-[16px] font-bold text-white">In Progress</h2>
            </div>
            <span className="bg-[#162E58] text-[#94A3B8] px-3 py-0.5 rounded-full text-[12px] font-bold">
              {inProgressTargets.length}
            </span>
          </div>

          {/* Target Cards Grid (2 cols inside) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {inProgressTargets.map((target) => (
              <div
                key={target.id}
                className="bg-[#0B1B38] border border-[#162E58] rounded-2xl p-5 flex flex-col justify-between hover:border-[#234580] transition-all shadow-sm"
              >
                {/* Target Title */}
                <h3 className="text-[15px] font-bold text-white leading-snug mb-4 min-h-[42px]">
                  {target.title}
                </h3>

                {/* Player Row */}
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className={`w-7 h-7 rounded-full ${target.playerAvatarBg} text-white font-bold text-[11px] flex items-center justify-center shrink-0 shadow-xs`}
                  >
                    {target.playerInitials}
                  </div>
                  <span className="text-[13px] font-bold text-[#94A3B8] truncate">
                    {target.playerName}
                  </span>
                </div>

                {/* Category & Due Date */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="bg-[#1E3A8A] text-[#60A5FA] px-3 py-0.5 rounded-full text-[11px] font-bold border border-[#2563EB]/30">
                    {target.category}
                  </span>
                  <span className="text-[12px] font-medium text-[#64748B]">
                    {target.dueDate}
                  </span>
                </div>

                {/* Progress Bar */}
                <div className="flex flex-col mb-4">
                  <div className="flex items-center justify-between text-[12px] mb-1">
                    <span className="text-[#94A3B8] font-medium">Progress</span>
                    <span className="text-white font-bold">{target.progress}%</span>
                  </div>
                  <div className="w-full bg-[#162E58] h-1.5 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#1D4ED8] to-[#3B82F6] rounded-full"
                      style={{ width: `${target.progress}%` }}
                    />
                  </div>
                </div>

                {/* Action Button */}
                <button
                  onClick={() => {
                    setActiveProgressTarget(target);
                    setProgressInput(target.progress);
                  }}
                  className="w-full border border-[#162E58] hover:border-[#3B82F6] text-[#94A3B8] hover:text-white text-[12px] font-bold py-2 rounded-full text-center transition-all cursor-pointer"
                >
                  Set Progress
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Column 2: Completed Section (lg:col-span-5) */}
        <div className="lg:col-span-5 flex flex-col gap-5">
          {/* Section Header */}
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#10B981]" />
              <h2 className="text-[16px] font-bold text-white">Completed</h2>
            </div>
            <span className="bg-[#162E58] text-[#94A3B8] px-3 py-0.5 rounded-full text-[12px] font-bold">
              {completedTargets.length}
            </span>
          </div>

          {/* Completed Target Cards Grid (2 cols inside) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {completedTargets.map((target) => (
              <div
                key={target.id}
                className="bg-[#0B1B38] border border-[#162E58] rounded-2xl p-5 flex flex-col justify-between hover:border-[#234580] transition-all shadow-sm"
              >
                {/* Target Title */}
                <h3 className="text-[15px] font-bold text-white leading-snug mb-4 min-h-[42px]">
                  {target.title}
                </h3>

                {/* Player Row */}
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className={`w-7 h-7 rounded-full ${target.playerAvatarBg} text-white font-bold text-[11px] flex items-center justify-center shrink-0 shadow-xs`}
                  >
                    {target.playerInitials}
                  </div>
                  <span className="text-[13px] font-bold text-[#94A3B8] truncate">
                    {target.playerName}
                  </span>
                </div>

                {/* Category & Due Date */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="bg-[#1E3A8A] text-[#60A5FA] px-3 py-0.5 rounded-full text-[11px] font-bold border border-[#2563EB]/30">
                    {target.category}
                  </span>
                  <span className="text-[12px] font-medium text-[#64748B]">
                    {target.dueDate}
                  </span>
                </div>

                {/* Achieved Status Indicator */}
                <div className="flex items-center gap-1.5 text-[#34D399] font-bold text-[13px] pt-1">
                  <FiCheckCircle size={15} />
                  <span>Achieved</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal 1: Create Target Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-4">
          <div className="bg-[#0B1B38] border border-[#162E58] text-white rounded-2xl w-full max-w-lg p-6 shadow-2xl flex flex-col relative max-h-[90vh] overflow-y-auto custom-scrollbar">
            {/* Header */}
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-[20px] font-bold text-white leading-tight">Create Target</h2>
              <button
                onClick={() => setIsCreateModalOpen(false)}
                className="text-[#64748B] hover:text-white text-xl font-bold cursor-pointer transition-colors"
              >
                ✕
              </button>
            </div>

            <div className="flex flex-col gap-4">
              {/* Target Title */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[13px] font-bold text-white">Target Title</label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Improve first touch to 90%"
                  className="bg-[#07152F] border border-[#162E58] text-white text-[13px] rounded-xl px-4 py-3 w-full placeholder-[#64748B] focus:outline-none focus:border-[#3B82F6] transition-colors"
                />
              </div>

              {/* Description */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[13px] font-bold text-white">Description</label>
                <textarea
                  rows={2}
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  placeholder="Describe the target in detail"
                  className="bg-[#07152F] border border-[#162E58] text-white text-[13px] rounded-xl px-4 py-3 w-full placeholder-[#64748B] focus:outline-none focus:border-[#3B82F6] transition-colors"
                />
              </div>

              {/* Success Criteria */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[13px] font-bold text-white">Success Criteria</label>
                <textarea
                  rows={2}
                  value={newSuccessCriteria}
                  onChange={(e) => setNewSuccessCriteria(e.target.value)}
                  placeholder="How will success be measured?"
                  className="bg-[#07152F] border border-[#162E58] text-white text-[13px] rounded-xl px-4 py-3 w-full placeholder-[#64748B] focus:outline-none focus:border-[#3B82F6] transition-colors"
                />
              </div>

              {/* Row 1: Player & Priority */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[13px] font-bold text-white">Player</label>
                  <div className="relative">
                    <select
                      value={newPlayer}
                      onChange={(e) => setNewPlayer(e.target.value)}
                      className="bg-[#07152F] border border-[#162E58] text-white text-[13px] rounded-xl px-4 py-3 w-full appearance-none focus:outline-none focus:border-[#3B82F6] cursor-pointer"
                    >
                      <option value="James Mitchell">James Mitchell</option>
                      <option value="Tyler Brooks">Tyler Brooks</option>
                      <option value="Aiden Clarke">Aiden Clarke</option>
                      <option value="Leon Williams">Leon Williams</option>
                      <option value="Kai Robertson">Kai Robertson</option>
                    </select>
                    <span className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 text-[10px]">
                      ▼
                    </span>
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[13px] font-bold text-white">Priority</label>
                  <div className="relative">
                    <select
                      value={newPriority}
                      onChange={(e) => setNewPriority(e.target.value)}
                      className="bg-[#07152F] border border-[#162E58] text-white text-[13px] rounded-xl px-4 py-3 w-full appearance-none focus:outline-none focus:border-[#3B82F6] cursor-pointer"
                    >
                      <option value="High">High</option>
                      <option value="Medium">Medium</option>
                      <option value="Low">Low</option>
                    </select>
                    <span className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 text-[10px]">
                      ▼
                    </span>
                  </div>
                </div>
              </div>

              {/* Row 2: Category & Due Date */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[13px] font-bold text-white">Category</label>
                  <div className="relative">
                    <select
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value)}
                      className="bg-[#07152F] border border-[#162E58] text-white text-[13px] rounded-xl px-4 py-3 w-full appearance-none focus:outline-none focus:border-[#3B82F6] cursor-pointer"
                    >
                      <option value="Technical">Technical</option>
                      <option value="Physical">Physical</option>
                      <option value="Social">Social</option>
                      <option value="Development">Development</option>
                    </select>
                    <span className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 text-[10px]">
                      ▼
                    </span>
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[13px] font-bold text-white">Due Date</label>
                  <input
                    type="date"
                    value={newDueDate}
                    onChange={(e) => setNewDueDate(e.target.value)}
                    className="bg-[#07152F] border border-[#162E58] text-white text-[13px] rounded-xl px-4 py-3 w-full focus:outline-none focus:border-[#3B82F6] cursor-pointer"
                  />
                </div>
              </div>

              {/* Action Buttons Row */}
              <div className="flex items-center gap-3 mt-4">
                <button
                  onClick={() => setIsCreateModalOpen(false)}
                  className="w-1/2 border border-[#162E58] hover:border-gray-500 text-[#94A3B8] hover:text-white font-bold py-3 rounded-full text-[13px] transition-all cursor-pointer text-center"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreateTarget}
                  className="w-1/2 bg-gradient-to-b from-[#1E4ED8] to-[#0F2B8D] hover:opacity-95 text-white font-bold py-3 rounded-full text-[13px] shadow-md transition-all cursor-pointer text-center"
                >
                  Create Target
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal 2: Set Progress of this Target */}
      {activeProgressTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-4">
          <div className="bg-[#0B1B38] border border-[#162E58] text-white rounded-2xl w-full max-w-lg p-6 shadow-2xl flex flex-col relative">
            {/* Top Header */}
            <div className="flex items-center justify-between mb-2">
              <span className="text-[15px] font-bold text-white">Set Progress of this Target</span>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <div
                    className={`w-7 h-7 rounded-full ${activeProgressTarget.playerAvatarBg} text-white font-bold text-[11px] flex items-center justify-center`}
                  >
                    {activeProgressTarget.playerInitials}
                  </div>
                  <span className="text-[13px] font-bold text-white">
                    {activeProgressTarget.playerName}
                  </span>
                </div>

                <button
                  onClick={() => setActiveProgressTarget(null)}
                  className="text-red-500 hover:text-red-400 text-lg font-bold cursor-pointer transition-colors ml-2"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Target Title & Badges */}
            <h3 className="text-[22px] font-bold text-white leading-tight mt-3">
              {activeProgressTarget.title}
            </h3>

            <div className="flex items-center gap-2.5 mt-3 mb-4">
              <span className="bg-[#1E3A8A] text-[#60A5FA] px-3 py-1 rounded-full text-[12px] font-bold border border-[#2563EB]/40">
                {activeProgressTarget.category}
              </span>
              <span className="border border-[#10B981]/50 text-[#34D399] bg-[#064E3B]/40 px-3 py-1 rounded-full text-[12px] font-bold">
                High
              </span>
            </div>

            {/* Target Description */}
            <p className="text-[13px] font-medium text-[#94A3B8] leading-relaxed mb-4">
              Improve the player's left foot passing accuracy and confidence during training sessions and match situations.
            </p>

            {/* Success Criteria */}
            <div className="border-t border-[#162E58] pt-4 mb-6">
              <p className="text-[13px] font-medium text-[#94A3B8] leading-relaxed">
                Successfully complete at least 8 out of 10 accurate left-foot passes in training for 3 consecutive sessions.
              </p>
            </div>

            {/* Progress Slider */}
            <div className="flex flex-col mb-6">
              <div className="flex items-center justify-between text-[13px] mb-2">
                <span className="font-bold text-white">Progress</span>
                <div className="flex items-center gap-2">
                  <span className="text-[#94A3B8] text-[12px]">
                    Prev: {activeProgressTarget.progress}%
                  </span>
                  <span className="font-bold text-white text-[16px]">
                    {progressInput}%
                  </span>
                </div>
              </div>

              <input
                type="range"
                min={0}
                max={100}
                step={1}
                value={progressInput}
                onChange={(e) => setProgressInput(parseInt(e.target.value))}
                className="w-full h-2 bg-[#162E58] rounded-full appearance-none cursor-pointer focus:outline-none accent-[#3B82F6]"
              />
            </div>

            {/* Save Button */}
            <div className="flex justify-end">
              <button
                onClick={handleUpdateProgress}
                className="bg-gradient-to-b from-[#1E4ED8] to-[#0F2B8D] hover:opacity-95 text-white font-bold px-7 py-3 rounded-full flex items-center gap-2 text-[13px] shadow-md transition-all cursor-pointer border border-blue-400/20"
              >
                <FiCheckCircle size={16} />
                <span>Save Progress</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DevTargets;
