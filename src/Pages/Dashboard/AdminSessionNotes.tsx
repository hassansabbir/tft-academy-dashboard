import { useState } from "react";
import { FiSearch, FiUser, FiCalendar } from "react-icons/fi";
import { useAdminSessionNotesQuery } from "@/redux/apiSlices/dashboardSlice";
import { Spin } from "antd";

const filters = ['All', 'Positive', 'Improvement', 'Technical', 'Behaviour', 'Injury'];

const getTagStyle = (tag: string) => {
  switch (tag) {
    case 'Positive': return 'bg-[#ECFDF5] text-[#10B981] border-[#A7F3D0]';
    case 'Improvement': return 'bg-[#EFF6FF] text-[#3B82F6] border-[#BFDBFE]';
    case 'Technical': return 'bg-[#F3E8FF] text-[#9333EA] border-[#E9D5FF]';
    case 'Behaviour': return 'bg-[#FFFBEB] text-[#F59E0B] border-[#FDE68A]';
    case 'Injury': return 'bg-[#FEF2F2] text-[#EF4444] border-[#FECACA]';
    default: return 'bg-gray-100 text-gray-600 border-gray-200';
  }
};

const getAvatarColor = (tag: string) => {
  switch (tag) {
    case 'Positive': return 'bg-[#1239D4]';
    case 'Improvement': return 'bg-[#2563EB]';
    case 'Technical': return 'bg-[#1D4ED8]';
    case 'Behaviour': return 'bg-[#1239D4]';
    case 'Injury': return 'bg-[#3B82F6]';
    default: return 'bg-[#1E3A8A]';
  }
};

const formatDate = (dateString: string) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
};

const AdminSessionNotes = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState("");
  
  const { data: notesData, isLoading } = useAdminSessionNotesQuery(undefined);

  const filteredNotes = (notesData || []).filter((note: any) => {
    const matchesFilter = activeFilter === 'All' || note.category === activeFilter;
    const playerName = `${note.playerId?.firstName || ''} ${note.playerId?.lastName || ''}`.trim();
    const matchesSearch = playerName.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          (note.note && note.note.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="flex flex-col h-full bg-[#f8faff] p-6 pb-12 overflow-y-auto relative">
      {isLoading && (
        <div className="absolute inset-0 bg-[#f8faff]/60 flex items-center justify-center z-10">
          <Spin />
        </div>
      )}
      
      {/* Header */}
      <div className="flex flex-col mb-8">
        <h1 className="text-[24px] font-bold text-gray-900 leading-tight">Session Notes</h1>
        <p className="text-[14px] text-gray-500 font-medium mt-1">Coach feedback and player observations</p>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8">
        <div className="flex items-center gap-3 overflow-x-auto py-2.5 px-1 min-h-[52px] custom-scrollbar">
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
        <div className="relative w-full lg:w-[320px] shrink-0">
          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Search notes..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-5 py-3 rounded-full border border-gray-200 text-[14px] font-medium text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 placeholder-gray-400 bg-white shadow-sm"
          />
        </div>
      </div>

      {/* Notes List */}
      <div className="flex flex-col gap-4">
        {filteredNotes.length > 0 ? filteredNotes.map((note: any) => {
          const playerFirstName = note.playerId?.firstName || "";
          const playerLastName = note.playerId?.lastName || "";
          const playerName = `${playerFirstName} ${playerLastName}`.trim();
          const initials = `${playerFirstName[0] || ""}${playerLastName[0] || ""}`;
          
          return (
            <div key={note._id || note.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col hover:shadow-md transition-shadow relative">
              <div className="flex gap-4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center text-[15px] font-bold text-white shrink-0 mt-1 ${getAvatarColor(note.category)}`}>
                  {initials}
                </div>
                
                <div className="flex flex-col flex-1">
                  <div className="flex items-center gap-3 mb-1.5">
                    <span className="text-[16px] font-bold text-gray-900">{playerName}</span>
                    <span className={`inline-block px-3 py-0.5 rounded-full text-[11px] font-bold border ${getTagStyle(note.category)}`}>
                      {note.category}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-5 text-gray-400 mb-4">
                    <div className="flex items-center gap-1.5">
                      <FiUser size={13} className="text-gray-400" />
                      <span className="text-[12px] font-medium">{note.coachId?.name || 'Unknown Coach'}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <FiCalendar size={13} className="text-gray-400" />
                      <span className="text-[12px] font-medium">{formatDate(note.createdAt || note.date)}</span>
                    </div>
                  </div>
                  
                  <p className="text-[14px] text-gray-700 font-medium leading-relaxed">
                    {note.note || note.content}
                  </p>
                </div>
              </div>
            </div>
          );
        }) : (
          <div className="text-center py-10 text-gray-500 font-medium bg-white rounded-2xl border border-gray-100">
            No session notes found.
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminSessionNotes;