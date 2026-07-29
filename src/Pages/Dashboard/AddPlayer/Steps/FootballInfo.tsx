const FootballInfo = () => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 flex flex-col min-h-[400px]">
      <h2 className="text-[18px] font-bold text-gray-900 mb-8">Football Information</h2>
      
      <div className="grid grid-cols-2 gap-x-8 gap-y-7">
        <div className="flex flex-col gap-2.5">
          <label className="text-[13px] font-bold text-gray-900 tracking-wide">Playing Position</label>
          <input 
            type="text" 
            placeholder="e.g. empty" 
            className="w-full px-5 py-3.5 rounded-full border border-gray-200 text-[14px] font-medium text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 placeholder-gray-300 shadow-sm"
          />
        </div>
        <div className="flex flex-col gap-2.5">
          <label className="text-[13px] font-bold text-gray-900 tracking-wide">Favourite Foot</label>
          <input 
            type="text" 
            placeholder="e.g. empty" 
            className="w-full px-5 py-3.5 rounded-full border border-gray-200 text-[14px] font-medium text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 placeholder-gray-300 shadow-sm"
          />
        </div>
        
        <div className="flex flex-col gap-2.5">
          <label className="text-[13px] font-bold text-gray-900 tracking-wide">Squad</label>
          <select className="w-full px-5 py-3.5 rounded-full border border-gray-200 text-[14px] font-medium text-gray-700 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-white shadow-sm appearance-none">
            <option value="" disabled selected>Select squad name</option>
            <option value="u14">U14 Youth Development</option>
            <option value="u16">U16 Youth Development</option>
          </select>
        </div>

        <div className="flex flex-col gap-2.5">
          <label className="text-[13px] font-bold text-gray-900 tracking-wide">Date Joined Academy</label>
          <input 
            type="text" 
            placeholder="e.g. 10" 
            className="w-full px-5 py-3.5 rounded-full border border-gray-200 text-[14px] font-medium text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 placeholder-gray-300 shadow-sm"
          />
        </div>
      </div>
    </div>
  );
};

export default FootballInfo;
