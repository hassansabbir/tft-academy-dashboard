import { useState, useEffect } from "react";
import { FiPlus, FiMail, FiEdit2 } from "react-icons/fi";
import { jwtDecode } from "jwt-decode";
import { message } from "antd";

interface JwtPayload {
  role?: string;
}

interface NoteItem {
  id: number;
  initials: string;
  name: string;
  tag: string;
  isParentNotified: boolean;
  date: string;
  content: string;
  coach: string;
  avatarBg: string;
}

const mockNotesData: NoteItem[] = [
  {
    id: 1,
    initials: "JM",
    name: "James Mitchell",
    tag: "Positive",
    isParentNotified: true,
    date: "Today 10:30",
    content:
      "Excellent movement off the ball today. Showed great awareness in the final third and linked play effectively with midfield. Continue to build on this.",
    coach: "Coach: Marcus Thompson",
    avatarBg: "bg-[#2563EB]",
  },
  {
    id: 2,
    initials: "AC",
    name: "Aiden Clarke",
    tag: "Improvement",
    isParentNotified: false,
    date: "Today 09:15",
    content:
      "Decision-making in wide areas needs work. Tends to hold the ball too long instead of delivering early crosses. Set specific drill for Thursday session.",
    coach: "Coach: Marcus Thompson",
    avatarBg: "bg-[#DC2626]",
  },
  {
    id: 3,
    initials: "TB",
    name: "Tyler Brooks",
    tag: "Tactical",
    isParentNotified: true,
    date: "Yesterday 17:00",
    content:
      "Great understanding of the offside trap today. Very vocal in organizing the back line. This is a real strength we need to continue developing consistently.",
    coach: "Coach: Marcus Thompson",
    avatarBg: "bg-[#059669]",
  },
  {
    id: 4,
    initials: "LW",
    name: "Leon Williams",
    tag: "Positive",
    isParentNotified: false,
    date: "Yesterday 16:30",
    content:
      "Passing range significantly improved this month. Both short and long passing were precise under pressure. Keep building this strong foundation.",
    coach: "Coach: Marcus Thompson",
    avatarBg: "bg-[#7C3AED]",
  },
];

const categoryFilters = [
  "All Notes",
  "Positive",
  "Improvement",
  "Tactical",
  "Behaviour",
  "Injury",
  "Match Performance",
];

const quickTemplates = [
  "Good session",
  "Needs work on",
  "Showed leadership",
  "Injury concern",
  "Excellent attitude",
];

