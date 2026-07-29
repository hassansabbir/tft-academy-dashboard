import { FiInfo, FiCheck } from "react-icons/fi";

const CheckboxOption = ({ title, subtitle, defaultChecked }: { title: string, subtitle: string, defaultChecked?: boolean }) => (
  <div className="flex items-center gap-4 p-5 rounded-2xl border border-gray-200 bg-white shadow-sm hover:border-blue-200 transition-colors cursor-pointer">
    <div className={`w-[26px] h-[26px] rounded-md flex flex-shrink-0 items-center justify-center transition-colors ${defaultChecked ? 'bg-[#1239D4] border-none' : 'border border-gray-300 bg-white'}`}>
      {defaultChecked && <FiCheck className="text-white" size={16} strokeWidth={3} />}
    </div>
    <div className="flex flex-col">
      <span className="text-[15px] font-bold text-gray-900">{title}</span>
      <span className="text-[13px] font-medium text-gray-500 mt-0.5">{subtitle}</span>
    </div>
  </div>
);

const AppAccess = () => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 flex flex-col">
      <h2 className="text-[18px] font-bold text-gray-900 mb-8">Parent App Access</h2>
      
      <div className="grid grid-cols-2 gap-x-8 gap-y-7 mb-8">
        <div className="flex flex-col gap-2.5">
          <label className="text-[13px] font-bold text-gray-900 tracking-wide">Username</label>
          <input 
            type="text" 
            disabled
            value="e.okonkwo2025 (auto)" 
            className="w-full px-5 py-3.5 rounded-full border border-gray-100 bg-[#F9FAFC] text-[14px] font-medium text-gray-400 focus:outline-none cursor-not-allowed shadow-sm"
          />
        </div>
        <div className="flex flex-col gap-2.5">
          <label className="text-[13px] font-bold text-gray-900 tracking-wide">Temporary Password</label>
          <input 
            type="text" 
            disabled
            value="******** (auto)" 
            className="w-full px-5 py-3.5 rounded-full border border-gray-100 bg-[#F9FAFC] text-[14px] font-medium text-gray-400 focus:outline-none cursor-not-allowed shadow-sm"
          />
        </div>
      </div>

      {/* Info Box */}
      <div className="bg-[#eff6ff]/70 border border-blue-100 rounded-2xl p-5 flex gap-3 mb-8">
        <FiInfo className="text-blue-600 shrink-0 mt-0.5" size={20} strokeWidth={2.5} />
        <div className="flex flex-col">
          <span className="text-[14px] font-bold text-blue-700">Parent Portal Access</span>
          <span className="text-[13px] font-medium text-blue-600 mt-1 leading-relaxed">
            The parent will receive a secure invitation to access the TFP Parent Portal where they can view their child's progress, attendance, assessments, and session notes.
          </span>
        </div>
      </div>

      {/* Checkboxes */}
      <div className="flex flex-col gap-4">
        <CheckboxOption 
          title="Create Parent Account" 
          subtitle="Automatically set up parent login credentials" 
          defaultChecked 
        />
        <CheckboxOption 
          title="Send Invitation Email" 
          subtitle="Email login details and portal link" 
          defaultChecked 
        />
        <CheckboxOption 
          title="Send SMS Invitation" 
          subtitle="Text invite with quick-access link" 
          defaultChecked 
        />
      </div>
    </div>
  );
};

export default AppAccess;
