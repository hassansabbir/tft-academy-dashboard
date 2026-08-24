import { useState, useEffect } from "react";
import { FiPlus, FiMail, FiEdit2 } from "react-icons/fi";
import { jwtDecode } from "jwt-decode";
import { message, Spin } from "antd";
import {
  useGetCoachSessionNotesQuery,
  useCreateCoachSessionNoteMutation,
  useUpdateCoachSessionNoteMutation
} from "@/redux/apiSlices/dashboardSlice";
import { useGetMySquadsQuery } from "@/redux/apiSlices/squadSlice";
import { useGetPlayersBySquadQuery } from "@/redux/apiSlices/playerSlice";

interface JwtPayload {
  role?: string;
}

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
  const [activeFilter, setActiveFilter] = useState("All Notes");

  // Fetch Notes
  const { data: notesData, isLoading, refetch } = useGetCoachSessionNotesQuery(undefined);
  const apiNotes = notesData || [];

  // Squad and Player API
  const { data: mySquads } = useGetMySquadsQuery(undefined);

  // Modal State
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editNoteId, setEditNoteId] = useState<string | null>(null);

  const [selectedSquad, setSelectedSquad] = useState("");
  const [selectedPlayer, setSelectedPlayer] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Positive");
  const [noteText, setNoteText] = useState("");
  const [notifyParent, setNotifyParent] = useState(true);

  const { data: players } = useGetPlayersBySquadQuery(selectedSquad, { skip: !selectedSquad && !editNoteId });

  const [createNote, { isLoading: isCreating }] = useCreateCoachSessionNoteMutation();
  const [updateNote, { isLoading: isUpdating }] = useUpdateCoachSessionNoteMutation();

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

  // Default squad
  useEffect(() => {
    if (mySquads?.length > 0 && !selectedSquad && !editNoteId) {
      setSelectedSquad(mySquads[0]._id);
    }
  }, [mySquads, selectedSquad, editNoteId]);

  // Default player
  useEffect(() => {
    if (players?.length > 0 && !editNoteId) {
      const currentPlayerExists = players.find((p: any) => p._id === selectedPlayer);
      if (!currentPlayerExists) {
        setSelectedPlayer(players[0]._id);
      }
    } else if (!editNoteId) {
      setSelectedPlayer("");
    }
  }, [players, selectedSquad, editNoteId]);

  const handleAddTemplate = (tmpl: string) => {
    setNoteText((prev) => (prev ? `${prev} ${tmpl}.` : `${tmpl}.`));
  };

  const handleOpenCreateModal = () => {
    setEditNoteId(null);
    setNoteText("");
    setSelectedCategory("Positive");
    setNotifyParent(true);
    if (mySquads?.length > 0) setSelectedSquad(mySquads[0]._id);
    setIsAddModalOpen(true);
  };

  const handleOpenEditModal = (note: any) => {
    setEditNoteId(note._id);
    setSelectedSquad(note.squadId);
    setSelectedPlayer(note.playerId?._id);
    setSelectedCategory(note.category);
    setNoteText(note.note);
    setNotifyParent(note.isParentNotified || note.notifyParent || false);
    setIsAddModalOpen(true);
  };

  const handleSaveNote = async () => {
    if (!noteText.trim()) {
      message.error("Please enter a note.");
      return;
    }

    if (editNoteId) {
      // Update existing note
      try {
        await updateNote({
          id: editNoteId,
          category: selectedCategory,
          note: noteText,
          notifyParent: notifyParent,
        }).unwrap();
        message.success("Note updated successfully!");
        setIsAddModalOpen(false);
        refetch();
      } catch (error: any) {
        message.error(error.data?.message || "Failed to update note.");
      }
    } else {
      // Create new note
      if (!selectedSquad || !selectedPlayer) {
        message.error("Please select a squad and player.");
        return;
      }
      try {
        await createNote({
          squadId: selectedSquad,
          playerId: selectedPlayer,
          category: selectedCategory,
          note: noteText,
          notifyParent: notifyParent,
        }).unwrap();
        message.success("Note created successfully!");
        setIsAddModalOpen(false);
        refetch();
      } catch (error: any) {
        message.error(error.data?.message || "Failed to create note.");
      }
    }
  };

  const filteredNotes = apiNotes.filter((item: any) => {
    if (activeFilter === "All Notes") return true;
    return item.category?.toLowerCase() === activeFilter.toLowerCase();
  });

  const getTagBadgeClass = (tag: string) => {
    switch (tag?.toLowerCase()) {
      case "positive":
        return "bg-[#064E3B] text-[#34D399] border-[#059669]/30";
      case "improvement":
        return "bg-[#78350F] text-[#FBBF24] border-[#D97706]/30";
      case "tactical":
        return "bg-[#1E3A8A] text-[#60A5FA] border-[#2563EB]/30";
      case "injury":
        return "bg-[#7F1D1D] text-[#F87171] border-[#DC2626]/30";
      case "behaviour":
        return "bg-[#7C3AED]/20 text-[#A78BFA] border-[#8B5CF6]/30";
      case "match performance":
        return "bg-[#065F46] text-[#6EE7B7] border-[#10B981]/30";
      default:
        return "bg-[#1E3A8A] text-[#60A5FA] border-[#2563EB]/30";
    }
  };

  const getAvatarBg = (tag: string) => {
    switch (tag?.toLowerCase()) {
      case "positive": return "bg-[#2563EB]";
      case "improvement": return "bg-[#DC2626]";
      case "tactical": return "bg-[#059669]";
      case "injury": return "bg-[#7F1D1D]";
      default: return "bg-[#7C3AED]";
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const isSaving = isCreating || isUpdating;

  return (
    <div
      className={`flex flex-col h-full p-6 pb-12 overflow-y-auto relative ${isCoach ? "bg-[#050E21]" : "bg-[#050E21]"
        }`}
    >
      {isLoading && (
        <div className="absolute inset-0 bg-[#050E21]/60 z-50 flex items-center justify-center">
          <Spin size="large" />
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div>
          <h1 className="text-[24px] font-bold text-white leading-tight">Session Notes</h1>
          <p className="text-[14px] text-[#94A3B8] font-medium mt-1">
            Track player progress and feedback
          </p>
        </div>

        <button
          onClick={handleOpenCreateModal}
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
              className={`px-5 py-2.5 rounded-full text-[13px] font-bold transition-all shrink-0 whitespace-nowrap inline-flex items-center justify-center cursor-pointer ${isActive
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
        {filteredNotes.length === 0 && !isLoading && (
          <p className="text-gray-400">No session notes found.</p>
        )}
        {filteredNotes.map((noteItem: any) => {
          const initials = `${noteItem.playerId?.firstName?.[0] || ""}${noteItem.playerId?.lastName?.[0] || ""}`.toUpperCase();
          const name = `${noteItem.playerId?.firstName || ""} ${noteItem.playerId?.lastName || ""}`.trim() || "Unknown Player";

          return (
            <div
              key={noteItem._id}
              className="bg-[#0B1B38] border border-[#162E58] rounded-2xl p-6 flex flex-col gap-3 shadow-sm hover:border-[#234580] transition-all"
            >
              {/* Top Row: Avatar, Name, Badges, Date, Edit */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-9 h-9 rounded-full ${getAvatarBg(noteItem.category)} text-white font-bold text-[13px] flex items-center justify-center shrink-0 shadow-xs`}
                  >
                    {initials}
                  </div>

                  <h3 className="text-[15px] font-bold text-white leading-tight">
                    {name}
                  </h3>

                  <span
                    className={`px-3 py-0.5 rounded-full text-[11px] font-bold border ${getTagBadgeClass(
                      noteItem.category
                    )}`}
                  >
                    {noteItem.category || "General"}
                  </span>

                  {(noteItem.isParentNotified || noteItem.notifyParent) && (
                    <span className="text-[#94A3B8] text-[12px] font-medium flex items-center gap-1.5 ml-2">
                      <FiMail size={13} />
                      <span>Parent notified</span>
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-3 self-end sm:self-auto">
                  <span className="text-[12px] font-medium text-[#64748B]">
                    {formatDate(noteItem.updatedAt || noteItem.createdAt)}
                  </span>
                  <button
                    onClick={() => handleOpenEditModal(noteItem)}
                    className="text-[#64748B] hover:text-white transition-colors cursor-pointer p-1"
                  >
                    <FiEdit2 size={15} />
                  </button>
                </div>
              </div>

              {/* Note Content Paragraph */}
              <p className="text-[13px] font-medium text-[#94A3B8] leading-relaxed mt-2">
                {noteItem.note}
              </p>

              {/* Coach Subtext Footer */}
              <span className="text-[12px] font-medium text-[#64748B]">
                Coach: {noteItem.coachId?.name || "Unknown Coach"}
              </span>
            </div>
          );
        })}
      </div>

      {/* Add/Edit Session Note Custom Dark Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-4">
          <div className="bg-[#0B1B38] border border-[#162E58] text-white rounded-2xl w-full max-w-md p-6 shadow-2xl flex flex-col relative max-h-[90vh] overflow-y-auto custom-scrollbar">
            {/* Header */}
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-[20px] font-bold text-white leading-tight">
                {editNoteId ? "Edit Session Note" : "Add Session Note"}
              </h2>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="text-[#64748B] hover:text-white text-xl font-bold cursor-pointer transition-colors"
              >
                ✕
              </button>
            </div>

            <div className="flex flex-col gap-4">
              {/* Row 1: Squad & Player (Only if creating) */}
              {!editNoteId && (
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[13px] font-bold text-white">Squad</label>
                    <div className="relative">
                      <select
                        value={selectedSquad}
                        onChange={(e) => setSelectedSquad(e.target.value)}
                        className="bg-[#07152F] border border-[#162E58] text-white text-[13px] rounded-xl px-4 py-3 w-full appearance-none focus:outline-none focus:border-[#3B82F6] cursor-pointer"
                      >
                        {mySquads?.map((squad: any) => (
                          <option key={squad._id} value={squad._id}>
                            {squad.name}
                          </option>
                        ))}
                      </select>
                      <span className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 text-[10px]">
                        ▼
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[13px] font-bold text-white">Player</label>
                    <div className="relative">
                      <select
                        value={selectedPlayer}
                        onChange={(e) => setSelectedPlayer(e.target.value)}
                        className="bg-[#07152F] border border-[#162E58] text-white text-[13px] rounded-xl px-4 py-3 w-full appearance-none focus:outline-none focus:border-[#3B82F6] cursor-pointer"
                      >
                        {players?.map((p: any) => (
                          <option key={p._id} value={p._id}>
                            {p.fullName || `${p.firstName} ${p.lastName}`}
                          </option>
                        ))}
                        {(!players || players.length === 0) && (
                          <option value="" disabled>No players</option>
                        )}
                      </select>
                      <span className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 text-[10px]">
                        ▼
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Row 2: Category (or full width if editing) */}
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

              {/* Quick Templates Section */}
              <div className="flex flex-col gap-2 mt-2">
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
              <div className="flex flex-col gap-1.5 mt-2">
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
              <div className="flex items-center justify-between py-2 border-t border-[#162E58]/60 mt-3">
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
                  className={`w-12 h-6 rounded-full p-1 transition-colors cursor-pointer ${notifyParent ? "bg-[#2563EB]" : "bg-gray-700"
                    }`}
                >
                  <div
                    className={`w-4 h-4 rounded-full bg-white transition-transform ${notifyParent ? "translate-x-6" : "translate-x-0"
                      }`}
                  />
                </button>
              </div>

              {/* Bottom Action Buttons */}
              <div className="flex items-center gap-3 mt-3">
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
                  disabled={isSaving}
                  className="w-1/2 bg-gradient-to-b from-[#1E4ED8] to-[#0F2B8D] hover:opacity-95 disabled:opacity-50 text-white font-bold py-3 rounded-full text-[13px] shadow-md transition-all cursor-pointer flex justify-center items-center gap-2"
                >
                  {isSaving ? <Spin size="small" /> : (editNoteId ? "Update Note" : "Save Note")}
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
