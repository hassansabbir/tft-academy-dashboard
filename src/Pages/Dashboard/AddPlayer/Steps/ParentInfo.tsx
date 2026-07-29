const ParentInfo = () => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 flex flex-col">
      <h2 className="text-[18px] font-bold text-gray-900 mb-8">Parent / Guardian Information</h2>
      
      <div className="grid grid-cols-2 gap-x-8 gap-y-7">
        <div className="flex flex-col gap-2.5">
          <label className="text-[13px] font-bold text-gray-900 tracking-wide">Parent Full Name</label>
          <input 
            type="text" 
            placeholder="e.g. Emmanuel Okonkwo" 
            className="w-full px-5 py-3.5 rounded-full border border-gray-200 text-[14px] font-medium text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 placeholder-gray-300 shadow-sm"
          />
        </div>
        <div className="flex flex-col gap-2.5">
          <label className="text-[13px] font-bold text-gray-900 tracking-wide">Relationship</label>
          <input 
            type="text" 
            placeholder="e.g. Mother" 
            className="w-full px-5 py-3.5 rounded-full border border-gray-200 text-[14px] font-medium text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 placeholder-gray-300 shadow-sm"
          />
        </div>

        <div className="flex flex-col gap-2.5">
          <label className="text-[13px] font-bold text-gray-900 tracking-wide">Email Address</label>
          <input 
            type="text" 
            placeholder="parent@example.com" 
            className="w-full px-5 py-3.5 rounded-full border border-gray-200 text-[14px] font-medium text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 placeholder-gray-300 shadow-sm"
          />
        </div>

        <div className="flex flex-col gap-2.5">
          <label className="text-[13px] font-bold text-gray-900 tracking-wide">Phone Number</label>
          <input 
            type="text" 
            placeholder="+44 7700 000000" 
            className="w-full px-5 py-3.5 rounded-full border border-gray-200 text-[14px] font-medium text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 placeholder-gray-300 shadow-sm"
          />
        </div>

        <div className="flex flex-col gap-2.5">
          <label className="text-[13px] font-bold text-gray-900 tracking-wide">Alternative Phone</label>
          <input 
            type="text" 
            placeholder="+44 7700 000001" 
            className="w-full px-5 py-3.5 rounded-full border border-gray-200 text-[14px] font-medium text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 placeholder-gray-300 shadow-sm"
          />
        </div>

        <div className="flex flex-col gap-2.5">
          <label className="text-[13px] font-bold text-gray-900 tracking-wide">Home Address</label>
          <input 
            type="text" 
            placeholder="Street address" 
            className="w-full px-5 py-3.5 rounded-full border border-gray-200 text-[14px] font-medium text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 placeholder-gray-300 shadow-sm"
          />
        </div>

        <div className="flex flex-col gap-2.5">
          <label className="text-[13px] font-bold text-gray-900 tracking-wide">City</label>
          <input 
            type="text" 
            placeholder="e.g. London" 
            className="w-full px-5 py-3.5 rounded-full border border-gray-200 text-[14px] font-medium text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 placeholder-gray-300 shadow-sm"
          />
        </div>

        <div className="flex flex-col gap-2.5">
          <label className="text-[13px] font-bold text-gray-900 tracking-wide">Postcode</label>
          <input 
            type="text" 
            placeholder="e.g. SW1A 1AA" 
            className="w-full px-5 py-3.5 rounded-full border border-gray-200 text-[14px] font-medium text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 placeholder-gray-300 shadow-sm"
          />
        </div>
      </div>
    </div>
  );
};

export default ParentInfo;
