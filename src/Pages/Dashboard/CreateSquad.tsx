import { useState } from "react";
import { FiShield, FiCalendar, FiUser } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const CreateSquad = () => {
  const navigate = useNavigate();
  const [selectedDays, setSelectedDays] = useState<string[]>(['Mon', 'Tue', 'Wed', 'Thu', 'Fri']);
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  const toggleDay = (day: string) => {
    if (selectedDays.includes(day)) {
      setSelectedDays(selectedDays.filter(d => d !== day));
    } else {
      setSelectedDays([...selectedDays, day]);
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#f8faff] p-6 pb-12 overflow-y-auto">
      {/* Header */}
      <div className="flex flex-col mb-6">
        <h1 className="text-[24px] font-bold text-gray-900 leading-tight">Create New Squad</h1>
        <p className="text-[14px] text-gray-500 font-medium mt-1">Set up a new squad and configure all details</p>
      </div>

      <div className="flex flex-col gap-6">
        {/* Squad Details Card */}
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 flex flex-col">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
              <FiShield size={20} strokeWidth={2.5} />
            </div>
            <h2 className="text-[16px] font-bold text-gray-900">Squad Details</h2>
          </div>

          <div className="grid grid-cols-3 gap-6">
            <div className="flex flex-col gap-2.5">
              <label className="text-[13px] font-bold text-gray-900 tracking-wide">Squad Name</label>
              <input 
                type="text" 
                defaultValue="Youth Development Phase" 
                className="w-full px-5 py-3.5 rounded-full border border-gray-200 text-[14px] font-medium text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 placeholder-gray-300 shadow-sm"
              />
            </div>
            <div className="flex flex-col gap-2.5">
              <label className="text-[13px] font-bold text-gray-900 tracking-wide">Age Group</label>
              <select className="w-full px-5 py-3.5 rounded-full border border-gray-200 text-[14px] font-medium text-gray-700 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-white shadow-sm appearance-none">
                <option value="u10_15" selected>U10_15</option>
              </select>
            </div>
            <div className="flex flex-col gap-2.5">
              <label className="text-[13px] font-bold text-gray-900 tracking-wide">Maximum Players</label>
              <input 
                type="text" 
                placeholder="e.g. 25" 
                className="w-full px-5 py-3.5 rounded-full border border-gray-200 text-[14px] font-medium text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 placeholder-gray-300 shadow-sm"
              />
            </div>
          </div>
        </div>

        {/* Training Schedule Card */}
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 flex flex-col">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
              <FiCalendar size={20} strokeWidth={2.5} />
            </div>
            <h2 className="text-[16px] font-bold text-gray-900">Training Schedule</h2>
          </div>

          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2.5">
              <label className="text-[13px] font-bold text-gray-900 tracking-wide">Training Days</label>
              <div className="flex items-center gap-3">
                {days.map((day) => (
                  <button
                    key={day}
                    onClick={() => toggleDay(day)}
                    className={`w-14 h-10 rounded-full flex items-center justify-center text-[13px] font-bold transition-colors border ${
                      selectedDays.includes(day)
                        ? "bg-[#1239D4] text-white border-[#1239D4]"
                        : "bg-white text-gray-500 border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    {day}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-3 gap-6">
              <div className="flex flex-col gap-2.5">
                <label className="text-[13px] font-bold text-gray-900 tracking-wide">Session Start Time</label>
                <input 
                  type="date" 
                  className="w-full px-5 py-3.5 rounded-full border border-gray-200 text-[14px] font-medium text-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 shadow-sm uppercase tracking-wider"
                />
              </div>
              <div className="flex flex-col gap-2.5">
                <label className="text-[13px] font-bold text-gray-900 tracking-wide">Session End Time</label>
                <input 
                  type="date" 
                  className="w-full px-5 py-3.5 rounded-full border border-gray-200 text-[14px] font-medium text-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 shadow-sm uppercase tracking-wider"
                />
              </div>
              <div className="flex flex-col gap-2.5">
                <label className="text-[13px] font-bold text-gray-900 tracking-wide">Session Duration</label>
                <input 
                  type="text" 
                  placeholder="e.g. 90 minutes" 
                  className="w-full px-5 py-3.5 rounded-full border border-gray-200 text-[14px] font-medium text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 placeholder-gray-300 shadow-sm"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-6">
              <div className="flex flex-col gap-2.5">
                <label className="text-[13px] font-bold text-gray-900 tracking-wide">Training Venue</label>
                <input 
                  type="text" 
                  placeholder="e.g. Pitch 1 — Main Academy Ground" 
                  className="w-full px-5 py-3.5 rounded-full border border-gray-200 text-[14px] font-medium text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 placeholder-gray-300 shadow-sm"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Coach Assignment Card */}
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 flex flex-col mb-4">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
              <FiUser size={20} strokeWidth={2.5} />
            </div>
            <h2 className="text-[16px] font-bold text-gray-900">Coach Assignment</h2>
          </div>

          <div className="grid grid-cols-3 gap-6">
            <div className="flex flex-col gap-2.5">
              <label className="text-[13px] font-bold text-gray-900 tracking-wide">Coach Name</label>
              <select className="w-full px-5 py-3.5 rounded-full border border-gray-200 text-[14px] font-medium text-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-white shadow-sm appearance-none">
                <option value="" disabled selected>Select...</option>
                <option value="coach1">James Hargreaves</option>
                <option value="coach2">David Okafor</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Buttons */}
      <div className="flex items-center justify-between mt-auto pt-6">
        <button 
          onClick={() => navigate('/squads')}
          className="px-8 py-3 rounded-full border border-gray-200 text-[14px] font-bold text-gray-600 hover:bg-gray-50 transition-colors shadow-sm"
        >
          Cancel
        </button>
        <button 
          className="bg-gradient-to-r from-[#081A4A] to-[#1239D4] hover:opacity-90 text-white px-8 py-3 rounded-full flex items-center gap-2.5 text-[14px] font-bold transition-opacity shadow-md"
        >
          <FiShield size={16} />
          Create Squad
        </button>
      </div>
    </div>
  );
};

export default CreateSquad;
