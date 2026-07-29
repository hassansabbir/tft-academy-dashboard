const MedicalInfo = () => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 flex flex-col">
      <h2 className="text-[18px] font-bold text-gray-900 mb-8">Medical Information</h2>
      
      <div className="grid grid-cols-2 gap-x-8 gap-y-7">
        <div className="flex flex-col gap-2.5">
          <label className="text-[13px] font-bold text-gray-900 tracking-wide">Blood Group</label>
          <input 
            type="text" 
            placeholder="e.g. O+" 
            className="w-full px-5 py-3.5 rounded-full border border-gray-200 text-[14px] font-medium text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 placeholder-gray-300 shadow-sm"
          />
        </div>
        <div className="flex flex-col gap-2.5">
          <label className="text-[13px] font-bold text-gray-900 tracking-wide">Allergies</label>
          <input 
            type="text" 
            placeholder="e.g. Peanuts, Penicillin or None" 
            className="w-full px-5 py-3.5 rounded-full border border-gray-200 text-[14px] font-medium text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 placeholder-gray-300 shadow-sm"
          />
        </div>

        <div className="flex flex-col gap-2.5">
          <label className="text-[13px] font-bold text-gray-900 tracking-wide">Medical Conditions</label>
          <input 
            type="text" 
            placeholder="e.g. Asthma, Diabetes or None" 
            className="w-full px-5 py-3.5 rounded-full border border-gray-200 text-[14px] font-medium text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 placeholder-gray-300 shadow-sm"
          />
        </div>

        <div className="flex flex-col gap-2.5">
          <label className="text-[13px] font-bold text-gray-900 tracking-wide">Medications</label>
          <input 
            type="text" 
            placeholder="List current medications or None" 
            className="w-full px-5 py-3.5 rounded-full border border-gray-200 text-[14px] font-medium text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 placeholder-gray-300 shadow-sm"
          />
        </div>

        <div className="flex flex-col gap-2.5">
          <label className="text-[13px] font-bold text-gray-900 tracking-wide">Emergency Contact Name</label>
          <input 
            type="text" 
            placeholder="e.g. Emmanuel Okonkwo" 
            className="w-full px-5 py-3.5 rounded-full border border-gray-200 text-[14px] font-medium text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 placeholder-gray-300 shadow-sm"
          />
        </div>

        <div className="flex flex-col gap-2.5">
          <label className="text-[13px] font-bold text-gray-900 tracking-wide">Emergency Phone</label>
          <input 
            type="text" 
            placeholder="+44 7700 000000" 
            className="w-full px-5 py-3.5 rounded-full border border-gray-200 text-[14px] font-medium text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 placeholder-gray-300 shadow-sm"
          />
        </div>

        <div className="flex flex-col gap-2.5 col-span-2 mt-2">
          <label className="text-[13px] font-bold text-gray-900 tracking-wide">Medical Notes</label>
          <textarea 
            placeholder="Additional medical information, dietary requirements, or special instructions for coaches..." 
            className="w-full px-5 py-4 rounded-2xl border border-gray-200 text-[14px] font-medium text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 placeholder-gray-300 shadow-sm resize-none h-32"
          ></textarea>
        </div>
      </div>
    </div>
  );
};

export default MedicalInfo;