const SessionNotes = () => {
  const [isCoach, setIsCoach] = useState(false);
  const [notes, setNotes] = useState<NoteItem[]>(mockNotesData);
  const [activeFilter, setActiveFilter] = useState("All Notes");

  // Modal State
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState("James Mitchell");
  const [selectedCategory, setSelectedCategory] = useState("Positive");
  const [noteText, setNoteText] = useState("");
  const [notifyParent, setNotifyParent] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("authToken") || sessionStorage.getItem("authToken");
    if (token) {
      try {
        const decoded = jwtDecode<JwtPayload>(token);
        setIsCoach(decoded.role === "CHOACH");
      } catch (e) {
        setIsCoach(false);
      }
    }
  }, []);

  const handleAddTemplate = (tmpl: string) => {
    setNoteText((prev) => (prev ? `${prev} ${tmpl}.` : `${tmpl}.`));
  };

  const handleSaveNote = () => {
    if (!noteText.trim()) return;

    const newNoteObj: NoteItem = {
      id: Date.now(),
      initials: selectedPlayer
        .split(" ")
        .map((n) => n[0])
        .join(""),
      name: selectedPlayer,
      tag: selectedCategory,
      isParentNotified: notifyParent,
      date: "Today " + new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      content: noteText,
      coach: "Coach: Marcus Thompson",
      avatarBg: "bg-[#2563EB]",
    };

    setNotes([newNoteObj, ...notes]);
    setIsAddModalOpen(false);
    setNoteText("");
    message.success("Session note saved successfully!");
  };

  const filteredNotes = notes.filter((item) => {
    if (activeFilter === "All Notes") return true;
    return item.tag.toLowerCase() === activeFilter.toLowerCase();
  });

  const getTagBadgeClass = (tag: string) => {
    switch (tag) {
      case "Positive":
        return "bg-[#064E3B] text-[#34D399] border-[#059669]/30";
      case "Improvement":
        return "bg-[#78350F] text-[#FBBF24] border-[#D97706]/30";
      case "Tactical":
        return "bg-[#1E3A8A] text-[#60A5FA] border-[#2563EB]/30";
      case "Injury":
        return "bg-[#7F1D1D] text-[#F87171] border-[#DC2626]/30";
      default:
        return "bg-[#1E3A8A] text-[#60A5FA] border-[#2563EB]/30";
    }
  };

  return (
    <div
      className={`flex flex-col h-full p-6 pb-12 overflow-y-auto ${
        isCoach ? "bg-[#050E21]" : "bg-[#050E21]"
      }`}
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div>
          <h1 className="text-[24px] font-bold text-white leading-tight">Session Notes</h1>
          <p className="text-[14px] text-[#94A3B8] font-medium mt-1">
            Track player progress and feedback
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="bg-gradient-to-b from-[#1E4ED8] to-[#0F2B8D] hover:opacity-95 text-white font-bold px-6 py-2.5 rounded-full flex items-center gap-2 text-[14px] shadow-md transition-all cursor-pointer border border-blue-400/20"
        >
          <FiPlus size={18} />
          <span>Add Note</span>
        </button>
      </div>

      {/* Category Filter Pills Row */}
      <div className="flex items-center gap-3 mb-8 overflow-x-auto py-2.5 px-1 min-h-[54px] custom-scrollbar">
        {categoryFilters.map((cat) => {
          const isActive = activeFilter === cat;
          return (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-5 py-2.5 rounded-full text-[13px] font-bold transition-all shrink-0 whitespace-nowrap inline-flex items-center justify-center cursor-pointer ${
                isActive
                  ? "bg-gradient-to-b from-[#1E4ED8] to-[#0F2B8D] text-white border border-blue-400/20 shadow-md"
                  : "bg-[#0B1B38] text-[#94A3B8] border border-[#162E58] hover:border-gray-500 hover:text-white"
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Session Notes List Cards Container */}
      <div className="flex flex-col gap-4">
        {filteredNotes.map((noteItem) => (
          <div
            key={noteItem.id}
            className="bg-[#0B1B38] border border-[#162E58] rounded-2xl p-6 flex flex-col gap-3 shadow-sm hover:border-[#234580] transition-all"
          >
            {/* Top Row: Avatar, Name, Badges, Date, Edit */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div
                  className={`w-9 h-9 rounded-full ${noteItem.avatarBg} text-white font-bold text-[13px] flex items-center justify-center shrink-0 shadow-xs`}
                >
                  {noteItem.initials}
                </div>

                <h3 className="text-[15px] font-bold text-white leading-tight">
                  {noteItem.name}
                </h3>

                <span
                  className={`px-3 py-0.5 rounded-full text-[11px] font-bold border ${getTagBadgeClass(
                    noteItem.tag
                  )}`}
                >
                  {noteItem.tag}
                </span>

                {noteItem.isParentNotified && (
                  <span className="text-[#94A3B8] text-[12px] font-medium flex items-center gap-1.5 ml-2">
                    <FiMail size={13} />
                    <span>Parent notified</span>
                  </span>
                )}
              </div>

              <div className="flex items-center gap-3">
                <span className="text-[12px] font-medium text-[#64748B]">
                  {noteItem.date}
                </span>
                <button className="text-[#64748B] hover:text-white transition-colors cursor-pointer">
                  <FiEdit2 size={15} />
                </button>
              </div>
            </div>

            {/* Note Content Paragraph */}
            <p className="text-[13px] font-medium text-[#94A3B8] leading-relaxed">
              {noteItem.content}
            </p>

            {/* Coach Subtext Footer */}
            <span className="text-[12px] font-medium text-[#64748B]">
              {noteItem.coach}
            </span>
          </div>
        ))}
      </div>

      {/* Add Session Note Custom Dark Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-4">
          <div className="bg-[#0B1B38] border border-[#162E58] text-white rounded-2xl w-full max-w-md p-6 shadow-2xl flex flex-col relative max-h-[90vh] overflow-y-auto custom-scrollbar">
            {/* Header */}
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-[20px] font-bold text-white leading-tight">
                Add Session Note
              </h2>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="text-[#64748B] hover:text-white text-xl font-bold cursor-pointer transition-colors"
              >
                ✕
              </button>
            </div>

            <div className="flex flex-col gap-4">
              {/* Row 1: Player & Category */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[13px] font-bold text-white">Player</label>
                  <div className="relative">
                    <select
                      value={selectedPlayer}
                      onChange={(e) => setSelectedPlayer(e.target.value)}
                      className="bg-[#07152F] border border-[#162E58] text-white text-[13px] rounded-xl px-4 py-3 w-full appearance-none focus:outline-none focus:border-[#3B82F6] cursor-pointer"
                    >
                      <option value="James Mitchell">James Mitchell</option>
                      <option value="Aiden Clarke">Aiden Clarke</option>
                      <option value="Tyler Brooks">Tyler Brooks</option>
                      <option value="Leon Williams">Leon Williams</option>
                    </select>
                    <span className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 text-[10px]">
                      ▼
                    </span>
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[13px] font-bold text-white">Category</label>
                  <div className="relative">
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="bg-[#07152F] border border-[#162E58] text-white text-[13px] rounded-xl px-4 py-3 w-full appearance-none focus:outline-none focus:border-[#3B82F6] cursor-pointer"
                    >
                      <option value="Positive">Positive</option>
                      <option value="Improvement">Improvement</option>
                      <option value="Tactical">Tactical</option>
                      <option value="Behaviour">Behaviour</option>
                      <option value="Injury">Injury</option>
                      <option value="Match Performance">Match Performance</option>
                    </select>
                    <span className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 text-[10px]">
                      ▼
                    </span>
                  </div>
                </div>
              </div>

              {/* Quick Templates Section */}
              <div className="flex flex-col gap-2">
                <label className="text-[13px] font-bold text-white">Quick Templates</label>
                <div className="flex flex-wrap gap-2">
                  {quickTemplates.map((tmpl) => (
                    <button
                      key={tmpl}
                      type="button"
                      onClick={() => handleAddTemplate(tmpl)}
                      className="bg-[#07152F] hover:bg-[#162E58] text-[#94A3B8] hover:text-white border border-[#162E58] px-3.5 py-1.5 rounded-full text-[12px] font-medium transition-all cursor-pointer"
                    >
                      {tmpl}
                    </button>
                  ))}
                </div>
              </div>

              {/* Note Textarea */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[13px] font-bold text-white">Note</label>
                <textarea
                  rows={4}
                  value={noteText}
                  onChange={(e) => setNoteText(e.target.value)}
                  placeholder="Write your session note here..."
                  className="bg-[#07152F] border border-[#162E58] text-white text-[13px] rounded-xl px-4 py-3 w-full placeholder-[#64748B] focus:outline-none focus:border-[#3B82F6] transition-colors"
                />
              </div>

              {/* Notify Parent Toggle Row */}
              <div className="flex items-center justify-between py-2 border-t border-[#162E58]/60 mt-1">
                <div className="flex flex-col">
                  <span className="text-[14px] font-bold text-white">Notify Parent</span>
                  <span className="text-[12px] font-medium text-[#64748B]">
                    Send this note to the parent
                  </span>
                </div>

                {/* Toggle Switch */}
                <button
                  type="button"
                  onClick={() => setNotifyParent(!notifyParent)}
                  className={`w-12 h-6 rounded-full p-1 transition-colors cursor-pointer ${
                    notifyParent ? "bg-[#2563EB]" : "bg-gray-700"
                  }`}
                >
                  <div
                    className={`w-4 h-4 rounded-full bg-white transition-transform ${
                      notifyParent ? "translate-x-6" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>

              {/* Bottom Action Buttons */}
              <div className="flex items-center gap-3 mt-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="w-1/2 border border-[#162E58] hover:border-gray-500 text-[#94A3B8] hover:text-white font-bold py-3 rounded-full text-[13px] transition-all cursor-pointer text-center"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSaveNote}
                  className="w-1/2 bg-gradient-to-b from-[#1E4ED8] to-[#0F2B8D] hover:opacity-95 text-white font-bold py-3 rounded-full text-[13px] shadow-md transition-all cursor-pointer text-center"
                >
                  Save Note
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SessionNotes;
