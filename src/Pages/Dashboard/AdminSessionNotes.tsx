import { useState } from "react";
import { FiSearch, FiUser, FiCalendar, FiMoreVertical } from "react-icons/fi";

const notesData = [
  { 
    id: 1, 
    initials: 'MO', 
    name: 'Marcus Okonkwo', 
    tag: 'Positive', 
    coach: 'James Hargreaves', 
    date: '24 Jul 2025', 
    content: 'Exceptional performance today. Marcus showed great movement off the ball and scored a hat-trick in the practice match. His positioning has improved significantly.',
    color: 'bg-[#1239D4]',
    tagStyle: 'bg-[#ECFDF5] text-[#10B981] border-[#A7F3D0]'
  },
  { 
    id: 2, 
    initials: 'LF', 
    name: 'Luca Fernandez', 
    tag: 'Improvement', 
    coach: 'Sofia Martins', 
    date: '23 Jul 2025', 
    content: 'Luca needs to work on his left-foot passing accuracy. He tends to cut onto his right too often. Set a specific drill for next session.',
    color: 'bg-[#2563EB]',
    tagStyle: 'bg-[#EFF6FF] text-[#3B82F6] border-[#BFDBFE]'
  },
  { 
    id: 3, 
    initials: 'EN', 
    name: 'Ethan Nwosu', 
    tag: 'Technical', 
    coach: 'David Okafor', 
    date: '22 Jul 2025', 
    content: 'Excellent reading of the game today. Ethan made four crucial interceptions and organised the defensive line very well during set pieces.',
    color: 'bg-[#1D4ED8]',
    tagStyle: 'bg-[#F3E8FF] text-[#9333EA] border-[#E9D5FF]'
  },
  { 
    id: 4, 
    initials: 'KA', 
    name: 'Kofi Asante', 
    tag: 'Behaviour', 
    coach: 'James Hargreaves', 
    date: '21 Jul 2025', 
    content: 'Kofi was disruptive during team talk. Spoke with him one-to-one after session. He was receptive and apologised. Will monitor closely.',
    color: 'bg-[#1239D4]',
    tagStyle: 'bg-[#FFFBEB] text-[#F59E0B] border-[#FDE68A]'
  },
  { 
    id: 5, 
    initials: 'DP', 
    name: 'Daniel Petrov', 
    tag: 'Positive', 
    coach: 'Marco Ricci', 
    date: '20 Jul 2025', 
    content: 'Outstanding leadership today. Daniel commanded the midfield with authority and was instrumental in two goals through his vision and through-balls.',
    color: 'bg-[#1E3A8A]',
    tagStyle: 'bg-[#ECFDF5] text-[#10B981] border-[#A7F3D0]'
  },
  { 
    id: 6, 
    initials: 'AW', 
    name: 'Aiden Walsh', 
    tag: 'Injury', 
    coach: 'Claire Dumont', 
    date: '19 Jul 2025', 
    content: 'Aiden rolled his ankle in the second half. Sent to physio immediately. Recommended rest for 5-7 days. Parents informed by phone.',
    color: 'bg-[#3B82F6]',
    tagStyle: 'bg-[#FEF2F2] text-[#EF4444] border-[#FECACA]'
  },
];

const filters = ['All', 'Positive', 'Improvement', 'Technical', 'Behaviour', 'Injury'];

const AdminSessionNotes = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState("");

  const filteredNotes = notesData.filter((note) => {
    const matchesFilter = activeFilter === 'All' || note.tag === activeFilter;
    const matchesSearch = note.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          note.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="flex flex-col h-full bg-[#f8faff] p-6 pb-12 overflow-y-auto">
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

      {/* Notes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredNotes.map((note) => (
          <div key={note.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col hover:shadow-md transition-shadow relative group">
            <button className="absolute top-6 right-5 text-gray-300 hover:text-gray-600 transition-colors opacity-0 group-hover:opacity-100">
              <FiMoreVertical size={18} />
            </button>
            <div className="flex items-center justify-between mb-5 pr-6">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-[13px] font-bold text-white shrink-0 ${note.color}`}>
                  {note.initials}
                </div>
                <div className="flex flex-col">
                  <span className="text-[15px] font-bold text-gray-900 leading-tight">{note.name}</span>
                  <span className={`inline-block px-2 py-0.5 rounded-md text-[11px] font-bold border mt-1 w-fit ${note.tagStyle}`}>
                    {note.tag}
                  </span>
                </div>
              </div>
            </div>
            
            <p className="text-[14px] text-gray-600 font-medium leading-relaxed mb-6 flex-1">
              "{note.content}"
            </p>
            
            <div className="flex items-center justify-between pt-5 border-t border-gray-100">
              <div className="flex items-center gap-2 text-gray-500">
                <FiUser size={14} />
                <span className="text-[13px] font-medium">{note.coach}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-500">
                <FiCalendar size={14} />
                <span className="text-[13px] font-medium">{note.date}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminSessionNotes;