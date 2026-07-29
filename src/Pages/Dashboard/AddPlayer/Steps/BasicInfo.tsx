import { FiCamera, FiCalendar } from "react-icons/fi";

const BasicInfo = () => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 flex flex-col">
      <h2 className="text-[18px] font-bold text-gray-900 mb-8">Basic Information</h2>
      
      <div className="flex gap-8">
        {/* Photo Upload */}
        <div className="w-[320px] shrink-0">
          <div className="w-full aspect-[4/3] rounded-2xl border-[1.5px] border-dashed border-blue-200 bg-[#F8FAFF] flex flex-col items-center justify-center gap-3 cursor-pointer hover:bg-blue-50/50 transition-colors">
            <FiCamera className="text-[#8B9CC8]" size={28} />
            <span className="text-[13px] font-semibold text-[#8B9CC8]">Upload Photo</span>
          </div>
        </div>

        {/* Form Fields */}
        <div className="flex-1 grid grid-cols-2 gap-x-8 gap-y-7">
          <div className="flex flex-col gap-2.5">
            <label className="text-[13px] font-bold text-gray-900 tracking-wide">First Name</label>
            <input 
              type="text" 
              placeholder="e.g. Marcus" 
              className="w-full px-5 py-3.5 rounded-full border border-gray-200 text-[14px] font-medium text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 placeholder-gray-300 shadow-sm"
            />
          </div>
          <div className="flex flex-col gap-2.5">
            <label className="text-[13px] font-bold text-gray-900 tracking-wide">Last Name</label>
            <input 
              type="text" 
              placeholder="e.g. Okonkwo" 
              className="w-full px-5 py-3.5 rounded-full border border-gray-200 text-[14px] font-medium text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 placeholder-gray-300 shadow-sm"
            />
          </div>

          <div className="flex flex-col gap-2.5 relative">
            <label className="text-[13px] font-bold text-gray-900 tracking-wide">Date of Birth</label>
            <div className="relative">
              <input 
                type="text" 
                placeholder="mm/dd/yyyy" 
                className="w-full pl-5 pr-11 py-3.5 rounded-full border border-gray-200 text-[14px] font-medium text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 placeholder-gray-300 shadow-sm"
              />
              <FiCalendar className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            </div>
          </div>
          
          <div className="flex flex-col gap-2.5">
            <label className="text-[13px] font-bold text-gray-900 tracking-wide">Gender</label>
            <select className="w-full px-5 py-3.5 rounded-full border border-gray-200 text-[14px] font-medium text-gray-700 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-white shadow-sm appearance-none">
              <option value="" disabled selected>Select....</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>

          <div className="flex flex-col gap-2.5">
            <label className="text-[13px] font-bold text-gray-900 tracking-wide">Nationality</label>
            <input 
              type="text" 
              placeholder="e.g. Nigerian" 
              className="w-full px-5 py-3.5 rounded-full border border-gray-200 text-[14px] font-medium text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 placeholder-gray-300 shadow-sm"
            />
          </div>

          <div className="flex flex-col gap-2.5">
            <label className="text-[13px] font-bold text-gray-900 tracking-wide">Player ID</label>
            <input 
              type="text" 
              disabled
              value="TFP-0047 (auto)" 
              className="w-full px-5 py-3.5 rounded-full border border-gray-100 bg-[#F9FAFC] text-[14px] font-medium text-gray-400 focus:outline-none cursor-not-allowed shadow-sm"
            />
          </div>

          <div className="flex flex-col gap-2.5">
            <label className="text-[13px] font-bold text-gray-900 tracking-wide">Registration Date</label>
            <input 
              type="text" 
              disabled
              value="25 Jul 2025 (auto)" 
              className="w-full px-5 py-3.5 rounded-full border border-gray-100 bg-[#F9FAFC] text-[14px] font-medium text-gray-400 focus:outline-none cursor-not-allowed shadow-sm"
            />
          </div>

          <div className="flex flex-col gap-2.5">
            <label className="text-[13px] font-bold text-gray-900 tracking-wide">Age</label>
            <input 
              type="text" 
              disabled
              value="14 (auto-calculated)" 
              className="w-full px-5 py-3.5 rounded-full border border-gray-100 bg-[#F9FAFC] text-[14px] font-medium text-gray-400 focus:outline-none cursor-not-allowed shadow-sm"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BasicInfo;
