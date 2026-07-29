import { FiShield, FiUser, FiActivity, FiStar, FiCheckCircle } from "react-icons/fi";

const ReviewCard = ({ icon: Icon, title, children }: { icon: any, title?: string, children: React.ReactNode }) => (
  <div className="bg-[#F9FAFC] rounded-2xl border border-gray-100 p-6 flex items-start gap-4 mb-4">
    <div className="mt-1">
      <Icon className="text-blue-600" size={18} strokeWidth={2.5} />
    </div>
    <div className="flex flex-col">
      {title && <span className="text-[14px] font-bold text-gray-900 mb-1.5">{title}</span>}
      <div className="text-[13px] font-bold text-[#6277A6] flex flex-col gap-1.5">
        {children}
      </div>
    </div>
  </div>
);

const Review = () => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 flex flex-col">
      <h2 className="text-[18px] font-bold text-gray-900 mb-8">Review & Save Player</h2>
      
      {/* Profile Header block */}
      <div className="bg-[#F9FAFC] rounded-2xl border border-gray-100 p-6 flex items-center gap-5 mb-4">
        <div className="w-[56px] h-[56px] rounded-full bg-[#1239D4] flex items-center justify-center text-white font-bold text-[20px] tracking-wide shrink-0 shadow-sm">
          MO
        </div>
        <div className="flex flex-col">
          <span className="text-[18px] font-bold text-gray-900 leading-tight">Marcus Okonkwo</span>
          <span className="text-[13px] font-bold text-[#6277A6] mt-1">TFP-0047 • Age 14 • U14 Lions</span>
          <div className="flex gap-2.5 items-center mt-2.5">
            <span className="bg-[#ECFDF5] text-[#10B981] border border-[#A7F3D0] px-3 py-0.5 rounded-full text-[11px] font-bold tracking-wide">Active</span>
            <span className="text-[12px] font-bold text-gray-400">Elite · Striker</span>
          </div>
        </div>
      </div>

      <ReviewCard icon={FiShield} title="Football Details">
        <span>Striker · Right Foot · Elite Level</span>
        <span>U14 Lions · Coach: James Hargreaves</span>
        <span>Date Joined: 25 Jul 2025</span>
      </ReviewCard>

      <ReviewCard icon={FiUser} title="Parent / Guardian">
        <span>Emmanuel Okonkwo (Father)</span>
        <span>e.okonkwo@gmail.com · +44 7700 900999</span>
        <span>123 Academy Road, London, SW1A 1AA</span>
      </ReviewCard>

      <ReviewCard icon={FiActivity} title="Medical">
        <span>Blood Group: O+ · No known allergies</span>
        <span>Emergency: Emmanuel Okonkwo · +44 7700 900999</span>
      </ReviewCard>

      <ReviewCard icon={FiStar} title="Initial Assessment">
        <span>Overall Score: 7.2 / 10</span>
        <span>Top attributes: Communication (9), Mentality (8), Shooting (8)</span>
      </ReviewCard>

      {/* Confirmation Box */}
      <div className="bg-[#F0FDF4] border border-[#BBF7D0] rounded-2xl p-6 flex items-start gap-3 mt-4">
        <FiCheckCircle className="text-[#10B981] mt-0.5 shrink-0" size={20} />
        <div className="flex flex-col">
          <span className="text-[14px] font-bold text-[#047857] mb-2.5">Upon saving, the system will automatically:</span>
          <ul className="flex flex-col gap-2 list-disc ml-5">
            <li className="text-[13px] font-bold text-[#059669]">Create player profile & generate Player ID</li>
            <li className="text-[13px] font-bold text-[#059669]">Assign to U14 Lions squad</li>
            <li className="text-[13px] font-bold text-[#059669]">Assign James Hargreaves as primary coach</li>
            <li className="text-[13px] font-bold text-[#059669]">Create parent portal account for Emmanuel Okonkwo</li>
            <li className="text-[13px] font-bold text-[#059669]">Send email & SMS invitation to parent</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Review;
