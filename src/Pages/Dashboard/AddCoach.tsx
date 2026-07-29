import { FiUser, FiPhone, FiKey, FiCamera, FiCheck } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

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

const AddCoach = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col h-full bg-[#f8faff] p-6 pb-12 overflow-y-auto">
      {/* Header */}
      <div className="flex flex-col mb-6">
        <h1 className="text-[24px] font-bold text-gray-900 leading-tight">Add New Coach</h1>
        <p className="text-[14px] text-gray-500 font-medium mt-1">Register a new coach and assign their role</p>
      </div>

      <div className="flex flex-col gap-6">
        {/* Personal Information */}
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 flex flex-col">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
              <FiUser size={20} strokeWidth={2.5} />
            </div>
            <h2 className="text-[16px] font-bold text-gray-900">Personal Information</h2>
          </div>

          <div className="flex gap-8">
            {/* Upload Photo */}
            <div className="w-[200px] h-[240px] rounded-2xl bg-[#F9FAFC] border-2 border-dashed border-gray-200 flex flex-col items-center justify-center gap-3 cursor-pointer hover:bg-gray-50 transition-colors shrink-0">
              <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center">
                <FiCamera className="text-gray-400" size={20} strokeWidth={2} />
              </div>
              <span className="text-[13px] font-bold text-gray-500">Upload Photo</span>
            </div>

            {/* Form Fields */}
            <div className="flex-1 grid grid-cols-2 gap-x-8 gap-y-7">
              <div className="flex flex-col gap-2.5">
                <label className="text-[13px] font-bold text-gray-900 tracking-wide">First Name</label>
                <input 
                  type="text" 
                  placeholder="e.g. James" 
                  className="w-full px-5 py-3.5 rounded-full border border-gray-200 text-[14px] font-medium text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 placeholder-gray-300 shadow-sm"
                />
              </div>
              <div className="flex flex-col gap-2.5">
                <label className="text-[13px] font-bold text-gray-900 tracking-wide">Last Name</label>
                <input 
                  type="text" 
                  placeholder="e.g. Hargreaves" 
                  className="w-full px-5 py-3.5 rounded-full border border-gray-200 text-[14px] font-medium text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 placeholder-gray-300 shadow-sm"
                />
              </div>

              <div className="flex flex-col gap-2.5">
                <label className="text-[13px] font-bold text-gray-900 tracking-wide">Date of Birth</label>
                <input 
                  type="date" 
                  className="w-full px-5 py-3.5 rounded-full border border-gray-200 text-[14px] font-medium text-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 shadow-sm uppercase tracking-wider"
                />
              </div>
              <div className="flex flex-col gap-2.5">
                <label className="text-[13px] font-bold text-gray-900 tracking-wide">Gender</label>
                <select className="w-full px-5 py-3.5 rounded-full border border-gray-200 text-[14px] font-medium text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-white shadow-sm appearance-none">
                  <option value="male" selected>Male</option>
                  <option value="female">Female</option>
                </select>
              </div>

              <div className="flex flex-col gap-2.5">
                <label className="text-[13px] font-bold text-gray-900 tracking-wide">Nationality</label>
                <input 
                  type="text" 
                  placeholder="e.g. British" 
                  className="w-full px-5 py-3.5 rounded-full border border-gray-200 text-[14px] font-medium text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 placeholder-gray-300 shadow-sm"
                />
              </div>
              <div className="flex flex-col gap-2.5">
                <label className="text-[13px] font-bold text-gray-900 tracking-wide">Coach ID</label>
                <input 
                  type="text" 
                  disabled
                  value="TFP-C-006 (auto)" 
                  className="w-full px-5 py-3.5 rounded-full border border-gray-100 bg-[#F9FAFC] text-[14px] font-medium text-gray-400 focus:outline-none cursor-not-allowed shadow-sm"
                />
              </div>

              <div className="flex flex-col gap-2.5">
                <label className="text-[13px] font-bold text-gray-900 tracking-wide">National Insurance / ID Number</label>
                <input 
                  type="text" 
                  placeholder="e.g. AB 12 34 56 C" 
                  className="w-full px-5 py-3.5 rounded-full border border-gray-200 text-[14px] font-medium text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 placeholder-gray-300 shadow-sm"
                />
              </div>
              <div className="flex flex-col gap-2.5">
                <label className="text-[13px] font-bold text-gray-900 tracking-wide">Date of Joining</label>
                <input 
                  type="date" 
                  className="w-full px-5 py-3.5 rounded-full border border-gray-200 text-[14px] font-medium text-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 shadow-sm uppercase tracking-wider"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 flex flex-col">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
              <FiPhone size={20} strokeWidth={2.5} />
            </div>
            <h2 className="text-[16px] font-bold text-gray-900">Contact Information</h2>
          </div>

          <div className="grid grid-cols-2 gap-x-8 gap-y-7">
            <div className="flex flex-col gap-2.5">
              <label className="text-[13px] font-bold text-gray-900 tracking-wide">Email Address</label>
              <input 
                type="text" 
                placeholder="coach@tfp.com" 
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
              <label className="text-[13px] font-bold text-gray-900 tracking-wide">Emergency Contact Name</label>
              <input 
                type="text" 
                placeholder="Emergency contact" 
                className="w-full px-5 py-3.5 rounded-full border border-gray-200 text-[14px] font-medium text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 placeholder-gray-300 shadow-sm"
              />
            </div>

            <div className="flex flex-col gap-2.5">
              <label className="text-[13px] font-bold text-gray-900 tracking-wide">Emergency Phone</label>
              <input 
                type="text" 
                placeholder="+44 7700 000002" 
                className="w-full px-5 py-3.5 rounded-full border border-gray-200 text-[14px] font-medium text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 placeholder-gray-300 shadow-sm"
              />
            </div>
            <div className="flex flex-col gap-2.5">
              <label className="text-[13px] font-bold text-gray-900 tracking-wide">Emergency Relationship</label>
              <input 
                type="text" 
                placeholder="e.g. Spouse, Parent" 
                className="w-full px-5 py-3.5 rounded-full border border-gray-200 text-[14px] font-medium text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 placeholder-gray-300 shadow-sm"
              />
            </div>

            <div className="flex flex-col gap-2.5 col-span-2">
              <label className="text-[13px] font-bold text-gray-900 tracking-wide">Home Address</label>
              <input 
                type="text" 
                placeholder="Full residential address" 
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

        {/* System Access */}
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 flex flex-col mb-4">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
              <FiKey size={20} strokeWidth={2.5} />
            </div>
            <h2 className="text-[16px] font-bold text-gray-900">System Access</h2>
          </div>

          <div className="grid grid-cols-2 gap-x-8 gap-y-7 mb-8">
            <div className="flex flex-col gap-2.5">
              <label className="text-[13px] font-bold text-gray-900 tracking-wide">Username</label>
              <input 
                type="text" 
                disabled
                value="j.hargreaves (auto)" 
                className="w-full px-5 py-3.5 rounded-full border border-gray-100 bg-[#F9FAFC] text-[14px] font-medium text-gray-400 focus:outline-none cursor-not-allowed shadow-sm"
              />
            </div>
            <div className="flex flex-col gap-2.5">
              <label className="text-[13px] font-bold text-gray-900 tracking-wide">Temporary Password</label>
              <input 
                type="text" 
                disabled
                value="Auto-generated" 
                className="w-full px-5 py-3.5 rounded-full border border-gray-100 bg-[#F9FAFC] text-[14px] font-medium text-gray-400 focus:outline-none cursor-not-allowed shadow-sm"
              />
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <CheckboxOption 
              title="Send Welcome Email" 
              subtitle="Email login credentials and onboarding guide" 
              defaultChecked 
            />
            <CheckboxOption 
              title="Send SMS Invitation" 
              subtitle="Text with portal access link" 
              defaultChecked 
            />
            <CheckboxOption 
              title="Require Password Change on First Login" 
              subtitle="Force coach to set a personal password" 
              defaultChecked 
            />
          </div>
        </div>
      </div>

      {/* Footer Buttons */}
      <div className="flex items-center justify-between mt-auto pt-6">
        <button 
          onClick={() => navigate('/coaches')}
          className="px-8 py-3 rounded-full border border-gray-200 text-[14px] font-bold text-gray-600 hover:bg-gray-50 transition-colors shadow-sm bg-white"
        >
          Cancel
        </button>
        <button 
          className="bg-gradient-to-r from-[#081A4A] to-[#1239D4] hover:opacity-90 text-white px-8 py-3 rounded-full flex items-center gap-2.5 text-[14px] font-bold transition-opacity shadow-md"
        >
          <FiUser size={16} />
          Add Coach
        </button>
      </div>
    </div>
  );
};

export default AddCoach;
